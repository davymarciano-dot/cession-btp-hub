import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface MultiSelectProps {
  label: string;
  options: { value: string; label: string }[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
}

export const MultiSelect = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Sélectionner...",
}: MultiSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue));
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            <span className="truncate">
              {value.length > 0 ? `${value.length} sélectionné(s)` : placeholder}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder={`Rechercher ${label.toLowerCase()}...`} />
            <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(option.value) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((val) => {
            const option = options.find((opt) => opt.value === val);
            return (
              <Badge key={val} variant="secondary" className="gap-1">
                {option?.label || val}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemove(val)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
};