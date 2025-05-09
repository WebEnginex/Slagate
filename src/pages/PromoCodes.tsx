import React, { useState, useCallback, useEffect, memo } from "react";
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
import { X, ChevronDown, ChevronUp } from "lucide-react";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";
import SEO from "@/components/SEO";

type SocialLink = {
  type: "youtube" | "twitch" | "twitter" | "instagram" | "website" | "tiktok";
  url: string;
  label: string;
};

// Déclaration globale de socialLinks
const socialLinks: SocialLink[] = [
  {
    type: "youtube",
    url: "https://www.youtube.com/@Sohoven",
    label: "Sohoven",
  },
  { type: "twitch", url: "https://www.twitch.tv/sohoven", label: "sohoven" },
  {
    type: "tiktok",
    url: "https://www.tiktok.com/@sohovenn",
    label: "@sohoven",
  },
  { type: "twitter", url: "https://x.com/Soho_ven", label: "@Soho_ven" },
  {
    type: "instagram",
    url: "https://www.instagram.com/sohoven",
    label: "sohoven",
  },
  {
    type: "website",
    url: "https://creator.netmarble.com/en/sololv/ranking/sohoven",
    label: "Page créateur",
  },
];

const copyToClipboard = (code: string) => {
  navigator.clipboard.writeText(code);
  alert(`Code promo "${code}" copié dans le presse-papiers !`);
};

// Mise à jour de la fonction getSocialIcon pour utiliser les SVG locaux
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
    <img
      src={iconMap[type]}
      alt={type}
      className="h-5 w-5"
      style={{ display: "inline-block" }}
    />
  );
};

// Mettre les récompenses en listes
const promoCodes = [
  {
    code: "WHITEVALKYRIE",
    rewards: [
      "Concept spécial x2",
      "Concept d'arme exclusive de chasseur x2",
      "Concept d'arme de joueur spécial x2",
    ],
    date: "?",
  },
  {
    code: "OREARA1STANNIV",
    rewards: ["Pierres de l'esprit x1,000"],
    date: "?",
  },
  {
    code: "365THXHUNTER365",
    rewards: ["Marques du temps I x200", "Marques du temps II x100"],
    date: "31 Mai 2025 à 2h du matin",
  },
  {
    code: "LDH1YEARGIFT",
    rewards: [
      "Énergie de l'ombre x3,000",
      "Traces d'ombres x200",
      "Cristal abyssal x15",
    ],
    date: "31 Mai 2025 à 2h du matin",
  },
  {
    code: "JSKSPECIAL365",
    rewards: [
      "Ticket de tirage personnalisé d'arme x10",
      "Ticket de tirage personnalisé x10",
      "Ticket d'augmentation du taux de tirage x10",
    ],
    date: "31 Mai 2025 à 2h du matin",
  },
  {
    code: "CMIRONGIFT",
    rewards: [
      "Énergie de l'ombre x1,111",
    ],
    date: "?",
  },
  {
    code: "HAPPYCHANNIVERSARY",
    rewards: [
      "Concept spécial x2",
      "Concept d'arme exclusive de chasseur x2",
      "Concept d'arme de joueur spécial x2",
    ],
    date: "?",
  },
  {
    code: "YEAROFTHEHUNTER",
    rewards: [
      "Pierres de l'esprit x1,000",
    ],
    date: "?",
  },
  {
    code: "1YRANIVTHANKU",
    rewards: [
      "Ticket de tirage personnalisé x10",
    ],
    date: "?",
  },
];

// Fonction pour formatter le texte avec mise en évidence des mots entre guillemets
const formatDescription = (text: React.ReactNode) => {
  if (typeof text !== "string") return text;

  // Diviser le texte en segments (texte normal et texte entre guillemets)
  const segments = text.split(/(".*?")/g);

  return segments.map((segment, i) => {
    // Si le segment commence et finit par des guillemets, c'est un texte à mettre en évidence
    if (segment.startsWith('"') && segment.endsWith('"')) {
      // Enlever les guillemets et mettre en évidence
      const content = segment.slice(1, -1);
      return (
        <span key={i} style={{ color: "rgb(155 135 245)" }}>
          {content}
        </span>
      );
    }
    // Sinon, retourner le texte tel quel
    return segment;
  });
};

// Fonction pour mettre en évidence les chiffres dans les récompenses
const highlightNumbers = (text: string) => {
  return text.split(/(\d+)/g).map((segment, i) => {
    if (!isNaN(Number(segment)) && segment.trim() !== "") {
      return (
        <span key={i} style={{ color: "rgb(167,139,250)" }}>
          {segment}
        </span>
      );
    }
    return segment;
  });
};

// =========================
// Gestion du cache local des images du guide étape par étape
// =========================
const GUIDE_IMAGE_PATH = "/images/code_promo/";

// Fonction utilitaire pour charger une image et la convertir en base64
const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Image fetch failed");
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Erreur lors du chargement de l'image ${url}:`, error);
    return null;
  }
};

// =========================
// Composant Memo pour les cartes de codes promo
// =========================
const PromoCard = memo(({ promo, onCopy, copiedCode }: {
  promo: typeof promoCodes[0];
  onCopy: (code: string) => void;
  copiedCode: string | null;
}) => (
  <Card className="p-4 border border-card-border relative">
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold text-white">{promo.code}</p>
      <ul className="list-disc list-inside text-sm text-muted-foreground">
        {promo.rewards.map((reward, i) => (
          <li key={i}>{highlightNumbers(reward)}</li>
        ))}
      </ul>
      <p className="text-md font-semibold text-white">
        Le code expire le : <span className="text-yellow-400">{promo.date}</span>
      </p>
    </div>
    <Button
      variant="secondary"
      size="sm"
      className="absolute top-4 right-4 bg-solo-purple text-white hover:bg-solo-purple hover:scale-105 hover:shadow-lg transition-transform duration-300"
      onClick={() => onCopy(promo.code)}
    >
      {copiedCode === promo.code ? "Copié" : "Copier"}
    </Button>
  </Card>
));
PromoCard.displayName = "PromoCard";

// =========================
// Composant principal
// =========================
const PromoCodes = () => {
  // Centralisation de l'état : images en cache + code copié + modal
  const [state, setState] = useState<{
    cachedImages: Record<string, string>; // chemin => base64
    copiedCode: string | null;
    modalImage: string | null;
    openStep: number | null;
  }>({
    cachedImages: {},
    copiedCode: null,
    modalImage: null,
    openStep: 0,
  });

  const steps = [
    {
      title: "Lancez le jeu Solo Leveling: Arise",
      description:
        "Assurez-vous d'être connecté à votre compte. Pour cela il suffit de rentrer vos identifiants et de vous connecter au jeu.",
      image: "/images/code_promo/tuto_pomo_code_1.png",
    },
    {
      title: "Ouvrez le menu principal",
      description:
        "Pour ouvrir le menu principal, appuyez sur l'icône avec les quatre carrés dans le coin supérieur droit de l'écran.",
      image: "/images/code_promo/tuto_pomo_code_2.png",
    },
    {
      title: "Accédez au menu des paramètres",
      description:
        "Ensuite dans le menu principal, cliquez sur l'icône \"d'engrenage\" en bas à droite pour ouvrir le menu des paramètres.",
      image: "/images/code_promo/tuto_pomo_code_3.png",
    },
    {
      title: "Accédez à la gestion du compte",
      description:
        'Cliquez sur "Comptes" dans le menu latéral à gauche pour accéder au menu de la gestion du compte.',
      image: "/images/code_promo/tuto_pomo_code_4.png",
    },
    {
      title: "Ouvrez l'interface pour saisir un code",
      description:
        'Cliquez sur le bouton "Saisir un code" en bas à droite pour ouvrir l\'interface qui permet de rentrer et valider un code promotionnel.',
      image: "/images/code_promo/tuto_pomo_code_5.png",
    },
    {
      title: "Entrez votre code",
      description:
        'Une fenêtre s\'ouvre. Vous pouvez coller avec le code copié avec le raccourci "ctrl+v" ou écrire le code vous-même, puis cliquer sur "Utiliser" pour valider le code.',
      image: "/images/code_promo/tuto_pomo_code_6.png",
    },
    {
      title: "Récupérez vos récompenses",
      description:
        'Les récompenses seront envoyées directement dans votre "messagerie" en jeu. Ouvrez-la pour les récupérer.',
      image: "/images/code_promo/tuto_pomo_code_7.png",
    },
  ];

  // =========================
  // Chargement et cache des images du guide étape par étape
  // =========================
  useEffect(() => {
    const loadImages = async () => {
      const newCache: Record<string, string> = { ...state.cachedImages };
      let updated = false;
      for (const step of steps) {
        const imageName = step.image.replace(GUIDE_IMAGE_PATH, "");
        const cacheKey = `promoGuideImg_${imageName}`;
        let base64 = localStorage.getItem(cacheKey);
        if (!base64) {
          base64 = await fetchImageAsBase64(step.image);
          if (base64) {
            localStorage.setItem(cacheKey, base64);
            newCache[step.image] = base64;
            updated = true;
          }
        } else {
          newCache[step.image] = base64;
        }
      }
      if (updated) {
        setState((prev) => ({ ...prev, cachedImages: newCache }));
      } else if (Object.keys(newCache).length && Object.keys(newCache).length !== Object.keys(state.cachedImages).length) {
        setState((prev) => ({ ...prev, cachedImages: newCache }));
      }
    };
    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // =========================
  // Gestion du copier/coller des codes promo
  // =========================
  const handleCopy = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setState((prev) => ({ ...prev, copiedCode: code }));
    setTimeout(() => setState((prev) => ({ ...prev, copiedCode: null })), 2000);
  }, []);

  // =========================
  // Gestion du modal d'image
  // =========================
  const openModal = useCallback((image: string) => {
    setState((prev) => ({ ...prev, modalImage: image }));
  }, []);
  const closeModal = useCallback(() => {
    setState((prev) => ({ ...prev, modalImage: null }));
  }, []);

  // =========================
  // Gestion de l'ouverture des étapes du guide
  // =========================
  const toggleStep = useCallback((index: number) => {
    setState((prev) => ({ ...prev, openStep: prev.openStep === index ? null : index }));
  }, []);

  // =========================
  // Render principal
  // =========================
  return (
    <Layout>
      <SEO
  title="Codes Promotionnels - Solo Leveling: ARISE"
  description="Découvrez les derniers codes promotionnels pour Solo Leveling: ARISE. Obtenez des récompenses gratuites en utilisant ces codes avant leur expiration."
  keywords="Solo Leveling, ARISE, codes promo, récompenses, SLAGATE, codes promotionnels, cadeaux gratuits"
/>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Codes Promotionnels</h1>
        <p className="text-muted-foreground">
          Utilisez ces codes dans le jeu pour obtenir des récompenses gratuites.
          N'oubliez pas de les utiliser avant leur expiration!
        </p>
      </div>

      {/* Section réseaux sociaux de Sohoven */}
      <Card className="mb-8 overflow-hidden bg-gradient-to-r from-solo-purple to-solo-dark-purple">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="aspect-square w-32 h-32 overflow-hidden rounded-full bg-muted border-4 border-white/10">
              <img
                src="/images/logo/Sohoven_Logo.png"
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
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold">Guide étape par étape</h2>

        {steps.map((step, index) => (
          <Card key={index} className="overflow-hidden">
            <Collapsible
              open={state.openStep === index}
              onOpenChange={() => toggleStep(index)}
            >
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
                    {state.openStep === index ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="pb-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div
                      className="w-full md:w-1/3 aspect-video bg-muted rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => openModal(step.image)}
                    >
                      <img
                        src={state.cachedImages[step.image] || step.image}
                        alt={`Étape ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-muted-foreground mb-4">
                        {formatDescription(step.description)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {/* Modal pour afficher l'image en grand */}
      {state.modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative w-full h-full p-2 flex items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 z-10"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={state.cachedImages[state.modalImage] || state.modalImage}
              alt="Agrandissement"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Section des codes promo */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold">Codes Promo Disponibles</h2>
        <p>
          {/* Ajout de la date de dernière modification */}
          <LastModified date={lastModifiedDates.promoCodes} />
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {promoCodes.map((promo, index) => (
            <PromoCard
              key={index}
              promo={promo}
              onCopy={handleCopy}
              copiedCode={state.copiedCode}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PromoCodes;
