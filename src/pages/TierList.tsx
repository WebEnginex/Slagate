import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { hunterTiers } from "@/config/tier-list/chasseurs";
import { weaponTiers } from "@/config/tier-list/armes";
import { teamJinwooTiers } from "@/config/tier-list/teamsJinwoo";
import { teamChasseursTiers } from "@/config/tier-list/teamsChasseurs";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

// Types Supabase
type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Arme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];
type Jinwoo = Database["public"]["Tables"]["jinwoo"]["Row"];

const tabs = ["Chasseurs", "Armes", "Teams Jinwoo", "Teams Chasseurs"];

export default function TierListPage() {
  const [activeTab, setActiveTab] = useState("Chasseurs");
  const isMobile = useIsMobile();

  return (
    <Layout>
      <div className="container max-w-6xl mx-auto px-4 py-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Tier List</h1>

        {/* Tabs navigation using shadcn/ui */}
        <Tabs
          defaultValue="Chasseurs"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full flex flex-wrap mb-6 bg-card/30 rounded-xl">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 py-3 text-base data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="Chasseurs">
            <HuntersTab />
          </TabsContent>
          <TabsContent value="Armes">
            <WeaponsTab />
          </TabsContent>
          <TabsContent value="Teams Jinwoo">
            <TeamsJinwooTab tiers={teamJinwooTiers} />
          </TabsContent>
          <TabsContent value="Teams Chasseurs">
            <TeamsTab tiers={teamChasseursTiers} teamSize={3} />
          </TabsContent>
        </Tabs>
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

  const huntersByTier = Object.entries(hunterTiers).reduce((acc, [tier, ids]) => {
    acc[tier] = chasseurs.filter((h) => ids.includes(Number(h.id)));
    return acc;
  }, {} as Record<string, Chasseur[]>);

  return (
    <div className="space-y-8">
      {Object.entries(huntersByTier).map(([tier, hunters]) => (
        <Card key={tier} className="bg-card/50 border-primary/20 overflow-hidden rounded-xl">
          <div className="bg-muted/30 py-3 px-5 border-b border-primary/10">
            <h2 className="text-2xl font-bold">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {hunters.map((hunter) => (
                <div
                  key={hunter.id}
                  className="relative bg-card rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition-transform border border-primary/10 hover:border-primary/30"
                >
                  {/* Element icon positioned at top-left of the card */}
                  {hunter.element && (
                    <div className="absolute top-2 left-2 z-10 w-7 h-7">
                      <img
                        src={hunter.element}
                        alt="Élément"
                        className="w-6 h-6"
                      />
                    </div>
                  )}
                  
                  <div className="relative mx-auto w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mb-2">
                    <img
                      src={hunter.image || ""}
                      alt={hunter.nom}
                      className="w-full h-full mx-auto rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <p className="font-medium mt-1 text-xs sm:text-sm truncate">{hunter.nom}</p>
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
    acc[tier] = armes.filter((a) => ids.includes(Number(a.id)));
    return acc;
  }, {} as Record<string, Arme[]>);

  return (
    <div className="space-y-8">
      {Object.entries(armesByTier).map(([tier, armes]) => (
        <Card key={tier} className="bg-card/50 border-primary/20 overflow-hidden rounded-xl">
          <div className="bg-muted/30 py-3 px-5 border-b border-primary/10">
            <h2 className="text-2xl font-bold">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {armes.map((arme) => (
                <div
                  key={arme.id}
                  className="relative bg-card rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition-transform border border-primary/10 hover:border-primary/30"
                >
                  {/* Element icon positioned at top-left of the card */}
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
                      className="w-full h-full mx-auto rounded-full object-cover border-2 border-primary/20"
                    />
                  </div>
                  <p className="font-medium mt-1 text-xs sm:text-sm truncate">{arme.nom}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function TeamsJinwooTab({
  tiers,
}: {
  tiers: Record<string, { id: number; name: string; jinwoo: number; hunters: number[] }[]>;
}) {
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);
  const [jinwoo, setJinwoo] = useState<Jinwoo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: chasseursData } = await supabase.from("chasseurs").select("*");
      const { data: jinwooData } = await supabase.from("jinwoo").select("*").single();

      if (chasseursData) setChasseurs(chasseursData);
      if (jinwooData) setJinwoo(jinwooData);
    };

    fetchData();
  }, []);

  if (!jinwoo) return <p>Chargement...</p>;

  return (
    <div className="space-y-8">
      {Object.entries(tiers).map(([tier, teams]) => (
        <Card key={tier} className="bg-card/50 border-primary/20 overflow-hidden rounded-xl">
          <div className="bg-muted/30 py-3 px-5 border-b border-primary/10">
            <h2 className="text-2xl font-bold">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id} className="mb-5">
                  <h3 className="text-lg font-semibold mb-3 px-2 py-1 bg-primary/10 inline-block rounded-lg">
                    {team.name}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {/* Afficher Sung Jin Woo */}
                    <div className="relative bg-card rounded-2xl shadow-md p-3 text-center border border-primary/10">
                      <div className="relative mx-auto w-16 sm:w-20 h-16 sm:h-20 mb-2">
                        <img
                          src={jinwoo.image}
                          alt={jinwoo.nom}
                          className="w-full h-full mx-auto rounded-full object-cover border-2 border-primary/20"
                        />
                      </div>
                      <p className="font-medium mt-1 text-xs sm:text-sm truncate">{jinwoo.nom}</p>
                    </div>

                    {/* Afficher les chasseurs */}
                    {team.hunters.map((hunterId) => {
                      const hunter = chasseurs.find((h) => h.id === hunterId);
                      return (
                        hunter && (
                          <div
                            key={hunter.id}
                            className="relative bg-card rounded-2xl shadow-md p-3 text-center border border-primary/10"
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
                                className="w-full h-full mx-auto rounded-full object-cover border-2 border-primary/20"
                              />
                            </div>
                            <p className="font-medium mt-1 text-xs sm:text-sm truncate">{hunter.nom}</p>
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
        <Card key={tier} className="bg-card/50 border-primary/20 overflow-hidden rounded-xl">
          <div className="bg-muted/30 py-3 px-5 border-b border-primary/10">
            <h2 className="text-2xl font-bold">Tier {tier}</h2>
          </div>
          <CardContent className="p-4 md:p-6">
            <div className="space-y-6">
              {teams.map((team) => (
                <div key={team.id} className="mb-5">
                  <h3 className="text-lg font-semibold mb-3 px-2 py-1 bg-primary/10 inline-block rounded-lg">
                    {team.name}
                  </h3>
                  <div
                    className={`grid gap-3 ${
                      teamSize === 4 
                        ? "grid-cols-2 sm:grid-cols-4" 
                        : "grid-cols-1 sm:grid-cols-3"
                    }`}
                  >
                    {team.hunters.map((hunterId) => {
                      const hunter = chasseurs.find((h) => Number(h.id) === hunterId);
                      return (
                        hunter && (
                          <div
                            key={hunter.id}
                            className="relative bg-card rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition-transform border border-primary/10 hover:border-primary/30"
                          >
                            {/* Element icon positioned at top-left of the card */}
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
                                className="w-full h-full mx-auto rounded-full object-cover border-2 border-primary/20"
                              />
                            </div>
                            <p className="font-medium mt-1 text-xs sm:text-sm truncate">{hunter.nom}</p>
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