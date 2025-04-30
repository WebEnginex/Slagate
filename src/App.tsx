
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import TierList from "./pages/TierList";
import Builds from "@/pages/builds_chasseurs/Builds";
import AtelierDeLaLumiere from "@/pages/atelier/AtelierDeLaLumiere";
import Vulcan from "@/pages/atelier/vulcan/Vulcan";
import Baran from "@/pages/atelier/baran/Baran";
import Deimos from "@/pages/atelier/deimos/Deimos";
import Creators from "./pages/Creators";
import PromoCodes from "./pages/PromoCodes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/tier-list" element={<TierList />} />
          <Route path="/builds" element={<Builds />} />;
          <Route path="/atelier" element={<AtelierDeLaLumiere />} />
          <Route path="/atelier/Vulcan" element={<Vulcan />} />
          <Route path="/atelier/Baran" element={<Baran />} />
          <Route path="/atelier/Deimos" element={<Deimos />} />
          <Route path="/promo-codes" element={<PromoCodes />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
