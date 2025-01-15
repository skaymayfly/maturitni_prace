import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface InterestsSectionProps {
  userId: string;
  initialInterests: string[];
  onInterestsUpdate: (interests: string[]) => void;
}

export const InterestsSection = ({ userId, initialInterests, onInterestsUpdate }: InterestsSectionProps) => {
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [newInterest, setNewInterest] = useState("");
  const [isProfileCreated, setIsProfileCreated] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', userId)
          .maybeSingle();

        if (error) {
          console.error('Error checking profile:', error);
          return;
        }

        setIsProfileCreated(!!profile);
      } catch (error) {
        console.error('Error in profile check:', error);
      }
    };

    checkProfile();
  }, [userId]);

  const addInterest = async () => {
    if (!newInterest.trim()) return;

    if (!isProfileCreated) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nejdříve prosím uložte svůj profil.",
      });
      return;
    }
    
    try {
      const { error } = await supabase
        .from('user_interests')
        .insert({
          profile_id: userId,
          interest: newInterest.trim()
        });

      if (error) throw error;

      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      onInterestsUpdate(updatedInterests);
      setNewInterest("");
      
      toast({
        title: "Zájem přidán",
        description: "Váš zájem byl úspěšně přidán.",
      });
    } catch (error) {
      console.error('Error adding interest:', error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se přidat zájem.",
      });
    }
  };

  const removeInterest = async (interestToRemove: string) => {
    if (!isProfileCreated) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nejdříve prosím uložte svůj profil.",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_interests')
        .delete()
        .eq('profile_id', userId)
        .eq('interest', interestToRemove);

      if (error) throw error;

      const updatedInterests = interests.filter(interest => interest !== interestToRemove);
      setInterests(updatedInterests);
      onInterestsUpdate(updatedInterests);
      
      toast({
        title: "Zájem odebrán",
        description: "Váš zájem byl úspěšně odebrán.",
      });
    } catch (error) {
      console.error('Error removing interest:', error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se odebrat zájem.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label>Zájmy</Label>
      <div className="flex gap-2">
        <Input
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Přidat nový zájem"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addInterest();
            }
          }}
        />
        <Button onClick={addInterest}>Přidat</Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
          >
            {interest}
            <X
              className="h-3 w-3 cursor-pointer"
              onClick={() => removeInterest(interest)}
            />
          </Badge>
        ))}
      </div>
    </div>
  );
};