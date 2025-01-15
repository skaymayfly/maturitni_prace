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
        <Label htmlFor="title" className="text-lg font-medium text-gray-700">Název</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => onChange("title", e.target.value)}
          required
          className="border-purple-100 focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-lg font-medium text-gray-700">Popis</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => onChange("description", e.target.value)}
          required
          className="border-purple-100 focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="price" className="text-lg font-medium text-gray-700">Cena za měsíc (Kč)</Label>
          <Input
            id="price"
            type="number"
            value={formData.price}
            onChange={(e) => onChange("price", e.target.value)}
            required
            className="border-purple-100 focus:border-primary/50 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="size" className="text-lg font-medium text-gray-700">Velikost (m²)</Label>
          <Input
            id="size"
            type="number"
            value={formData.size}
            onChange={(e) => onChange("size", e.target.value)}
            required
            className="border-purple-100 focus:border-primary/50 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location" className="text-lg font-medium text-gray-700">Lokalita</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => onChange("location", e.target.value)}
          required
          className="border-purple-100 focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-lg font-medium text-gray-700">Kontakt</Label>
        <Input
          id="contact"
          value={formData.contact}
          onChange={(e) => onChange("contact", e.target.value)}
          placeholder="Telefon nebo jiný kontakt"
          required
          className="border-purple-100 focus:border-primary/50 transition-colors"
        />
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
        <ImageUploadSection
          imageUrls={formData.imageUrls}
          onImagesChange={(urls) => onChange("imageUrls", urls)}
        />
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <AmenitiesSection
          selectedAmenities={formData.amenities}
          onAmenitiesChange={(amenities) => onChange("amenities", amenities)}
        />
      </div>
    </div>
  );
};