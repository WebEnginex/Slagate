
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Youtube, Twitch, Twitter } from "lucide-react";

// Types pour nos créateurs de contenu
type SocialLink = {
  type: "youtube" | "twitch" | "twitter" | "website";
  url: string;
};

type Creator = {
  name: string;
  image: string;
  description: string;
  specialization: string[];
  socialLinks: SocialLink[];
};

const Creators = () => {
  // Données fictives pour nos créateurs de contenu
  const creators: Creator[] = [
    {
      name: "GamingWithSunbae",
      image: "/placeholder.svg",
      description:
        "Créateur de guides de progression et d'optimisation pour les joueurs F2P. Spécialisé dans les analyses de meta et les stratégies d'économie de ressources.",
      specialization: ["Guides", "F2P", "Tier Lists"],
      socialLinks: [
        { type: "youtube", url: "https://youtube.com/example" },
        { type: "twitter", url: "https://twitter.com/example" },
      ],
    },
    {
      name: "AriseWithZeals",
      image: "/placeholder.svg",
      description:
        "Streamer quotidien de Solo Leveling: Arise. Propose des sessions de questions-réponses et des avis détaillés sur les nouveaux personnages.",
      specialization: ["Streams", "Nouveautés", "Challenges"],
      socialLinks: [
        { type: "twitch", url: "https://twitch.tv/example" },
        { type: "youtube", url: "https://youtube.com/example" },
      ],
    },
    {
      name: "JinWooMaster",
      image: "/placeholder.svg",
      description:
        "Joueur de haut niveau spécialisé dans le contenu PvP. Partage des astuces avancées et des analyses de méta pour dominer en arène.",
      specialization: ["PvP", "Builds", "Stratégies"],
      socialLinks: [
        { type: "youtube", url: "https://youtube.com/example" },
        { type: "twitch", url: "https://twitch.tv/example" },
        { type: "twitter", url: "https://twitter.com/example" },
      ],
    },
    {
      name: "AriseFR",
      image: "/placeholder.svg",
      description:
        "Principale source d'information en français sur Solo Leveling: Arise. Guides détaillés pour tous les niveaux de jeu.",
      specialization: ["Guides en français", "Communauté FR", "Tutoriels"],
      socialLinks: [
        { type: "youtube", url: "https://youtube.com/example" },
        { type: "website", url: "https://example.com" },
      ],
    },
  ];

  // Fonction pour afficher l'icône correspondant au type de lien social
  const getSocialIcon = (type: SocialLink["type"]) => {
    switch (type) {
      case "youtube":
        return <Youtube className="h-5 w-5" />;
      case "twitch":
        return <Twitch className="h-5 w-5" />;
      case "twitter":
        return <Twitter className="h-5 w-5" />;
      case "website":
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Créateurs de Contenu</h1>
        <p className="text-muted-foreground">
          Découvrez les meilleurs créateurs de contenu de Solo Leveling: Arise qui partagent des 
          guides, astuces et analyses pour améliorer votre expérience de jeu.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {creators.map((creator, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="aspect-square w-full overflow-hidden bg-muted md:w-1/3">
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <CardHeader>
                  <CardTitle>{creator.name}</CardTitle>
                  <CardDescription>
                    {creator.specialization.join(" • ")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{creator.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {creator.socialLinks.map((link, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {getSocialIcon(link.type)}
                          <span className="capitalize">{link.type}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Proposez votre chaîne</CardTitle>
          <CardDescription>
            Vous êtes créateur de contenu pour Solo Leveling: Arise et souhaitez apparaître sur cette page?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Nous cherchons constamment à enrichir cette liste avec des créateurs de qualité.
            Envoyez-nous un message avec vos informations et liens pour être considéré pour cette page.
          </p>
          <Button className="mt-4" variant="default">
            Contactez-nous
          </Button>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Creators;
