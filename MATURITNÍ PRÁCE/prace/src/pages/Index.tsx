import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { supabase } from "@/integrations/supabase/client";

const SAMPLE_PROPERTIES = [
  {
    id: 1,
    title: "Modern Studio in City Center",
    description: "Beautiful studio apartment perfect for students. Fully furnished with modern amenities.",
    price: 500,
    size: 30,
    location: "Prague",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3",
    ownerId: "00000000-0000-0000-0000-000000000000" // Added sample owner ID
  },
  {
    id: 2,
    title: "Cozy 2-Bedroom Apartment",
    description: "Spacious apartment near university campus. Great for sharing with a roommate.",
    price: 800,
    size: 65,
    location: "Brno",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3",
    ownerId: "00000000-0000-0000-0000-000000000000" // Added sample owner ID
  },
  {
    id: 3,
    title: "Student House Share",
    description: "Room available in a friendly student house. All bills included.",
    price: 350,
    size: 20,
    location: "Ostrava",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3",
    ownerId: "00000000-0000-0000-0000-000000000000" // Added sample owner ID
  },
];

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState(SAMPLE_PROPERTIES);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session error:', error);
          navigate('/auth');
          return;
        }

        if (!session) {
          console.log('No session found, redirecting to auth');
          navigate('/auth');
          return;
        }

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          console.log('Auth state changed:', event);
          if (!session) {
            console.log('Auth state changed: no session, redirecting to auth');
            navigate('/auth');
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth check error:', error);
        navigate('/auth');
      }
    };

    checkAuth();
  }, [navigate]);

  const handleFilterChange = (filters: any) => {
    // Filter logic would go here
    console.log("Filters changed:", filters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Find Your Perfect Student Home
          </h1>
          <p className="text-white/80 text-lg">
            Browse through hundreds of student-friendly properties and find your ideal accommodation
          </p>
        </div>

        <div className="mb-8">
          <PropertyFilters onFilterChange={handleFilterChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard 
              key={property.id}
              {...property}
              ownerId={property.ownerId}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;