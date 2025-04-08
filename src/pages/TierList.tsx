
import React from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const TierList = () => {
  // Données fictives pour notre tier list
  const characterTiers = {
    S: [
      { name: "Sung Jin-Woo", role: "DPS", img: "/placeholder.svg" },
      { name: "Cha Hae-In", role: "Support", img: "/placeholder.svg" },
      { name: "Go Gun-Hee", role: "Tank", img: "/placeholder.svg" },
    ],
    A: [
      { name: "Hwang Dong-Su", role: "DPS", img: "/placeholder.svg" },
      { name: "Baek Yoonho", role: "Tank", img: "/placeholder.svg" },
      { name: "Yu Jin-Ho", role: "Support", img: "/placeholder.svg" },
      { name: "Choi Jong-In", role: "Mage", img: "/placeholder.svg" },
    ],
    B: [
      { name: "Lee Joohee", role: "Healer", img: "/placeholder.svg" },
      { name: "Min Byung-Gu", role: "Support", img: "/placeholder.svg" },
      { name: "Woo Jin-Chul", role: "Tank", img: "/placeholder.svg" },
    ],
    C: [
      { name: "Park Heejin", role: "DPS", img: "/placeholder.svg" },
      { name: "Yoo Jinho", role: "Support", img: "/placeholder.svg" },
    ],
  };

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
          <TabsTrigger value="artifacts">Artefacts</TabsTrigger>
        </TabsList>

        <TabsContent value="characters" className="space-y-6">
          {Object.entries(characterTiers).map(([tier, characters]) => (
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
                  {characters.map((char, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 rounded-md border p-3 transition-colors hover:bg-secondary"
                    >
                      <div className="h-12 w-12 overflow-hidden rounded-md bg-muted">
                        <img
                          src={char.img}
                          alt={char.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{char.name}</p>
                        <p className="text-sm text-muted-foreground">{char.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="weapons">
          <Card>
            <CardHeader>
              <CardTitle>Tier List des Armes</CardTitle>
              <CardDescription>
                Cette section est en cours de développement. Revenez bientôt pour consulter le classement des meilleures armes du jeu.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>

        <TabsContent value="artifacts">
          <Card>
            <CardHeader>
              <CardTitle>Tier List des Artefacts</CardTitle>
              <CardDescription>
                Cette section est en cours de développement. Revenez bientôt pour consulter le classement des meilleurs artefacts du jeu.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Note sur la Tier List</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Cette tier list est basée sur les performances générales des hunters dans le contenu PvE et PvP. 
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
