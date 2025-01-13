import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PropertyImageGalleryProps {
  images: string[];
  currentIndex: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const PropertyImageGallery = ({
  images,
  currentIndex,
  onPrevious,
  onNext
}: PropertyImageGalleryProps) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`Obrázek ${currentIndex + 1}`}
        className="w-full h-[300px] object-cover"
      />
      {images.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onPrevious();
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              onNext();
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
};