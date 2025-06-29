import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import LazyImage from "@/lib/lazy";

// =========================
// Utilisation conforme au guide d'implémentation
// =========================

// Constante pour identifier cette page dans le système de logs
const PAGE_ID = "Simulation";

export default function Simulation() {
  const navigate = useNavigate();

  // Log de développement pour valider l'implémentation
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 ${PAGE_ID}: Page initialisée`);
    console.log(`🎯 ${PAGE_ID}: Images gérées par LazyImage + IndexedDB (conforme au guide)`);
  }

  return (
    <Layout>
      {/* Bannière pleine largeur */}
      <div className="relative w-full h-72 sm:h-96 mb-8 overflow-hidden">
        <LazyImage
          src="https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Simulation.webp"
          alt="Bannière Simulation"
          className="w-full h-full object-cover"
          showSpinner={true}
          fallbackClassName="w-full h-full bg-gray-600"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Simulateur de portails
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white space-y-12 [&_strong]:text-[rgb(167,139,250)]">
        {/* Lien Retour vers les guides */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/guides")}
            className="text-base sm:text-lg font-bold text-[rgb(167,139,250)] hover:underline"
          >
            ← Retour vers les guides
          </button>
        </div>

        {/* Section d'introduction */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167, 139, 250)" }}
          >
            Introduction
          </h2>
          <p className="text-base sm:text-lg">
            Le Simulateur de portail est un mode de jeu où les utilisateurs combattent
            à travers des stages virtuels, accumulant des améliorations tout au long du
            parcours pour obtenir des matériaux d'amélioration d'Artéfacts. Ce mode de
            jeu est débloqué après avoir complété le Chapitre 20 Normal.
          </p>
        </section>

        {/* Section Simulateur de portails */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167, 139, 250)" }}
          >
            Simulateur de portails
          </h2>
          <p className="text-base sm:text-lg">
            Ce mode contient 30 paliers, augmentant en difficulté et en récompenses au
            fur et à mesure de la progression.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Chaque semaine, deux faiblesses élémentaires et deux algorithmes sont
            appliqués, modifiant les combats.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            L'équipe de l'utilisateur est composée uniquement de 3 Chasseurs ; l'Armée
            des Ombres et la Puissance Résiduelle sont désactivées.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Chaque portail comporte 11 stages, comprenant des Batailles Normales,
            Batailles Renforcées, Épisodes, ou Maintenance Système, ainsi que 3
            Batailles Spéciales.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            L'utilisateur peut choisir son chemin, chaque stage offrant des défis
            uniques.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-base sm:text-lg">
            <li>
              <strong style={{ color: "rgb(167, 139, 250)" }}>
                Batailles Normales, Renforcées et Spéciales :
              </strong>{" "}
              Récompensent avec des Codes de différentes quantités et raretés.
            </li>
            <li>
              <strong style={{ color: "rgb(167, 139, 250)" }}>Épisodes :</strong>{" "}
              Permettent de gagner des récompenses spéciales comme des bonus ou des
              objets de Collection.
            </li>
            <li>
              <strong style={{ color: "rgb(167, 139, 250)" }}>Maintenance Système :</strong>{" "}
              Offre la possibilité de réanimer les alliés morts, d'améliorer les Codes
              et d'acheter des objets de Collection.
            </li>
          </ul>
        </section>

        {/* Section Codes */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167, 139, 250)" }}
          >
            Codes
          </h2>
          <p className="text-base sm:text-lg">
            Les Codes sont obtenus en battant des vagues d'ennemis dans les combats. Ils
            peuvent être obtenus dans les Batailles Normales, Renforcées et Spéciales.
            Toutefois, la troisième Bataille Spéciale, contre Sung Jinwoo, ne donne pas
            de Code. Certains Épisodes peuvent également offrir des Codes.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les Codes sont divisés en 12 catégories.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Il existe un total de 79 Codes, chacun ayant trois raretés : Rare, Héroïque
            et Légendaire.
          </p>
        </section>

        {/* Section Algorithmes */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167, 139, 250)" }}
          >
            Algorithmes
          </h2>
          <p className="text-base sm:text-lg">
            Les Algorithmes sont des modificateurs supplémentaires qui influencent la
            jouabilité. Ils se divisent en deux types :
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-base sm:text-lg">
            <li>
              <strong style={{ color: "rgb(167, 139, 250)" }}>Algorithmes de Boost :</strong>{" "}
              Appliquent des effets positifs aux combats.
            </li>
            <li>
              <strong style={{ color: "rgb(167, 139, 250)" }}>Algorithmes de Réduction :</strong>{" "}
              Appliquent des effets négatifs aux combats.
            </li>
          </ul>
          <h3
            className="text-xl sm:text-2xl font-bold mt-6 mb-4"
            style={{ color: "rgb(167, 139, 250)" }}
          >
            Liste des Algorithmes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Algorithmes de Boost */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "rgb(167, 139, 250)" }}>
                Algorithmes de Boost
              </h4>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
                <li>Augmente les dégâts des Compétences de Base.</li>
                <li>
                  Augmente les dégâts infligés lorsque l'effet de Récupération de MP est
                  actif.
                </li>
                <li>Augmente les dégâts des attaques avec l'effet [Brise].</li>
                <li>Augmente les dégâts de Faiblesse Élémentaire.</li>
                <li>
                  Augmente les dégâts des Attaques de Base et des Attaques de Noyau.
                </li>
              </ul>
            </div>
            {/* Algorithmes de Réduction */}
            <div>
              <h4 className="text-lg sm:text-xl font-bold mb-2" style={{ color: "rgb(167, 139, 250)" }}>
                Algorithmes de Réduction
              </h4>
              <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
                <li>Réduit les dégâts des Compétences Ultimes.</li>
                <li>Réduit les MP possédés chaque seconde.</li>
                <li>Réduit les dégâts des attaques sans l'effet [Brise].</li>
                <li>Réduit les dégâts autres que ceux de Faiblesse Élémentaire.</li>
                <li>
                  Augmente la consommation de mana de l'utilisateur lors de l'utilisation
                  de compétences.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Autres sections */}
        {/* ... */}
      </div>
    </Layout>
  );
}