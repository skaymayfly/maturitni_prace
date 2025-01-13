import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploadSection } from "./ImageUploadSection";
import { AmenitiesSection } from "./AmenitiesSection";

interface ListingFormFieldsProps {
  formData: {
    title: string;
    description: string;
    price: string;
    size: string;
    location: string;
    contact: string;
    imageUrls: string[];
    amenities: string[];
  };
  onChange: (field: string, value: any) => void;
}

export const ListingFormFields = ({ formData, onChange }: ListingFormFieldsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Název</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Popis</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Cena za měsíc (Kč)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size">Velikost (m²)</Label>
          <Input
            id="size"
            type="number"
            value={formData.size}
            onChange={(e) => onChange("size", e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Lokalita</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Kontakt</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => onChange("contact", e.target.value)}
          placeholder="Telefon nebo jiný kontakt"
          required
        />
      </div>

      <ImageUploadSection
        imageUrls={formData.imageUrls}
        onImagesChange={(urls) => onChange("imageUrls", urls)}
      />

      <AmenitiesSection
        selectedAmenities={formData.amenities}
        onAmenitiesChange={(amenities) => onChange("amenities", amenities)}
      />
    </div>
  );
};