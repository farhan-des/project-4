import { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages, getStoredLanguage, setStoredLanguage, type Language } from "@/lib/i18n";

export default function Footer() {
  const [language, setLanguage] = useState<Language>(getStoredLanguage());

  useEffect(() => {
    setStoredLanguage(language);
  }, [language]);

  return (
    <footer className="border-t mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Site Info */}
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p>Calculator Tools - Calculators, tools, generators, resources.</p>
          </div>

          {/* Language Selector */}
          <div className="flex items-center gap-3">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <div className="flex items-center gap-2">
              <Label htmlFor="language-select" className="text-sm font-medium">
                Language:
              </Label>
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger 
                  id="language-select" 
                  className="w-[180px]"
                  data-testid="select-language"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem 
                      key={lang.code} 
                      value={lang.code}
                      data-testid={`option-language-${lang.code}`}
                    >
                      {lang.nativeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
