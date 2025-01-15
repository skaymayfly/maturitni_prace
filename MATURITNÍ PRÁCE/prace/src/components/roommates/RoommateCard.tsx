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
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-purple-50/30 border-purple-100">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 ring-2 ring-purple-200 ring-offset-2">
            <AvatarImage src={profile.avatar_url || undefined} />
            <AvatarFallback className="bg-gradient-to-br from-primary/80 to-secondary/80">
              <User className="w-8 h-8 text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {profile.first_name} {profile.last_name}
            </h3>
            <div className="flex flex-col gap-2 mt-2">
              {profile.university && (
                <div className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                  <School className="w-4 h-4 mr-1 text-secondary" />
                  {profile.university}
                </div>
              )}
              {profile.age && (
                <div className="flex items-center text-sm text-gray-600 hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4 mr-1 text-primary" />
                  {profile.age} let
                </div>
              )}
              {profile.instagram_handle && (
                <div className="flex items-center text-sm text-gray-600 hover:text-pink-500 transition-colors">
                  <Instagram className="w-4 h-4 mr-1 text-pink-500" />
                  @{profile.instagram_handle}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {profile.bio && (
            <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
          )}
          {profile.interests && profile.interests.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2 text-gray-700">Zájmy:</p>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, i) => (
                  <Badge 
                    key={i}
                    variant="secondary" 
                    className="bg-gradient-to-r from-primary/10 via-secondary/10 to-purple-100 hover:from-primary/20 hover:to-secondary/20 transition-all duration-300"
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