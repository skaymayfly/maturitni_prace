import { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import PropertyFilters from '../components/PropertyFilters';
import { properties } from '../data/properties';
import { FilterState } from '../types';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    location: ''
  });

  const filteredProperties = properties.filter(property => {
    if (filters.location && property.location !== filters.location) return false;
    if (filters.minPrice && property.price < Number(filters.minPrice)) return false;
    if (filters.maxPrice && property.price > Number(filters.maxPrice)) return false;
    if (filters.minSize && property.size < Number(filters.minSize)) return false;
    if (filters.maxSize && property.size > Number(filters.maxSize)) return false;
    return true;
  });

  return (
    <div>
      <PropertyFilters filters={filters} onFilterChange={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}