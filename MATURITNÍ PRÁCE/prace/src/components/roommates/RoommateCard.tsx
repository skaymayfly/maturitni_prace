import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { School, Calendar, Instagram, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RoommateContactDialog } from "./RoommateContactDialog";

interface RoommateCardProps {
  profile: {
    id: string;
    first_name: string | null;
    last_name: string | null;
    university: string | null;
    bio: string | null;
    interests: string[];
    age: number | null;
    contact: string | null;
    instagram_handle: string | null;
    avatar_url?: string | null;
  };
}

export const RoommateCard = ({ profile }: RoommateCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback>
              <User className="w-6 h-6" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold">
              {profile.first_name} {profile.last_name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              {profile.university && (
                <div className="flex items-center">
                  <School className="w-4 h-4 mr-1" />
                  {profile.university}
                </div>
              )}
            </div>
            {profile.age && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {profile.age} let
              </div>
            )}
            {profile.instagram_handle && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Instagram className="w-4 h-4 mr-1 text-pink-500" />
                @{profile.instagram_handle}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.bio && (
            <p className="text-sm text-gray-600">{profile.bio}</p>
          )}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Interests:</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <Badge 
                    key={i}
                    variant="secondary" 
                    className="bg-gradient-to-r from-primary/10 to-secondary/10"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <RoommateContactDialog 
            contact={profile.contact}
            instagramHandle={profile.instagram_handle}
          />
        </div>
      </CardContent>
    </Card>
  );
};