import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ImagePlus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ImageUploadSectionProps {
  imageUrls: string[];
  onImagesChange: (urls: string[]) => void;
}

export const ImageUploadSection = ({ imageUrls, onImagesChange }: ImageUploadSectionProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Musíte vybrat obrázek k nahrání.");
      }

      setIsUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("property-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("property-images")
        .getPublicUrl(fileName);

      onImagesChange([...imageUrls, publicUrl]);
      toast({
        title: "Úspěch",
        description: "Obrázek byl úspěšně nahrán",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "Chyba",
        description: "Nepodařilo se nahrát obrázek",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    onImagesChange(imageUrls.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <Label className="text-lg font-medium text-gray-700">Fotografie nemovitosti (minimálně 2)</Label>
      <div className="flex flex-wrap gap-4">
        {imageUrls.map((url, index) => (
          <div key={url} className="relative group animate-fade-in">
            <img
              src={url}
              alt={`Náhled nemovitosti ${index + 1}`}
              className="w-24 h-24 object-cover rounded-lg shadow-md group-hover:shadow-lg transition-all duration-200"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              onClick={() => removeImage(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          className="relative h-24 w-24 border-2 border-dashed border-purple-200 hover:border-primary/50 transition-colors duration-200 bg-white/50 hover:bg-white/80"
          disabled={isUploading}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />
          <ImagePlus className="h-6 w-6 text-gray-400" />
        </Button>
      </div>
    </div>
  );
};