import { useState } from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { secteursBTP, getCategories, getSecteursByCategory } from "@/data/secteurs-btp";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableSelect = ({ value, onValueChange, placeholder, className }: SearchableSelectProps) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  
  const categories = getCategories();
  
  // Filtrer les secteurs selon la recherche
  const filteredSecteurs = search
    ? secteursBTP.filter(s => 
        s.label.toLowerCase().includes(search.toLowerCase()) ||
        s.value.toLowerCase().includes(search.toLowerCase()) ||
        s.aliases?.some(alias => alias.toLowerCase().includes(search.toLowerCase()))
      )
    : secteursBTP;

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
            ? secteursBTP.find((secteur) => secteur.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 z-50 bg-popover" align="start">
        <Command className="bg-popover" shouldFilter={false}>
          <CommandInput 
            placeholder="Rechercher un métier BTP..." 
            className="bg-background"
            value={search}
            onValueChange={setSearch}
          />
          <CommandEmpty>Aucun métier trouvé.</CommandEmpty>
          <div className="max-h-[400px] overflow-y-auto bg-popover">
            {search ? (
              // Mode recherche : afficher tous les résultats sans groupement
              <CommandGroup>
                {filteredSecteurs.map((secteur) => (
                  <CommandItem
                    key={secteur.value}
                    value={secteur.value}
                    onSelect={(currentValue) => {
                      onValueChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setSearch("");
                    }}
                    keywords={[secteur.label, secteur.value, ...(secteur.aliases || [])]}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === secteur.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="flex flex-col">
                      <span>{secteur.label}</span>
                      <span className="text-xs text-muted-foreground">{secteur.category}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              // Mode normal : afficher par catégories
              categories.map((category) => {
                const secteursInCategory = getSecteursByCategory(category);
                return (
                  <CommandGroup key={category} heading={category}>
                    {secteursInCategory.map((secteur) => (
                      <CommandItem
                        key={secteur.value}
                        value={secteur.value}
                        onSelect={(currentValue) => {
                          onValueChange(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                        keywords={[secteur.label, secteur.value, ...(secteur.aliases || [])]}
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
                );
              })
            )}
          </div>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
