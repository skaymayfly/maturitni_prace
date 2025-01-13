import { useEffect, useState } from 'react';
import { Auth as SupabaseAuth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from '@supabase/supabase-js';

const Auth = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        if (session) {
          console.log('User already logged in, redirecting to home');
          navigate('/');
        }
      } catch (error) {
        console.error('Session check error:', error);
        if (error instanceof AuthError) {
          setErrorMessage(error.message);
        }
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      
      if (event === 'SIGNED_IN' && session) {
        console.log('User signed in, redirecting to home');
        navigate('/');
      }
      
      if (event === 'USER_UPDATED') {
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) throw error;
          if (data.session) {
            navigate('/');
          }
        } catch (error) {
          console.error('Auth error:', error);
          if (error instanceof AuthError) {
            setErrorMessage(error.message);
          }
        }
      }
      
      if (event === 'SIGNED_OUT') {
        setErrorMessage("");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vítejte zpět</h1>
          <p className="text-gray-600">Přihlaste se ke svému účtu</p>
        </div>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <SupabaseAuth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#0EA5E9',
                  brandAccent: '#8B5CF6',
                  inputBackground: 'white',
                  inputText: 'black',
                  inputBorder: '#e2e8f0',
                  inputBorderHover: '#0EA5E9',
                  inputBorderFocus: '#0EA5E9',
                },
                space: {
                  inputPadding: '12px',
                  buttonPadding: '12px',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '8px',
                  buttonBorderRadius: '8px',
                  inputBorderRadius: '8px',
                },
                fonts: {
                  bodyFontFamily: `'Roboto', sans-serif`,
                  buttonFontFamily: `'Roboto', sans-serif`,
                  inputFontFamily: `'Roboto', sans-serif`,
                },
              },
            },
            style: {
              button: {
                fontSize: '16px',
                fontWeight: '500',
              },
              input: {
                fontSize: '16px',
              },
              label: {
                fontSize: '14px',
                color: '#4b5563',
              },
            },
          }}
          providers={[]}
          localization={{
            variables: {
              sign_in: {
                email_label: 'Email',
                password_label: 'Heslo',
                button_label: 'Přihlásit se',
                loading_button_label: 'Přihlašování...',
                link_text: 'Již máte účet? Přihlaste se'
              },
              sign_up: {
                email_label: 'Email',
                password_label: 'Heslo',
                button_label: 'Registrovat se',
                loading_button_label: 'Registrace...',
                link_text: 'Nemáte účet? Zaregistrujte se'
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default Auth;