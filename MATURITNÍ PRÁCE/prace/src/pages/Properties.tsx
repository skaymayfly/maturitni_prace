import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type PropertyListing = Tables<"property_listings">;

export const Properties = () => {
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching properties...");
      const { data, error } = await supabase
        .from("property_listings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      console.log("Properties fetched:", data);
      setProperties(data || []);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filters: {
    city: string;
    minPrice: string;
    maxPrice: string;
    minSize: string;
    maxSize: string;
  }) => {
    const filterProperties = async () => {
      try {
        setIsLoading(true);
        console.log("Applying filters:", filters);
        let query = supabase.from("property_listings").select("*");

        if (filters.minPrice) {
          query = query.gte("price", Number(filters.minPrice));
        }
        if (filters.maxPrice) {
          query = query.lte("price", Number(filters.maxPrice));
        }
        if (filters.minSize) {
          query = query.gte("size", Number(filters.minSize));
        }
        if (filters.maxSize) {
          query = query.lte("size", Number(filters.maxSize));
        }
        if (filters.city) {
          query = query.ilike("location", `%${filters.city}%`);
        }

        const { data, error } = await query.order("created_at", { ascending: false });

        if (error) throw error;

        console.log("Filtered properties:", data);
        setProperties(data || []);
      } catch (error) {
        console.error("Error filtering properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    filterProperties();
  };

  return (
    <div className="page-container">
      <div className="w-full bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Načítání nemovitostí...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="flex items-center justify-center py-12 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg">Nebyly nalezeny žádné nemovitosti. Zkuste upravit filtry.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                title={property.title}
                description={property.description}
                price={Number(property.price)}
                size={property.size}
                location={property.location}
                image={property.image_url}
                imageUrls={property.image_urls}
                amenities={property.amenities}
                ownerId={property.owner_id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};