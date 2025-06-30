import Layout from "@/components/Layout";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import TeamJinwooCard from "@/pages/bdg/TeamJinwooCard";
import { TeamBdgJinwoo } from "@/config/bdg/teamBdgJinwoo";
import { ExpandedTeamProvider } from "@/contexts/ExpandedTeamContext";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";
import { useSupabaseFetch } from "@/lib";
import LazyImage from "@/lib/lazy";

// Constante pour identifier cette page dans les logs du worker et le cache
const PAGE_ID = "BDG";

export default function BdgPage() {
  type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
  type Artefact = Database["public"]["Tables"]["artefacts"]["Row"];
  type Noyau = Database["public"]["Tables"]["noyaux"]["Row"];
  type Ombre = Database["public"]["Tables"]["ombres"]["Row"];
  type SetBonus = Database["public"]["Tables"]["sets_bonus"]["Row"];
  type JinwooArme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];
  type JinwooCompetence =
    Database["public"]["Tables"]["jinwoo_competences"]["Row"];
  type JinwooQte = Database["public"]["Tables"]["jinwoo_qte"]["Row"];
  type PierreBenediction =
    Database["public"]["Tables"]["pierres_benediction"]["Row"];
  
  const bossName = "Reine des Fourmis";

  // =========================
  // Utilisation conforme au guide d'implémentation
  // =========================

  // Requêtes optimisées avec useSupabaseFetch
  const { data: boss } = useSupabaseFetch(
    `supabase:boss:${bossName}`,
    async () => {
      const { data } = await supabase
        .from("boss_de_guilde")
        .select("*")
        .eq("nom", bossName)
        .maybeSingle();
      return data;
    }
  );

  const { data: chasseurs = [] } = useSupabaseFetch(
    "supabase:chasseurs",
    async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      return data || [];
    }
  );

  const { data: artefacts = [] } = useSupabaseFetch(
    "supabase:artefacts",
    async () => {
      const { data } = await supabase.from("artefacts").select("*");
      return data || [];
    }
  );

  const { data: noyaux = [] } = useSupabaseFetch(
    "supabase:noyaux",
    async () => {
      const { data } = await supabase.from("noyaux").select("*");
      return data || [];
    }
  );

  const { data: ombres = [] } = useSupabaseFetch(
    "supabase:ombres",
    async () => {
      const { data } = await supabase.from("ombres").select("*");
      return data || [];
    }
  );

  const { data: setsBonus = [] } = useSupabaseFetch(
    "supabase:sets_bonus",
    async () => {
      const { data } = await supabase.from("sets_bonus").select("*");
      return data || [];
    }
  );

  const { data: armes = [] } = useSupabaseFetch(
    "supabase:jinwoo_armes",
    async () => {
      const { data } = await supabase.from("jinwoo_armes").select("*");
      return data || [];
    }
  );

  const { data: competences = [] } = useSupabaseFetch(
    "supabase:jinwoo_competences",
    async () => {
      const { data } = await supabase.from("jinwoo_competences").select("*");
      return data || [];
    }
  );

  const { data: qtes = [] } = useSupabaseFetch(
    "supabase:jinwoo_qte",
    async () => {
      const { data } = await supabase.from("jinwoo_qte").select("*");
      return data || [];
    }
  );

  const { data: pierres = [] } = useSupabaseFetch(
    "supabase:pierres_benediction",
    async () => {
      const { data } = await supabase.from("pierres_benediction").select("*");
      return data || [];
    }
  );

  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`🏆 ${PAGE_ID}: Page initialisée avec useSupabaseFetch (conforme au guide)`);
    console.log(`🏆 ${PAGE_ID}: Toutes les images gérées par LazyImage + IndexedDB (conforme au guide)`);
  }

  return (
    <Layout>
      <div className="w-full max-w-[90rem] 2xl:max-w-[100%] mx-auto px-6 py-6">
        {" "}
        <div className="max-w-[100%] mx-auto">
          {" "}
          <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8 relative">
            {/* Bannière hero avec aspect ratio contrôlé */}
            <div className="relative w-full">
              {/* Conteneur d'image avec hauteur responsive */}{" "}
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] overflow-hidden">
                {boss?.image ? (
                  <LazyImage
                    src={boss.image}
                    alt={boss.nom || "Fachtna"}
                    className="w-full h-full object-cover object-center"
                    showSpinner={true}
                    fallbackClassName="w-full h-full bg-sidebar-accent flex items-center justify-center"
                  />
                ) : (
                  <div className="w-full h-full bg-sidebar-accent flex items-center justify-center">
                    <p className="text-gray-400">
                      Image en cours de chargement...
                    </p>
                  </div>
                )}
              </div>
              {/* Superposition du contenu sur l'image - gradient plus élégant */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col justify-end items-center p-4 sm:p-6 md:p-8 lg:p-10 text-center">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-violet-400 text-shadow-lg drop-shadow-lg">
                  Bienvenue sur la page des builds de la Reine des Fourmis !
                </h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-3xl text-gray-200 mt-2 md:mt-4 font-medium drop-shadow-md">
                  Vous y trouverez des configurations optimisées pour chaque
                  chasseur, comprenant leurs statistiques, les artefacts
                  recommandés, les noyaux, les différents bonus de sets, les
                  ombres, les compétences, QTE et pierres de bénédictions.
                </p>
              </div>
            </div>
          </Card>
          {/* Display Teams */}
          <ExpandedTeamProvider>
            {TeamBdgJinwoo.map((team) => (
              <TeamJinwooCard
                key={team.id}
                team={team}
                chasseurs={chasseurs}
                artefacts={artefacts}
                noyaux={noyaux}
                ombres={ombres}
                setsBonus={setsBonus}
                armes={armes}
                competences={competences}
                qtes={qtes}
                pierres={pierres}
              />
            ))}
          </ExpandedTeamProvider>
        </div>
      </div>
    </Layout>
  );
}
