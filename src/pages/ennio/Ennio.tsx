import Layout from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import TeamGroupCard from "@/pages/ennio/TeamGroupCard";
import { TeamEnnioJinwoo } from "@/config/ennio/teamEnnioJinwoo";
import { teamEnnioJinwooGroups } from "@/config/ennio/teamEnnioJinwoo";
import type { TeamGroup } from "@/config/ennio/teamEnnioJinwoo";
import { ExpandedTeamProvider } from "@/contexts/ExpandedTeamContext";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";
import { useSupabaseFetch } from "@/lib";
import LazyImage from "@/lib/lazy";

// =========================
// Utilisation conforme au guide d'implémentation
// =========================

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "ENNIO";

export default function EnnioPage() {
  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`🏆 ${PAGE_ID}: Page initialisée avec SWR et LazyImage (conforme au guide)`);
  }

  // =========================
  // Récupération des données avec SWR (conforme au guide)
  // =========================
  
  const { data: ennioData } = useSupabaseFetch('supabase:ennio', async () => {
    const { data } = await supabase.from("ennio").select("*").limit(1).single();
    return data;
  });

  const { data: boss } = useSupabaseFetch('supabase:boss_ennio', async () => {
    const { data } = await supabase
      .from("boss_de_guilde")
      .select("*")
      .eq("nom", "Ennio")
      .maybeSingle();
    return data;
  });

  const { data: chasseurs } = useSupabaseFetch('supabase:chasseurs', async () => {
    const { data } = await supabase.from("chasseurs").select("*");
    return data || [];
  });

  const { data: artefacts } = useSupabaseFetch('supabase:artefacts', async () => {
    const { data } = await supabase.from("artefacts").select("*");
    return data || [];
  });

  const { data: noyaux } = useSupabaseFetch('supabase:noyaux', async () => {
    const { data } = await supabase.from("noyaux").select("*");
    return data || [];
  });

  const { data: ombres } = useSupabaseFetch('supabase:ombres', async () => {
    const { data } = await supabase.from("ombres").select("*");
    return data || [];
  });

  const { data: setsBonus } = useSupabaseFetch('supabase:sets_bonus', async () => {
    const { data } = await supabase.from("sets_bonus").select("*");
    return data || [];
  });

  const { data: armes } = useSupabaseFetch('supabase:jinwoo_armes', async () => {
    const { data } = await supabase.from("jinwoo_armes").select("*");
    return data || [];
  });

  const { data: competences } = useSupabaseFetch('supabase:jinwoo_competences', async () => {
    const { data } = await supabase.from("jinwoo_competences").select("*");
    return data || [];
  });

  const { data: qtes } = useSupabaseFetch('supabase:jinwoo_qte', async () => {
    const { data } = await supabase.from("jinwoo_qte").select("*");
    return data || [];
  });

  const { data: pierres } = useSupabaseFetch('supabase:pierres_benediction', async () => {
    const { data } = await supabase.from("pierres_benediction").select("*");
    return data || [];
  });

  return (
    <Layout>
      <div className="w-full max-w-[90rem] 2xl:max-w-[100%] mx-auto px-6 py-6">
        <div className="max-w-[100%] mx-auto">
          {" "}
          <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8 relative">
            {/* Bannière hero avec aspect ratio contrôlé */}            <div className="relative w-full">
              {/* Conteneur d'image avec hauteur responsive */}
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] overflow-hidden">                {ennioData?.image ? (
                  <LazyImage
                    src={ennioData.image}
                    alt={ennioData?.nom || boss?.nom || "Ennio"}
                    className="w-full h-full object-cover object-center"
                    showSpinner={true}
                    fallbackClassName="w-full h-full bg-sidebar-accent flex items-center justify-center"
                  />
                ) : (
                  <div className="w-full h-full bg-sidebar-accent flex items-center justify-center">
                    <p className="text-gray-400">Image en cours de chargement...</p>
                  </div>
                )}
              </div>
              {/* Superposition du contenu sur l'image - gradient plus élégant */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end items-center p-4 sm:p-6 md:p-8 lg:p-10 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-violet-400 text-shadow-lg drop-shadow-lg">
                  Bienvenue sur la page des builds du boss d'Ennio !
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl text-gray-200 mt-2 md:mt-4 font-medium drop-shadow-md">
                  Vous y trouverez des configurations optimisées pour chaque
                  chasseur, comprenant leurs statistiques, les artefacts
                  recommandés, les noyaux, les différents bonus de sets, les
                  ombres, les compétences, QTE et pierres de bénédictions de
                  Sung Jinwoo.
                </p>
              </div>
            </div>
          </Card>
          {/* Display Groups of Teams */}
          <ExpandedTeamProvider>
            {teamEnnioJinwooGroups.map((group) => (
              <TeamGroupCard
                key={group.id}
                group={group}
                chasseurs={chasseurs || []}
                artefacts={artefacts || []}
                noyaux={noyaux || []}
                ombres={ombres || []}
                setsBonus={setsBonus || []}
                armes={armes || []}
                competences={competences || []}
                qtes={qtes || []}
                pierres={pierres || []}
              />
            ))}
          </ExpandedTeamProvider>
        </div>
      </div>
    </Layout>
  );
}
