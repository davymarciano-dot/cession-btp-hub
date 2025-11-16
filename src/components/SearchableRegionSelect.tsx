import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Region {
  value: string;
  label: string;
}

const regions: Region[] = [
  { value: "auvergne-rhone-alpes", label: "Auvergne-Rhône-Alpes" },
  { value: "bourgogne-franche-comte", label: "Bourgogne-Franche-Comté" },
  { value: "bretagne", label: "Bretagne" },
  { value: "centre-val-de-loire", label: "Centre-Val de Loire" },
  { value: "corse", label: "Corse" },
  { value: "grand-est", label: "Grand Est" },
  { value: "hauts-de-france", label: "Hauts-de-France" },
  { value: "ile-de-france", label: "Île-de-France" },
  { value: "normandie", label: "Normandie" },
  { value: "nouvelle-aquitaine", label: "Nouvelle-Aquitaine" },
  { value: "occitanie", label: "Occitanie" },
  { value: "pays-de-la-loire", label: "Pays de la Loire" },
  { value: "provence-alpes-cote-azur", label: "Provence-Alpes-Côte d'Azur" },
  { value: "guadeloupe", label: "Guadeloupe" },
  { value: "martinique", label: "Martinique" },
  { value: "guyane", label: "Guyane" },
  { value: "la-reunion", label: "La Réunion" },
  { value: "mayotte", label: "Mayotte" },
];

interface SearchableRegionSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableRegionSelect = ({ value, onValueChange, placeholder, className }: SearchableRegionSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  // Filtrer les régions selon la recherche
  const filteredRegions = search
    ? regions.filter(r => 
        r.label.toLowerCase().includes(search.toLowerCase()) ||
        r.value.toLowerCase().includes(search.toLowerCase())
      )
    : regions;

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
            ? regions.find((region) => region.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 z-50 bg-popover" align="start">
        <Command className="bg-popover" shouldFilter={false}>
          <CommandInput 
            placeholder="Rechercher une région..." 
            className="bg-background"
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Aucune région trouvée.</CommandEmpty>
          <div className="max-h-[400px] overflow-y-auto bg-popover">
            <CommandGroup>
              {filteredRegions.map((region) => (
                <CommandItem
                  key={region.value}
                  value={region.value}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === region.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {region.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
