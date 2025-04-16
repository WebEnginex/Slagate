import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamVulcanChasseurs } from "@/config/atelier/vulcan/teamVulcanChasseurs";
import type { TeamVulcanChasseur } from "@/config/atelier/vulcan/teamVulcanChasseurs";
import TeamChasseurCard from "@/pages/atelier/vulcan/TeamChasseurCard";
import TeamJinwooCard from "./TeamJinwooCard";
import { teamVulcanJinwoo } from "@/config/atelier/vulcan/teamVulcanJinwoo";

export default function VulcanPage() {
  type Boss = Database["public"]["Tables"]["bosses"]["Row"];
  type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
  type Artefact = Database["public"]["Tables"]["artefacts"]["Row"];
  type Noyau = Database["public"]["Tables"]["noyaux"]["Row"];
  type Ombre = Database["public"]["Tables"]["ombres"]["Row"];
  type SetBonus = Database["public"]["Tables"]["sets_bonus"]["Row"];
  type JinwooArme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];
  type JinwooCompetence = Database["public"]["Tables"]["jinwoo_competences"]["Row"];
  type JinwooQte = Database["public"]["Tables"]["jinwoo_qte"]["Row"];
  type PierreBenediction = Database["public"]["Tables"]["pierres_benediction"]["Row"];

  const bossName = "Vulcan";
  const [boss, setBoss] = useState<Boss | null>(null);
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
        supabase.from("bosses").select("*").eq("nom", bossName).single(),
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

      if (bossData.data) setBoss(bossData.data);
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
      
      <Link
        to="/atelier"
        className="mb-6 inline-flex items-center text-sm font-medium text-solo-purple hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'Atelier de la Lumière
      </Link>

      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{boss?.nom}</h1>

        <Tabs defaultValue="facile">
          <TabsList>
            <TabsTrigger value="facile">Facile</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="difficile">Difficile</TabsTrigger>
          </TabsList>

          {["facile", "normal", "difficile"].map((diff) => (
            <TabsContent key={diff} value={diff}>
              <Card className="bg-muted">
                <CardHeader>
                  <CardTitle>
                    {boss?.nom} ({diff.charAt(0).toUpperCase() + diff.slice(1)})
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-6">
                  <img src={boss?.image || ""} className="w-full object-contain" />
                  <div>
                    <p className="mb-2">
                      Puissance requise : {boss?.[`puissance_${diff}` as keyof Boss]}
                    </p>
                    <div className="flex gap-2">
                      <img src={boss?.faiblesse1 || ""} className="h-10 w-10" />
                      <img src={boss?.faiblesse2 || ""} className="h-10 w-10" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Tabs defaultValue="chasseurs" className="mt-8">
                <TabsList className="mb-4">
                  <TabsTrigger value="chasseurs">Teams Chasseurs</TabsTrigger>
                  <TabsTrigger value="jinwoo">Teams Jinwoo</TabsTrigger>
                </TabsList>

                <TabsContent value="chasseurs">
                  {teamVulcanChasseurs.map((team: TeamVulcanChasseur) => (
                    <TeamChasseurCard
                      key={team.id}
                      team={team}
                      chasseurs={chasseurs}
                      artefacts={artefacts}
                      noyaux={noyaux}
                      ombres={ombres}
                      setsBonus={setsBonus}
                    />
                  ))}
                </TabsContent>

                <TabsContent value="jinwoo">
                  {teamVulcanJinwoo.map((team, i) => (
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
                </TabsContent>
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
