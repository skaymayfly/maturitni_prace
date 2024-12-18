import React from 'react';

interface SizeFilterProps {
  minSize: string;
  maxSize: string;
  onChange: (min: string, max: string) => void;
}

export default function SizeFilter({ minSize, maxSize, onChange }: SizeFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Velikost (m²)</label>
      <div className="mt-1 flex space-x-2">
        <input
          type="number"
          placeholder="Od"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={minSize}
          onChange={(e) => onChange(e.target.value, maxSize)}
        />
        <input
          type="number"
          placeholder="Do"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={maxSize}
          onChange={(e) => onChange(minSize, e.target.value)}
        />
      </div>
    </div>
  );
}