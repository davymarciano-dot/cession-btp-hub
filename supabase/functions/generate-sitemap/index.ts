import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Métiers BTP
const metiersSlugs = [
  'plomberie', 'electricite', 'maconnerie', 'chauffage', 'climatisation',
  'charpente', 'couverture', 'menuiserie', 'peinture', 'carrelage',
  'platrerie', 'isolation', 'ravalement', 'terrassement', 'vrd',
  'serrurerie', 'metallerie', 'vitrerie', 'parqueteur', 'sols-souples'
];

// Grandes villes françaises pour pages dédiées
const villesSlugs = [
  'paris', 'marseille', 'lyon', 'toulouse', 'nice',
  'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille',
  'rennes', 'reims', 'saint-etienne', 'toulon', 'grenoble',
  'dijon', 'angers', 'nimes', 'villeurbanne', 'clermont-ferrand'
];

const regionsSlugs = [
  'ile-de-france', 'auvergne-rhone-alpes', 'nouvelle-aquitaine',
  'occitanie', 'provence-alpes-cote-dazur', 'grand-est',
  'hauts-de-france', 'normandie', 'bretagne', 'pays-de-la-loire'
];

const certificationsSlugs = ['rge', 'qualibat', 'qualipv', 'qualipac'];
const energiesSlugs = ['solaire-photovoltaique', 'pompe-a-chaleur', 'isolation-thermique'];

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('🚀 Starting sitemap generation...');
    
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const baseUrl = "https://cessionbtp.fr";
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = [
      { url: "/", changefreq: "daily", priority: "1.0" },
      { url: "/vendre", changefreq: "weekly", priority: "0.9" },
      { url: "/acheter", changefreq: "daily", priority: "0.9" },
      { url: "/entreprises", changefreq: "daily", priority: "0.9" },
      { url: "/entreprises-rge", changefreq: "weekly", priority: "0.8" },
      { url: "/pricing", changefreq: "weekly", priority: "0.8" },
      { url: "/tarifs", changefreq: "weekly", priority: "0.8" },
      { url: "/estimer", changefreq: "monthly", priority: "0.7" },
      { url: "/faq", changefreq: "monthly", priority: "0.6" },
      { url: "/ressources", changefreq: "weekly", priority: "0.7" },
      { url: "/outils-gratuits", changefreq: "monthly", priority: "0.7" },
      { url: "/roadmap", changefreq: "monthly", priority: "0.5" },
      { url: "/blog", changefreq: "weekly", priority: "0.7" },
    ];

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

    let urlCount = 0;

    // Add static pages
    staticPages.forEach((page) => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
      urlCount++;
    });

    // Fetch published listings
    const { data: listings, error } = await supabase
      .from("annonces")
      .select("id, updated_at")
      .eq("statut", "publiee")
      .order("updated_at", { ascending: false })
      .limit(500);
    if (error) {
      console.error("Error fetching listings:", error);
    }

    // Add dynamic listing pages
    if (listings && listings.length > 0) {
      listings.forEach((listing) => {
        sitemap += `
  <url>
    <loc>${baseUrl}/entreprises/${listing.id}</loc>
    <lastmod>${new Date(listing.updated_at).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        urlCount++;
      });
    }

    console.log('📄 Adding SEO pages...');

    // Add SEO pages - Pages villes dédiées
    villesSlugs.forEach((ville) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/entreprises-btp-a-vendre-${ville}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      urlCount++;
    });

    // Add SEO pages - Énergies renouvelables
    energiesSlugs.forEach((energie) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/entreprise-${energie}-a-vendre</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>`;
      urlCount++;
    });

    // Add SEO pages - Métiers
    metiersSlugs.forEach((metier) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/entreprise-${metier}-a-vendre</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
      urlCount++;
    });

    // Add SEO pages - Métiers + Villes
    metiersSlugs.slice(0, 10).forEach((metier) => {
      villesSlugs.forEach((ville) => {
        sitemap += `
  <url>
    <loc>${baseUrl}/entreprise-${metier}-${ville}-a-vendre</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        urlCount++;
      });
    });

    // Add SEO pages - Certifications
    certificationsSlugs.forEach((cert) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/entreprise-${cert}-a-vendre</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;
      urlCount++;
    });

    // Add SEO pages - Régions
    regionsSlugs.forEach((region) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/entreprise-btp-a-vendre-${region}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
      urlCount++;
    });

    // Add SEO pages - Vendeur intent
    metiersSlugs.slice(0, 10).forEach((metier) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/vendre-entreprise-${metier}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      urlCount++;
    });

    sitemap += `
</urlset>`;

    console.log(`✅ Sitemap generated with ${urlCount} URLs`);
    console.log(`   - Static: ${staticPages.length}`);
    console.log(`   - Listings: ${listings?.length || 0}`);
    console.log(`   - SEO: ${urlCount - staticPages.length - (listings?.length || 0)}`);

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error generating sitemap:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
