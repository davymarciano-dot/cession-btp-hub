import { supabase } from '@/integrations/supabase/client';

export async function checkSupabaseConnection() {
  console.log('🔍 Checking Supabase connection...');
  
  try {
    // Test 1: Count annonces
    const { count, error: countError } = await supabase
      .from('annonces')
      .select('*', { count: 'exact', head: true });
    
    if (countError) {
      console.error('❌ Database error:', countError);
      return false;
    }
    
    console.log(`📊 Total annonces: ${count || 0}`);
    
    // Test 2: Fetch sample data
    const { data: annonces, error: listError } = await supabase
      .from('annonces')
      .select('id, raison_sociale, prix_vente, statut, secteur_activite')
      .eq('statut', 'publiee')
      .limit(5);
    
    if (listError) {
      console.error('❌ Query error:', listError);
      return false;
    }
    
    if (annonces && annonces.length > 0) {
      console.log('✅ Sample annonces:', annonces);
    } else {
      console.warn('⚠️ No published annonces found');
    }
    
    // Test 3: Check auth
    const { data: { user } } = await supabase.auth.getUser();
    console.log(`👤 User: ${user?.email || 'Anonymous'}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
}
