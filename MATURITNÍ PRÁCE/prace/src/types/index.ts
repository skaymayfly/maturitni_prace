export type Location = 'Praha' | 'Brno' | 'Ostrava';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'landlord';
  university?: string;
  interests?: string[];
  bio?: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  size: number;
  location: Location;
  type: 'apartment' | 'room';
  images: string[];
  landlordId: string;
}

export interface FilterState {
  minPrice: string;
  maxPrice: string;
  minSize: string;
  maxSize: string;
  location: string;
}