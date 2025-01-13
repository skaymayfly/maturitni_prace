import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BasicInfoSection } from "@/components/profile/BasicInfoSection";
import { ContactPrivacySection } from "@/components/profile/ContactPrivacySection";
import { InterestsSection } from "@/components/InterestsSection";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState<number | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [showInRoommates, setShowInRoommates] = useState(true);
  const [interests, setInterests] = useState<string[]>([]);
  const [instagramHandle, setInstagramHandle] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          console.log("No active session found, redirecting to auth");
          navigate("/auth");
          return;
        }

        console.log("Session found, loading profile data");
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) throw userError;

        if (!user) {
          console.log("No user found, redirecting to auth");
          navigate("/auth");
          return;
        }

        setUserId(user.id);
        setEmail(user.email || "");

        console.log("Fetching profile data for user:", user.id);
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        if (profile) {
          console.log("Profile data loaded:", profile);
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setUniversity(profile.university || "");
          setBio(profile.bio || "");
          setAge(profile.age);
          setAvatarUrl(profile.avatar_url);
          setShowInRoommates(profile.show_in_roommates ?? true);
          setInstagramHandle(profile.instagram_handle || "");
        }

        const { data: userInterests, error: interestsError } = await supabase
          .from("user_interests")
          .select("interest")
          .eq("profile_id", user.id);

        if (interestsError) throw interestsError;

        if (userInterests) {
          console.log("User interests loaded:", userInterests);
          setInterests(userInterests.map(i => i.interest));
        }
      } catch (error) {
        console.error("Error in profile setup:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try logging in again.",
        });
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log("Saving profile changes...");

      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          university,
          bio,
          age,
          avatar_url: avatarUrl,
          show_in_roommates: showInRoommates,
          instagram_handle: instagramHandle,
        })
        .eq("id", userId);

      if (error) throw error;

      toast({
        title: "Změny uloženy",
        description: "Váš profil byl úspěšně aktualizován.",
      });
      console.log("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "Chyba při ukládání",
        description: "Nepodařilo se uložit změny profilu. Prosím zkuste to znovu.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nastavení profilu</h1>
        <div className="space-y-8">
          <BasicInfoSection
            userId={userId}
            firstName={firstName}
            lastName={lastName}
            university={university}
            bio={bio}
            age={age}
            avatarUrl={avatarUrl}
            instagramHandle={instagramHandle}
            onFirstNameChange={setFirstName}
            onLastNameChange={setLastName}
            onUniversityChange={setUniversity}
            onBioChange={setBio}
            onAgeChange={setAge}
            onAvatarUrlChange={setAvatarUrl}
            onInstagramHandleChange={setInstagramHandle}
          />
          <ContactPrivacySection
            userId={userId}
            email={email}
            showInRoommates={showInRoommates}
            onShowInRoommatesChange={setShowInRoommates}
          />
          <InterestsSection
            userId={userId}
            initialInterests={interests}
            onInterestsUpdate={setInterests}
          />
          <div className="flex justify-end pt-4">
            <Button 
              onClick={handleSave} 
              disabled={isSaving}
              className="w-full sm:w-auto"
            >
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSaving ? "Ukládání..." : "Uložit změny"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;