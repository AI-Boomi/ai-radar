import { useState } from 'react';
import { GeminiService } from '../services/geminiService';

interface SearchFilters {
  categories: string[];
  countries: string[];
  states: string[];
  cities: string[];
  foundedYearRange?: [number, number];
  keywords: string[];
}

export const useGeminiSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const geminiService = new GeminiService();

  const searchWithAI = async (
    query: string,
    availableData: {
      categories: string[];
      countries: string[];
      states: string[];
      cities: string[];
    }
  ): Promise<SearchFilters | null> => {
    if (!query.trim()) return null;

    setIsSearching(true);
    setSearchError(null);

    try {
      const filters = await geminiService.parseSearchQuery(query, availableData);
      return filters;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      setSearchError(errorMessage);
      console.error('Search error:', error);
      return null;
    } finally {
      setIsSearching(false);
    }
  };

  return {
    searchWithAI,
    isSearching,
    searchError
  };
};