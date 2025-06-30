import { useState } from "react";
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
import SEO from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { useSupabaseFetch } from "@/lib";
import LazyImage from "@/lib/lazy";

// Types Supabase
type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Arme = Database["public"]["Tables"]["jinwoo_armes"]["Row"];
type Jinwoo = Database["public"]["Tables"]["jinwoo"]["Row"];

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "TierList";

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
      {/* Ajout du composant SEO */}
      <SEO
        title="Tier List - Solo Leveling: ARISE"
        description="Découvrez les meilleures tier lists pour Solo Leveling: ARISE. Trouvez les meilleurs chasseurs, armes et compositions d'équipes pour dominer le jeu."
        keywords="Solo Leveling, ARISE, tier list, chasseurs, armes, équipes, compositions, SLAGATE"
      />
      <div className="container mx-auto px-4 py-6 text-white">
        <div className="mb-6 space-y-2">
          <div className="bg-sidebar-accent p-6 rounded-lg shadow-md space-y-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-violet-400 text-center md:text-left">
              Bienvenue sur la page Tier List !
            </h1>
            <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
              Ici, vous trouverez les meilleurs chasseurs, les meilleures armes
              pour Sung Jinwoo, et les meilleures compositions d'équipes pour
              dominer tous les contenus du jeu.
            </p>
            <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
              Explorez les différentes catégories pour découvrir les équipes les
              plus performantes, qu'il s'agisse de compositions optimisées pour
              la "Puissance de Destruction" ou pour affronter le redoutable Boss
              de Guilde.
            </p>
            <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
              Que vous cherchiez à optimiser vos équipes ou à découvrir les
              chasseurs les plus puissants, cette section est faite pour vous
              guider.
            </p>
            {/* Dernières modifications */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 italic">
                <span className="text-white font-medium">
                  <LastModified date={lastModifiedDates.tierList} />
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <div className="mb-8">
          <ul className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0 justify-center md:justify-start">
            {tabs.map((tab) => {
              const isDisabled = tab === "Teams POD" || tab === "Teams BDG";
              return (
                <li
                  key={tab}
                  className={`cursor-pointer px-4 py-2 text-sm sm:text-base rounded-lg whitespace-nowrap transition-colors duration-200 ${
                    isDisabled
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : activeTab === tab
                      ? "bg-solo-purple text-white font-bold"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                  }`}
                  onClick={() => !isDisabled && setActiveTab(tab)}
                >
                  {isDisabled ? `${tab} (Prochainement)` : tab}
                </li>
              );
            })}
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

// Composant pour afficher l'image d'un chasseur avec lazy loading
const CachedHunterImage = ({ imageUrl, altText }: { imageUrl: string | null, altText: string }) => {
  return (
    <LazyImage
      src={imageUrl || ""}
      alt={altText}
      fallbackClassName="w-full h-full mx-auto rounded-full object-cover border-2 border-solo-purple/30 bg-gray-800"
      showSpinner={true}
    />
  );
};

// Composant pour afficher l'image d'une arme avec lazy loading
const CachedWeaponImage = ({ imageUrl, altText }: { imageUrl: string | null, altText: string }) => {
  return (
    <LazyImage
      src={imageUrl || ""}
      alt={altText}
      fallbackClassName="w-full h-full object-contain bg-gray-800"
      showSpinner={true}
    />
  );
};

function HuntersTab() {
  const navigate = useNavigate();
  const { data: chasseurs = [] } = useSupabaseFetch(
    "supabase:chasseurs",
    async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      return data || [];
    }
  );

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

  // Handler mis à jour pour naviguer vers le fragment d'ancrage approprié
  const handleHunterClick = (hunterId: number) => {
    navigate(`/builds#chasseur-${hunterId}`);
  };

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
                  className="relative bg-sidebar-accent rounded-lg shadow-md p-2 text-center hover:scale-[1.03] transition-transform border border-sidebar-border hover:border-solo-purple cursor-pointer"
                  onClick={() => handleHunterClick(Number(hunter.id))}
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
                    <CachedHunterImage 
                      imageUrl={hunter.image} 
                      altText={hunter.nom}
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
  const { data: armes = [] } = useSupabaseFetch(
    "supabase:armes",
    async () => {
      const { data } = await supabase.from("jinwoo_armes").select("*");
      return data || [];
    }
  );

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
                    <CachedWeaponImage
                      imageUrl={arme.image || ""}
                      altText={arme.nom}
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
  tiers: Record<string, { 
    id: number; 
    name: string; 
    hunters: number[];
    alternative?: {
      hunters: number[];
      description?: string;
    }
  }[]>;
  teamSize: 3 | 4;
}) {
  const { data: chasseurs = [] } = useSupabaseFetch(
    "supabase:chasseurs",
    async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      return data || [];
    }
  );
  // État pour suivre quelles équipes montrent leur alternative
  const [showingAlternative, setShowingAlternative] = useState<Set<number>>(new Set());
  
  // Fonction pour basculer entre la composition principale et l'alternative
  const toggleAlternative = (teamId: number) => {
    setShowingAlternative(prev => {
      const newSet = new Set(prev);
      if (newSet.has(teamId)) {
        newSet.delete(teamId);
      } else {
        newSet.add(teamId);
      }
      return newSet;
    });
  };

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
              {teams.map((team) => {
                const isShowingAlternative = showingAlternative.has(team.id);
                const currentHunters = isShowingAlternative && team.alternative 
                  ? team.alternative.hunters 
                  : team.hunters;
                
                return (
                <div key={team.id} className="mb-5">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold px-3 py-1.5 bg-sidebar-accent inline-block rounded-lg border border-sidebar-border">
                      {team.name}
                    </h3>
                      {/* Bouton d'alternative seulement si une alternative existe */}
                    {team.alternative && (
                      <button 
                        onClick={() => toggleAlternative(team.id)}
                        className={`px-3 py-1.5 text-sm rounded-lg border transition-colors flex items-center gap-1.5 font-medium ${
                          isShowingAlternative 
                            ? 'bg-solo-purple border-solo-purple text-white shadow-md' 
                            : 'bg-gray-700 border-gray-600 text-white hover:bg-solo-purple/70 hover:border-solo-purple/70 shadow-sm'
                        }`}
                      >
                        {/* Icône pour rendre le bouton plus visible */}
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="16" 
                          height="16" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                          className={isShowingAlternative ? "rotate-180 transition-transform" : "transition-transform"}
                        >
                          <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                          <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                          <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                          <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                          <path d="M12 8v8" />
                          <path d="m16 12-4 4-4-4" />
                        </svg>
                        {isShowingAlternative 
                          ? 'Composition principale' 
                          : 'Voir l\'alternative'
                        }
                      </button>
                    )}
                      {/* Afficher la description de l'alternative si disponible */}
                    {isShowingAlternative && team.alternative?.description && (
                      <span className="text-sm text-violet-300 italic px-2 py-1 bg-sidebar/50 rounded-md">
                        {team.alternative.description}
                      </span>
                    )}
                  </div>
                  
                  <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {currentHunters.map((hunterId) => {
                      const hunter = chasseurs.find(
                        (h) => Number(h.id) === hunterId
                      );
                      return (
                        hunter && (
                          <div
                            key={`${team.id}-${hunter.id}-${isShowingAlternative ? 'alt' : 'main'}`}
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
                              <CachedHunterImage 
                                imageUrl={hunter.image} 
                                altText={hunter.nom}
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
              )})}
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
  const { data: chasseurs = [] } = useSupabaseFetch(
    "supabase:chasseurs",
    async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      return data || [];
    }
  );

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
                              <CachedHunterImage
                                imageUrl={hunter.image}
                                altText={hunter.nom}
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
  const { data: chasseurs = [] } = useSupabaseFetch(
    "supabase:chasseurs",
    async () => {
      const { data } = await supabase.from("chasseurs").select("*");
      return data || [];
    }
  );

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
                              <CachedHunterImage
                                imageUrl={hunter.image}
                                altText={hunter.nom}
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
