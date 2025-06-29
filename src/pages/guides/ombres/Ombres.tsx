import React from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { useSupabaseFetch } from "@/lib";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/SEO";
import LazyImage from "@/lib/lazy";

// =========================
// Utilisation conforme au guide d'implémentation
// =========================

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "Ombres";

type Ombre = {
  id: number;
  nom: string;
  image: string;
  description: string;
};

export default function Ombres() {
  const navigate = useNavigate();

  // Utilisation de useSupabaseFetch pour récupérer les données des ombres
  const { data: ombres, error, loading } = useSupabaseFetch<Ombre[]>(
    'supabase:ombres',
    async () => {
      const { data, error } = await supabase.from("ombres").select("*");
      if (error) {
        console.error("Erreur lors de la récupération des ombres :", error);
        throw error;
      }
      return data || [];
    }
  );

  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`⚔️ ${PAGE_ID}: Page initialisée - ${loading ? 'Chargement...' : `${ombres?.length || 0} ombres chargées`}`);
    console.log(`⚔️ ${PAGE_ID}: Toutes les images gérées par LazyImage + IndexedDB (conforme au guide)`);
    if (error) {
      console.error(`⚔️ ${PAGE_ID}: Erreur de chargement:`, error);
    }
  }

  return (
    <Layout>
      <SEO
        title="Armée des Ombres - Solo Leveling: ARISE"
        description="Guide complet sur l'Armée des Ombres dans Solo Leveling: ARISE. Découvrez comment extraire, promouvoir et améliorer vos ombres."
        keywords="Solo Leveling, ARISE, armée des ombres, jinwoo, promotion, général"
      />
      
      {/* Bannière pleine largeur */}
      <div className="relative w-full h-56 sm:h-72 md:h-96 mb-4 sm:mb-8 overflow-hidden">
        <LazyImage
          src="https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Ombres.webp"
          alt="Bannière Armée des Ombres"
          className="w-full h-full object-cover"
          showSpinner={true}
          fallbackClassName="w-full h-full bg-gray-800"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4 text-center">
            Armée des Ombres
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 text-white space-y-6 sm:space-y-8 md:space-y-12">
        {/* Lien Retour vers les guides */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/guides")}
            className="text-sm sm:text-base md:text-lg font-bold text-[rgb(167,139,250)] hover:underline"
          >
            ← Retour vers les guides
          </button>
        </div>

        {/* Section d'introduction */}
        <section className="bg-[hsl(240_17%_10%)] p-4 sm:p-6 rounded-lg shadow-lg">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Introduction
          </h2>
          <p className="text-sm sm:text-base md:text-lg">
            L'Armée des Ombres est le lieu où vous pouvez extraire, promouvoir
            et améliorer l'armée d'ombres de Jinwoo. Débloquée en terminant le
            Chapitre 9 Normal{" "}
            <strong>&lt;La Naissance d'un Nouveau Monarque&gt;</strong>, cette
            fonctionnalité vous permet de renforcer vos ombres de diverses
            manières.
          </p>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">
            Pour promouvoir vos ombres au rang de Général, vous devrez d'abord
            compléter le Chapitre 23 Normal{" "}
            <strong>&lt;Roi des Fourmis&gt;</strong>, une étape cruciale pour
            maximiser leur potentiel.
          </p>
        </section>

        {/* Section d'utilisation */}
        <section className="bg-[hsl(240_17%_10%)] p-4 sm:p-6 rounded-lg shadow-lg">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Utilisation
          </h2>
          <p className="mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
            Il existe 5 moyens d'améliorer l'Armée des Ombres, ce qui augmente
            généralement la Puissance Totale (PT) de l'armée.
          </p>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                number: "1.",
                title: "Promotion",
                description:
                  "Augmente le niveau maximum de l'armée et améliore l'Autorité de l'Ombre. Débloque la possibilité d'obtenir l'Armement une fois que l'ombre atteint le rang de Général. Cela n'augmente pas la PT de l'armée.",
              },
              {
                number: "2.",
                title: "Amélioration",
                description:
                  "Le triangle 'Croissance : Amélioration.' Augmente les statistiques de l'ombre et la PT de l'armée de quelques centaines à chaque amélioration.",
              },
              {
                number: "3.",
                title: "Montée de Niveau de Compétence",
                description:
                  "L'augmentation de la PT se produit à chaque niveau de compétence, pouvant atteindre quelques centaines au maximum.",
              },
              {
                number: "4.",
                title: "Armement",
                description:
                  "L'achat et l'amélioration de l'Armement augmentent la PT de l'armée ainsi que les capacités et les statistiques de l'ombre.",
              },
              {
                number: "5.",
                title: "Montée de Niveau de l'Armée",
                description:
                  "Augmente le niveau de l'armée, ce qui améliore leurs statistiques et augmente la PT de l'armée de quelques milliers dans les niveaux les plus élevés.",
              },
            ].map((step, index) => (
              <div key={index} className="flex space-x-2 sm:space-x-3 md:space-x-4">
                <span
                  className="text-lg sm:text-xl md:text-2xl font-bold flex-shrink-0 pt-0.5"
                  style={{ color: "rgb(167 139 250)" }}
                >
                  {step.number}
                </span>
                <div className="flex-1 text-sm sm:text-base md:text-lg">
                  <strong>{step.title} :</strong> {step.description}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Liste des Ombres - Adaptée pour mobile */}
        <section className="bg-[hsl(240_17%_10%)] p-4 sm:p-6 rounded-lg shadow-lg">
          <h2
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Liste des Ombres
          </h2>
          
          {/* Affichage en liste pour mobile, table pour desktop */}
          <div className="block md:hidden space-y-6 mt-4">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Chargement des ombres...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-8 text-red-400">
                <p>Erreur lors du chargement des ombres</p>
              </div>
            )}
            {ombres?.map((ombre) => (
              <div key={ombre.id} className="bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="w-16 h-16 mr-3">
                    <LazyImage
                      src={ombre.image}
                      alt={ombre.nom}
                      className="w-full h-full rounded-full object-contain bg-gray-900"
                      showSpinner={true}
                      fallbackClassName="w-full h-full rounded-full bg-gray-600"
                    />
                  </div>
                  <h3 className="text-lg font-medium">{ombre.nom}</h3>
                </div>
                <div>
                  <p className="text-sm text-gray-300">
                    <span className="block text-xs uppercase tracking-wider text-gray-400 mb-1">
                      Bonus lorsqu'il est équipé dans le premier emplacement:
                    </span>
                    {ombre.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Table pour desktop */}
          <div className="hidden md:block mt-4 overflow-x-auto">
            {loading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
                <p className="mt-4 text-gray-400">Chargement des ombres...</p>
              </div>
            )}
            {error && (
              <div className="text-center py-8 text-red-400">
                <p>Erreur lors du chargement des ombres</p>
              </div>
            )}
            {ombres && !loading && !error && (
              <table className="table-auto w-full border-collapse border border-gray-600 text-left text-sm sm:text-base">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="border border-gray-600 px-4 py-2">Image</th>
                    <th className="border border-gray-600 px-4 py-2">Nom</th>
                    <th className="border border-gray-600 px-4 py-2">
                      Bonus lorsqu'il est équipé dans le premier emplacement
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ombres.map((ombre) => (
                    <tr key={ombre.id}>
                      <td className="border border-gray-600 px-4 py-2">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto">
                          <LazyImage
                            src={ombre.image}
                            alt={ombre.nom}
                            className="w-full h-full rounded-full object-contain bg-gray-900"
                            showSpinner={true}
                            fallbackClassName="w-full h-full rounded-full bg-gray-600"
                          />
                        </div>
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {ombre.nom}
                      </td>
                      <td className="border border-gray-600 px-4 py-2">
                        {ombre.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}