import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages: { value: Language; label: string; flag: string }[] = [
  { value: 'fr', label: 'Français', flag: '🇫🇷' },
  { value: 'en', label: 'English', flag: '🇬🇧' },
];

interface LanguageSelectorProps {
  variant?: 'default' | 'footer';
}

const LanguageSelector = ({ variant = 'default' }: LanguageSelectorProps) => {
  const { language, setLanguage, t } = useLanguage();

  const currentLanguage = languages.find(l => l.value === language);

  if (variant === 'footer') {
    return (
      <div className="flex items-center gap-3">
        <Globe className="w-5 h-5 text-white/70" />
        <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
          <SelectTrigger className="w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/20 transition-colors">
            <SelectValue>
              <span className="flex items-center gap-2">
                <span>{currentLanguage?.flag}</span>
                <span>{currentLanguage?.label}</span>
              </span>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-[hsl(214,56%,15%)] border-white/20">
            {languages.map((lang) => (
              <SelectItem 
                key={lang.value} 
                value={lang.value}
                className="text-white hover:bg-white/10 focus:bg-white/10 focus:text-white cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  return (
    <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
      <SelectTrigger className="w-[120px] bg-transparent border-border">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>{currentLanguage?.flag}</span>
            <span className="text-sm">{currentLanguage?.label}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
