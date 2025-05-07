import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";

export default function Portals() {
  const navigate = useNavigate();

  useEffect(() => {
    // Applique la couleur à tous les éléments <strong>
    const strongElements = document.querySelectorAll("strong");
    strongElements.forEach((element) => {
      (element as HTMLElement).style.color = "rgb(167, 139, 250)";
    });
  }, []);

  return (
    <Layout>
      {/* Bannière pleine largeur */}
      <div className="relative w-full h-72 sm:h-96 mb-8 overflow-hidden">
        <img
          src="https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Portails.png"
          alt="Bannière Portails"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Portails
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
            Les Portails sont un mode de jeu où les utilisateurs peuvent obtenir
            diverses ressources. Ils peuvent définir une difficulté pour scanner
            les portails, avec un total de 45 niveaux de difficulté, les
            récompenses augmentant avec la difficulté. Chaque portail possède
            ses propres restrictions, sa Puissance Totale (PT) et ses mécaniques
            particulières.
          </p>
        </section>

        {/* Section Clés de Portail */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Clés de Portail
          </h2>
          <p className="text-base sm:text-lg">
            Les Clés de Portail sont utilisées pour entrer dans les portails.
            Une clé n'est consommée que si le portail est réussi. Chaque jour,
            jusqu'à 10 clés sont rechargées automatiquement. Les clés non
            utilisées avant la réinitialisation quotidienne sont perdues. De
            plus, 3 clés peuvent être achetées pour 150 Pierres d'Essence,
            jusqu'à 10 fois par jour.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            À chaque fois que l'utilisateur termine 2 portails, il reçoit un
            bonus d'expérience, jusqu'à 3 fois. Une fois les 3 bonus
            d'expérience obtenus, chaque 2e portail terminé récompense avec de
            l'or.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les utilisateurs peuvent également rescanner les portails, ce qui
            permet de faire apparaître un nouvel ensemble de portails. Le scan
            est gratuit toutes les 5 minutes, ou peut être forcé immédiatement
            pour 500 Or.
          </p>
        </section>

        {/* Section Rangs */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Rangs
          </h2>
          <p className="text-base sm:text-lg">
            Les portails sont classés en 5 Rangs : S, A, B, C, D et E.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-base sm:text-lg">
            <li>
              Les Portails de Rang D ne peuvent pas être trouvés au-dessus de la
              Difficulté 31.
            </li>
            <li>
              Les Portails de Rang E ne peuvent pas être trouvés au-dessus de la
              Difficulté 14.
            </li>
            <li>
              Les portails d'un même rang offrent la même quantité d'expérience,
              et tous les portails, sauf les Portails Rouges, donnent 1 point de
              Réputation. Les Portails Rouges en donnent 3.
            </li>
          </ul>
        </section>

        {/* Section Exploration Rapide */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Exploration Rapide
          </h2>
          <p className="text-base sm:text-lg">
            En terminant le Chapitre 3 Normal{" "}
            <strong>&lt;Un Problème Urgent&gt;</strong>, les utilisateurs
            peuvent utiliser l'Exploration Rapide pour nettoyer automatiquement
            les portails. Les portails de Rang B et inférieur peuvent être
            explorés rapidement si la Puissance Totale (PT) de l'utilisateur est
            supérieure à celle du portail.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les Points d'Exploration sont utilisés pour cette fonctionnalité et
            se rechargent chaque jour. Sung Jinwoo et les Chasseurs ont des
            quantités de Points d'Exploration différentes :
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-base sm:text-lg">
            <li>
              Sung Jinwoo peut augmenter ses Points d'Exploration en complétant
              des Changements de Classe, gagnant 15 Points supplémentaires à
              chaque fois.
            </li>
            <li>
              Chasseurs SSR commencent avec 3 points, passent à 4 points au Rang
              3 et à 5 points au Rang 5.
            </li>
            <li>
              Chasseurs SR commencent avec 1 point, passent à 2 points au Rang 3
              et à 3 points au Rang 5.
            </li>
            <li>
              Les Avancées Dimensionnelles n'affectent pas les Points
              d'Exploration.
            </li>
          </ul>
          <p className="mt-4 text-base sm:text-lg">
            Lors de l'exploration rapide d'un portail, seul le Boss est pris en
            compte pour les Missions Spéciales.
          </p>
        </section>

        {/* Section Types de Portails */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Types de Portails
          </h2>
          <p className="text-base sm:text-lg">
            Il existe 4 types de portails :
          </p>
          <div className="space-y-4 mt-4">
            <div className="flex items-start space-x-4">
              <span
                className="text-2xl font-bold"
                style={{ color: "rgb(167, 139, 250)" }}
              >
                1.
              </span>
              <p className="text-base sm:text-lg">
                <span style={{ color: "light-blue" }}>Portails Normaux :</span> Donjons
                classiques jouables avec Sung Jinwoo ou les Chasseurs. Les principales
                récompenses incluent des Puces d'Amélioration d'Artéfacts et des
                Équipements d'Amélioration d'Armes.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span
                className="text-2xl font-bold"
                style={{ color: "rgb(167, 139, 250)" }}
              >
                2.
              </span>
              <p className="text-base sm:text-lg">
                <span style={{ color: "rgb(167, 139, 250)" }}>Rupture de Donjon :</span> Disponibles à partir de la
                Difficulté 5, ils ressemblent aux Portails Normaux mais ne sont
                jouables qu'avec Sung Jinwoo, et le Boss est une Bataille d'Équipe. Les
                principales récompenses incluent des Cubes de Fusion et des Plans.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span
                className="text-2xl font-bold"
                style={{ color: "rgb(167, 139, 250)" }}
              >
                3.
              </span>
              <p className="text-base sm:text-lg">
                <span style={{ color: "red" }}>Portails Rouges :</span> Jouables
                avec Sung Jinwoo ou les Chasseurs, les utilisateurs doivent détruire
                plusieurs Sculptures de Malus avant d'affronter le Boss. Débloqués
                après avoir terminé le Chapitre 7, les principales récompenses incluent
                des Parchemins de Compétences [Joueur] et des Fragments de Rune pour le
                Mode Joueur, ou des Élixirs de Puissance de Mana et des Parchemins de
                Compétences [Chasseur] pour le Mode Chasseur.
              </p>
            </div>
            <div className="flex items-start space-x-4">
              <span
                className="text-2xl font-bold"
                style={{ color: "rgb(167, 139, 250)" }}
              >
                4.
              </span>
              <p className="text-base sm:text-lg">
                <span style={{ color: "yellow" }}>Portails Spéciaux :</span> Jouables
                avec Sung Jinwoo ou les Chasseurs, où les utilisateurs affrontent des
                Gobelins ou Coffres qui n'attaquent pas. Les principales récompenses
                sont de l'Or.
              </p>
            </div>
          </div>
          <p className="mt-4 text-base sm:text-lg">
            Les Portails Normaux Bleus sont les seuls qui peuvent être de Rang inférieur
            à B.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les récompenses des portails sont basées sur la Difficulté 45. Plus la
            difficulté est élevée, meilleures sont les récompenses.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les Marques du Temps I sont disponibles à partir du Rang A et au-delà dès
            la Difficulté 10.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les Marques du Temps II deviennent disponibles à la Difficulté 18.
          </p>
        </section>

        {/* Section Portails de Minage */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Portails de Minage
          </h2>
          <p className="text-base sm:text-lg">
            Pendant 24 heures après avoir terminé un portail, les utilisateurs
            peuvent exploiter ce portail dans l'onglet{" "}
            <strong>"Aller au Minage de Portail"</strong>, situé en bas à gauche
            de l'écran des portails, ou via le menu rapide. Le minage d'un
            portail offre des ressources supplémentaires. Le temps de minage
            dépend du rang du portail, et les récompenses dépendent de son rang
            et de sa difficulté.
          </p>
          <p className="mt-4 text-base sm:text-lg">
            Les utilisateurs disposent de 3 Équipes de Minage au départ. Chaque
            équipe peut exploiter 1 portail à la fois. Deux équipes
            supplémentaires peuvent être débloquées aux Niveaux 11 et 30, et une
            autre peut être achetée pour 2 000 Pierres d'Essence.
          </p>
          <h3
            className="text-xl sm:text-2xl font-bold mt-6 mb-4"
            style={{ color: "rgb(167 139, 250)" }}
          >
            Temps de Minage
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li>Rang S : 3:00:00</li>
            <li>Rang A : 2:00:00</li>
            <li>Rang B : 1:00:00</li>
            <li>Rang C : 45:00</li>
            <li>Rang D : 25:00</li>
            <li>Rang E : 15:00</li>
          </ul>
        </section>

        {/* Section Niveau des Équipes de Minage */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Niveau des Équipes de Minage
          </h2>
          <p className="text-base sm:text-lg">
            En exploitant les portails, les utilisateurs gagnent de l'XP de
            Minage, ce qui augmente le Niveau de leurs Équipes de Minage,
            offrant des bonus supplémentaires. Plus le rang du portail exploité
            est élevé, plus l'XP gagné est important.
          </p>
          <h3
            className="text-xl sm:text-2xl font-bold mt-6 mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            XP gagné par Rang
          </h3>
          <ul className="list-disc list-inside space-y-2 text-base sm:text-lg">
            <li>Rang S : 12 XP</li>
            <li>Rang A : 9 XP</li>
            <li>Rang B : 6 XP</li>
            <li>Rang C : 5 XP</li>
            <li>Rang D : 3 XP</li>
            <li>Rang E : 2 XP</li>
          </ul>
        </section>

        {/* Section Tableau */}
        <section className="bg-[hsl(240_17%_10%)] p-6 rounded-lg shadow-lg">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "rgb(167 139 250)" }}
          >
            Tableau des Niveaux de Minage
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-600 text-left text-sm sm:text-base">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="border border-gray-600 px-4 py-2">Niveau</th>
                  <th className="border border-gray-600 px-4 py-2">Effet</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { level: 1, effect: "Or obtenu +4%" },
                  { level: 2, effect: "Temps de minage -2%" },
                  { level: 3, effect: "Taux de récompenses bonus +2%" },
                  { level: 4, effect: "Or obtenu +4%" },
                  { level: 5, effect: "Temps de minage -2%" },
                  { level: 6, effect: "Taux de récompenses bonus +2%" },
                  { level: 7, effect: "Or obtenu +4%" },
                  { level: 8, effect: "Temps de minage -2%" },
                  { level: 9, effect: "Taux de récompenses bonus +2%" },
                  { level: 10, effect: "Cristaux de Mana obtenus +10%" },
                  { level: 11, effect: "Emplacements de minage +1" },
                  { level: 12, effect: "Or obtenu +4%" },
                  { level: 13, effect: "Temps de minage -2%" },
                  { level: 14, effect: "Taux de récompenses bonus +2%" },
                  { level: 15, effect: "Cristaux de Mana obtenus +10%" },
                  { level: 16, effect: "Or obtenu +4%" },
                  { level: 17, effect: "Temps de minage -2%" },
                  { level: 18, effect: "Taux de récompenses bonus +2%" },
                  { level: 19, effect: "Cristaux de Mana obtenus +10%" },
                  { level: 20, effect: "Or obtenu +4%" },
                  { level: 21, effect: "Temps de minage -3%" },
                  { level: 22, effect: "Taux de récompenses bonus +2%" },
                  { level: 23, effect: "Cristaux de Mana obtenus +10%" },
                  { level: 24, effect: "Or obtenu +6%" },
                  { level: 25, effect: "Temps de minage -4%" },
                  { level: 26, effect: "Taux de récompenses bonus +3%" },
                  { level: 27, effect: "Cristaux de Mana obtenus +10%" },
                  { level: 28, effect: "Or obtenu +8%" },
                  { level: 29, effect: "Temps de minage -5%" },
                  { level: 30, effect: "Emplacements de minage +1" },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"}
                  >
                    <td className="border border-gray-600 px-4 py-2">
                      Niveau {row.level}
                    </td>
                    <td className="border border-gray-600 px-4 py-2">
                      {row.effect}
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
