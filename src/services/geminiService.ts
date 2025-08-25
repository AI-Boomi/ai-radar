interface SearchFilters {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
  foundedYearRange?: [number, number];
  keywords: string[];
}

export class GeminiService {
  private baseUrl: string;

  constructor() {
    // Use Netlify Edge Function
    this.baseUrl = '/.netlify/functions/gemini-search';
  }

  async parseSearchQuery(query: string, availableData: {
    categories: string[];
    countries: string[];
    states: string[];
    cities: string[];
  }): Promise<SearchFilters> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          availableData
        })
      });

      if (!response.ok) {
        throw new Error(`Edge function error: ${response.status}`);
      }

      const filters = await response.json();
      return filters;
    } catch (error) {
      console.error('Gemini service error:', error);
      // Return fallback parsing result
      return this.fallbackParsing(query, availableData);
    }
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