import { useState, useEffect } from 'react';
import { Company, RawCompanyData } from '../types/company';

// Use local file for development, Netlify function for production
const COMPANIES_URL = import.meta.env.DEV 
  ? '/companies.json' 
  : '/.netlify/functions/companies-proxy';

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const CACHE_KEY = 'ai-radar-companies';
const CACHE_TIMESTAMP_KEY = 'ai-radar-companies-timestamp';

// Transform raw GitHub data to our internal format
function transformCompanyData(rawCompany: RawCompanyData): Company {
  // Split founders string into array
  const foundersArray = rawCompany.Founders
    .split(',')
    .map(founder => founder.trim())
    .filter(founder => founder.length > 0);

  // Split category string to extract main category and tags
  const categoryParts = rawCompany.Category
    .split(',')
    .map(part => part.trim())
    .filter(part => part.length > 0);
  
  const mainCategory = categoryParts[0] || 'Other';
  const tags = categoryParts.slice(1);

  return {
    id: rawCompany.uuid.toString(),
    name: rawCompany.Name,
    founded: rawCompany.Founded,
    founders: foundersArray,
    website: rawCompany.Website,
    category: mainCategory,
    tags: tags,
    country: rawCompany.Country,
    state: rawCompany.State,
    city: rawCompany.City,
    logoUrl: rawCompany.Logo,
    description: rawCompany.Description,
    linkedinProfile: rawCompany["Linkedin Profile URL"]
  };
}

// Validate raw company data structure
function validateRawCompany(company: any): company is RawCompanyData {
  return (
    company &&
    typeof company.Name === 'string' &&
    typeof company.Founded === 'number' &&
    typeof company.Founders === 'string' &&
    typeof company.Website === 'string' &&
    typeof company.Category === 'string' &&
    typeof company.Country === 'string' &&
    typeof company.State === 'string' &&
    typeof company.City === 'string' &&
    typeof company.Logo === 'string' &&
    typeof company.Description === 'string' &&
    typeof company["Linkedin Profile URL"] === 'string' &&
    typeof company.uuid === 'number'
  );
}

// Sanitize strings to prevent XSS
function sanitizeString(str: string): string {
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/on\w+\s*=/gi, '');
}

function sanitizeCompany(company: Company): Company {
  return {
    ...company,
    name: sanitizeString(company.name),
    description: sanitizeString(company.description),
    founders: company.founders.map(sanitizeString),
    website: company.website.startsWith('http') ? company.website : `https://${company.website}`,
    linkedinProfile: company.linkedinProfile.startsWith('http') ? company.linkedinProfile : `https://${company.linkedinProfile}`
  };
}

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        const cachedTimestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
        
        if (cachedData && cachedTimestamp) {
          const age = Date.now() - parseInt(cachedTimestamp);
          if (age < CACHE_DURATION) {
            console.log('📦 Using cached company data');
            const parsedData = JSON.parse(cachedData);
            setCompanies(parsedData);
            setLoading(false);
            return;
          }
        }

        console.log('🌐 Fetching fresh company data from GitHub...');
        
        const response = await fetch(COMPANIES_URL, {
          headers: {
            'Accept': 'application/json',
            'Cache-Control': 'no-cache'
          }
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          if (response.status === 422 && errorData?.error === "Invalid JSON data in repository") {
            throw new Error(`Repository data error: ${errorData.details || 'Invalid JSON format in companies.json'}`);
          }
          throw new Error(`Failed to fetch companies: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('📊 Raw data received:', data.length, 'companies');
        
        // Validate and sanitize the data
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format: expected array of companies');
        }
        
        const transformedCompanies = data
          .filter((rawCompany, index) => {
            const isValid = validateRawCompany(rawCompany);
            if (!isValid) {
              console.warn(`⚠️ Invalid company data at index ${index}:`, rawCompany);
            }
            return isValid;
          })
          .map((rawCompany: RawCompanyData) => {
            const transformed = transformCompanyData(rawCompany);
            return sanitizeCompany(transformed);
          });
        
        console.log('✅ Transformed companies:', transformedCompanies.length);
        
        // Cache the validated data
        localStorage.setItem(CACHE_KEY, JSON.stringify(transformedCompanies));
        localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        
        setCompanies(transformedCompanies);
        
      } catch (err) {
        console.error('❌ Error fetching companies:', err);
        setError(err instanceof Error ? err.message : 'Failed to load companies');
        
        // Try to use cached data as fallback
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          console.log('🔄 Using stale cached data as fallback');
          try {
            const parsedData = JSON.parse(cachedData);
            setCompanies(parsedData);
          } catch (parseError) {
            console.error('❌ Failed to parse cached data:', parseError);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return { companies, loading, error };
};