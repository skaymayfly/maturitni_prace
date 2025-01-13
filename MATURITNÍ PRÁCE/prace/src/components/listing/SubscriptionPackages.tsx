import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flame, Crown, Star, Check } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface SubscriptionPackagesProps {
  selectedPackage: string;
  onPackageSelect: (packageType: string) => void;
}

export const SubscriptionPackages = ({
  selectedPackage,
  onPackageSelect,
}: SubscriptionPackagesProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "Chyba",
          description: "Pro vytvoření předplatného musíte být přihlášeni",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-listing-subscription', {
        body: { subscriptionType: selectedPackage }
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No checkout URL received');

      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se vytvořit předplatné",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h3 className="text-3xl font-bold text-center mb-12">Vyberte si balíček pro váš inzerát</h3>
      
      <RadioGroup
        value={selectedPackage}
        onValueChange={onPackageSelect}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <Card className={`relative group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          selectedPackage === 'classic' ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-yellow-500" />
          <CardHeader className="space-y-2 text-center pb-4">
            <div className="flex flex-col items-center space-y-3">
              <Star className="h-8 w-8 text-yellow-500" />
              <div>
                <h4 className="font-bold text-xl">Classic</h4>
                <Badge variant="secondary" className="mt-2 text-lg font-semibold px-4 py-1">150 Kč/měs</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroupItem
              value="classic"
              id="classic"
              className="sr-only"
            />
            <Label htmlFor="classic" className="cursor-pointer">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-yellow-500" />
                  Základní zobrazení
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-yellow-500" />
                  Standardní pozice v seznamu
                </li>
              </ul>
            </Label>
          </CardContent>
        </Card>

        <Card className={`relative group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          selectedPackage === 'pro' ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-purple-500" />
          <CardHeader className="space-y-2 text-center pb-4">
            <div className="flex flex-col items-center space-y-3">
              <Crown className="h-8 w-8 text-purple-500" />
              <div>
                <h4 className="font-bold text-xl">Pro</h4>
                <Badge variant="secondary" className="mt-2 text-lg font-semibold px-4 py-1">300 Kč/měs</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroupItem
              value="pro"
              id="pro"
              className="sr-only"
            />
            <Label htmlFor="pro" className="cursor-pointer">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-purple-500" />
                  Vyšší pozice v seznamu
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-purple-500" />
                  Zvýrazněné zobrazení
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-purple-500" />
                  Přednostní zobrazení před Classic
                </li>
              </ul>
            </Label>
          </CardContent>
        </Card>

        <Card className={`relative group transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 ${
          selectedPackage === 'hot' ? 'ring-2 ring-primary ring-offset-2' : ''
        }`}>
          <div className="absolute inset-x-0 top-0 h-1.5 bg-red-500" />
          <CardHeader className="space-y-2 text-center pb-4">
            <div className="flex flex-col items-center space-y-3">
              <Flame className="h-8 w-8 text-red-500" />
              <div>
                <h4 className="font-bold text-xl">Hot</h4>
                <Badge variant="secondary" className="mt-2 text-lg font-semibold px-4 py-1">500 Kč/měs</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RadioGroupItem
              value="hot"
              id="hot"
              className="sr-only"
            />
            <Label htmlFor="hot" className="cursor-pointer">
              <ul className="space-y-4">
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-red-500" />
                  TOP pozice v seznamu
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-red-500" />
                  Maximální viditelnost
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-red-500" />
                  Přednostní zobrazení před všemi
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-5 w-5 mr-2 text-red-500" />
                  Speciální zvýraznění
                </li>
              </ul>
            </Label>
          </CardContent>
        </Card>
      </RadioGroup>

      <Button 
        onClick={handleSubscribe} 
        disabled={isLoading}
        className="w-full max-w-md mx-auto block mt-12 text-lg py-6"
        size="lg"
      >
        {isLoading ? "Zpracování..." : "Pokračovat k platbě"}
      </Button>
    </div>
  );
};