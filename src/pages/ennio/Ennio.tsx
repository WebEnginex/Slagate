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

  const bossName = "Ennio";
  const [boss, setBdg] = useState<Bdg | null>(null);
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [noyaux, setNoyaux] = useState<Noyau[]>([]);
  const [ombres, setOmbres] = useState<Ombre[]>([]);
  const [setsBonus, setSetsBonus] = useState<SetBonus[]>([]);
  const [armes, setArmes] = useState<JinwooArme[]>([]);
  const [competences, setCompetences] = useState<JinwooCompetence[]>([]);
  const [qtes, setQtes] = useState<JinwooQte[]>([]);
  const [pierres, setPierres] = useState<PierreBenediction[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
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
          .single(),
        supabase.from("chasseurs").select("*"),
        supabase.from("artefacts").select("*"),
        supabase.from("noyaux").select("*"),
        supabase.from("ombres").select("*"),
        supabase.from("sets_bonus").select("*"),
        supabase.from("jinwoo_armes").select("*"),
        supabase.from("jinwoo_competences").select("*"),
        supabase.from("jinwoo_qte").select("*"),
        supabase.from("pierres_benediction").select("*"),
      ]);

      if (bossData.data) setBdg(bossData.data);
      if (chasseursData.data) setChasseurs(chasseursData.data);
      if (artefactsData.data) setArtefacts(artefactsData.data);
      if (noyauxData.data) setNoyaux(noyauxData.data);
      if (ombresData.data) setOmbres(ombresData.data);
      if (setsBonusData.data) setSetsBonus(setsBonusData.data);
      if (armesData.data) setArmes(armesData.data);
      if (competencesData.data) setCompetences(competencesData.data);
      if (qtesData.data) setQtes(qtesData.data);
      if (pierresData.data) setPierres(pierresData.data);
    };

    fetchAll();
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-[90rem] 2xl:max-w-[100%] mx-auto px-6 py-6">
        <div className="max-w-[100%] mx-auto">
          <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8 relative">
            {/* Superposition du contenu sur l'image */}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/50 p-6 text-center">
              <h1 className="text-3xl md:text-4xl font-extrabold text-violet-400">
                Bienvenue sur la page des builds du boss d'Ennio !
              </h1>
              <p className="text-base md:text-lg text-gray-300 mt-4">
                Vous y trouverez des configurations optimisées pour chaque
                chasseur, comprenant leurs statistiques, les artefacts
                recommandés, les noyaux, les différents bonus de sets, les
                ombres, les compétences, QTE et pierres de bénédictions de Sung
                Jinwoo.
              </p>
            </div>

            {/* Image du boss */}
            <CardContent className="p-0">
              <div className="flex items-center justify-center bg-sidebar-accent rounded-md">
                <img
                  src={boss?.image || ""}
                  alt={boss?.nom || "Reine des fourmis"}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardContent>
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
