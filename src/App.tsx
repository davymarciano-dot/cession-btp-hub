import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Vendre from "./pages/Vendre";
import Acheter from "./pages/Acheter";
import Entreprises from "./pages/Entreprises";
import Estimer from "./pages/Estimer";
import Estimation from "./pages/Estimation";
import ResultatEstimation from "./pages/ResultatEstimation";
import PaymentSuccess from "./pages/PaymentSuccess";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AnnonceDetail from "./pages/AnnonceDetail";
import Tarifs from "./pages/Tarifs";
import Ressources from "./pages/Ressources";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/vendre" element={<Vendre />} />
          <Route path="/acheter" element={<Acheter />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/entreprises/:id" element={<AnnonceDetail />} />
          <Route path="/estimer" element={<Estimation />} />
          <Route path="/resultat-estimation" element={<ResultatEstimation />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/tarifs" element={<Tarifs />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/messages" element={<Messages />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
