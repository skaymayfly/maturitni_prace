import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { Properties } from "./pages/Properties";
import Roommates from "./pages/Roommates";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import About from "./pages/About";
import { CreateListing } from "./pages/CreateListing";
import ChangePassword from "./pages/ChangePassword";
import { Toaster } from "./components/ui/toaster";
import { supabase } from "@/integrations/supabase/client";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          setIsAuthenticated(false);
          return;
        }

        // If no session, user is not authenticated
        if (!session) {
          console.log("No active session found");
          setIsAuthenticated(false);
          return;
        }

        // Verify the session is still valid
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          console.error("User verification error:", userError);
          setIsAuthenticated(false);
          return;
        }

        console.log("Session verified, user authenticated:", user?.id);
        setIsAuthenticated(true);

        // Subscribe to auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event, session);
          
          if (event === 'SIGNED_OUT') {
            console.log("User signed out");
            setIsAuthenticated(false);
            return;
          }
          
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            console.log("User signed in or token refreshed");
            setIsAuthenticated(true);
            return;
          }

          // Handle other auth events
          if (event === 'USER_UPDATED' || event === 'INITIAL_SESSION') {
            console.log("User updated or initial session");
            setIsAuthenticated(!!session);
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error in auth check:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Show loading state while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

// Wrapper component to handle navbar visibility
const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/auth';

  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <div className={showNavbar ? "pt-16" : ""}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties"
            element={
              <ProtectedRoute>
                <Properties />
              </ProtectedRoute>
            }
          />
          <Route
            path="/roommates"
            element={
              <ProtectedRoute>
                <Roommates />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-listing"
            element={
              <ProtectedRoute>
                <CreateListing />
              </ProtectedRoute>
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </AppLayout>
      <Toaster />
    </Router>
  );
}

export default App;
