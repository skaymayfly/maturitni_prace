import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface InterestsSectionProps {
  userId: string;
  initialInterests: string[];
  onInterestsUpdate: (interests: string[]) => void;
}

export const InterestsSection = ({ userId, initialInterests, onInterestsUpdate }: InterestsSectionProps) => {
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [newInterest, setNewInterest] = useState("");
  const { toast } = useToast();

  const addInterest = async () => {
    if (!newInterest.trim()) return;
    
    try {
      const { error } = await supabase
        .from('user_interests')
        .insert({ profile_id: userId, interest: newInterest.trim() });

      if (error) throw error;

      const updatedInterests = [...interests, newInterest.trim()];
      setInterests(updatedInterests);
      onInterestsUpdate(updatedInterests);
      setNewInterest("");
      
      toast({
        title: "Interest added",
        description: "Your interest has been added successfully.",
      });
    } catch (error) {
      console.error('Error adding interest:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add interest.",
      });
    }
  };

  const removeInterest = async (interestToRemove: string) => {
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
        title: "Interest removed",
        description: "Your interest has been removed successfully.",
      });
    } catch (error) {
      console.error('Error removing interest:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove interest.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label>Interests</Label>
      <div className="flex gap-2">
        <Input
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          placeholder="Add a new interest"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addInterest();
            }
          }}
        />
        <Button onClick={addInterest}>Add</Button>
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