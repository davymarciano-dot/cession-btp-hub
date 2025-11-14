import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { FloatingChatWidget } from "@/components/chat/FloatingChatWidget";
import { ThirdPartyChat } from "@/components/chat/ThirdPartyChat";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load heavy pages
const Vendre = lazy(() => import("./pages/Vendre"));
const Acheter = lazy(() => import("./pages/Acheter"));
const Entreprises = lazy(() => import("./pages/Entreprises"));
const Estimer = lazy(() => import("./pages/Estimer"));
const Estimation = lazy(() => import("./pages/Estimation"));
const ResultatEstimation = lazy(() => import("./pages/ResultatEstimation"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const VendorDashboard = lazy(() => import("./pages/VendorDashboard"));
const AnnonceDetail = lazy(() => import("./pages/AnnonceDetail"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Ressources = lazy(() => import("./pages/Ressources"));
const Messages = lazy(() => import("./pages/Messages"));
const ChatDemo = lazy(() => import("./pages/ChatDemo"));
const PerformanceDemo = lazy(() => import("./pages/PerformanceDemo"));
const MyMatches = lazy(() => import("./pages/MyMatches"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const SeoStats = lazy(() => import("./pages/SeoStats"));
const CertificationPage = lazy(() => import("./pages/seo/CertificationPage"));
const MetierPage = lazy(() => import("./pages/seo/MetierPage"));
const RegionPage = lazy(() => import("./pages/seo/RegionPage"));
const SellerKeywordPage = lazy(() => import("./pages/seo/SellerKeywordPage"));
const BuyerKeywordPage = lazy(() => import("./pages/seo/BuyerKeywordPage"));
const RenewableEnergyPage = lazy(() => import("./pages/seo/RenewableEnergyPage").then(module => ({ default: module.RenewableEnergyPage })));
const BacklinksManager = lazy(() => import("./pages/BacklinksManager").then(module => ({ default: module.BacklinksManager })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md px-4">
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vendre" element={<Vendre />} />
            <Route path="/acheter" element={<Acheter />} />
            <Route path="/entreprises" element={<Entreprises />} />
            <Route path="/entreprises/:id" element={<AnnonceDetail />} />
            <Route path="/estimer" element={<Estimation />} />
            <Route path="/resultat-estimation" element={<ResultatEstimation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-vendeur" element={<VendorDashboard />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat-demo" element={<ChatDemo />} />
            <Route path="/performance-demo" element={<PerformanceDemo />} />
            <Route path="/mes-matchs" element={<MyMatches />} />
            <Route path="/faq" element={<FAQ />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/seo-stats" element={<SeoStats />} />
          <Route path="/backlinks-manager" element={<BacklinksManager />} />
          
          {/* Pages énergies renouvelables RGE (ULTRA PRIORITAIRE) */}
          <Route path="/entreprise-:slug-a-vendre" element={<RenewableEnergyPage />} />
            {/* SEO Pages - Buyer Keywords (before generic seller to match first) */}
            <Route path="/entreprise-:keyword-a-vendre" element={<BuyerKeywordPage />} />
            <Route path="/societe-:keyword-a-reprendre" element={<BuyerKeywordPage />} />
            <Route path="/petite-:keyword-a-vendre" element={<BuyerKeywordPage />} />
            {/* SEO Pages - Seller Keywords */}
            <Route path="/:slug" element={<SellerKeywordPage />} />
            {/* SEO Pages - Certifications */}
            <Route path="/entreprise-:slug-a-vendre" element={<CertificationPage />} />
            {/* SEO Pages - Métiers */}
            <Route path="/:slug-entreprise-a-vendre" element={<MetierPage />} />
            {/* SEO Pages - Régions */}
            <Route path="/entreprise-btp-a-vendre-:slug" element={<RegionPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        {!(import.meta.env.VITE_CRISP_WEBSITE_ID || (import.meta.env.VITE_TAWK_PROPERTY_ID && import.meta.env.VITE_TAWK_WIDGET_ID)) && <FloatingChatWidget />}
        <ThirdPartyChat />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
