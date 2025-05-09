import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { teamVulcanChasseurs } from "@/config/atelier/vulcan/teamVulcanChasseurs";
import { teamVulcanJinwoo } from "@/config/atelier/vulcan/teamVulcanJinwoo";
import TeamChasseurCard from "@/pages/atelier/vulcan/TeamChasseurCard";
import TeamJinwooCard from "./TeamJinwooCard";
import { ExpandedTeamProvider } from "@/contexts/ExpandedTeamContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Swords, Shield } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CACHE_VERSION = "_v1";
const CACHE_EXPIRATION = 1000 * 60 * 60 * 24; // 30 jours

function getCachedData(key: string) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  if (Date.now() - timestamp > CACHE_EXPIRATION) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCachedData(key: string, data: any) {
  localStorage.setItem(
    key,
    JSON.stringify({ data, timestamp: Date.now() })
  );
}

async function fetchData(key: string, fetchFn: () => Promise<any>) {
  const cachedData = getCachedData(key);
  if (cachedData) return cachedData;

  const data = await fetchFn();
  setCachedData(key, data);
  return data;
}

// Correction des transformations pour `teamVulcanChasseurs` et `teamVulcanJinwoo`
const transformedTeamVulcanChasseurs = teamVulcanChasseurs.map((team) => ({
  ...team,
  chasseurs: team.chasseurs.map((chasseur) => ({
    ...chasseur,
    noyaux: Object.values(chasseur.noyaux).flat(), // Aplatir les noyaux en un tableau
  })),
}));

const transformedTeamVulcanJinwoo = teamVulcanJinwoo.map((team) => ({
  ...team,
  armes: [team.arme1, team.arme2]
    .filter(Boolean)
    .map((id) => ({
      id,
      image: `path/to/image/${id}.png`,
      nom: `Arme ${id}`,
      arme_element: "unknown", // Placeholder for missing property
      created_at: new Date().toISOString(), // Placeholder for missing property
    })),
  competences: [team.competence1, team.competence2]
    .filter(Boolean)
    .map((id) => ({
      id,
      description: `Competence ${id}`,
      element: "unknown", // Placeholder for missing property
      image: `path/to/image/${id}.png`, // Placeholder for missing property
      nom: `Competence ${id}`,
    })),
  qtes: [team.qte1, team.qte2]
    .filter(Boolean)
    .map((id) => ({
      id,
      description: `QTE ${id}`,
      element: "unknown", // Placeholder for missing property
      image: `path/to/image/${id}.png`, // Placeholder for missing property
      nom: `QTE ${id}`,
    })),
  pierres: [
    { id: team.pierre_benediction_booster1, type: "booster", description: `Pierre Booster 1` },
    { id: team.pierre_benediction_booster2, type: "booster", description: `Pierre Booster 2` },
    { id: team.pierre_benediction_booster3, type: "booster", description: `Pierre Booster 3` },
    { id: team.pierre_benediction_booster4, type: "booster", description: `Pierre Booster 4` },
    { id: team.pierre_benediction_survie1, type: "survie", description: `Pierre Survie 1` },
    { id: team.pierre_benediction_survie2, type: "survie", description: `Pierre Survie 2` },
    { id: team.pierre_benediction_survie3, type: "survie", description: `Pierre Survie 3` },
    { id: team.pierre_benediction_survie4, type: "survie", description: `Pierre Survie 4` },
  ]
    .filter((pierre) => pierre.id)
    .map((pierre) => ({
      ...pierre,
      created_at: new Date().toISOString(), // Placeholder for missing property
      image: `path/to/image/${pierre.id}.png`, // Placeholder for missing property
      nom: `Pierre ${pierre.id}`,
    })),
  chasseurs: team.chasseurs.map((chasseur) => ({
    ...chasseur,
    noyaux: Object.values(chasseur.noyaux).flat(), // Flatten noyaux into an array
  })),
}));

const bossData = {
  nom: "Vulcan",
  image: "/images/images_boss/Vulcan_Boss_Portrait.png",
  faiblesse1: "fire",
  faiblesse2: "ice",
  puissance_facile: "350.000",
  puissance_normal: "400.000",
  puissance_difficile: "450.000",
};

// Replace dynamic boss fetching with static data
const boss = bossData;

export default function VulcanPage() {
  const [chasseurs, setChasseurs] = useState([]);
  const [artefacts, setArtefacts] = useState([]);
  const [noyaux, setNoyaux] = useState([]);
  const [ombres, setOmbres] = useState([]);
  const [setsBonus, setSetsBonus] = useState([]);
  const [armes, setArmes] = useState([]);
  const [competences, setCompetences] = useState([]);
  const [qtes, setQtes] = useState([]);
  const [pierres, setPierres] = useState([]);
  const [activeTab, setActiveTab] = useState("chasseurs");

  useEffect(() => {
    const fetchAll = async () => {
      const [
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
        fetchData(`buildsVulcanChasseur${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("chasseurs").select("*");
          return data || [];
        }),
        fetchData(`artefacts${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("artefacts").select("*");
          return data || [];
        }),
        fetchData(`noyaux${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("noyaux").select("*");
          return data || [];
        }),
        fetchData(`ombres${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("ombres").select("*");
          return data || [];
        }),
        fetchData(`setsBonus${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("sets_bonus").select("*");
          return data || [];
        }),
        fetchData(`armes${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("jinwoo_armes").select("*");
          return data || [];
        }),
        fetchData(`competences${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("jinwoo_competences").select("*");
          return data || [];
        }),
        fetchData(`qtes${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("jinwoo_qte").select("*");
          return data || [];
        }),
        fetchData(`pierres${CACHE_VERSION}`, async () => {
          const { data } = await supabase.from("pierres_benediction").select("*");
          return data || [];
        }),
      ]);

      setChasseurs(chasseursData);
      setArtefacts(artefactsData);
      setNoyaux(noyauxData);
      setOmbres(ombresData);
      setSetsBonus(setsBonusData);
      setArmes(armesData);
      setCompetences(competencesData);
      setQtes(qtesData);
      setPierres(pierresData);
    };

    fetchAll();
  }, []);

  return (
    <Layout>
      <div className="w-full max-w-[90rem] mx-auto px-6 py-6">
        <Link
          to="/atelier"
          className="mb-6 inline-flex items-center text-sm font-medium text-solo-purple hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à l'Atelier de la Lumière
        </Link>

        <Card className="bg-sidebar border-sidebar-border overflow-hidden mb-8">
          <CardHeader className="pb-0 pt-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl text-white mb-4 md:mb-0">
              {boss.nom}
            </CardTitle>
          </CardHeader>

          <CardContent className="grid md:grid-cols-2 gap-6 pt-6">
            <div className="flex items-center justify-center bg-sidebar-accent rounded-md p-4">
              <img
                src={boss.image}
                alt={boss.nom}
                className="w-full max-h-[300px] object-contain"
              />
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Swords className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-solo-purple flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground font-medium">
                      Puissance requise
                    </p>
                    <p className="text-base sm:text-xl md:text-2xl font-semibold text-white">
                      {boss.puissance_facile} ~ {boss.puissance_difficile}
                    </p>
                  </div>
                </div>

                <Separator className="bg-sidebar-border my-2" />

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-solo-purple flex-shrink-0" />
                    <p className="text-sm font-medium text-white">Faiblesses</p>
                  </div>

                  <div className="flex items-center gap-4 pl-10">
                    <img src={`/images/icons/${boss.faiblesse1}.svg`} alt={boss.faiblesse1} className="h-6 w-6" />
                    <img src={`/images/icons/${boss.faiblesse2}.svg`} alt={boss.faiblesse2} className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <ExpandedTeamProvider>
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
              <div>
                <h2 className="text-xl font-bold mb-4">Teams Chasseurs</h2>
                {transformedTeamVulcanChasseurs.map((team) => (
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
              </div>
            </TabsContent>

            <TabsContent value="jinwoo">
              <div>
                <h2 className="text-xl font-bold mt-8 mb-4">Teams Jinwoo</h2>
                {transformedTeamVulcanJinwoo.map((team) => (
                  <TeamJinwooCard
                    key={team.id}
                    team={team}
                    chasseurs={chasseurs}
                    artefacts={artefacts}
                    noyaux={noyaux}
                    ombres={ombres}
                    setsBonus={setsBonus}
                    armes={team.armes || []}
                    competences={team.competences || []}
                    qtes={team.qtes || []}
                    pierres={team.pierres || []}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ExpandedTeamProvider>
      </div>
    </Layout>
  );
}
