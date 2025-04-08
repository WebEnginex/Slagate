import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { hunterTiers } from "@/config/tier-list/chasseurs";
import { weaponTiers } from "@/config/tier-list/armes";
import { teamJinwooTiers } from "@/config/tier-list/teamsJinwoo";
import { teamChasseursTiers } from "@/config/tier-list/teamsChasseurs";
import Layout from "@/components/Layout";

// Types Supabase
type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Arme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];

const tabs = ["Chasseurs", "Armes", "Teams Jinwoo", "Teams Chasseurs"];

export default function TierListPage() {
  const [activeTab, setActiveTab] = useState("Chasseurs");

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-6">Tier List</h1>

        {/* Onglets de navigation */}
        <div className="flex flex-wrap gap-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl font-medium transition ${
                activeTab === tab ? "bg-white text-black" : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Affichage selon l'onglet actif */}
        {activeTab === "Chasseurs" && <HuntersTab />}
        {activeTab === "Armes" && <WeaponsTab />}
        {activeTab === "Teams Jinwoo" && <TeamsTab tiers={teamJinwooTiers} teamSize={4} />}
        {activeTab === "Teams Chasseurs" && <TeamsTab tiers={teamChasseursTiers} teamSize={3} />}
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
    <div className="space-y-10">
      {Object.entries(huntersByTier).map(([tier, hunters]) => (
        <div key={tier}>
          <h2 className="text-2xl font-bold mb-4">Tier {tier}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hunters.map((hunter) => (
              <div
                key={hunter.id}
                className="relative bg-[#1e1e2e] rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition"
              >
                <img
                  src={hunter.image || ""}
                  alt={hunter.nom}
                  className="w-20 h-20 mx-auto rounded-full object-cover"
                />
                {hunter.element && (
                  <img
                    src={hunter.element}
                    alt="Élément"
                    className="absolute top-2 left-2 w-6 h-6"
                  />
                )}
                <p className="font-medium mt-2 text-sm truncate">{hunter.nom}</p>
                <p className="text-xs text-gray-400">{hunter.rarete}</p>
              </div>
            ))}
          </div>
        </div>
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
    <div className="space-y-10">
      {Object.entries(armesByTier).map(([tier, armes]) => (
        <div key={tier}>
          <h2 className="text-2xl font-bold mb-4">Tier {tier}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {armes.map((arme) => (
              <div
                key={arme.id}
                className="relative bg-[#1e1e2e] rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition"
              >
                <img
                  src={arme.image || ""}
                  alt={arme.nom}
                  className="w-20 h-20 mx-auto rounded-full object-cover"
                />
                {arme.arme_element && (
                  <img
                    src={arme.arme_element}
                    alt="Élément"
                    className="absolute top-2 left-2 w-6 h-6"
                  />
                )}
                <p className="font-medium mt-2 text-sm truncate">{arme.nom}</p>
              </div>
            ))}
          </div>
        </div>
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
    <div className="space-y-10">
      {Object.entries(tiers).map(([tier, teams]) => (
        <div key={tier}>
          <h2 className="text-2xl font-bold mb-4">Tier {tier}</h2>
          <div className="space-y-6">
            {teams.map((team) => (
              <div key={team.id}>
                <p className="text-lg font-semibold mb-2">{team.name}</p>
                <div
                  className={`grid gap-4 ${
                    teamSize === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-3"
                  }`}
                >
                  {team.hunters.map((hunterId) => {
                    const hunter = chasseurs.find((h) => Number(h.id) === hunterId);
                    return (
                      hunter && (
                        <div
                          key={hunter.id}
                          className="relative bg-[#1e1e2e] rounded-2xl shadow-md p-3 text-center hover:scale-[1.03] transition"
                        >
                          <img
                            src={hunter.image || ""}
                            alt={hunter.nom}
                            className="w-20 h-20 mx-auto rounded-full object-cover"
                          />
                          {hunter.element && (
                            <img
                              src={hunter.element}
                              alt="Élément"
                              className="absolute top-2 left-2 w-6 h-6"
                            />
                          )}
                          <p className="font-medium mt-2 text-sm truncate">{hunter.nom}</p>
                        </div>
                      )
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
