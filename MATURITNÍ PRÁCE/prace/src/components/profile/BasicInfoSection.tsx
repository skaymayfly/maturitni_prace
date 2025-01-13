import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { czechUniversities } from "@/data/universities";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Instagram } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface BasicInfoSectionProps {
  userId: string;
  firstName: string;
  lastName: string;
  university: string;
  bio: string;
  age: number | null;
  avatarUrl: string | null;
  instagramHandle: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onUniversityChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onAgeChange: (value: number | null) => void;
  onAvatarUrlChange: (value: string | null) => void;
  onInstagramHandleChange: (value: string) => void;
}

export const BasicInfoSection = ({
  userId,
  firstName,
  lastName,
  university,
  bio,
  age,
  avatarUrl,
  instagramHandle,
  onFirstNameChange,
  onLastNameChange,
  onUniversityChange,
  onBioChange,
  onAgeChange,
  onAvatarUrlChange,
  onInstagramHandleChange,
}: BasicInfoSectionProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      onAvatarUrlChange(publicUrl);
      
      toast({
        title: "Avatar updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload profile picture.",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl || undefined} />
          <AvatarFallback>{firstName?.[0]}{lastName?.[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <Label htmlFor="avatar">Profile Picture</Label>
          <div>
            <Button
              variant="outline"
              className="relative"
              disabled={uploading}
            >
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleAvatarUpload}
                disabled={uploading}
              />
              <Camera className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Jméno</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => onFirstNameChange(e.target.value)}
            placeholder="Zadejte své jméno"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Příjmení</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => onLastNameChange(e.target.value)}
            placeholder="Zadejte své příjmení"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="age">Věk</Label>
        <Input
          id="age"
          type="number"
          value={age || ''}
          onChange={(e) => onAgeChange(e.target.value ? Number(e.target.value) : null)}
          placeholder="Zadejte svůj věk"
          min="0"
          max="150"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="university">Univerzita</Label>
        <Select value={university} onValueChange={onUniversityChange}>
          <SelectTrigger>
            <SelectValue placeholder="Vyberte svou univerzitu" />
          </SelectTrigger>
          <SelectContent>
            {czechUniversities.map((uni) => (
              <SelectItem key={uni} value={uni}>
                {uni}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="instagram">Instagram</Label>
        <div className="relative">
          <Instagram className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            id="instagram"
            value={instagramHandle || ''}
            onChange={(e) => onInstagramHandleChange(e.target.value)}
            placeholder="Váš Instagram handle (bez @)"
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          value={bio}
          onChange={(e) => onBioChange(e.target.value)}
          placeholder="Řekněte něco o sobě"
        />
      </div>
    </div>
  );
};