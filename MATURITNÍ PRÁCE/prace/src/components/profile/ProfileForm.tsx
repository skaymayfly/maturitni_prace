import { BasicInfoSection } from "./BasicInfoSection";
import { ContactPrivacySection } from "./ContactPrivacySection";
import { InterestsSection } from "@/components/InterestsSection";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ProfileFormProps {
  userId: string;
  firstName: string;
  lastName: string;
  university: string;
  bio: string;
  age: number | null;
  avatarUrl: string | null;
  email: string;
  showInRoommates: boolean;
  interests: string[];
  instagramHandle: string;
  isSaving: boolean;
  isNewUser: boolean;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onUniversityChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onAgeChange: (value: number | null) => void;
  onAvatarUrlChange: (value: string | null) => void;
  onShowInRoommatesChange: (value: boolean) => void;
  onInterestsUpdate: (interests: string[]) => void;
  onInstagramHandleChange: (value: string) => void;
  onSave: () => void;
}

export const ProfileForm = ({
  userId,
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
  isSaving,
  isNewUser,
  onFirstNameChange,
  onLastNameChange,
  onUniversityChange,
  onBioChange,
  onAgeChange,
  onAvatarUrlChange,
  onShowInRoommatesChange,
  onInterestsUpdate,
  onInstagramHandleChange,
  onSave,
}: ProfileFormProps) => {
  return (
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
        onFirstNameChange={onFirstNameChange}
        onLastNameChange={onLastNameChange}
        onUniversityChange={onUniversityChange}
        onBioChange={onBioChange}
        onAgeChange={onAgeChange}
        onAvatarUrlChange={onAvatarUrlChange}
        onInstagramHandleChange={onInstagramHandleChange}
      />
      <ContactPrivacySection
        userId={userId}
        email={email}
        showInRoommates={showInRoommates}
        onShowInRoommatesChange={onShowInRoommatesChange}
      />
      <InterestsSection
        userId={userId}
        initialInterests={interests}
        onInterestsUpdate={onInterestsUpdate}
      />
      <div className="flex justify-end pt-4">
        <Button 
          onClick={onSave} 
          disabled={isSaving}
          className="w-full sm:w-auto"
        >
          {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isSaving ? "Ukládání..." : isNewUser ? "Vytvořit profil" : "Uložit změny"}
        </Button>
      </div>
    </div>
  );
};