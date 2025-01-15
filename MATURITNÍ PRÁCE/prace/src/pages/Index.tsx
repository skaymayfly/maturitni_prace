import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertyFilters } from "@/components/PropertyFilters";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const navigate = useNavigate();
  const { toast } = useToast();

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

        // Check if user has a profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        if (!profile) {
          console.log('No profile found, redirecting to profile setup');
          toast({
            title: "Vítejte!",
            description: "Prosím nastavte si nejdříve svůj profil.",
          });
          navigate('/profile');
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
  }, [navigate, toast]);

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
          {filteredProperties.map((property: any) => (
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