import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Nová hesla se neshodují");
      return;
    }

    if (newPassword.length < 6) {
      setError("Nové heslo musí mít alespoň 6 znaků");
      return;
    }

    try {
      setIsLoading(true);
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (updateError) throw updateError;

      toast({
        title: "Heslo změněno",
        description: "Vaše heslo bylo úspěšně změněno",
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Nepodařilo se změnit heslo. Zkuste to prosím znovu.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Změna hesla</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nové heslo</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Zadejte nové heslo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Potvrzení nového hesla</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Zadejte nové heslo znovu"
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Probíhá změna..." : "Změnit heslo"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;