import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Home, Users, LogIn, LogOut, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      console.log("Attempting to sign out...");
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No active session found, redirecting to auth...");
        navigate("/auth");
        return;
      }

      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error during sign out:", error);
        throw error;
      }
      
      toast({
        title: "Odhlášení proběhlo úspěšně",
        description: "Byli jste odhlášeni z vašeho účtu.",
      });
      
      console.log("Sign out successful");
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        variant: "destructive",
        title: "Chyba při odhlašování",
        description: "Nastala chyba při odhlašování. Prosím zkuste to znovu.",
      });
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Home className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Fair Estate
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <Link to="/properties" className="text-gray-600 hover:text-primary transition-colors">
                Nabídka nemovitostí
              </Link>
              <Link to="/roommates" className="text-gray-600 hover:text-primary transition-colors">
                Najít spolubydlící
              </Link>
              <Link to="/create-listing" className="text-gray-600 hover:text-primary transition-colors">
                Přidat nemovitost
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                O nás
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Nastavení profilu
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Odhlásit se
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/properties"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary transition-colors"
            >
              Nabídka nemovitostí
            </Link>
            <Link
              to="/roommates"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary transition-colors"
            >
              Najít spolubydlící
            </Link>
            <Link
              to="/create-listing"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary transition-colors"
            >
              Přidat nemovitost
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary transition-colors"
            >
              O nás
            </Link>
            <Link
              to="/profile"
              className="block px-3 py-2 rounded-md text-gray-600 hover:text-primary transition-colors"
            >
              <Settings className="h-4 w-4 inline mr-2" />
              Nastavení profilu
            </Link>
            <Button 
              variant="default" 
              className="w-full bg-gradient-to-r from-primary to-secondary"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Odhlásit se
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};