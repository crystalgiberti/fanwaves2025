import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaceholderPage from "./pages/PlaceholderPage";
import ProductsPage from "./pages/ProductsPage";
import CollectionsPage from "./pages/CollectionsPage";
import NFLPage from "./pages/NFLPage";
import NCAAPage from "./pages/NCAAPage";
import TeamPage from "./pages/TeamPage";
import TeamCategoryPage from "./pages/TeamCategoryPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import HatsPage from "./pages/HatsPage";
import JerseysPage from "./pages/JerseysPage";
import CustomGearPage from "./pages/CustomGearPage";
import StatusPage from "./pages/StatusPage";
import BuilderPage from "./pages/BuilderPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* League Pages */}
          <Route path="/nfl" element={<NFLPage />} />
          <Route path="/ncaa" element={<NCAAPage />} />

          {/* Team Pages - Dynamic routing for all teams */}
          <Route path="/nfl/:teamSlug" element={<TeamPage />} />
          <Route path="/ncaa/:teamSlug" element={<TeamPage />} />

          {/* Team Category Pages - Dynamic routing for all team categories */}
          <Route
            path="/nfl/:teamSlug/:categorySlug"
            element={<TeamCategoryPage />}
          />
          <Route
            path="/ncaa/:teamSlug/:categorySlug"
            element={<TeamCategoryPage />}
          />

          {/* General Product Categories */}
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/hats" element={<HatsPage />} />
          <Route path="/jerseys" element={<JerseysPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/custom" element={<CustomGearPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/status" element={<StatusPage />} />
          <Route path="/builder/*" element={<BuilderPage />} />

          {/* Support Pages */}
          <Route path="/contact" element={<PlaceholderPage />} />
          <Route path="/shipping" element={<PlaceholderPage />} />
          <Route path="/returns" element={<PlaceholderPage />} />
          <Route path="/faq" element={<PlaceholderPage />} />
          <Route path="/privacy" element={<PlaceholderPage />} />
          <Route path="/terms" element={<PlaceholderPage />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
