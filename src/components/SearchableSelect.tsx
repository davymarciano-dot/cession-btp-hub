import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

// Data des secteurs BTP
const btpSecteurs = [
  // ÉLECTRICITÉ
  { value: "electricien-installation", label: "Électricien d'installation du bâtiment", category: "ÉLECTRICITÉ" },
  { value: "electricien-equipement", label: "Électricien d'équipement", category: "ÉLECTRICITÉ" },
  { value: "electricien-piscines", label: "Électricien de piscines", category: "ÉLECTRICITÉ" },
  { value: "plombier", label: "Plombier", category: "PLOMBERIE" },
  { value: "plombier-chauffagiste", label: "Plombier-chauffagiste", category: "PLOMBERIE" },
  { value: "chauffagiste", label: "Chauffagiste", category: "CHAUFFAGE" },
  { value: "installateur-chauffage", label: "Installateur en chauffage", category: "CHAUFFAGE" },
  { value: "climaticien", label: "Climaticien", category: "CLIMATISATION" },
  { value: "installateur-climatisation", label: "Installateur de climatisation", category: "CLIMATISATION" },
  { value: "macon", label: "Maçon", category: "MAÇONNERIE" },
  { value: "macon-vrd", label: "Maçon VRD", category: "MAÇONNERIE" },
  { value: "menuisier", label: "Menuisier", category: "MENUISERIE" },
  { value: "menuisier-poseur", label: "Menuisier poseur", category: "MENUISERIE" },
  { value: "couvreur", label: "Couvreur", category: "COUVERTURE" },
  { value: "couvreur-zingueur", label: "Couvreur-zingueur", category: "COUVERTURE" },
  { value: "peintre", label: "Peintre en bâtiment", category: "PEINTURE" },
  { value: "platrier", label: "Plâtrier", category: "PLÂTRERIE" },
  { value: "carreleur", label: "Carreleur", category: "CARRELAGE" },
  { value: "parqueteur", label: "Parqueteur", category: "SOL" },
  { value: "terrassier", label: "Terrassier", category: "TERRASSEMENT" },
];

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableSelect = ({ value, onValueChange, placeholder, className }: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
        >
          {value
            ? btpSecteurs.find((secteur) => secteur.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 z-50 bg-popover" align="start">
        <Command className="bg-popover">
          <CommandInput placeholder="Rechercher un secteur..." className="bg-background" />
          <CommandEmpty>Aucun secteur trouvé.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-y-auto bg-popover">
            {btpSecteurs.map((secteur) => (
              <CommandItem
                key={secteur.value}
                value={secteur.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === secteur.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {secteur.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
