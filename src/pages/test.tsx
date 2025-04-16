
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// Types pour nos codes promo
type PromoCode = {
  code: string;
  rewards: string;
  expiryDate: string;
  isActive: boolean;
};

const PromoCodes = () => {
  const { toast } = useToast();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [openStep, setOpenStep] = useState<number | null>(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  // Données fictives pour nos codes promo
  const promoCodes: PromoCode[] = [
    {
      code: "ARISE2023",
      rewards: "1000 Cristaux, 10 Billets d'invocation",
      expiryDate: "30 Avril 2025",
      isActive: true,
    },
    {
      code: "SOLOLEVELING",
      rewards: "500 Cristaux, 5 Potions d'énergie",
      expiryDate: "15 Mai 2025",
      isActive: true,
    },
    {
      code: "HUNTER100K",
      rewards: "1 Équipement rare, 800 Cristaux",
      expiryDate: "1 Juin 2025",
      isActive: true,
    },
    {
      code: "JINWOO2023",
      rewards: "1 Hunter aléatoire de rang B, 300 Cristaux",
      expiryDate: "10 Juin 2025",
      isActive: true,
    },
    {
      code: "ARISE100DAYS",
      rewards: "2000 Cristaux, 1 Équipement de rang S",
      expiryDate: "31 Mai 2025",
      isActive: true,
    },
    {
      code: "LAUNCHPARTY",
      rewards: "500 Cristaux, 3 Billets d'invocation",
      expiryDate: "1 Avril 2025",
      isActive: false,
    },
  ];

  // Étapes pour utiliser un code promo
  const steps = [
    {
      title: "Lancez le jeu Solo Leveling: Arise",
      description: "Assurez-vous d'être connecté à votre compte. Pour cela il suffit de rentrer vos identifiants et de vous connecter au jeu.",
      image: "/images/code_promo/tuto_pomo_code_1.png",
    },
    {
      title: "Ouvrez le menu principal",
      description: "Pour ouvrir le menu principal, appuyez sur l'icône avec les quatre carrés dans le coin supérieur droit de l'écran.",
      image: "/images/code_promo/tuto_pomo_code_2.png",
    },
    {
      title: "Accédez au menu des paramètres",
      description: "Ensuite dans le menu principal, cliquez sur l'icône d'engrenage en bas à droite pour ouvrir le menu des paramètres.",
      image: "/images/code_promo/tuto_pomo_code_3.png",
    },
    {
      title: "Accédez à la gestion du compte",
      description: "Cliquez sur \"Comptes\" dans le menu latéral à gauche pour accéder au menu de la gestion du compte.",
      image: "/images/code_promo/tuto_pomo_code_4.png",
    },
    {
      title: "Ouvrez l'interface des codes",
      description: "Cliquez sur le bouton \"Saisir un code\" en bas à droite pour ouvrir l'interface qui permet de rentrer un code promotionnel.",
      image: "/images/code_promo/tuto_pomo_code_5.png",
    },
    {
      title: "Entrez votre code",
      description: "Une fenêtre s'ouvre. Vous pouvez coller ou écrire le code promo, puis cliquer sur \"Utiliser\" pour valider.",
      image: "/images/code_promo/tuto_pomo_code_6.png",
    },
    {
      title: "Récupérez vos récompenses",
      description: "Les récompenses seront envoyées directement dans votre messagerie en jeu. Ouvrez-la pour les récupérer.",
      image: "/images/code_promo/tuto_pomo_code_7.png",
    },
  ];

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast({
      title: "Code copié!",
      description: `Le code ${code} a été copié dans votre presse-papiers.`,
    });
    
    // Reset the copied state after 3 seconds
    setTimeout(() => {
      setCopiedCode(null);
    }, 3000);
  };

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
          Utilisez ces codes dans le jeu pour obtenir des récompenses gratuites. N'oubliez pas de les 
          utiliser avant leur expiration!
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Comment utiliser un code promo?</CardTitle>
          <CardDescription>
            Suivez ces étapes pour utiliser un code promo dans Solo Leveling: Arise
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {steps.map((step, index) => (
            <Card key={index} className="overflow-hidden border-l-4 border-solo-purple">
              <Collapsible 
                open={openStep === index} 
                onOpenChange={() => toggleStep(index)}
              >
                <CollapsibleTrigger className="w-full">
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-solo-purple rounded-full">
                        {index + 1}
                      </div>
                      <p className="font-medium">{step.title}</p>
                    </div>
                    {openStep === index ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 pt-0">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div 
                        className="cursor-pointer overflow-hidden rounded-md bg-muted w-full md:w-1/2 h-64"
                        onClick={() => openModal(step.image)}
                      >
                        <img 
                          src={step.image} 
                          alt={`Étape ${index + 1}`} 
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="md:w-1/2">
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))}
        </CardContent>
      </Card>

      <h2 className="mb-4 text-2xl font-bold">Codes Actifs</h2>
      <div className="mb-8 grid gap-4 md:grid-cols-2">
        {promoCodes
          .filter((code) => code.isActive)
          .map((code, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="border-l-4 border-solo-purple">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>{code.code}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(code.code)}
                      className="ml-2 h-8 gap-1 px-2"
                    >
                      {copiedCode === code.code ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span>{copiedCode === code.code ? "Copié" : "Copier"}</span>
                    </Button>
                  </CardTitle>
                  <CardDescription>Expire le {code.expiryDate}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium">Récompenses:</p>
                  <p className="text-sm text-muted-foreground">{code.rewards}</p>
                </CardContent>
              </div>
            </Card>
          ))}
      </div>

      {/* Modal pour afficher l'image en grand */}
      {modalImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="relative max-w-4xl max-h-screen p-2">
            <button
              className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full text-white"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <img 
              src={modalImage} 
              alt="Image agrandie" 
              className="max-w-full max-h-[90vh] rounded-lg"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PromoCodes;
