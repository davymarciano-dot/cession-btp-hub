import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { OptimizedImage } from "@/components/OptimizedImage";

interface PhotoGalleryProps {
  photos: string[];
  title?: string;
}

const PhotoGallery = ({ photos, title = "Galerie photos" }: PhotoGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <>
      {/* Grid de miniatures */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="relative cursor-pointer group overflow-hidden rounded-lg"
            onClick={() => setSelectedIndex(index)}
          >
            <OptimizedImage
              src={photo}
              alt={`Photo ${index + 1}`}
              aspectRatio="square"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* Modal avec carousel */}
      <Dialog open={selectedIndex !== null} onOpenChange={() => setSelectedIndex(null)}>
        <DialogContent className="max-w-5xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{title}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {selectedIndex !== null ? selectedIndex + 1 : 0} / {photos.length}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="relative flex-1 flex items-center justify-center p-6">
            {selectedIndex !== null && (
              <>
                <img
                  src={photos[selectedIndex]}
                  alt={`Photo ${selectedIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />

                {/* Navigation buttons */}
                {selectedIndex > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => setSelectedIndex(selectedIndex - 1)}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                )}
                
                {selectedIndex < photos.length - 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => setSelectedIndex(selectedIndex + 1)}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Miniatures en bas */}
          <div className="p-6 pt-0">
            <Carousel className="w-full">
              <CarouselContent>
                {photos.map((photo, index) => (
                  <CarouselItem key={index} className="basis-1/6">
                    <div
                      className={`relative cursor-pointer rounded-md overflow-hidden ${
                        selectedIndex === index ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <OptimizedImage
                        src={photo}
                        alt={`Miniature ${index + 1}`}
                        aspectRatio="square"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PhotoGallery;
