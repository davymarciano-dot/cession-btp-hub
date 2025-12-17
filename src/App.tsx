import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AIAssistant from "@/components/chat/AIAssistant";
import ProactiveChat from "./components/ProactiveChat";
import CartTrackingService from "./services/cartTrackingService";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { queryClient, prefetchCriticalData } from "./lib/queryClient";
import TanStackCacheDebugger from "./components/debug/TanStackCacheDebugger";
import Analytics from "./components/Analytics";
import ErrorBoundary from "./components/ErrorBoundary";
import { WebVitals } from "@/components/WebVitals";
import { RoutePreloader } from "@/components/RoutePreloader";
import { LanguageProvider } from "@/contexts/LanguageContext";
// import { PWAInstallPrompt } from "./components/PWAInstallPrompt";

// Lazy load heavy pages
const Vendre = lazy(() => import("./pages/Vendre"));
const Acheter = lazy(() => import("./pages/Acheter"));
const Entreprises = lazy(() => import("./pages/Entreprises"));
const Estimer = lazy(() => import("./pages/Estimer"));
const Estimation = lazy(() => import("./pages/Estimation"));
const ResultatEstimation = lazy(() => import("./pages/ResultatEstimation"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Auth = lazy(() => import("./pages/Auth"));
const Connexion = lazy(() => import("./pages/Connexion"));
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
const MetierVillePage = lazy(() => import("./pages/seo/MetierVillePage"));
const MetierRegionPage = lazy(() => import("./pages/seo/MetierRegionPage"));
const RegionPage = lazy(() => import("./pages/seo/RegionPage"));
const SellerKeywordPage = lazy(() => import("./pages/seo/SellerKeywordPage"));
const BuyerKeywordPage = lazy(() => import("./pages/seo/BuyerKeywordPage"));
const RenewableEnergyPage = lazy(() => import("./pages/seo/RenewableEnergyPage").then(module => ({ default: module.RenewableEnergyPage })));
const BacklinksManager = lazy(() => import("./pages/BacklinksManager").then(module => ({ default: module.BacklinksManager })));
const OutilsGratuits = lazy(() => import("./pages/OutilsGratuits"));
const AutomationDashboard = lazy(() => import("./pages/AutomationDashboard").then(module => ({ default: module.AutomationDashboard })));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const AffiliateDashboard = lazy(() => import("./pages/AffiliateDashboard"));
const BlogPost = lazy(() => import("./pages/blog/BlogPost"));
const EntreprisesRGE = lazy(() => import("./pages/EntreprisesRGE"));
const RevenueDashboard = lazy(() => import("./pages/RevenueDashboard"));
const TestAutomations = lazy(() => import("./pages/TestAutomations"));
const VendorOnboarding = lazy(() => import("./components/VendorOnboarding"));
const CronLogsAdmin = lazy(() => import("./pages/admin/CronLogs"));
const BlogIndex = lazy(() => import("./pages/blog/BlogIndex"));
const VendorListingAnalytics = lazy(() => import("./pages/dashboard/VendorListingAnalytics"));
const LaunchChecklist = lazy(() => import("./pages/LaunchChecklist"));
const MonitoringDashboard = lazy(() => import("./pages/admin/MonitoringDashboard"));
const SystemHealth = lazy(() => import("./pages/admin/SystemHealth"));
const Admin = lazy(() => import("./pages/Admin"));
const CommentCaMarche = lazy(() => import("./pages/CommentCaMarche"));
const Contact = lazy(() => import("./pages/Contact"));
const MentionsLegales = lazy(() => import("./pages/MentionsLegales"));
const CGV = lazy(() => import("./pages/CGV"));
const Confidentialite = lazy(() => import("./pages/Confidentialite"));
const Cookies = lazy(() => import("./pages/Cookies"));
const BuyerDashboard = lazy(() => import("./pages/dashboard/BuyerDashboard"));
const NotreEquipe = lazy(() => import("./pages/NotreEquipe"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const MatchingIA = lazy(() => import("./pages/MatchingIA"));
const LexiqueBTP = lazy(() => import("./pages/LexiqueBTP"));

// Pages métiers spécifiques énergies renouvelables
const PanneauxSolaires = lazy(() => import("./pages/secteur/PanneauxSolaires"));
const Photovoltaique = lazy(() => import("./pages/secteur/Photovoltaique"));
const PompeAChaleur = lazy(() => import("./pages/secteur/PompeAChaleur"));
const EnergiesRenouvelables = lazy(() => import("./pages/secteur/EnergiesRenouvelables"));
const RGEPage = lazy(() => import("./pages/certification/RGE"));
const InstallationChauffage = lazy(() => import("./pages/secteur/InstallationChauffage"));
const IsolationThermique = lazy(() => import("./pages/secteur/IsolationThermique"));


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

const App = () => {
  useEffect(() => {
    // Initialize cart tracking on mount
    CartTrackingService.init();
    
    // Prefetch critical data
    prefetchCriticalData();
    
    // Log performance in dev
    if (import.meta.env.DEV) {
      console.log('🚀 CessionBTP loaded');
      console.log('📊 Cache initialized');
    }
  }, []);

  return (
  <BrowserRouter>
    <ErrorBoundary>
      <LanguageProvider>
      <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* 📊 Monitoring des performances Web Vitals */}
        <WebVitals />
        
        {/* ⚡ Préchargement intelligent des routes */}
        <RoutePreloader />
        
        <Toaster />
        <Sonner />
        <Analytics />
        {/* <PWAInstallPrompt /> */}
        <Suspense fallback={<PageLoader />}>
          <ProactiveChat />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vendre" element={<Vendre />} />
            <Route path="/acheter" element={<Acheter />} />
            <Route path="/entreprises" element={<Entreprises />} />
            <Route path="/entreprises-rge" element={<EntreprisesRGE />} />
            <Route path="/annonce/:id" element={<AnnonceDetail />} />
            <Route path="/entreprises/:id" element={<AnnonceDetail />} />
            <Route path="/estimer" element={<Estimer />} />
            <Route path="/resultat-estimation" element={<ResultatEstimation />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard-vendeur" element={<VendorDashboard />} />
            <Route path="/dashboard/analytics/:id" element={<VendorListingAnalytics />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/tarifs" element={<Tarifs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/ressources" element={<Ressources />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/chat-demo" element={<ChatDemo />} />
            <Route path="/performance-demo" element={<PerformanceDemo />} />
            <Route path="/mes-matchs" element={<MyMatches />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/comment-ca-marche" element={<CommentCaMarche />} />
          <Route path="/contact" element={<Contact />} />
            <Route path="/equipe" element={<NotreEquipe />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/matching-ia" element={<MatchingIA />} />
            <Route path="/outils-gratuits" element={<OutilsGratuits />} />
            <Route path="/lexique-btp" element={<LexiqueBTP />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<CGV />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/dashboard-acheteur" element={<BuyerDashboard />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/launch-checklist" element={<LaunchChecklist />} />
          <Route path="/seo-stats" element={<SeoStats />} />
          <Route path="/backlinks-manager" element={<BacklinksManager />} />
          <Route path="/automation-dashboard" element={<AutomationDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/affiliation" element={<AffiliateDashboard />} />
          <Route path="/revenue-dashboard" element={<RevenueDashboard />} />
          <Route path="/test-automations" element={<TestAutomations />} />
          <Route path="/admin/cron-logs" element={<CronLogsAdmin />} />
          <Route path="/admin/monitoring" element={<MonitoringDashboard />} />
          <Route path="/admin/health" element={<SystemHealth />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/blog" element={<BlogIndex />} />
          
          {/* Pages métiers spécifiques énergies renouvelables (haute priorité SEO) */}
          <Route path="/secteur/panneaux-solaires" element={<PanneauxSolaires />} />
          <Route path="/secteur/photovoltaique" element={<Photovoltaique />} />
          <Route path="/secteur/pompe-a-chaleur" element={<PompeAChaleur />} />
          <Route path="/secteur/energies-renouvelables" element={<EnergiesRenouvelables />} />
          <Route path="/secteur/installation-chauffage" element={<InstallationChauffage />} />
          <Route path="/secteur/isolation-thermique" element={<IsolationThermique />} />
          <Route path="/certification/rge" element={<RGEPage />} />
          
          {/* Pages énergies renouvelables RGE (ULTRA PRIORITAIRE) */}
          {/* Route Métier + Ville COMBINÉ (la plus spécifique, 10 000 pages) */}
          <Route path="/entreprise-:metier-:ville-a-vendre" element={<MetierVillePage />} />
          {/* Route Métier + Région (1 300 pages) */}
          <Route path="/entreprise-:metier-:region" element={<MetierRegionPage />} />
          {/* Route énergies renouvelables */}
          <Route path="/entreprise-:slug-a-vendre" element={<RenewableEnergyPage />} />
            {/* SEO Pages - Buyer Keywords (before generic seller to match first) */}
            <Route path="/entreprise-:keyword-a-vendre" element={<BuyerKeywordPage />} />
            <Route path="/societe-:keyword-a-reprendre" element={<BuyerKeywordPage />} />
            <Route path="/petite-:keyword-a-vendre" element={<BuyerKeywordPage />} />
            {/* SEO Pages - Métiers */}
            <Route path="/:slug-entreprise-a-vendre" element={<MetierPage />} />
            {/* SEO Pages - Régions */}
            <Route path="/entreprise-btp-a-vendre-:slug" element={<RegionPage />} />
            {/* Generic seller keyword (MUST be last among specific SEO routes) */}
            <Route path="/:slug" element={<SellerKeywordPage />} />
            {/* Blog */}
            <Route path="/blog/:slug" element={<BlogPost />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <AIAssistant />
        
        {/* Debug tools - Dev only */}
        {import.meta.env.DEV && (
          <>
            {/* DevTools officiels - COMPLETS */}
            <ReactQueryDevtools 
              initialIsOpen={false}
            />
            {/* Notre widget léger - APERÇU RAPIDE */}
            <TanStackCacheDebugger />
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
    </LanguageProvider>
    </ErrorBoundary>
  </BrowserRouter>
  );
};

export default App;
