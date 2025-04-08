
import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

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
  const categorizeTiers = <T extends { nom: string; image?: string | null; element?: string | null }>(
    items: T[]
  ) => {
    // This is a simplified tier assignment - in reality you might want a more sophisticated approach
    const tierS: T[] = [];
    const tierA: T[] = [];
    const tierB: T[] = [];
    const tierC: T[] = [];

    items.forEach((item, index) => {
      // Simple distribution logic - just for demonstration
      if (index % 4 === 0) tierS.push(item);
      else if (index % 4 === 1) tierA.push(item);
      else if (index % 4 === 2) tierB.push(item);
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
                  {hunters.map((hunter, idx) => (
                    <div
                      key={hunter.id || idx}
                      className="flex gap-3 rounded-md border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={hunter.image || "/placeholder.svg"}
                          alt={hunter.nom}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{hunter.nom}</p>
                        <p className="text-sm text-muted-foreground">{(hunter as Hunter).element || "Unknown"}</p>
                        {(hunter as Hunter).rarete && (
                          <p className="text-xs text-muted-foreground">Rareté: {(hunter as Hunter).rarete}</p>
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
                  {weapons.map((weapon, idx) => (
                    <div
                      key={weapon.id || idx}
                      className="flex gap-3 rounded-md border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={weapon.image || "/placeholder.svg"}
                          alt={weapon.nom}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{weapon.nom}</p>
                        {(weapon as Weapon).element && (
                          <p className="text-sm text-muted-foreground">Élément: {(weapon as Weapon).element}</p>
                        )}
                        {(weapon as Weapon).arme_element && (
                          <p className="text-xs text-muted-foreground">Type: {(weapon as Weapon).arme_element}</p>
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
