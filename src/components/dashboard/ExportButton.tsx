import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ReportGenerator } from '@/services/reportGenerator';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportButtonProps {
  listingId?: string;
  userId?: string;
}

export const ExportButton = ({ listingId, userId }: ExportButtonProps) => {
  const [exporting, setExporting] = useState(false);
  
  const handleExport = async (type: string) => {
    setExporting(true);
    
    try {
      if (type === 'pdf' && listingId) {
        await ReportGenerator.generateSellerReport(listingId);
      } else if (type === 'all' && userId) {
        await ReportGenerator.exportAllData(userId);
      }
      
      toast.success('Export réussi !');
    } catch (error) {
      toast.error('Erreur lors de l\'export');
    }
    
    setExporting(false);
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={exporting}>
          <span className="mr-2">📥</span>
          {exporting ? 'Export...' : 'Exporter'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          📄 Rapport PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('all')}>
          💾 Toutes les données
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
