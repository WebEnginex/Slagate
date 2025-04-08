
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Types for our data
type Hunter = {
  id: string;
  nom: string;
  image: string | null;
  element: string | null;
  rarete: string | null;
};

type Weapon = {
  id: string;
  nom: string;
  image: string | null;
  element: string | null;
  arme_element: string | null;
};

// Get the element image URL based on element name
const getElementImageUrl = (element: string | null): string => {
  if (!element) return "/placeholder.svg";
  
  // Map element names to their image URLs
  const elementMap: Record<string, string> = {
    "Eau": "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements/Eau_element.webp",
    "Feu": "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements/Feu_element.webp",
    "Vent": "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements/Vent_element.webp",
    "Lumière": "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements/Lumiere_element.webp",
    "Ténèbres": "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements/Tenebres_element.webp",
    // Add other elements as needed
  };

  return elementMap[element] || "/placeholder.svg";
};

// Fetch functions
const fetchHunters = async (): Promise<Hunter[]> => {
  const { data, error } = await supabase.from("chasseurs").select("*");
  if (error) {
    console.error("Error fetching hunters:", error);
    throw error;
  }
  return data || [];
};

const fetchWeapons = async (): Promise<Weapon[]> => {
  const { data, error } = await supabase.from("jinwoo_armes").select("*");
  if (error) {
    console.error("Error fetching weapons:", error);
    throw error;
  }
  return data || [];
};

// Tier list component
const TierList = () => {
  // Using react-query to fetch data
  const huntersQuery = useQuery({
    queryKey: ["hunters"],
    queryFn: fetchHunters,
  });

  const weaponsQuery = useQuery({
    queryKey: ["weapons"],
    queryFn: fetchWeapons,
  });

  // Categorization of hunters/weapons into tiers
  const categorizeHunterTiers = (hunters: Hunter[]) => {
    // This is a simplified tier assignment based on rarity
    const tierS: Hunter[] = [];
    const tierA: Hunter[] = [];
    const tierB: Hunter[] = [];
    const tierC: Hunter[] = [];

    hunters.forEach((hunter) => {
      if (hunter.rarete === "SSR") tierS.push(hunter);
      else if (hunter.rarete === "SR") tierA.push(hunter);
      else if (hunter.rarete === "R") tierB.push(hunter);
      else tierC.push(hunter);
    });

    return { S: tierS, A: tierA, B: tierB, C: tierC };
  };
  
  const categorizeWeaponTiers = (weapons: Weapon[]) => {
    // This is a simplified tier assignment for weapons
    const tierS: Weapon[] = [];
    const tierA: Weapon[] = [];
    const tierB: Weapon[] = [];
    const tierC: Weapon[] = [];

    // Simplistic categorization for demonstration
    weapons.forEach((weapon, index) => {
      if (index % 4 === 0) tierS.push(weapon);
      else if (index % 3 === 0) tierA.push(weapon);
      else if (index % 2 === 0) tierB.push(weapon);
      else tierC.push(weapon);
    });

    return { S: tierS, A: tierA, B: tierB, C: tierC };
  };

  const hunterTiers = huntersQuery.data ? categorizeHunterTiers(huntersQuery.data) : { S: [], A: [], B: [], C: [] };
  const weaponTiers = weaponsQuery.data ? categorizeWeaponTiers(weaponsQuery.data) : { S: [], A: [], B: [], C: [] };

  // Loading state for both queries
  if (huntersQuery.isLoading || weaponsQuery.isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p className="text-lg">Chargement des données...</p>
        </div>
      </Layout>
    );
  }

  // Error state for either query
  if (huntersQuery.error || weaponsQuery.error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg text-red-500">Erreur de chargement des données</p>
          <p className="text-sm text-muted-foreground">Veuillez réessayer ultérieurement</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Tier List des Hunters</h1>
        <p className="text-muted-foreground">
          Classement complet des hunters de Solo Leveling: Arise basé sur leurs performances en PVE et PVP.
          Mise à jour régulièrement pour refléter les changements de meta.
        </p>
      </div>

      <Tabs defaultValue="characters" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="characters">Personnages</TabsTrigger>
          <TabsTrigger value="weapons">Armes</TabsTrigger>
        </TabsList>

        <TabsContent value="characters" className="space-y-6">
          {Object.entries(hunterTiers).map(([tier, hunters]) => (
            <Card key={tier} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-solo-purple/20 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-solo-purple font-bold text-white">
                    {tier}
                  </div>
                  <CardTitle>Tier {tier}</CardTitle>
                </div>
                <CardDescription>
                  {tier === "S"
                    ? "Les meilleurs hunters du jeu, dominants dans presque tous les contenus"
                    : tier === "A"
                    ? "Très bons hunters, polyvalents et efficaces dans la plupart des situations"
                    : tier === "B"
                    ? "Hunters solides mais avec quelques limitations"
                    : "Hunters plus faibles, à utiliser avec précaution"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {hunters.map((hunter) => (
                    <div
                      key={hunter.id}
                      className="flex gap-3 rounded-md border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="relative">
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={hunter.image || "/placeholder.svg"}
                            alt={hunter.nom}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {hunter.element && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full overflow-hidden border-2 border-background bg-white">
                                  <img
                                    src={getElementImageUrl(hunter.element)}
                                    alt={hunter.element}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Élément: {hunter.element}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{hunter.nom}</p>
                        {hunter.rarete && (
                          <Badge variant="outline" className="text-xs mt-1 w-fit">
                            {hunter.rarete}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="weapons" className="space-y-6">
          {Object.entries(weaponTiers).map(([tier, weapons]) => (
            <Card key={tier} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-solo-purple/20 to-transparent">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-md bg-solo-purple font-bold text-white">
                    {tier}
                  </div>
                  <CardTitle>Tier {tier}</CardTitle>
                </div>
                <CardDescription>
                  {tier === "S"
                    ? "Les armes les plus puissantes du jeu"
                    : tier === "A"
                    ? "Très bonnes armes pour la plupart des contenus"
                    : tier === "B"
                    ? "Armes efficaces dans certaines situations"
                    : "Armes de base ou plus faibles"} 
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {weapons.map((weapon) => (
                    <div
                      key={weapon.id}
                      className="flex gap-3 rounded-md border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="relative">
                        <div className="h-16 w-16 overflow-hidden rounded-md bg-muted">
                          <img
                            src={weapon.image || "/placeholder.svg"}
                            alt={weapon.nom}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {weapon.element && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div className="absolute -top-2 -left-2 h-6 w-6 rounded-full overflow-hidden border-2 border-background bg-white">
                                  <img
                                    src={getElementImageUrl(weapon.element)}
                                    alt={weapon.element}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Élément: {weapon.element}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{weapon.nom}</p>
                        {weapon.arme_element && (
                          <span className="text-xs text-muted-foreground mt-1">
                            Type: {weapon.arme_element}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Note sur la Tier List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Cette tier list est basée sur les performances générales des hunters et armes dans le contenu PvE et PvP. 
            Notez que certains hunters peuvent être plus performants dans des contenus spécifiques ou avec 
            certaines compositions d'équipe, même s'ils sont classés dans un tier inférieur.
          </p>
          <p className="mt-4">
            Nous mettons à jour cette liste régulièrement après les patchs majeurs du jeu 
            pour refléter les changements d'équilibrage.
          </p>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default TierList;
