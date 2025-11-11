import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Camera } from "lucide-react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FormSection12Props {
  formData: any;
  handleInputChange: (field: string, value: any) => void;
}

const FormSection12 = ({ formData, handleInputChange }: FormSection12Props) => {
  const { uploadFile, uploading } = useFileUpload();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const currentPhotos = formData[field] || [];
    if (currentPhotos.length + files.length > 10) {
      alert("Vous ne pouvez pas uploader plus de 10 photos au total");
      return;
    }

    const uploadedUrls: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const url = await uploadFile(files[i], "company-listings");
      if (url) {
        uploadedUrls.push(url);
      }
    }

    handleInputChange(field, [...currentPhotos, ...uploadedUrls]);
  };

  const removePhoto = (field: string, index: number) => {
    const currentPhotos = formData[field] || [];
    handleInputChange(field, currentPhotos.filter((_: any, i: number) => i !== index));
  };

  const renderPhotoSection = (field: string, label: string, description: string) => (
    <div className="space-y-3">
      <div>
        <Label htmlFor={field}>{label}</Label>
        <p className="text-sm text-muted-foreground mb-2">{description}</p>
        <Input
          id={field}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => handleFileUpload(e, field)}
          disabled={uploading}
          className="cursor-pointer"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Maximum 10 photos • JPG, PNG ou WEBP • Max 5 Mo par photo
        </p>
      </div>

      {formData[field] && formData[field].length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData[field].map((url: string, index: number) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Photo ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg border"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removePhoto(field, index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Camera className="w-8 h-8 text-primary" />
        <h2 className="text-2xl font-bold">Photos & Médias</h2>
      </div>

      <div className="space-y-6">
        {renderPhotoSection(
          "photosEntreprise",
          "Photos de l'entreprise / Locaux",
          "Façade, bureaux, zones de travail..."
        )}

        {renderPhotoSection(
          "photosMateriel",
          "Photos du matériel et véhicules",
          "Équipements, véhicules, machines..."
        )}

        {renderPhotoSection(
          "photosRealisations",
          "Photos de réalisations",
          "Exemples de chantiers réalisés..."
        )}

        <div className="border-t pt-6">
          <Label htmlFor="videoPresentation">Vidéo de présentation (optionnel)</Label>
          <Input
            id="videoPresentation"
            type="url"
            value={formData.videoPresentation}
            onChange={(e) => handleInputChange("videoPresentation", e.target.value)}
            placeholder="https://youtube.com/... ou https://vimeo.com/..."
          />
          <p className="text-sm text-muted-foreground mt-1">
            Lien YouTube ou Vimeo uniquement
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
        <p className="text-sm text-blue-900">
          <strong>💡 Conseil :</strong> Les annonces avec photos obtiennent 3x plus de contacts. 
          Privilégiez des photos de qualité et bien cadrées.
        </p>
      </div>
    </div>
  );
};

export default FormSection12;