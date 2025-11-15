import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    const baseUrl = "https://cession-btp-hub.lovable.app";
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
    ];

    // Fetch published listings
    const { data: listings, error } = await supabase
      .from("annonces")
      .select("id, updated_at")
      .eq("statut", "publiee")
      .order("updated_at", { ascending: false })
      .limit(1000);

    if (error) {
      console.error("Error fetching listings:", error);
    }

    // Generate sitemap XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static pages
    staticPages.forEach((page) => {
      sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    });

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
      });
    }

    sitemap += `
</urlset>`;

    console.log(`Generated sitemap with ${staticPages.length + (listings?.length || 0)} URLs`);

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
