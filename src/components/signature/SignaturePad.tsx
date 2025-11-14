import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import SignatureCanvas from 'signature_pad';

interface SignaturePadProps {
  onSign: (signatureData: string) => void;
}

export const SignaturePad = ({ onSign }: SignaturePadProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignatureCanvas | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const pad = new SignatureCanvas(canvasRef.current);
      setSignaturePad(pad);
    }
  }, []);

  const clearSignature = () => {
    signaturePad?.clear();
  };

  const saveSignature = () => {
    if (signaturePad?.isEmpty()) {
      alert('Veuillez signer d\'abord');
      return;
    }
    const data = signaturePad?.toDataURL();
    if (data) onSign(data);
  };

  return (
    <div className="bg-background rounded-lg shadow-lg p-6 border">
      <h3 className="text-xl font-bold mb-4">✍️ Signature Électronique</h3>
      
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="border-2 border-border rounded-lg cursor-crosshair w-full"
      />
      
      <div className="mt-4 flex justify-between">
        <Button 
          variant="outline"
          onClick={clearSignature}
        >
          Effacer
        </Button>
        
        <Button
          onClick={saveSignature}
          className="bg-green-600 hover:bg-green-700"
        >
          Signer le document
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground mt-4">
        En signant, vous acceptez que cette signature électronique ait la même valeur légale qu'une signature manuscrite.
      </p>
    </div>
  );
};
