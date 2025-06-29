import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
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
import { loadPageImage, loadPageImageAsBase64, preloadPageImages } from "@/services/cacheImages/pageImageLoader";

// Constante pour identifier cette page dans les logs du worker et le cache
const PAGE_ID = "ENNIO";

export default function EnnioPage() {
  type Bdg = Database["public"]["Tables"]["boss_de_guilde"]["Row"];
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
  type Ennio = Database["public"]["Tables"]["ennio"]["Row"];

  const bossName = "Ennio";
  const [boss, setBdg] = useState<Bdg | null>(null);
  const [ennioData, setEnnioData] = useState<Ennio | null>(null);
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [noyaux, setNoyaux] = useState<Noyau[]>([]);
  const [ombres, setOmbres] = useState<Ombre[]>([]);
  const [setsBonus, setSetsBonus] = useState<SetBonus[]>([]);
  const [armes, setArmes] = useState<JinwooArme[]>([]);
  const [competences, setCompetences] = useState<JinwooCompetence[]>([]);
  const [qtes, setQtes] = useState<JinwooQte[]>([]);
  const [pierres, setPierres] = useState<PierreBenediction[]>([]);
  const [cacheAvailable, setCacheAvailable] = useState(
    localStorage.getItem("indexedDBFailed") !== "true"
  );
  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Récupérer d'abord les données d'Ennio séparément pour mieux gérer les erreurs
        const ennioResult = await supabase
          .from("ennio")
          .select("*")
          .limit(1)
          .single();
          if (ennioResult.error) {
          console.error("Erreur lors de la récupération des données d'Ennio:", ennioResult.error);
        } else if (ennioResult.data) {
          console.log("Données d'Ennio récupérées avec succès:", ennioResult.data);
          console.log("URL de l'image d'Ennio:", ennioResult.data.image);
          setEnnioData(ennioResult.data);
          
          // Précharger l'image d'Ennio avec le contexte de page
          if (ennioResult.data.image) {
            try {
              console.log(`🔄 [${PAGE_ID}] Préchargement de l'image d'Ennio: ${ennioResult.data.image}`);
              
              // Utiliser loadPageImage pour mettre en cache l'image
              const cachedImage = await loadPageImage(ennioResult.data.image, PAGE_ID);
              if (cachedImage) {
                console.log(`✅ [${PAGE_ID}] Image d'Ennio mise en cache avec succès à: ${cachedImage}`);
              } else {
                console.warn(`⚠️ [${PAGE_ID}] Échec du préchargement de l'image d'Ennio`);
              }
            } catch (err) {
              console.warn(`⚠️ [${PAGE_ID}] Impossible de mettre en cache l'image d'Ennio:`, err);
            }
          }
        }
          const [
          bossData,
          chasseursData,
          artefactsData,
          noyauxData,
          ombresData,
          setsBonusData,
          armesData,
          competencesData,
          qtesData,
          pierresData,
        ] = await Promise.all([
          supabase
            .from("boss_de_guilde")
            .select("*")
            .eq("nom", bossName)
            .maybeSingle(),
          supabase.from("chasseurs").select("*"),
          supabase.from("artefacts").select("*"),
          supabase.from("noyaux").select("*"),
          supabase.from("ombres").select("*"),
          supabase.from("sets_bonus").select("*"),          supabase.from("jinwoo_armes").select("*"),
          supabase.from("jinwoo_competences").select("*"),
          supabase.from("jinwoo_qte").select("*"),
          supabase.from("pierres_benediction").select("*"),
        ]);
        
        if (bossData.data) {
          console.log("Image URL du boss:", bossData.data.image);
          setBdg(bossData.data);
        }
        
        if (chasseursData.data) {
          setChasseurs(chasseursData.data);
          
          // Collecter les URLs d'images pour le préchargement
          const chasseurImageUrls = chasseursData.data
            .filter(chasseur => chasseur.image)
            .map(chasseur => chasseur.image);
            
          if (chasseurImageUrls.length > 0) {
            // Précharger toutes les images des chasseurs
            await preloadPageImages(chasseurImageUrls, PAGE_ID);
            console.log(`✅ [${PAGE_ID}] ${chasseurImageUrls.length} images de chasseurs préchargées`);
          }
        }
        if (artefactsData.data) setArtefacts(artefactsData.data);
        if (noyauxData.data) setNoyaux(noyauxData.data);
        if (ombresData.data) setOmbres(ombresData.data);
        if (setsBonusData.data) setSetsBonus(setsBonusData.data);
        if (armesData.data) setArmes(armesData.data);
        if (competencesData.data) setCompetences(competencesData.data);
        if (qtesData.data) setQtes(qtesData.data);
        if (pierresData.data) setPierres(pierresData.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchAll();
  }, []);

  // Effet pour surveiller les changements de ennioData et améliorer le débogage
  useEffect(() => {
    if (ennioData) {
      console.log("ennioData mis à jour:", ennioData);
      console.log("URL de l'image après mise à jour:", ennioData.image);
    }
  }, [ennioData]);

  return (
    <Layout>
      <div className="w-full max-w-[90rem] 2xl:max-w-[100%] mx-auto px-6 py-6">
        <div className="max-w-[100%] mx-auto">
          {" "}
          <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8 relative">
            {/* Bannière hero avec aspect ratio contrôlé */}            <div className="relative w-full">
              {/* Conteneur d'image avec hauteur responsive */}
              <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] 2xl:h-[32rem] overflow-hidden">                {ennioData?.image ? (
                  <img
                    src={ennioData.image}
                    alt={ennioData?.nom || boss?.nom || "Ennio"}
                    className="w-full h-full object-cover object-center"
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    data-page-id={PAGE_ID}
                    data-cached-image="true"
                    onLoad={() => console.log(`✅ [${PAGE_ID}] Image d'Ennio chargée avec succès`)}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      console.error(`❌ [${PAGE_ID}] Erreur lors du chargement de l'image d'Ennio:`, target.src);
                      
                      // Essayer de diagnostiquer l'erreur CORS
                      console.warn("Vérifiez les paramètres CORS dans votre bucket Supabase");
                      console.warn("URL d'origine:", window.location.origin);
                      console.warn("URL de l'image:", target.src);
                      
                      target.onerror = null;
                      target.style.display = "none";
                    }}
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
