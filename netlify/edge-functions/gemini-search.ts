interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

interface SearchFilters {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
  foundedYearRange?: [number, number];
  keywords: string[];
}

export default async (request: Request) => {
  // Handle CORS preflight requests
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { query, availableData } = await request.json();

    if (!query || !availableData) {
      return new Response(
        JSON.stringify({ error: "Missing query or availableData" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get Gemini API key from Netlify environment
    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.warn('Gemini API key not found, using fallback parsing');
      const fallbackResult = fallbackParsing(query, availableData);
      return new Response(
        JSON.stringify(fallbackResult),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Create prompt for Gemini
    const prompt = createPrompt(query, availableData);
    
    // Call Gemini API with correct model
    const geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';
    
    const response = await fetch(`${geminiUrl}?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 1000,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data: GeminiResponse = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      throw new Error('No response from Gemini API');
    }

    const parsedFilters = parseAIResponse(aiResponse, availableData);
    
    return new Response(
      JSON.stringify(parsedFilters),
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

  } catch (error) {
    console.error('Gemini search error:', error);
    
    // Fallback to simple parsing on error
    try {
      const { query, availableData } = await request.json();
      const fallbackResult = fallbackParsing(query, availableData);
      
      return new Response(
        JSON.stringify(fallbackResult),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    } catch (fallbackError) {
      return new Response(
        JSON.stringify({ error: "Search failed" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
  }
};

function createPrompt(query: string, availableData: {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
}): string {
  return `You are an AI assistant helping users search through a database of AI/tech companies. 

User query: "${query}"

Available data to filter by:
- Categories: ${availableData.categories.join(', ')}
- Countries: ${availableData.countries.join(', ')}
- States: ${availableData.states.join(', ')}
- Cities: ${availableData.cities.join(', ')}

Please analyze the user's query and return a JSON object with the following structure:
{
  "categories": ["exact category names that match the query"],
  "countries": ["exact country names that match the query"],
  "states": ["exact state names that match the query"],
  "cities": ["exact city names that match the query"],
  "foundedYearRange": [startYear, endYear] or null,
  "keywords": ["relevant keywords for general search"]
}

Rules:
1. Only include exact matches from the available data lists
2. Be flexible with synonyms (e.g., "fintech" → "Financial Services", "healthcare" → "Healthcare & Medical Diagnostics")
3. For locations, be smart about variations (e.g., "US" → "United States", "USA" → "United States")
4. If no specific filters are mentioned, focus on keywords
5. For year ranges, only include if specifically mentioned
6. Return only valid JSON, no additional text

Examples:
- "Show me fintech companies" → {"categories": ["Financial Services"], "countries": [], "states": [], "cities": [], "foundedYearRange": null, "keywords": ["fintech", "financial"]}
- "Companies in India" → {"categories": [], "countries": ["India"], "states": [], "cities": [], "foundedYearRange": null, "keywords": []}
- "Healthcare startups in California" → {"categories": ["Healthcare & Medical Diagnostics"], "countries": [], "states": ["California"], "cities": [], "foundedYearRange": null, "keywords": ["healthcare", "startups"]}`;
}

function parseAIResponse(aiResponse: string, availableData: {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
}): SearchFilters {
  try {
    // Extract JSON from the response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate and clean the response
    return {
      categories: validateArray(parsed.categories, availableData.categories),
      countries: validateArray(parsed.countries, availableData.countries),
      states: validateArray(parsed.states, availableData.states),
      cities: validateArray(parsed.cities, availableData.cities),
      foundedYearRange: parsed.foundedYearRange && Array.isArray(parsed.foundedYearRange) 
        ? [parsed.foundedYearRange[0], parsed.foundedYearRange[1]] 
        : undefined,
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : []
    };
  } catch (error) {
    console.error('Error parsing AI response:', error);
    throw error;
  }
}

function validateArray(items: any, validItems: string[]): string[] {
  if (!Array.isArray(items)) return [];
  return items.filter(item => 
    typeof item === 'string' && validItems.includes(item)
  );
}

function fallbackParsing(query: string, availableData: {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
}): SearchFilters {
  const lowerQuery = query.toLowerCase();
  const filters: SearchFilters = {
    categories: [],
    countries: [],
    states: [],
    cities: [],
    keywords: [query]
  };

  // Simple keyword matching for categories
  const categoryMappings: { [key: string]: string[] } = {
    'financial': ['Financial Services'],
    'fintech': ['Financial Services'],
    'healthcare': ['Healthcare & Medical Diagnostics', 'Healthcare'],
    'health': ['Healthcare & Medical Diagnostics', 'Healthcare'],
    'medical': ['Healthcare & Medical Diagnostics'],
    'marketing': ['Marketing, Sales & Customer Engagement'],
    'sales': ['Marketing, Sales & Customer Engagement'],
    'customer': ['Marketing, Sales & Customer Engagement', 'Customer Service & Engagement'],
    'ai': ['AI/ML'],
    'ml': ['AI/ML'],
    'artificial intelligence': ['AI/ML'],
    'machine learning': ['AI/ML'],
    'edtech': ['Recruitment, HR, Training & EdTech'],
    'education': ['Recruitment, HR, Training & EdTech'],
    'hr': ['Recruitment, HR, Training & EdTech'],
    'recruitment': ['Recruitment, HR, Training & EdTech'],
    'cybersecurity': ['Cybersecurity'],
    'security': ['Cybersecurity'],
    'language': ['Language, Communication & Voice'],
    'communication': ['Language, Communication & Voice'],
    'voice': ['Language, Communication & Voice'],
    'industry': ['Industry, Robotics, and IoT'],
    'robotics': ['Industry, Robotics, and IoT'],
    'iot': ['Industry, Robotics, and IoT']
  };

  // Check categories
  for (const [keyword, categories] of Object.entries(categoryMappings)) {
    if (lowerQuery.includes(keyword)) {
      categories.forEach(cat => {
        if (availableData.categories.includes(cat) && !filters.categories.includes(cat)) {
          filters.categories.push(cat);
        }
      });
    }
  }

  // Check countries
  const countryMappings: { [key: string]: string } = {
    'us': 'US',
    'usa': 'US',
    'united states': 'US',
    'america': 'US',
    'india': 'India',
    'indian': 'India'
  };

  for (const [keyword, country] of Object.entries(countryMappings)) {
    if (lowerQuery.includes(keyword) && availableData.countries.includes(country)) {
      filters.countries.push(country);
    }
  }

  // Check states and cities directly
  availableData.states.forEach(state => {
    if (lowerQuery.includes(state.toLowerCase())) {
      filters.states.push(state);
    }
  });

  availableData.cities.forEach(city => {
    if (lowerQuery.includes(city.toLowerCase())) {
      filters.cities.push(city);
    }
  });

  return filters;
}