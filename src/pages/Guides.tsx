import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter } from "lucide-react";
import Footer from "@/components/Footer";
import LazyImage from "@/lib/lazy";
import SEO from "@/components/SEO";

const guides = [
  {
    id: 1,
    title: "Guide des Chasseurs",
    description:
      "Découvrez les meilleurs chasseurs à recruter et d'autres informations à propos des chasseurs.",
    image:
      "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Chasseur.webp",
    link: "/guides/hunters",
    comingSoon: true,
  },
  {
    id: 2,
    title: "Guide des Ombres",
    description:
      "Découvrez tout ce qu'il faut savoir sur l'Armée des Ombres de Jinwoo. Apprenez à extraire, promouvoir et améliorer vos ombres, déverrouillez de puissants bonus et maîtrisez les stratégies pour maximiser leur potentiel.",
    image:
      "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Ombres.webp",
    link: "/guides/ombres",
  },
  {
    id: 3,
    title: "Guide des Portails",
    description:
      "Plongez dans l'univers des Portails, un mode de jeu essentiel pour obtenir des ressources précieuses et relever des défis de plus en plus intenses. Maîtrisez les mécaniques des portails pour maximiser vos récompenses et optimiser votre progression.",
    image:
      "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Portails.webp",
    link: "/guides/portals",
  },
  {
    id: 4,
    title: "Guide du simulateur de portails",
    description: "Explorez le Simulateur de Portails, un mode de jeu stratégique où vous affronterez des vagues d'ennemis dans des stages virtuels. Choisissez vos chemins, collectionnez des Codes uniques et surmontez les défis pour renforcer vos chasseurs.",
    image:
      "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Simulation.webp",
    link: "/guides/simulation",
  },
  {
    id: 5,
    title: "Guide des Boss",
    description: "Découvrez les stratégies pour vaincre les boss.",
    image:
      "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Boss.webp",
    link: "/guides/boss",
    comingSoon: true,
  },
];

// =========================
// Utilisation conforme au guide d'implémentation
// =========================

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "Guides";

const Guides = () => {
  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`📚 ${PAGE_ID}: Page initialisée avec ${guides.length} guides disponibles`);
    console.log(`📚 ${PAGE_ID}: Toutes les images gérées par LazyImage + IndexedDB (conforme au guide)`);
  }
  return (
    <Layout>
      <SEO
        title="Guides - Solo Leveling: ARISE"
        description="Découvrez tous nos guides complets pour Solo Leveling: ARISE. Maîtrisez les chasseurs, les ombres, les portails et bien plus encore."
        keywords="Solo Leveling, ARISE, guides, chasseurs, ombres, portails, stratégies, SLAGATE"
      />
      <div className="w-full px-6 py-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Guides disponibles
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-sidebar border border-sidebar-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Image avec LazyImage conforme au guide */}
              <div className="h-48 w-full overflow-hidden rounded-t-lg">
                <LazyImage
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover"
                  showSpinner={true}
                  fallbackClassName="w-full h-full bg-gray-600"
                />
              </div>
              {/* Contenu de la carte */}
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4 flex-grow">
                  {guide.description}
                </p>
                {guide.comingSoon ? (
                  <button
                    className="block text-center px-4 py-2 bg-gray-500 text-white rounded-md font-medium cursor-not-allowed"
                    disabled
                  >
                    Prochainement
                  </button>
                ) : (
                  <a
                    href={guide.link}
                    className="block text-center px-4 py-2 bg-solo-purple text-white rounded-md font-medium hover:bg-solo-purple/90 transition-colors"
                  >
                    Voir le guide
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Guides;
