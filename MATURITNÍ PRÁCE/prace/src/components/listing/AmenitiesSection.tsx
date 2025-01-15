import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const AMENITIES_OPTIONS = [
  { id: "parking", label: "Parkování" },
  { id: "balcony", label: "Balkón" },
  { id: "elevator", label: "Výtah" },
  { id: "cellar", label: "Sklep" },
  { id: "washing_machine", label: "Pračka" },
  { id: "dishwasher", label: "Myčka" },
  { id: "internet", label: "Internet" },
  { id: "furnished", label: "Vybaveno" },
];

interface AmenitiesSectionProps {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}

export const AmenitiesSection = ({ selectedAmenities, onAmenitiesChange }: AmenitiesSectionProps) => {
  const toggleAmenity = (amenityId: string) => {
    if (selectedAmenities.includes(amenityId)) {
      onAmenitiesChange(selectedAmenities.filter(id => id !== amenityId));
    } else {
      onAmenitiesChange([...selectedAmenities, amenityId]);
    }
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Příslušenství</Label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {AMENITIES_OPTIONS.map((amenity) => (
          <div 
            key={amenity.id} 
            className="flex items-center space-x-2 p-3 rounded-lg bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200"
          >
            <Checkbox
              id={amenity.id}
              checked={selectedAmenities.includes(amenity.id)}
              onCheckedChange={() => toggleAmenity(amenity.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <label
              htmlFor={amenity.id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {amenity.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};