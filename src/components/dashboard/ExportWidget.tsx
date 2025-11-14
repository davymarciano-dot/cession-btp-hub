import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExportWidgetProps {
  dashboardData: {
    totalViews: number;
    uniqueVisitors: number;
    contactsReceived: number;
    conversionRate: string;
    searchRanking: number;
    viewsChange: string;
    visitorsChange: string;
    contactsChange: string;
  };
  companyName?: string;
}

export const ExportWidget = ({ dashboardData, companyName = "Mon Entreprise" }: ExportWidgetProps) => {
  const { toast } = useToast();

  const generatePDF = async () => {
    try {
      toast({
        title: "Génération en cours...",
        description: "Votre rapport PDF est en cours de création.",
      });

      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;

      // En-tête
      pdf.setFontSize(24);
      pdf.setTextColor(37, 99, 235); // Bleu
      pdf.text('Rapport CessionBTP', margin, margin);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`${companyName}`, margin, margin + 10);
      pdf.text(`Généré le ${new Date().toLocaleDateString('fr-FR', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      })}`, margin, margin + 17);

      // Ligne de séparation
      pdf.setDrawColor(220, 220, 220);
      pdf.line(margin, margin + 22, pageWidth - margin, margin + 22);

      // Métriques principales
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text('Performances', margin, margin + 35);

      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      
      let yPos = margin + 47;
      const metrics = [
        { label: 'Vues totales', value: dashboardData.totalViews.toString(), change: dashboardData.viewsChange },
        { label: 'Visiteurs uniques', value: dashboardData.uniqueVisitors.toString(), change: dashboardData.visitorsChange },
        { label: 'Contacts reçus', value: dashboardData.contactsReceived.toString(), change: dashboardData.contactsChange },
        { label: 'Taux de conversion', value: dashboardData.conversionRate, change: '' },
        { label: 'Position recherche', value: `#${dashboardData.searchRanking}`, change: '' },
      ];

      metrics.forEach(metric => {
        pdf.setFont('helvetica', 'bold');
        pdf.text(metric.label, margin, yPos);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`: ${metric.value}`, margin + 50, yPos);
        if (metric.change) {
          const isPositive = metric.change.startsWith('+');
          pdf.setTextColor(isPositive ? 34 : 239, isPositive ? 197 : 68, isPositive ? 94 : 68);
          pdf.text(`(${metric.change})`, margin + 80, yPos);
          pdf.setTextColor(60, 60, 60);
        }
        yPos += 10;
      });

      // Capture du graphique si présent
      const chartElement = document.querySelector('.recharts-wrapper');
      if (chartElement) {
        try {
          const canvas = await html2canvas(chartElement as HTMLElement, {
            backgroundColor: '#ffffff',
            scale: 2,
          });
          const imgData = canvas.toDataURL('image/png');
          
          pdf.addPage();
          pdf.setFontSize(16);
          pdf.setTextColor(0, 0, 0);
          pdf.text('Évolution des vues (30 derniers jours)', margin, margin);
          
          const imgWidth = pageWidth - (2 * margin);
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, 'PNG', margin, margin + 10, imgWidth, Math.min(imgHeight, 150));
        } catch (error) {
          console.error('Error capturing chart:', error);
        }
      }

      // Pied de page
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(9);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          `Page ${i} sur ${totalPages} • CessionBTP.fr`,
          pageWidth / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }

      // Télécharger
      const fileName = `rapport-cessionbtp-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

      toast({
        title: "Rapport généré !",
        description: "Votre rapport PDF a été téléchargé avec succès.",
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la génération du PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Button
        onClick={generatePDF}
        className="w-full flex items-center justify-center gap-2"
        size="lg"
      >
        <Download className="w-5 h-5" />
        Télécharger le rapport PDF
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        size="lg"
        onClick={() => {
          toast({
            title: "Fonctionnalité à venir",
            description: "L'envoi par email sera bientôt disponible.",
          });
        }}
      >
        <FileText className="w-5 h-5" />
        Envoyer à un contact
      </Button>
      
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
        size="lg"
        onClick={() => {
          toast({
            title: "Fonctionnalité à venir",
            description: "Le boost d'annonce sera bientôt disponible.",
          });
        }}
      >
        🚀 Booster mon annonce
      </Button>
    </div>
  );
};
