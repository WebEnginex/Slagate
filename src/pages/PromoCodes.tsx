import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ExternalLink, Youtube, Twitch, Twitter, Instagram, ChevronDown, ChevronUp, X } from "lucide-react";

// Types pour les réseaux sociaux
type SocialLink = {
  type: "youtube" | "twitch" | "twitter" | "instagram" | "website";
  url: string;
  label: string;
};

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

const Creators = () => {
  const socialLinks: SocialLink[] = [
    { type: "youtube", url: "https://www.youtube.com/@Sohoven", label: "Sohoven" },
    { type: "twitch", url: "https://www.twitch.tv/sohoven", label: "sohoven" },
    { type: "twitter", url: "https://x.com/Soho_ven", label: "@Soho_ven" },
    { type: "instagram", url: "https://www.instagram.com/sohoven", label: "sohoven" },
    { type: "website", url: "https://creator.netmarble.com/en/sololv/ranking/sohoven", label: "Page créateur" },
  ];

  const steps = [
    {
      title: "Lancez le jeu Solo Leveling: Arise",
      description: (
        <>
          Assurez-vous d'être connecté à votre compte. Pour cela il suffit de
          rentrer vos identifiants et de vous connecter au jeu.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_1.png",
    },
    {
      title: "Ouvrez le menu principal",
      description: (
        <>
          Pour ouvrir le menu principal, appuyez sur l'icône avec les quatre
          carrés dans le coin supérieur droit de l'écran.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_2.png",
    },
    {
      title: "Accédez au menu des paramètres",
      description: (
        <>
          Ensuite dans le menu principal, cliquez sur l'icône{" "}
          <span style={{ color: "rgb(155 135 245)" }}>"d'engrenage"</span> en bas
          à droite pour ouvrir le menu des paramètres.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_3.png",
    },
    {
      title: "Accédez à la gestion du compte",
      description: (
        <>
          Cliquez sur <span style={{ color: "rgb(155 135 245)" }}>"Comptes"</span>{" "}
          dans le menu latéral à gauche pour accéder au menu de la gestion du
          compte.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_4.png",
    },
    {
      title: "Ouvrez l’interface pour saisir un code",
      description: (
        <>
          Cliquez sur le bouton{" "}
          <span style={{ color: "rgb(155 135 245)" }}>"Saisir un code"</span> en
          bas à droite pour ouvrir l'interface qui permet de rentrer et valider un
          code promotionnel.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_5.png",
    },
    {
      title: "Entrez votre code",
      description: (
        <>
          Une fenêtre s’ouvre. Vous pouvez coller avec le code copié avec le
          raccourci <span style={{ color: "rgb(155 135 245)" }}>"ctrl+v"</span> ou
          écrire le code vous-même, puis cliquer sur{" "}
          <span style={{ color: "rgb(155 135 245)" }}>"Utiliser"</span> pour
          valider le code.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_6.png",
    },
    {
      title: "Récupérez vos récompenses",
      description: (
        <>
          Les récompenses seront envoyées directement dans votre{" "}
          <span style={{ color: "rgb(155 135 245)" }}>"messagerie"</span> en jeu.
          Ouvrez-la pour les récupérer.
        </>
      ),
      image: "/images/code_promo/tuto_pomo_code_7.png",
    },
  ];

  const [openStep, setOpenStep] = useState<number | null>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Codes Promotionnels</h1>
        <p className="text-muted-foreground">
          Utilisez ces codes dans le jeu pour obtenir des récompenses gratuites. N'oubliez pas de les utiliser avant leur expiration!
        </p>
      </div>

      {/* Section réseaux sociaux de Sohoven */}
      <Card className="mb-8 overflow-hidden bg-gradient-to-r from-solo-purple to-solo-dark-purple">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="aspect-square w-32 h-32 overflow-hidden rounded-full bg-muted border-4 border-white/10">
              <img src="/images/logo/Sohoven_Logo.png" alt="Sohoven" className="h-full w-full object-cover" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">Sohoven</h2>
              <p className="text-muted-foreground mb-4">Créateur de contenu français pour Solo Leveling: Arise</p>
              <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                {socialLinks.map((link, idx) => (
                  <Button
                    key={idx}
                    variant="secondary"
                    size="sm"
                    className="gap-2 bg-white/10 hover:bg-white/20 transition-colors"
                    asChild
                  >
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
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
                    <CardDescription className="mt-1">Cliquez pour voir les détails</CardDescription>
                  </div>
                  {openStep === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div
                      className="w-full md:w-1/3 aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => openModal(step.image)}
                    >
                      <img src={step.image} alt={`Étape ${index + 1}`} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Modal pour afficher l'image en grand */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative">
            <button
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-2"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <img src={modalImage} alt="Agrandissement" className="max-w-full max-h-screen rounded-lg" />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Creators;