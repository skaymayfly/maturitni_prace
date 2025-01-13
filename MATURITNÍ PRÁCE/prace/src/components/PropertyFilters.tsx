import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";

interface Filters {
  city: string;
  minPrice: string;
  maxPrice: string;
  minSize: string;
  maxSize: string;
}

interface PropertyFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export const PropertyFilters = ({ onFilterChange }: PropertyFiltersProps) => {
  const [filters, setFilters] = useState<Filters>({
    city: "",
    minPrice: "",
    maxPrice: "",
    minSize: "",
    maxSize: "",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            name="city"
            placeholder="Hledat podle města..."
            value={filters.city}
            onChange={handleChange}
            className="w-full"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="md:w-auto w-full"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filtry
        </Button>
        <Button className="bg-gradient-to-r from-primary to-secondary md:w-auto w-full">
          <Search className="h-4 w-4 mr-2" />
          Hledat
        </Button>
      </div>

      {showAdvanced && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 animate-fade-in">
          <Input
            name="minPrice"
            type="number"
            placeholder="Min. cena (Kč)"
            value={filters.minPrice}
            onChange={handleChange}
          />
          <Input
            name="maxPrice"
            type="number"
            placeholder="Max. cena (Kč)"
            value={filters.maxPrice}
            onChange={handleChange}
          />
          <Input
            name="minSize"
            type="number"
            placeholder="Min. velikost (m²)"
            value={filters.minSize}
            onChange={handleChange}
          />
          <Input
            name="maxSize"
            type="number"
            placeholder="Max. velikost (m²)"
            value={filters.maxSize}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};