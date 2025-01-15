import { Alert, AlertDescription } from "@/components/ui/alert";

interface ProfileHeaderProps {
  isNewUser: boolean;
}

export const ProfileHeader = ({ isNewUser }: ProfileHeaderProps) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isNewUser ? "Nastavení nového profilu" : "Nastavení profilu"}
      </h1>

      {isNewUser && (
        <Alert className="mb-6">
          <AlertDescription>
            Pro pokračování prosím vyplňte základní informace o vašem profilu.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
};