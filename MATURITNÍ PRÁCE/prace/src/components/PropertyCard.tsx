import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PropertyImageGallery } from "./property/PropertyImageGallery";
import { PropertyAmenities } from "./property/PropertyAmenities";
import { PropertyContact } from "./property/PropertyContact";

interface PropertyCardProps {
  title: string;
  description: string;
  price: number;
  size: number;
  location: string;
  image: string;
  ownerId: string;
  imageUrls?: string[];
  amenities?: string[];
}

export const PropertyCard = ({ 
  title, 
  description, 
  price, 
  size, 
  location, 
  image,
  ownerId,
  imageUrls = [],
  amenities = []
}: PropertyCardProps) => {
  const [ownerContact, setOwnerContact] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = imageUrls.length > 0 ? imageUrls : [image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  useEffect(() => {
    const fetchOwnerContact = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('contact')
          .eq('id', ownerId)
          .single();

        if (error) throw error;
        
        setOwnerContact(data?.contact || "Kontakt není k dispozici");
      } catch (error) {
        console.error('Error fetching owner contact:', error);
        setOwnerContact("Kontakt není k dispozici");
      }
    };

    if (ownerId) {
      fetchOwnerContact();
    }
  }, [ownerId]);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Sheet>
        <SheetTrigger asChild>
          <div className="cursor-pointer">
            <CardHeader className="p-0">
              <img
                src={image}
                alt={title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {location}
                </div>
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  {size} m²
                </div>
              </div>
            </CardContent>
          </div>
        </SheetTrigger>
        
        <SheetContent 
          side="bottom" 
          className="h-screen w-full p-0 max-w-none mx-0"
        >
          <ScrollArea className="h-full">
            <div className="p-6 max-w-5xl mx-auto">
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">{title}</SheetTitle>
              </SheetHeader>

              <SheetDescription className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
                  <div className="space-y-6">
                    <PropertyImageGallery
                      images={allImages}
                      currentIndex={currentImageIndex}
                      onPrevious={previousImage}
                      onNext={nextImage}
                    />
                    
                    <div className="space-y-4">
                      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {location}
                        </div>
                        <div className="flex items-center">
                          <Home className="h-4 w-4 mr-1" />
                          {size} m²
                        </div>
                        <div className="flex items-center">
                          {price} Kč/měsíc
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <PropertyAmenities amenities={amenities} />
                    <PropertyContact ownerContact={ownerContact} />
                  </div>
                </div>
              </SheetDescription>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <Badge variant="secondary" className="bg-gradient-to-r from-primary to-secondary">
          {price} Kč / měsíc
        </Badge>
      </CardFooter>
    </Card>
  );
};