
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";

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
  const categorizeTiers = <T extends { nom: string; image?: string | null; element?: string | null; rarete?: string | null }>(
    items: T[]
  ) => {
    // This is a simplified tier assignment based on rarity
    const tierS: T[] = [];
    const tierA: T[] = [];
    const tierB: T[] = [];
    const tierC: T[] = [];

    items.forEach((item) => {
      // For hunters, use rarete if available
      const rarity = (item as Hunter).rarete;
      
      if (rarity === "SSR") tierS.push(item);
      else if (rarity === "SR") tierA.push(item);
      else if (rarity === "R") tierB.push(item);
      else tierC.push(item);
    });

    return { S: tierS, A: tierA, B: tierB, C: tierC };
  };

  const hunterTiers = huntersQuery.data ? categorizeTiers(huntersQuery.data) : { S: [], A: [], B: [], C: [] };
  const weaponTiers = weaponsQuery.data ? categorizeTiers(weaponsQuery.data) : { S: [], A: [], B: [], C: [] };

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
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={hunter.image || "/placeholder.svg"}
                          alt={hunter.nom}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{hunter.nom}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {hunter.element && (
                            <div className="flex items-center gap-1">
                              <img 
                                src={getElementImageUrl(hunter.element)} 
                                alt={hunter.element} 
                                className="h-4 w-4 object-cover"
                              />
                              <span className="text-xs text-muted-foreground">{hunter.element}</span>
                            </div>
                          )}
                          {hunter.rarete && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              {hunter.rarete}
                            </Badge>
                          )}
                        </div>
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
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={weapon.image || "/placeholder.svg"}
                          alt={weapon.nom}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-medium">{weapon.nom}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                          {weapon.element && (
                            <div className="flex items-center gap-1">
                              <img 
                                src={getElementImageUrl(weapon.element)} 
                                alt={weapon.element} 
                                className="h-4 w-4 object-cover"
                              />
                              <span className="text-xs text-muted-foreground">Élément: {weapon.element}</span>
                            </div>
                          )}
                          {weapon.arme_element && (
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-muted-foreground">Type: {weapon.arme_element}</span>
                            </div>
                          )}
                        </div>
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
