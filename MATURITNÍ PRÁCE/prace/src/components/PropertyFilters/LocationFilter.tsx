import React from 'react';
import { Location } from '../../types';

interface LocationFilterProps {
  value: string;
  onChange: (location: string) => void;
}

export default function LocationFilter({ value, onChange }: LocationFilterProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Lokalita</label>
      <select
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">Všechny lokality</option>
        <option value="Praha">Praha</option>
        <option value="Brno">Brno</option>
        <option value="Ostrava">Ostrava</option>
      </select>
    </div>
  );
}