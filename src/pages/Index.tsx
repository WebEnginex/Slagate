import React from "react";
import { Link } from "react-router-dom";
import LazyImage from "@/lib/lazy";
import { useSupabaseFetch } from "@/lib";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";

// =========================
// Composant Memo pour la carte d'un chasseur
// =========================
const HunterCard = ({
  hunter,
}: {
  hunter: { id: number; nom: string; image: string };
}) => {
  return (
    <Link to={`/builds#chasseur-${hunter.id}`} className="block">
      <Card className="bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardContent className="relative flex justify-center items-end h-64 bg-gray-700 p-0">
          <LazyImage
            src={hunter.image}
            alt={hunter.nom}
            className="w-full h-full object-contain"
            showSpinner={true}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-center p-2">
            <h3 className="text-lg font-bold text-white">{hunter.nom}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// =========================
// Composant principal
// =========================
const Index = () => {
  const hunterIds = [44, 43, 41];

  // Utilisation de useSupabaseFetch pour récupérer les chasseurs
  const { data: hunters, loading, error } = useSupabaseFetch<
    { id: number; nom: string; image: string }[]
  >(
    `supabase:chasseurs:${hunterIds.join(',')}`,
    async () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🏠 Index: Chargement des chasseurs depuis Supabase...');
      }
      const result = await supabase
        .from("chasseurs")
        .select("id, nom, image")
        .in("id", hunterIds);
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🏠 Index: ✅ ${result.data?.length || 0} chasseurs récupérés de Supabase`);
        // Debug: afficher les URLs des images
        result.data?.forEach(hunter => {
          console.log(`🏠 Index: Chasseur ${hunter.nom} - Image: ${hunter.image?.substring(0, 50)}...`);
        });
      }
      
      return result.data || [];
    },
    {
      refreshInterval: 0,
    }
  );

  if (process.env.NODE_ENV === 'development') {
    if (loading) {
      console.log('🏠 Index: ⏳ Chargement en cours...');
    } else if (error) {
      console.error('🏠 Index: ❌ Erreur:', error);
    } else if (hunters) {
      console.log(`🏠 Index: 🎯 Page prête avec ${hunters.length} chasseurs (images gérées par LazyImage + IndexedDB)`);
    }
  }

  if (loading) {
    return <div>Chargement des chasseurs...</div>;
  }

  if (error) {
    return <div>Erreur lors du chargement des chasseurs.</div>;
  }

  return (
    <Layout>
      <SEO
        title="Accueil - SLAGATE | Solo Leveling: ARISE"
        description="Bienvenue sur SLAGATE..."
      />
      <div className="w-full px-6 py-12 text-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-10">
          Derniers chasseurs sortis
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hunters.map((hunter) => (
            <HunterCard key={hunter.id} hunter={hunter} />
          ))}
        </div>
        {/* Section de bienvenue */}
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-violet-400">
            Bienvenue sur SLAGATE, votre portail Solo Leveling: ARISE
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Explorez des guides stratégiques, des builds optimisés et les
            différentes informations autour du jeu. SLAGATE est conçu pour vous
            accompagner dans vos progrès, que vous soyez nouveau joueur ou
            vétéran du terrain. N'hésitez pas à consulter nos tier lists, nos
            compositions de teams ou encore les codes promotionnels à ne pas
            manquer !
          </p>
        </div>
        {/* Section Twitch */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-violet-400 mb-8">
            Stream en direct
          </h2>
          <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto aspect-video">
            <iframe
              src="https://player.twitch.tv/?channel=sohoven&parent=slagate.fr"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
