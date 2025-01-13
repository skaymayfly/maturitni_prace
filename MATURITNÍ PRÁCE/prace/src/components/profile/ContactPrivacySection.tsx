import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ContactPrivacySectionProps {
  userId: string;
  email: string;
  showInRoommates: boolean;
  onShowInRoommatesChange: (value: boolean) => void;
}

export const ContactPrivacySection = ({
  userId,
  email,
  showInRoommates,
  onShowInRoommatesChange,
}: ContactPrivacySectionProps) => {
  const { toast } = useToast();
  const [contact, setContact] = useState("");

  useEffect(() => {
    const loadContact = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('contact')
          .eq('id', userId)
          .maybeSingle();

        if (error) throw error;
        if (data?.contact) {
          setContact(data.contact);
        }
      } catch (error) {
        console.error('Error loading contact:', error);
      }
    };

    if (userId) {
      loadContact();
    }
  }, [userId]);

  const handleContactChange = async (newContact: string) => {
    setContact(newContact);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ contact: newContact })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      
      toast({
        title: "Email odeslán",
        description: "Pokyny k resetování hesla byly odeslány na váš email.",
      });
    } catch (error) {
      console.error('Error sending password reset:', error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se odeslat email pro reset hesla.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="contact">Kontakt (telefon nebo jiný kontakt)</Label>
        <Input
          id="contact"
          value={contact}
          onChange={(e) => handleContactChange(e.target.value)}
          placeholder="Zadejte svůj kontakt"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={email}
          disabled
          className="bg-gray-100"
        />
        <Button
          variant="outline"
          onClick={handlePasswordReset}
          className="mt-2"
        >
          Resetovat heslo
        </Button>
      </div>

      <div className="flex items-center justify-between">
        <Label htmlFor="showInRoommates">Zobrazit v Find Roommates</Label>
        <Switch
          id="showInRoommates"
          checked={showInRoommates}
          onCheckedChange={onShowInRoommatesChange}
        />
      </div>
    </div>
  );
};