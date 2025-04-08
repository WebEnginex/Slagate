
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  <div className="space-y-1">
    <p className="font-medium">1. Lancez le jeu Solo Leveling: Arise</p>
    <p className="text-sm text-muted-foreground">
      Assurez-vous d'être connecté à votre compte.
    </p>
  </div>
  <div className="space-y-1">
    <p className="font-medium">2. Accédez au menu des paramètres</p>
    <p className="text-sm text-muted-foreground">
      Appuyez sur l'icône avec les quatre carrés dans le coin supérieur droit de l'écran. Ensuite, cliquez sur l'icône d'engrenage en bas à droite.
    </p>
  </div>
  <div className="space-y-1">
    <p className="font-medium">3. Accédez à la gestion du compte</p>
    <p className="text-sm text-muted-foreground">
      Cliquez sur "Comptes" dans le menu latéral à gauche.
    </p>
  </div>
  <div className="space-y-1">
    <p className="font-medium">4. Ouvrez l’interface des codes</p>
    <p className="text-sm text-muted-foreground">
      Cliquez sur le bouton "Saisir un code" en bas à droite.
    </p>
  </div>
  <div className="space-y-1">
    <p className="font-medium">5. Entrez votre code</p>
    <p className="text-sm text-muted-foreground">
      Une fenêtre s’ouvre. Vous pouvez coller ou écrire le code promo, puis cliquer sur "Utiliser" pour valider.
    </p>
  </div>
  <div className="space-y-1">
    <p className="font-medium">6. Récupérez vos récompenses</p>
    <p className="text-sm text-muted-foreground">
      Les récompenses seront envoyées directement dans votre messagerie en jeu. Ouvrez-la pour les récupérer.
    </p>
  </div>
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
    </Layout>
  );
};

export default PromoCodes;
