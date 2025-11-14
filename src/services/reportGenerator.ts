import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { supabase } from '@/integrations/supabase/client';

export class ReportGenerator {
  static async generateSellerReport(listingId: string) {
    const doc = new jsPDF();
    const data = await this.gatherReportData(listingId);
    
    // En-tête
    doc.setFillColor(59, 130, 246);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text('Rapport de Performance', 20, 25);
    
    // Période
    doc.setFontSize(12);
    doc.text(`Période: ${data.startDate} - ${data.endDate}`, 20, 35);
    
    // Reset colors
    doc.setTextColor(0, 0, 0);
    
    // Statistiques clés
    doc.setFontSize(16);
    doc.text('Statistiques Clés', 20, 60);
    
    (doc as any).autoTable({
      startY: 70,
      head: [['Métrique', 'Valeur', 'Évolution']],
      body: [
        ['Vues totales', data.views, `+${data.viewsChange}%`],
        ['Contacts', data.contacts, `+${data.contactsChange}%`],
        ['Taux de conversion', `${data.conversionRate}%`, `+${data.conversionChange}%`],
        ['Position moyenne', data.avgPosition, data.positionChange]
      ]
    });
    
    doc.save(`rapport-${listingId}-${Date.now()}.pdf`);
  }

  static async gatherReportData(listingId: string) {
    const { data: listing } = await supabase
      .from('annonces')
      .select('*')
      .eq('id', listingId)
      .single();

    const { data: views } = await supabase
      .from('listings_views_tracking')
      .select('*')
      .eq('listing_id', listingId);

    return {
      startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
      views: views?.length || 0,
      viewsChange: 15,
      contacts: 12,
      contactsChange: 20,
      conversionRate: 5.2,
      conversionChange: 1.3,
      avgPosition: 3,
      positionChange: '-1'
    };
  }
  
  static async exportAllData(userId: string) {
    const { data: user } = await supabase.auth.getUser();
    if (!user) return;

    const zip = new JSZip();
    
    const { data: listings } = await supabase
      .from('annonces')
      .select('*')
      .eq('user_id', userId);

    zip.file('listings.json', JSON.stringify(listings, null, 2));
    
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, `export-cessionbtp-${Date.now()}.zip`);
  }
}
