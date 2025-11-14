import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ArrowLeftRight, Check, Minus } from "lucide-react";

interface Company {
  id: string;
  raison_sociale: string;
  secteur_activite: string;
  departement: string;
  prix_vente: number;
  nombre_salaries: number;
  ca_n1: number;
  certifications?: string[];
  annee_creation: number;
  nombre_vues: number;
}

interface CompanyComparatorProps {
  companies: Company[];
  onClose: () => void;
}

export const CompanyComparator = ({ companies, onClose }: CompanyComparatorProps) => {
  if (companies.length < 2) {
    return null;
  }

  const criteriaRows = [
    { 
      label: "Prix de vente", 
      getValue: (c: Company) => `${c.prix_vente.toLocaleString()}€`,
      compareValue: (c: Company) => c.prix_vente
    },
    { 
      label: "Chiffre d'affaires", 
      getValue: (c: Company) => `${c.ca_n1.toLocaleString()}€`,
      compareValue: (c: Company) => c.ca_n1
    },
    { 
      label: "Nombre de salariés", 
      getValue: (c: Company) => c.nombre_salaries.toString(),
      compareValue: (c: Company) => c.nombre_salaries
    },
    { 
      label: "Secteur d'activité", 
      getValue: (c: Company) => c.secteur_activite,
      isText: true
    },
    { 
      label: "Département", 
      getValue: (c: Company) => c.departement,
      isText: true
    },
    { 
      label: "Année de création", 
      getValue: (c: Company) => c.annee_creation.toString(),
      compareValue: (c: Company) => c.annee_creation,
      lowerIsBetter: true
    },
    { 
      label: "Certifications", 
      getValue: (c: Company) => c.certifications?.length ? c.certifications.join(", ") : "Aucune",
      isText: true
    },
    { 
      label: "Popularité (vues)", 
      getValue: (c: Company) => c.nombre_vues.toString(),
      compareValue: (c: Company) => c.nombre_vues
    },
  ];

  const getBestValue = (criterion: any) => {
    if (criterion.isText || !criterion.compareValue) return null;
    
    const values = companies.map((c) => criterion.compareValue(c));
    return criterion.lowerIsBetter ? Math.min(...values) : Math.max(...values);
  };

  const isBestValue = (company: Company, criterion: any) => {
    if (criterion.isText || !criterion.compareValue) return false;
    
    const bestValue = getBestValue(criterion);
    return criterion.compareValue(company) === bestValue;
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <ArrowLeftRight className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Comparaison des entreprises</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="p-4 text-left font-semibold sticky left-0 bg-muted/50 z-10 min-w-[200px]">
                      Critère
                    </th>
                    {companies.map((company, idx) => (
                      <th key={company.id} className="p-4 text-center font-semibold min-w-[250px]">
                        <div className="space-y-2">
                          <div className="font-bold text-lg">{company.raison_sociale}</div>
                          <Badge variant="secondary">{company.secteur_activite}</Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteriaRows.map((criterion, idx) => (
                    <tr key={idx} className="border-b hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium sticky left-0 bg-background z-10">
                        {criterion.label}
                      </td>
                      {companies.map((company) => {
                        const isBest = isBestValue(company, criterion);
                        return (
                          <td key={company.id} className="p-4 text-center">
                            <div className={`flex items-center justify-center gap-2 ${
                              isBest ? 'text-green-600 dark:text-green-400 font-semibold' : ''
                            }`}>
                              {isBest && !criterion.isText && (
                                <Check className="w-4 h-4" />
                              )}
                              <span>{criterion.getValue(company)}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-center">
          <Button onClick={onClose} size="lg">
            Fermer la comparaison
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ComparisonBarProps {
  selectedCompanies: Company[];
  onCompare: () => void;
  onRemove: (id: string) => void;
}

export const ComparisonBar = ({ selectedCompanies, onCompare, onRemove }: ComparisonBarProps) => {
  if (selectedCompanies.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-lg z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-semibold">
              {selectedCompanies.length}/3 entreprises sélectionnées
            </span>
            <div className="flex gap-2">
              {selectedCompanies.map((company) => (
                <Badge key={company.id} variant="secondary" className="flex items-center gap-2">
                  {company.raison_sociale}
                  <button
                    onClick={() => onRemove(company.id)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
          
          <Button
            onClick={onCompare}
            disabled={selectedCompanies.length < 2}
            size="lg"
            className="gap-2"
          >
            <ArrowLeftRight className="w-4 h-4" />
            Comparer ({selectedCompanies.length})
          </Button>
        </div>
      </div>
    </div>
  );
};
