import React, { useState, useCallback, memo } from "react";
import Layout from "@/components/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import SEO from "@/components/SEO";
import LazyImage from "@/lib/lazy";

// Fonction pour afficher les icônes des réseaux sociaux mise à jour pour utiliser LazyImage
const getSocialIcon = (type: SocialLink["type"]) => {
  const iconMap: Record<SocialLink["type"], string> = {
    youtube: "/icons/youtube.svg",
    twitch: "/icons/twitch.svg",
    tiktok: "/icons/tiktok.svg",
    twitter: "/icons/twitter.svg",
    instagram: "/icons/instagram.svg",
    website: "/icons/external-link.svg",
  };

  return (
    <LazyImage
      src={iconMap[type]}
      alt={type}
      className="h-5 w-5"
      showSpinner={false}
      fallbackClassName="h-5 w-5"
    />
  );
};

// Types pour les réseaux sociaux
type SocialLink = {
  type: "youtube" | "twitch" | "twitter" | "instagram" | "website" | "tiktok";
  url: string;
  label: string;
};

// =========================
// Utilisation conforme au guide d'implémentation
// =========================

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "Creators";

// Fonction pour formatter le texte avec mise en évidence des mots entre guillemets
const formatDescription = (text: React.ReactNode) => {
  if (typeof text !== 'string') return text;
  
  // Diviser le texte en segments (texte normal et texte entre guillemets)
  const segments = text.split(/(".*?")/g);
  
  return segments.map((segment, i) => {
    // Si le segment commence et finit par des guillemets, c'est un texte à mettre en évidence
    if (segment.startsWith('"') && segment.endsWith('"')) {
      // Enlever les guillemets et mettre en évidence
      const content = segment.slice(1, -1);
      return <span key={i} style={{ color: 'rgb(155 135 245)' }}>{content}</span>;
    }
    // Sinon, retourner le texte tel quel
    return segment;
  });
};

// =========================
// Type pour une étape du guide
// =========================
type Step = {
  title: string;
  description: string;
  action?: string;
  actionText?: string;
  image: string;
};

// =========================
// Composant Memo pour chaque étape du guide
// =========================
const StepCard = memo(({ step, index, open, onToggle, onOpenModal }: {
  step: Step;
  index: number;
  open: boolean;
  onToggle: (idx: number) => void;
  onOpenModal: (img: string) => void;
}) => (
  <Card className="overflow-hidden">
    <Collapsible open={open} onOpenChange={() => onToggle(index)}>
      <CollapsibleTrigger className="w-full">
        <div className="p-6 cursor-pointer flex flex-row items-center justify-between hover:bg-transparent transition-colors">
          <div className="flex-1">
            <CardTitle className="flex items-center">
              <span className="bg-solo-purple text-white rounded-full w-8 h-8 flex items-center justify-center mr-3">
                {index + 1}
              </span>
              <span className="flex-1">{step.title}</span>
            </CardTitle>
          </div>
          <div className="ml-4">
            {open ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CardContent className="pb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div
              className="w-full md:w-1/3 aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer"
              onClick={() => onOpenModal(step.image)}
            >
              <LazyImage
                src={step.image}
                alt={`Étape ${index + 1}`}
                className="h-full w-full object-cover"
                showSpinner={true}
                fallbackClassName="h-full w-full"
              />
            </div>
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">{formatDescription(step.description)}</p>
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
));
StepCard.displayName = "StepCard";

// =========================
// Composant principal
// =========================
const Creators = () => {
  // Données pour les réseaux sociaux de Sohoven
  const socialLinks: SocialLink[] = [
    { type: "youtube", url: "https://www.youtube.com/@Sohoven", label: "Sohoven" },
    { type: "twitch", url: "https://www.twitch.tv/sohoven", label: "sohoven" },
    { type: "tiktok", url: "https://www.tiktok.com/@sohovenn", label: "@sohoven" },
    { type: "twitter", url: "https://x.com/Soho_ven", label: "@Soho_ven" },
    { type: "instagram", url: "https://www.instagram.com/sohoven", label: "sohoven" },
    { type: "website", url: "https://creator.netmarble.com/en/sololv/ranking/sohoven", label: "Page créateur" },
  ];

  // Étapes du guide
  const steps: Step[] = [
    {
      title: "Se connecter au site Netmarble Creator",
      description: "Accédez à la page Netmarble Creator puis connectez vous à votre compte.",
      action:
        "https://members.netmarble.com/auth/signin?idpViewType=B&redirectUrl=https%3A%2F%2Fcreator.netmarble.com%2Fcreator%2Fsignin%2Fcallback%3FredirectUrl%3Dhttps%3A%2F%2Fcreator.netmarble.com%2Fen%2Fsololv%2Franking%2Fsohoven",
      actionText: "Se connecter au site",      image: "/images/creator_images/tuto_creator_1.webp",
    },
    {
      title: "Accéder à votre profil",
      description: 'Cliquez sur le bouton en haut à droite pour ouvrir le menu, puis allez dans "My Page" pour accéder aux paramètres.',
      image: "/images/creator_images/tuto_creator_2.webp",
    },
    {
      title: "Ouvrez la fenêtre qui permet de lier son compte",
      description: 'Cliquez sur le bouton "Link Game Account" pour ouvrir la fenêtre qui permet de lier son compte Solo Leveling au site Netmarble Creator.',
      image: "/images/creator_images/tuto_creator_3.webp",
    },
    {
      title: "Lier votre compte",
      description: 'Cliquez sur le bouton "Link account" pour lier votre compte Solo Leveling au site Netmarble Creator. Si le site vous demande une connexion quand vous cliquez sur le bouton, reconnectez vous avec le même compte qu\'au début.',
      image: "/images/creator_images/tuto_creator_4.webp",
    },
    {
      title: "Supporter le créateur",
      description: 'Cliquez sur le bouton "Support", acceptez les conditions et cliquez sur "Yes".',
      image: "/images/creator_images/tuto_creator_5.webp",
    },
  ];
  // Centralisation de l'état : étape ouverte + image modale
  const [state, setState] = useState<{
    openStep: number | null;
    modalImage: string | null;
  }>({
    openStep: 0,
    modalImage: null,
  });
  
  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎬 ${PAGE_ID}: Page initialisée avec ${steps.length} étapes du guide`);
    console.log(`🎬 ${PAGE_ID}: Toutes les images gérées par LazyImage + IndexedDB (conforme au guide)`);
  }

  // =========================
  // Gestion de l'ouverture des étapes du guide
  // =========================
  const toggleStep = useCallback((index: number) => {
    setState((prev) => ({ ...prev, openStep: prev.openStep === index ? null : index }));
  }, []);

  // =========================
  // Gestion du modal d'image
  // =========================
  const openModal = useCallback((image: string) => {
    setState((prev) => ({ ...prev, modalImage: image }));
    
    // Log de développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`🎬 ${PAGE_ID}: Modal ouvert pour l'image: ${image.split('/').pop()}`);
    }
  }, []);
  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, modalImage: null }));
  }, []);

  return (
    <Layout>
      <SEO
  title="Soutenir un Créateur - Solo Leveling: ARISE"
  description="Apprenez comment soutenir vos créateurs de contenu préférés pour Solo Leveling: ARISE via le site Netmarble Creator. Suivez notre guide étape par étape."
  keywords="Solo Leveling, ARISE, créateurs, soutien, Netmarble Creator, guide, SLAGATE"
/>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Soutenir un créateur</h1>
        <p className="">
          Suivez ce guide pour apprendre comment supporter vos créateurs de contenu préférés pour Solo Leveling: Arise sur le site Netmarble Creator.
        </p>
      </div>

      {/* Section réseaux sociaux de Sohoven */}
      <Card className="mb-8 overflow-hidden bg-gradient-to-r from-solo-purple to-solo-dark-purple">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">            <div className="aspect-square w-32 h-32 overflow-hidden rounded-full bg-muted border-4 border-white/10">
              <LazyImage
                src="/images/logo/Sohoven_Logo.webp"
                alt="Sohoven"
                className="h-full w-full object-cover"
                showSpinner={true}
                fallbackClassName="h-full w-full"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold mb-2">Sohoven</h2>
              <p className="mb-4">
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
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold">Guide étape par étape</h2>
          {steps.map((step, index) => (
          <StepCard
            key={index}
            step={step}
            index={index}
            open={state.openStep === index}
            onToggle={toggleStep}
            onOpenModal={openModal}
          />
        ))}
      </div>

      {/* Section sur les avantages du support créateur */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Avantages du support créateur</CardTitle>
          <CardDescription>
            Découvrez ce qu'apporte le soutien à un créateur dans Solo Leveling: Arise
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Pour vous</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Soutenez vos créateurs de contenu préférés sans frais supplémentaires</li>
                <li>Contribuez directement à la croissance de la communauté Solo Leveling</li>
                <li>Restez connecté avec les dernières actualités et guides via votre créateur</li>
                <li>Possibilité de recevoir des codes promotionnels exclusifs partagés par les créateurs</li>
                <li>Participez à des événements spéciaux organisés par les créateurs supportés</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Pour le créateur</h3>
              <ul className="space-y-2 list-disc pl-5">
                <li>Reçoit une reconnaissance officielle de Netmarble comme créateur de contenu</li>
                <li>Obtient une part des achats effectués dans le jeu par leurs supporters</li>
                <li>Accès à des statistiques détaillées sur leur communauté de supporters</li>
                <li>Possibilité de participer à des événements exclusifs organisés par Netmarble</li>
                <li>Opportunités de collaboration avec d'autres créateurs et avec Netmarble</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modal pour afficher l'image en grand */}      {state.modalImage && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
    <div className="relative w-full h-full p-2 flex items-center justify-center">
      <button
        className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
        onClick={closeModal}
      >
        <X className="h-6 w-6" />
      </button>
      <LazyImage
        src={state.modalImage}
        alt="Agrandissement"
        className="max-w-full max-h-full object-contain rounded-lg"
        showSpinner={true}
        fallbackClassName="max-w-full max-h-full rounded-lg"
      />
    </div>
  </div>
)}
    </Layout>
  );
};

export default Creators;
