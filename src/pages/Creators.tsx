
import React from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExternalLink, Youtube, Twitch, Twitter, Instagram, ChevronDown, ChevronUp } from "lucide-react";

// Types pour les réseaux sociaux
type SocialLink = {
  type: "youtube" | "twitch" | "twitter" | "instagram" | "website";
  url: string;
  label: string;
};

const Creators = () => {
  // Données pour les réseaux sociaux de Sohoven
  const socialLinks: SocialLink[] = [
    { 
      type: "youtube", 
      url: "https://www.youtube.com/@Sohoven", 
      label: "Sohoven" 
    },
    { 
      type: "twitch", 
      url: "https://www.twitch.tv/sohoven", 
      label: "sohoven" 
    },
    { 
      type: "twitter", 
      url: "https://x.com/Soho_ven", 
      label: "@Soho_ven" 
    },
    { 
      type: "instagram", 
      url: "https://www.instagram.com/sohoven", 
      label: "sohoven" 
    },
    { 
      type: "website", 
      url: "https://creator.netmarble.com/en/sololv/ranking/sohoven", 
      label: "Page créateur" 
    },
  ];

  // Étapes du guide
  const steps = [
    {
      title: "Se connecter au site Netmarble Creator",
      description: "Accédez à la page du créateur que vous souhaitez supporter. Par exemple, pour Sohoven :",
      action: "https://creator.netmarble.com/en/sololv/ranking/sohoven",
      actionText: "Visiter la page de Sohoven",
      image: "/placeholder.svg"
    },
    {
      title: "Accéder à votre profil",
      description: "Cliquez sur le bouton en haut à droite pour ouvrir le menu, puis allez dans \"My Page\".",
      image: "/placeholder.svg"
    },
    {
      title: "Lier votre compte de jeu",
      description: "Cliquez sur le bouton \"Link Game Account\" puis \"Link account\" pour lier votre compte Solo Leveling: Arise.",
      image: "/placeholder.svg"
    },
    {
      title: "Retourner sur la page du créateur",
      description: "Revenez sur la page du créateur que vous souhaitez supporter.",
      action: "https://creator.netmarble.com/en/sololv/ranking/sohoven",
      actionText: "Retour à la page de Sohoven",
      image: "/placeholder.svg"
    },
    {
      title: "Supporter le créateur",
      description: "Cliquez sur le bouton \"Support\", acceptez les conditions et cliquez sur \"Yes\".",
      image: "/placeholder.svg"
    }
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
      case "instagram":
        return <Instagram className="h-5 w-5" />;
      case "website":
        return <ExternalLink className="h-5 w-5" />;
    }
  };

  const [openStep, setOpenStep] = React.useState<number | null>(0);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Soutenir un créateur</h1>
        <p className="text-muted-foreground">
          Suivez ce guide pour apprendre comment supporter vos créateurs de contenu préférés pour Solo Leveling: Arise sur le site Netmarble Creator.
        </p>
      </div>

      {/* Section réseaux sociaux de Sohoven */}
      <Card className="mb-8 overflow-hidden bg-gradient-to-r from-solo-purple to-solo-dark-purple">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="aspect-square w-32 h-32 overflow-hidden rounded-full bg-muted border-4 border-white/10">
              <img
                src="/placeholder.svg"
                alt="Sohoven"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">Sohoven</h2>
              <p className="text-muted-foreground mb-4">
                Créateur de contenu français pour Solo Leveling: Arise
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {socialLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    size="sm"
                    className="gap-2 bg-white/10 hover:bg-white/20 transition-colors"
                    asChild
                  >
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getSocialIcon(link.type)}
                      <span>{link.label}</span>
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Guide étape par étape */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Guide étape par étape</h2>
        
        {steps.map((step, index) => (
          <Card key={index} className="overflow-hidden">
            <Collapsible open={openStep === index} onOpenChange={() => toggleStep(index)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="p-6 cursor-pointer flex flex-row items-center justify-between hover:bg-muted/20">
                  <div>
                    <CardTitle className="flex items-center">
                      <span className="bg-solo-purple text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                        {index + 1}
                      </span>
                      {step.title}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Cliquez pour voir les détails
                    </CardDescription>
                  </div>
                  {openStep === index ? 
                    <ChevronUp className="h-5 w-5 text-muted-foreground" /> : 
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  }
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3 aspect-video bg-muted rounded-lg overflow-hidden">
                      <img
                        src={step.image}
                        alt={`Étape ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      {step.action && (
                        <Button asChild>
                          <a href={step.action} target="_blank" rel="noopener noreferrer">
                            {step.actionText}
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Avantages de supporter un créateur</CardTitle>
          <CardDescription>
            Supporter un créateur permet non seulement de l'aider financièrement, mais aussi de bénéficier d'avantages dans le jeu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Le créateur obtient une commission sur vos achats dans le jeu</li>
            <li>Vous recevez des récompenses en jeu pour votre soutien</li>
            <li>Vous contribuez à la création de contenu de qualité pour la communauté</li>
          </ul>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Creators;
