import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft, Flame, Shield, Sword } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { teamDeimosChasseurs } from "@/config/atelier/deimos/teamDeimosChasseurs";
import type { TeamDeimosChasseur } from "@/config/atelier/deimos/teamDeimosChasseurs";
import TeamChasseurCard from "@/pages/atelier/deimos/TeamChasseurCard";
import TeamJinwooCard from "./TeamJinwooCard";
import { teamDeimosJinwoo } from "@/config/atelier/deimos/teamDeimosJinwoo";
import { Separator } from "@/components/ui/separator";
import { ExpandedTeamProvider } from "@/contexts/ExpandedTeamContext";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";

export default function DeimosPage() {
  type Boss = Database["public"]["Tables"]["bosses"]["Row"];
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

  const bossName = "Deimos";
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
      <div className="w-full max-w-[90rem] 2xl:max-w-[100%] mx-auto px-6 py-6">
        {" "}
        <div className="max-w-[100%] mx-auto">
          <Link
            to="/atelier"
            className="mb-6 inline-flex items-center text-sm font-medium text-solo-purple hover:underline"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour à l'Atelier de la Lumière
          </Link>

          <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8">
            <Tabs defaultValue="facile">
              <CardHeader className="pb-0 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
                <CardTitle className="text-xl sm:text-2xl md:text-3xl text-white mb-4 md:mb-0">
                  {boss?.nom}
                </CardTitle>

                <TabsList className="bg-sidebar-accent border border-sidebar-border self-start md:self-center">
                  <TabsTrigger
                    value="facile"
                    className="data-[state=active]:bg-solo-purple data-[state=active]:text-white"
                  >
                    Facile
                  </TabsTrigger>
                  <TabsTrigger
                    value="normal"
                    className="data-[state=active]:bg-solo-purple data-[state=active]:text-white"
                  >
                    Normal
                  </TabsTrigger>
                  <TabsTrigger
                    value="difficile"
                    className="data-[state=active]:bg-solo-purple data-[state=active]:text-white"
                  >
                    Difficile
                  </TabsTrigger>
                </TabsList>
              </CardHeader>

              {["facile", "normal", "difficile"].map((diff) => (
                <TabsContent key={diff} value={diff}>
                  <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
                    <div className="flex items-center justify-center bg-sidebar-accent rounded-md p-4">
                      <img
                        src={boss?.image || ""}
                        alt={boss?.nom || "Boss"}
                        className="w-full max-h-[300px] object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-center space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Sword className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-solo-purple flex-shrink-0" />
                          <div className="flex flex-col">
                            <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                              Puissance requise
                            </p>
                            <p className="text-base sm:text-xl md:text-2xl font-semibold text-white">
                              {boss?.[`puissance_${diff}` as keyof Boss]}
                            </p>
                          </div>
                        </div>

                        <Separator className="bg-sidebar-border my-2" />

                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-solo-purple flex-shrink-0" />
                            <p className="text-xs sm:text-sm md:text-base font-medium">
                              Faiblesses
                            </p>
                          </div>

                          <div className="flex items-center gap-4 pl-10">
                            {boss?.faiblesse1 && (
                              <div className="flex flex-col items-center">
                                <img
                                  src={boss.faiblesse1}
                                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
                                  alt="Faiblesse 1"
                                />
                              </div>
                            )}
                            {boss?.faiblesse2 && (
                              <div className="flex flex-col items-center">
                                <img
                                  src={boss.faiblesse2}
                                  className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-contain"
                                  alt="Faiblesse 2"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      {/* Ajout de la date de dernière modification */}
                      <LastModified date={lastModifiedDates.deimos} />
                    </div>
                  </CardContent>
                </TabsContent>
              ))}
            </Tabs>
          </Card>

          <Tabs defaultValue="chasseurs" className="mt-8">
            <TabsList className="bg-sidebar-accent border border-sidebar-border">
              <TabsTrigger
                value="chasseurs"
                className="data-[state=active]:bg-solo-purple data-[state=active]:text-white"
              >
                Teams Chasseurs
              </TabsTrigger>
              <TabsTrigger
                value="jinwoo"
                className="data-[state=active]:bg-solo-purple data-[state=active]:text-white"
              >
                Teams Jinwoo
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chasseurs">
              <ExpandedTeamProvider>
                {teamDeimosChasseurs.map((team: TeamDeimosChasseur) => (
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
              </ExpandedTeamProvider>
            </TabsContent>

            <TabsContent value="jinwoo">
              <ExpandedTeamProvider>
                {teamDeimosJinwoo.map((team, i) => (
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
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
