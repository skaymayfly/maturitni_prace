import React from 'react';

interface PriceFilterProps {
  minPrice: string;
  maxPrice: string;
  onChange: (min: string, max: string) => void;
}

export default function PriceFilter({ minPrice, maxPrice, onChange }: PriceFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Cena (Kč/měsíc)</label>
      <div className="mt-1 flex space-x-2">
        <input
          type="number"
          placeholder="Od"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={minPrice}
          onChange={(e) => onChange(e.target.value, maxPrice)}
        />
        <input
          type="number"
          placeholder="Do"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={maxPrice}
          onChange={(e) => onChange(minPrice, e.target.value)}
        />
      </div>
    </div>
  );
}