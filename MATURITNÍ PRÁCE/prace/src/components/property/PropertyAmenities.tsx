import { Badge } from "@/components/ui/badge";

interface PropertyAmenitiesProps {
  amenities: string[];
}

export const PropertyAmenities = ({ amenities }: PropertyAmenitiesProps) => {
  const amenityLabels: Record<string, string> = {
    parking: "Parkování",
    balcony: "Balkón",
    elevator: "Výtah",
    cellar: "Sklep",
    washing_machine: "Pračka",
    dishwasher: "Myčka",
    internet: "Internet",
    furnished: "Vybaveno"
  };

  if (!amenities.length) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium">Příslušenství:</h4>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity) => (
          <Badge key={amenity} variant="secondary">
            {amenityLabels[amenity] || amenity}
          </Badge>
        ))}
      </div>
    </div>
  );
};