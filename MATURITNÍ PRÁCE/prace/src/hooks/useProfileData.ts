import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const useProfileData = (userId: string) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [showInRoommates, setShowInRoommates] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState<string>("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        console.log("Loading profile for user:", userId);
        
        // First, check if profile exists
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .maybeSingle();

        if (profileError) {
          console.error("Error checking profile:", profileError);
          throw profileError;
        }

        // If no profile exists, create one with default values
        if (!profile) {
          console.log("No profile found, creating new profile");
          const { error: insertError } = await supabase
            .from("profiles")
            .insert([
              {
                id: userId,
                role: 'student',
                show_in_roommates: true
              }
            ]);

          if (insertError) {
            console.error("Error creating initial profile:", insertError);
            throw insertError;
          }
          
          setIsNewUser(true);
          return;
        }

        console.log("Profile loaded:", profile);
        
        if (!profile.first_name || !profile.last_name) {
          setIsNewUser(true);
          return;
        }

        // Load existing profile data
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setUniversity(profile.university || "");
        setBio(profile.bio || "");
        setAge(profile.age);
        setAvatarUrl(profile.avatar_url);
        setShowInRoommates(profile.show_in_roommates ?? false);
        setInstagramHandle(profile.instagram_handle || "");
        setIsNewUser(false);

        // Load interests
        const { data: userInterests } = await supabase
          .from("user_interests")
          .select("interest")
          .eq("profile_id", userId);

        if (userInterests) {
          setInterests(userInterests.map(i => i.interest));
        }
      } catch (error) {
        console.error("Error in loadProfile:", error);
        toast({
          variant: "destructive",
          title: "Chyba",
          description: "Nepodařilo se načíst data profilu.",
        });
      }
    };

    if (userId) {
      loadProfile();
    }
  }, [userId, navigate, toast]);

  const validateProfile = () => {
    if (!firstName.trim()) return "Jméno je povinné";
    if (!lastName.trim()) return "Příjmení je povinné";
    return null;
  };

  const saveProfile = async () => {
    const validationError = validateProfile();
    if (validationError) {
      toast({
        variant: "destructive",
        title: "Chybějící údaje",
        description: validationError,
      });
      return;
    }

    try {
      setIsSaving(true);
      console.log("Saving profile for user:", userId);

      const profileData = {
        id: userId,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        university,
        bio,
        age,
        avatar_url: avatarUrl,
        show_in_roommates: showInRoommates,
        instagram_handle: instagramHandle,
        role: 'student',
        updated_at: new Date().toISOString()
      };

      console.log("Profile data to save:", profileData);

      const { error } = await supabase
        .from("profiles")
        .upsert(profileData);

      if (error) {
        console.error("Error saving profile:", error);
        throw error;
      }

      console.log("Profile saved successfully");
      
      toast({
        title: isNewUser ? "Profil vytvořen" : "Změny uloženy",
        description: isNewUser 
          ? "Váš profil byl úspěšně vytvořen."
          : "Váš profil byl úspěšně aktualizován.",
      });

      if (isNewUser) {
        setIsNewUser(false);
        navigate('/');
      }
    } catch (error) {
      console.error("Error in saveProfile:", error);
      toast({
        variant: "destructive",
        title: "Chyba při ukládání",
        description: "Nepodařilo se uložit změny profilu.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return {
    firstName,
    lastName,
    university,
    bio,
    age,
    avatarUrl,
    email,
    showInRoommates,
    interests,
    instagramHandle,
    isNewUser,
    isSaving,
    setFirstName,
    setLastName,
    setUniversity,
    setBio,
    setAge,
    setAvatarUrl,
    setEmail,
    setShowInRoommates,
    setInterests,
    setInstagramHandle,
    saveProfile
  };
};