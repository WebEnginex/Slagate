import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { hunterTiers } from "@/config/tier-list/chasseurs";
import { weaponTiers } from "@/config/tier-list/armes";
import { teamChasseursTiers } from "@/config/tier-list/teamsChasseurs";
import { teamPodTiers } from "@/config/tier-list/teamsPod";
import { teamBdgTiers } from "@/config/tier-list/teamBdg";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Flame, Sword } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";

// Types Supabase
type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Arme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];
type Jinwoo = Database["public"]["Tables"]["jinwoo"]["Row"];

const tabs = [
  "Chasseurs",
  "Armes",
  "Teams Chasseurs",
  "Teams POD",
  "Teams BDG",
];

export default function TierListPage() {
  const [activeTab, setActiveTab] = useState("Chasseurs");
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 text-white">
        <div className="mb-6 space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-solo-purple sm:h-6 sm:w-6 md:h-7 md:w-7" />
            <h1 className="text-3xl font-bold mb-1">Tier List</h1>
          </div>
          <Separator className="bg-sidebar-border" />
          <p className="text-muted-foreground text-sm md:text-base">
            Découvrez notre classement complet des chasseurs, armes et
            compositions d'équipe dans Solo Leveling: ARISE.
          </p>

          <p>
            {/* Ajout de la date de dernière modification */}
            <LastModified date={lastModifiedDates.tierList} />
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="mb-8">
          <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0 justify-center md:justify-start">
            {tabs.map((tab) => (
              <li
                key={tab}
                className={`cursor-pointer px-4 py-2 text-sm sm:text-base rounded-lg whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab
                    ? "bg-solo-purple text-white font-bold"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
        </div>

        {/* Contenu des onglets */}
        <div className="text-white text-left bg-transparent p-4 sm:p-6 rounded-lg shadow-md overflow-x-hidden">
          {activeTab === "Chasseurs" && <HuntersTab />}
          {activeTab === "Armes" && <WeaponsTab />}
          {activeTab === "Teams Chasseurs" && (
            <TeamsTab tiers={teamChasseursTiers} teamSize={3} />
          )}
          {activeTab === "Teams POD" && <TeamsPodTab tiers={teamPodTiers} />}
          {activeTab === "Teams BDG" && <TeamsBdgTab tiers={teamBdgTiers} />}
        </div>
      </div>
    </Layout>
  );
}

function HuntersTab() {
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);

  useEffect(() => {
    // Récupère tous les chasseurs depuis Supabase
    const fetchChasseurs = async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      if (data) setChasseurs(data);
    };
    fetchChasseurs();
  }, []);

  const huntersByTier = Object.entries(hunterTiers).reduce(
    (acc, [tier, ids]) => {
      // Filtrer les chasseurs par ID et les trier selon l'ordre des IDs dans hunterTiers
      acc[tier] = ids
        .map((id) => chasseurs.find((h) => Number(h.id) === id))
        .filter((hunter) => hunter !== undefined) as Chasseur[];
      return acc;
    },
    {} as Record<string, Chasseur[]>
  );

  return (
    <div className="space-y-8">
      {Object.entries(huntersByTier).map(([tier, hunters]) => (
        <Card
          key={tier}
          className="bg-sidebar border-sidebar-border overflow-hidden rounded-xl"
        >
          <div className="bg-sidebar-accent py-3 px-5 border-b border-sidebar-border">
            <h2 className="text-2xl font-bold text-white">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {hunters.map((hunter) => (
                <div
                  key={hunter.id}
                  className="relative bg-sidebar-accent rounded-lg shadow-md p-2 text-center hover:scale-[1.03] transition-transform border border-sidebar-border hover:border-solo-purple"
                >
                  {/* Élément icon en haut à gauche */}
                  {hunter.element && (
                    <div className="absolute top-2 left-2 z-10 w-6 h-6">
                      <img
                        src={hunter.element}
                        alt="Élément"
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {/* Image du chasseur */}
                  <div className="relative mx-auto w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 mb-2">
                    <img
                      src={hunter.image || ""}
                      alt={hunter.nom}
                      className="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30"
                    />
                  </div>

                  {/* Nom et rareté */}
                  <p className="font-medium mt-1 text-xs sm:text-sm truncate">
                    {hunter.nom}
                  </p>
                  <p className="text-xs text-gray-400">{hunter.rarete}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function WeaponsTab() {
  const [armes, setArmes] = useState<Arme[]>([]);

  useEffect(() => {
    // Récupère toutes les armes depuis Supabase
    const fetchArmes = async () => {
      const { data } = await supabase.from("jinwoo_armes").select("*");
      if (data) setArmes(data);
    };
    fetchArmes();
  }, []);

  const armesByTier = Object.entries(weaponTiers).reduce((acc, [tier, ids]) => {
    // Trier les armes selon l'ordre des IDs dans weaponTiers
    acc[tier] = ids
      .map((id) => armes.find((arme) => Number(arme.id) === id))
      .filter((arme) => arme !== undefined) as Arme[];
    return acc;
  }, {} as Record<string, Arme[]>);

  return (
    <div className="space-y-8">
      {Object.entries(armesByTier).map(([tier, armes]) => (
        <Card
          key={tier}
          className="bg-sidebar border-sidebar-border overflow-hidden rounded-xl"
        >
          <div className="bg-sidebar-accent py-3 px-5 border-b border-sidebar-border">
            <h2 className="text-2xl font-bold text-white">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {armes.map((arme) => (
                <div
                  key={arme.id}
                  className="relative bg-sidebar-accent rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition-transform border border-sidebar-border hover:border-solo-purple"
                >
                  {/* Élément icon en haut à gauche */}
                  {arme.arme_element && (
                    <div className="absolute top-2 left-2 z-10 w-7 h-7">
                      <img
                        src={arme.arme_element}
                        alt="Élément"
                        className="w-6 h-6"
                      />
                    </div>
                  )}

                  <div className="relative mx-auto w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mb-2">
                    <img
                      src={arme.image || ""}
                      alt={arme.nom}
                      className="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30"
                    />
                  </div>
                  <p className="font-medium mt-1 text-xs sm:text-sm truncate">
                    {arme.nom}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeamsTab({
  tiers,
  teamSize,
}: {
  tiers: Record<string, { id: number; name: string; hunters: number[] }[]>;
  teamSize: 3 | 4;
}) {
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);

  useEffect(() => {
    const fetchChasseurs = async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      if (data) setChasseurs(data);
    };
    fetchChasseurs();
  }, []);

  return (
    <div className="space-y-8">
      {Object.entries(tiers).map(([tier, teams]) => (
        <Card
          key={tier}
          className="bg-sidebar border-sidebar-border overflow-hidden rounded-xl"
        >
          <div className="bg-sidebar-accent py-3 px-5 border-b border-sidebar-border">
            <h2 className="text-2xl font-bold text-white">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id} className="mb-5">
                  <h3 className="text-lg font-semibold mb-3 px-3 py-1.5 bg-sidebar-accent inline-block rounded-lg border border-sidebar-border">
                    {team.name}
                  </h3>
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {team.hunters.map((hunterId) => {
                      const hunter = chasseurs.find(
                        (h) => Number(h.id) === hunterId
                      );
                      return (
                        hunter && (
                          <div
                            key={hunter.id}
                            className="relative bg-sidebar-accent rounded-lg shadow-md p-3 text-center hover:scale-[1.03] transition-transform border border-sidebar-border hover:border-solo-purple"
                          >
                            {/* Élément icon en haut à gauche */}
                            {hunter.element && (
                              <div className="absolute top-2 left-2 z-10 w-6 h-6">
                                <img
                                  src={hunter.element}
                                  alt="Élément"
                                  className="w-full h-full"
                                />
                              </div>
                            )}

                            {/* Image du chasseur */}
                            <div className="relative mx-auto w-14 sm:w-16 md:w-20 h-14 sm:h-16 md:h-20 mb-2">
                              <img
                                src={hunter.image || ""}
                                alt={hunter.nom}
                                className="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30"
                              />
                            </div>

                            {/* Nom et rareté */}
                            <p className="font-medium mt-1 text-xs sm:text-sm truncate">
                              {hunter.nom}
                            </p>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeamsPodTab({
  tiers,
}: {
  tiers: Record<string, { id: number; name: string; hunters: number[] }[]>;
}) {
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);

  useEffect(() => {
    const fetchChasseurs = async () => {
      const { data: chasseursData } = await supabase
        .from("chasseurs")
        .select("*");
      if (chasseursData) setChasseurs(chasseursData);
    };

    fetchChasseurs();
  }, []);

  return (
    <div className="space-y-8">
      {Object.entries(tiers).map(([tier, teams]) => (
        <Card
          key={tier}
          className="bg-sidebar border-sidebar-border overflow-hidden rounded-xl"
        >
          <div className="bg-sidebar-accent py-3 px-5 border-b border-sidebar-border">
            <h2 className="text-2xl font-bold text-white">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id} className="mb-5">
                  <h3 className="text-lg font-semibold mb-3 px-3 py-1.5 bg-sidebar-accent inline-block rounded-lg border border-sidebar-border">
                    {team.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {team.hunters.map((hunterId) => {
                      const hunter = chasseurs.find((h) => h.id === hunterId);
                      return (
                        hunter && (
                          <div
                            key={hunter.id}
                            className="relative bg-sidebar-accent rounded-2xl shadow-md p-3 text-center border border-sidebar-border hover:border-solo-purple hover:scale-[1.03] transition-transform"
                          >
                            {hunter.element && (
                              <div className="absolute top-2 left-2 z-10 w-7 h-7">
                                <img
                                  src={hunter.element}
                                  alt="Élément"
                                  className="w-6 h-6"
                                />
                              </div>
                            )}
                            <div className="relative mx-auto w-16 sm:w-20 h-16 sm:h-20 mb-2">
                              <img
                                src={hunter.image || ""}
                                alt={hunter.nom}
                                className="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30"
                              />
                            </div>
                            <p className="font-medium mt-1 text-xs sm:text-sm truncate">
                              {hunter.nom}
                            </p>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeamsBdgTab({
  tiers,
}: {
  tiers: Record<string, { id: number; name: string; hunters: number[] }[]>;
}) {
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);

  useEffect(() => {
    const fetchChasseurs = async () => {
      const { data: chasseursData } = await supabase
        .from("chasseurs")
        .select("*");
      if (chasseursData) setChasseurs(chasseursData);
    };

    fetchChasseurs();
  }, []);

  return (
    <div className="space-y-8">
      {Object.entries(tiers).map(([tier, teams]) => (
        <Card
          key={tier}
          className="bg-sidebar border-sidebar-border overflow-hidden rounded-xl"
        >
          <div className="bg-sidebar-accent py-3 px-5 border-b border-sidebar-border">
            <h2 className="text-2xl font-bold text-white">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id} className="mb-5">
                  <h3 className="text-lg font-semibold mb-3 px-3 py-1.5 bg-sidebar-accent inline-block rounded-lg border border-sidebar-border">
                    {team.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {team.hunters.map((hunterId) => {
                      const hunter = chasseurs.find((h) => h.id === hunterId);
                      return (
                        hunter && (
                          <div
                            key={hunter.id}
                            className="relative bg-sidebar-accent rounded-2xl shadow-md p-3 text-center border border-sidebar-border hover:border-solo-purple hover:scale-[1.03] transition-transform"
                          >
                            {hunter.element && (
                              <div className="absolute top-2 left-2 z-10 w-7 h-7">
                                <img
                                  src={hunter.element}
                                  alt="Élément"
                                  className="w-6 h-6"
                                />
                              </div>
                            )}
                            <div className="relative mx-auto w-16 sm:w-20 h-16 sm:h-20 mb-2">
                              <img
                                src={hunter.image || ""}
                                alt={hunter.nom}
                                className="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30"
                              />
                            </div>
                            <p className="font-medium mt-1 text-xs sm:text-sm truncate">
                              {hunter.nom}
                            </p>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
