export interface Company {
  id: string;
  name: string;
  founded: number;
  founders: string[];
  website: string;
  category: string;
  tags: string[];
  country: string;
  state: string;
  city: string;
  logoUrl: string;
  description: string;
  linkedinProfile: string;
}

export interface RawCompanyData {
  uuid: string;
  Name: string;
  Founded: number;
  Founders: string[];
  Website: string;
  Category: string;
  Tags: string[];
  Country: string;
  State: string;
  City: string;
  Logo: string;
  Description: string;
  "Linkedin Profile URL": string;
}