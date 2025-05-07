import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

type Ombre = {
  id: number;
  nom: string;
  image: string;
  description: string;
};

export default function Ombres() {
  const [ombres, setOmbres] = useState<Ombre[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère les données des ombres depuis Supabase
    const fetchOmbres = async () => {
      const { data, error } = await supabase.from("ombres").select("*");
      if (error) {
        console.error("Erreur lors de la récupération des ombres :", error);
      } else {
        setOmbres(data || []);
      }
    };

    fetchOmbres();
  }, []);

  return (
    <Layout>
      {/* Bannière pleine largeur */}
      <div className="relative w-full h-72 sm:h-96 mb-8 overflow-hidden">
        <img
          src="https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Ombres.png"
          alt="Bannière Armée des Ombres"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Armée des Ombres
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-white space-y-12">
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
            style={{ color: "rgb(167 139 250)" }}
          >
            Introduction
          </h2>
          <p className="text-base sm:text-lg">
            L'Armée des Ombres est le lieu où vous pouvez extraire, promouvoir
            et améliorer l'armée d'ombres de Jinwoo. Débloquée en terminant le
            Chapitre 9 Normal{" "}
            <strong>&lt;La Naissance d'un Nouveau Monarque&gt;</strong>, cette
            fonctionnalité vous permet de renforcer vos ombres de diverses
            manières.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Pour promouvoir vos ombres au rang de Général, vous devrez d'abord
            compléter le Chapitre 23 Normal{" "}
            <strong>&lt;Roi des Fourmis&gt;</strong>, une étape cruciale pour
            maximiser leur potentiel.
          </p>
        </section>

        {/* Section d'utilisation */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Utilisation
          </h2>
          <p className="mb-4 text-base sm:text-lg">
            Il existe 5 moyens d'améliorer l'Armée des Ombres, ce qui augmente
            généralement la Puissance Totale (PT) de l'armée.
          </p>
          <div className="space-y-4">
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
              <div key={index} className="flex items-start space-x-4">
                <span
                  className="text-2xl font-bold"
                  style={{ color: "rgb(167 139 250)" }}
                >
                  {step.number}
                </span>
                <p className="text-base sm:text-lg">
                  <strong>{step.title} :</strong> {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section Liste des Ombres */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Liste des Ombres
          </h2>
          <div className="mt-6 overflow-x-auto">
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
                      <div className="w-20 h-20 mx-auto">
                        <img
                          src={ombre.image}
                          alt={ombre.nom}
                          className="w-full h-full rounded-full object-contain bg-gray-900"
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
          </div>
        </section>
      </div>
    </Layout>
  );
}
