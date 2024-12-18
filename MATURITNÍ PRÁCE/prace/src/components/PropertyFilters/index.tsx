import React from 'react';
import PriceFilter from './PriceFilter';
import SizeFilter from './SizeFilter';
import LocationFilter from './LocationFilter';
import { FilterState } from '../../types';

interface PropertyFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export default function PropertyFilters({ filters, onFilterChange }: PropertyFiltersProps) {
  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4">Filtry</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onChange={(min, max) => onFilterChange({ ...filters, minPrice: min, maxPrice: max })}
        />
        <SizeFilter
          minSize={filters.minSize}
          maxSize={filters.maxSize}
          onChange={(min, max) => onFilterChange({ ...filters, minSize: min, maxSize: max })}
        />
        <LocationFilter
          value={filters.location}
          onChange={(location) => onFilterChange({ ...filters, location })}
        />
      </div>
    </div>
  );
}