import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { prefetchCriticalData } from "./lib/queryClient";

// Précharger les données critiques au démarrage
prefetchCriticalData();

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
