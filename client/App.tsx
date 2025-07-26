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
import NFLPage from "./pages/NFLPage";
import NCAAPage from "./pages/NCAAPage";
import TeamPage from "./pages/TeamPage";
import TeamCategoryPage from "./pages/TeamCategoryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Product Categories */}
          <Route path="/nfl" element={<PlaceholderPage />} />
          <Route path="/ncaa" element={<PlaceholderPage />} />
          <Route path="/hats" element={<PlaceholderPage />} />
          <Route path="/jerseys" element={<PlaceholderPage />} />
          <Route path="/accessories" element={<PlaceholderPage />} />
          <Route path="/custom" element={<PlaceholderPage />} />
          <Route path="/products" element={<PlaceholderPage />} />

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
