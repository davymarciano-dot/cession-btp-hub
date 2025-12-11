import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import "./index.css";
import { prefetchCriticalData } from "./lib/queryClient";

// Précharger les données critiques au démarrage
prefetchCriticalData();

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

// Dispatch event for prerenderers (react-snap, prerender.io, etc.)
// This signals that the app has finished initial rendering
window.addEventListener('load', () => {
  // Wait for React to finish rendering
  setTimeout(() => {
    document.dispatchEvent(new Event('render-event'));
    document.dispatchEvent(new Event('prerender-ready'));
  }, 100);
});
