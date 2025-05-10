import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import Prochainement from "@/pages/Prochainement";


import Guides from "@/pages/Guides"; 
import Portal from "@/pages/guides/portals/Portals";
import Ombres from "@/pages/guides/ombres/Ombres";
import Simulations from "@/pages/guides/simulation/Simulation"; 


import Boss from "@/pages/guides/boss/Boss";

import TierList from "@/pages/TierList";

import Builds from "@/pages/builds_chasseurs/Builds";

import AtelierDeLaLumiere from "@/pages/AtelierDeLaLumiere";
import Vulcan from "@/pages/atelier/vulcan/Vulcan";
import Baran from "@/pages/atelier/baran/Baran";
import Deimos from "@/pages/atelier/deimos/Deimos";

import BossDeGuilde from "@/pages/bdg/BossDeGuilde";
import Ennio from "@/pages/ennio/Ennio";



import Creators from "@/pages/Creators";
import PromoCodes from "@/pages/PromoCodes";

import MentionsLegales from "@/pages/legal/MentionsLegales";
import ConditionsUtilisation from "@/pages/legal/ConditionsUtilisation";
import PolitiqueConfidentialite from "@/pages/legal/PolitiqueConfidentialite";
import Cookies from "@/pages/legal/Cookies";


import NotFound from "@/pages/NotFound";

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
          <Route path="/guides" element={<Guides />} />

          <Route path="/guides/portals" element={<Portal />} /> 
          <Route path="/guides/ombres" element={<Ombres />} /> 
          <Route path="/guides/simulation" element={<Simulations />} /> 

          <Route path="/guides/boss" element={<Boss />} />
          <Route path="/guides/boss/ennio" element={<Ennio />} />

          <Route path="/tier-list" element={<TierList />} />
          <Route path="/builds" element={<Builds />} />;

          {/* <Route path="/atelier" element={<AtelierDeLaLumiere />} /> */}
          <Route path="/atelier" element={<Prochainement />} />
          <Route path="/atelier/Vulcan" element={<Vulcan />} />
          <Route path="/atelier/Baran" element={<Baran />} />
          <Route path="/atelier/Deimos" element={<Deimos />} />

          <Route path="/ennio" element={<Prochainement />} />
          <Route path="/bdg" element={<Prochainement />} />


          <Route path="/promo-codes" element={<PromoCodes />} />
          <Route path="/creators" element={<Creators />} />

          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgu" element={<ConditionsUtilisation />} />
          <Route path="/confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/cookies" element={<Cookies />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
