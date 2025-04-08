
import React from "react";
import Layout from "@/components/Layout";
import HeroBanner from "@/components/HeroBanner";
import FeatureCard from "@/components/FeatureCard";
import { useNavigate } from "react-router-dom";
import { BookOpen, Award, Gift, AlertCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <HeroBanner />

      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Contenu Mis en Avant</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            title="Guide du Débutant"
            description="Conseils essentiels pour les nouveaux joueurs. Apprenez les bases de Solo Leveling: Arise et commencez votre aventure."
            actionText="Lire le Guide"
            icon={<BookOpen className="h-6 w-6 text-solo-purple" />}
          />
          <FeatureCard
            title="Tier List des Hunters"
            description="Mise à jour pour la saison actuelle. Liste complète de tous les hunters avec leurs forces et faiblesses détaillées."
            actionText="Voir la Tier List"
            icon={<Award className="h-6 w-6 text-solo-purple" />}
            onClick={() => navigate("/tier-list")}
          />
          <FeatureCard
            title="Codes Promotionnels"
            description="Obtenez les derniers codes promo pour des récompenses gratuites et des bonus exclusifs dans le jeu."
            actionText="Voir les Codes"
            icon={<Gift className="h-6 w-6 text-solo-purple" />}
            onClick={() => navigate("/promo-codes")}
          />
        </div>
      </section>

      <section className="rounded-lg bg-card p-8">
        <div className="flex items-start gap-4">
          <AlertCircle className="mt-1 h-6 w-6 flex-shrink-0 text-solo-purple" />
          <div>
            <h2 className="mb-2 text-2xl font-bold">Plus de Contenu à Venir</h2>
            <p className="text-muted-foreground">
              Nous ajoutons constamment de nouveaux guides, builds et fonctionnalités pour vous aider dans votre 
              progression. Revenez régulièrement pour découvrir les mises à jour.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
