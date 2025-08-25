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

export class GeminiService {
  private apiKey: string;
  private baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Gemini API key not found in environment variables');
    }
  }

  async parseSearchQuery(query: string, availableData: {
    categories: string[];
    countries: string[];
    states: string[];
    cities: string[];
  }): Promise<SearchFilters> {
    if (!this.apiKey) {
      return this.fallbackParsing(query, availableData);
    }

    try {
      const prompt = this.createPrompt(query, availableData);
      
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
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

      return this.parseAIResponse(aiResponse, availableData);
    } catch (error) {
      console.error('Gemini API error:', error);
      return this.fallbackParsing(query, availableData);
    }
  }

  private createPrompt(query: string, availableData: {
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

  private parseAIResponse(aiResponse: string, availableData: {
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
        categories: this.validateArray(parsed.categories, availableData.categories),
        countries: this.validateArray(parsed.countries, availableData.countries),
        states: this.validateArray(parsed.states, availableData.states),
        cities: this.validateArray(parsed.cities, availableData.cities),
        foundedYearRange: parsed.foundedYearRange && Array.isArray(parsed.foundedYearRange) 
          ? [parsed.foundedYearRange[0], parsed.foundedYearRange[1]] 
          : undefined,
        keywords: Array.isArray(parsed.keywords) ? parsed.keywords : []
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      return this.fallbackParsing(aiResponse, availableData);
    }
  }

  private validateArray(items: any, validItems: string[]): string[] {
    if (!Array.isArray(items)) return [];
    return items.filter(item => 
      typeof item === 'string' && validItems.includes(item)
    );
  }

  private fallbackParsing(query: string, availableData: {
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
}