import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { ListingFormFields } from "./listing/ListingFormFields";
import { SubscriptionPackages } from "./listing/SubscriptionPackages";
import { ArrowRight } from "lucide-react";

export const CreateListingForm = () => {
  const [formStep, setFormStep] = useState<"details" | "payment">("details");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    size: "",
    location: "",
    contact: "",
    imageUrls: [] as string[],
    amenities: [] as string[],
    subscriptionType: "classic",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        console.log("No active session, redirecting to auth");
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('contact')
        .eq('id', session.user.id)
        .single();

      if (profile?.contact) {
        setFormData(prev => ({ ...prev, contact: profile.contact }));
      }
    };

    checkAuth();
  }, [navigate]);

  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.imageUrls.length < 2) {
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Přidejte prosím alespoň 2 fotografie",
      });
      return;
    }

    setFormStep("payment");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log("No active session found during submission");
        navigate("/auth");
        return;
      }

      // Calculate subscription end date (1 month from now)
      const subscriptionEndDate = new Date();
      subscriptionEndDate.setMonth(subscriptionEndDate.getMonth() + 1);

      // First update the user's contact in their profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ contact: formData.contact })
        .eq('id', session.user.id);

      if (profileError) throw profileError;

      const { error } = await supabase.from("property_listings").insert({
        title: formData.title,
        description: formData.description,
        price: Number(formData.price),
        size: Number(formData.size),
        location: formData.location,
        image_url: formData.imageUrls[0],
        image_urls: formData.imageUrls,
        amenities: formData.amenities,
        owner_id: session.user.id,
        subscription_type: formData.subscriptionType,
        subscription_end_date: subscriptionEndDate.toISOString(),
      });

      if (error) throw error;

      toast({
        title: "Úspěch",
        description: "Inzerát byl úspěšně vytvořen",
      });
      
      navigate("/properties");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se vytvořit inzerát",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (formStep === "payment") {
    return (
      <div className="space-y-6">
        <Button 
          variant="outline" 
          onClick={() => setFormStep("details")}
          className="mb-4"
        >
          Zpět k úpravám
        </Button>
        
        <SubscriptionPackages
          selectedPackage={formData.subscriptionType}
          onPackageSelect={(type) => handleFormChange("subscriptionType", type)}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleContinueToPayment} className="space-y-6">
      <ListingFormFields 
        formData={formData}
        onChange={handleFormChange}
      />

      <div className="pt-6">
        <Button 
          type="submit" 
          size="lg"
          className="w-full sm:w-auto transition-all duration-200 hover:translate-x-1"
        >
          Pokračovat k platbě
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </form>
  );
};