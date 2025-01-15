import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { useProfileData } from "@/hooks/useProfileData";

const Profile = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          navigate("/auth");
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          navigate("/auth");
          return;
        }

        console.log("User authenticated:", user.id);
        setUserId(user.id);
        setEmail(user.email || "");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error("Error checking profile:", profileError);
          throw profileError;
        }

        // If profile doesn't exist or is incomplete, keep user on profile page
        if (!profile || !profile.first_name || !profile.last_name) {
          if (window.location.pathname !== '/profile') {
            navigate('/profile');
          }
        }
      } catch (error) {
        console.error("Error in auth check:", error);
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const {
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
  } = useProfileData(userId);

  if (!userId) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <ProfileHeader isNewUser={isNewUser} />
        <ProfileForm
          userId={userId}
          firstName={firstName}
          lastName={lastName}
          university={university}
          bio={bio}
          age={age}
          avatarUrl={avatarUrl}
          email={email}
          showInRoommates={showInRoommates}
          interests={interests}
          instagramHandle={instagramHandle}
          isSaving={isSaving}
          isNewUser={isNewUser}
          onFirstNameChange={setFirstName}
          onLastNameChange={setLastName}
          onUniversityChange={setUniversity}
          onBioChange={setBio}
          onAgeChange={setAge}
          onAvatarUrlChange={setAvatarUrl}
          onShowInRoommatesChange={setShowInRoommates}
          onInterestsUpdate={setInterests}
          onInstagramHandleChange={setInstagramHandle}
          onSave={saveProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
