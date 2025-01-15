import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { RoommateCard } from "@/components/roommates/RoommateCard";

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  university: string | null;
  bio: string | null;
  interests: string[];
  age: number | null;
  contact: string | null;
  instagram_handle: string | null;
  avatar_url: string | null;
}

const Roommates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
        return;
      }
      fetchProfiles();
    };

    checkSession();
  }, [navigate]);

  const fetchProfiles = async () => {
    try {
      console.log('Fetching profiles...');
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, first_name, last_name, university, bio, age, contact, instagram_handle, avatar_url')
        .eq('show_in_roommates', true);

      if (profilesError) throw profilesError;

      const profilesWithInterests = await Promise.all(
        profilesData.map(async (profile) => {
          const { data: interestsData, error: interestsError } = await supabase
            .from('user_interests')
            .select('interest')
            .eq('profile_id', profile.id);

          if (interestsError) throw interestsError;

          return {
            ...profile,
            interests: interestsData.map(i => i.interest)
          };
        })
      );

      console.log('Profiles loaded:', profilesWithInterests);
      setProfiles(profilesWithInterests);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profiles",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProfiles = profiles.filter(profile => 
    profile.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    `${profile.first_name} ${profile.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 bg-white/80 backdrop-blur-md p-6 rounded-lg shadow-sm border border-purple-100">
          <div className="max-w-md mx-auto">
            <Label htmlFor="search" className="text-lg font-medium text-gray-700 mb-2 block">
              Vyhledat spolubydlící
            </Label>
            <Input 
              id="search" 
              placeholder="Hledat podle jména nebo univerzity" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-purple-100 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {filteredProfiles.map((profile) => (
              <RoommateCard key={profile.id} profile={profile} />
            ))}
            {filteredProfiles.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500">
                Žádní spolubydlící nenalezeni
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roommates;