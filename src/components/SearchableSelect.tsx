import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { BTPMetiersSelect } from "@/data/btp-metiers";

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchableSelect = ({ value, onValueChange, placeholder, className }: SearchableSelectProps) => {
  const [search, setSearch] = useState("");

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[400px]">
        <div className="sticky top-0 z-10 bg-background p-2 border-b">
          <Input
            placeholder="Rechercher un secteur..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
        <div className="overflow-y-auto max-h-[340px]">
          <FilteredBTPMetiers search={search} />
        </div>
      </SelectContent>
    </Select>
  );
};

const FilteredBTPMetiers = ({ search }: { search: string }) => {
  // Get all items from BTPMetiersSelect
  const allItems = useMemo(() => {
    const items: Array<{ value: string; label: string; disabled?: boolean }> = [];
    const extractItems = (element: any): void => {
      if (!element) return;
      
      if (Array.isArray(element)) {
        element.forEach(extractItems);
      } else if (element.type === SelectItem) {
        items.push({
          value: element.props.value,
          label: element.props.children,
          disabled: element.props.disabled
        });
      } else if (element.props?.children) {
        if (Array.isArray(element.props.children)) {
          element.props.children.forEach(extractItems);
        } else {
          extractItems(element.props.children);
        }
      }
    };
    
    const btpElement = <BTPMetiersSelect />;
    extractItems(btpElement);
    return items;
  }, []);

  const filteredItems = useMemo(() => {
    if (!search.trim()) return allItems;
    
    const searchLower = search.toLowerCase();
    return allItems.filter(item => 
      !item.disabled && item.label.toLowerCase().includes(searchLower)
    );
  }, [search, allItems]);

  if (filteredItems.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground text-sm">
        Aucun secteur trouvé
      </div>
    );
  }

  return (
    <>
      {filteredItems.map(item => (
        <SelectItem key={item.value} value={item.value} disabled={item.disabled}>
          {item.label}
        </SelectItem>
      ))}
    </>
  );
};
