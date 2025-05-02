import React from "react";
import Layout from "@/components/Layout";



// Images des portails
const portail1 = "/images/portails/normal.png";
const portail2 = "/images/portails/break.png";
const portail3 = "/images/portails/rouge.png";
const portail4 = "/images/portails/special.png";
const portail5 = "/images/portails/or.png";

// Images des récompenses
const reward1 = "/images/rewards/reward1.png";
const reward2 = "/images/rewards/reward2.png";
const reward3 = "/images/rewards/reward3.png";
const reward4 = "/images/rewards/reward4.png";
const reward5 = "/images/rewards/reward5.png";





const Portal = () => {
  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto text-white space-y-10">
        <h1 className="text-3xl font-bold border-b pb-2">
          🌀 Portails (Gates)
        </h1>

        {/* Introduction */}
        <section>
          <p>
            Les portails sont un <strong>mode de jeu</strong> dans lequel vous
            pouvez obtenir diverses ressources. Vous pouvez choisir une
            difficulté parmi 45 niveaux, avec des récompenses qui augmentent à
            mesure que la difficulté progresse. Chaque portail a ses propres
            contraintes, puissance totale requise et mécaniques spéciales.
          </p>
        </section>

        {/* Clés */}
        <section>
          <h2 className="text-2xl font-semibold">🔑 Clés de Portail</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Les portails se consomment uniquement si vous réussissez à les
              terminer.
            </li>
            <li>Jusqu’à 10 clés peuvent être régénérées chaque jour.</li>
            <li>
              Les clés non utilisées avant la réinitialisation quotidienne
              seront perdues.
            </li>
            <li>
              3 clés peuvent être achetées jusqu’à 10 fois par jour pour 150
              Pierres d’Essence.
            </li>
          </ul>
        </section>

        {/* Bonus XP & Re-scan */}
        <section>
          <h2 className="text-2xl font-semibold">
            📈 Bonus d'expérience & exploration
          </h2>
          <p>
            À chaque fois que vous terminez 2 portails, vous recevez un bonus
            d’expérience (jusqu’à 3 fois par jour). Ensuite, chaque 2e portail
            terminé vous donne de l’or.
          </p>
          <p className="mt-2">
            Les portails peuvent être re-scannés pour générer une nouvelle
            sélection. Vous pouvez le faire gratuitement toutes les 5 minutes ou
            immédiatement contre 500 or.
          </p>
        </section>

        {/* Rangs */}
        <section>
          <h2 className="text-2xl font-semibold">🏅 Rangs</h2>
          <p>Il existe 5 rangs de portails : S, A, B, C, E</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Les portails de rang D apparaissent à partir de la difficulté 31.
            </li>
            <li>
              Les portails de rang E apparaissent à partir de la difficulté 14.
            </li>
            <li>
              Tous les portails rapportent 1 point de réputation sauf les
              portails rouges qui en donnent 3.
            </li>
          </ul>
        </section>

        {/* Sweep */}
        <section>
          <h2 className="text-2xl font-semibold">
            ⚡ Balayage automatique (Sweep)
          </h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Débloqué après avoir terminé le Chapitre 3 "Un problème urgent"
            </li>
            <li>
              Disponible pour les portails de rang B ou inférieur si votre
              puissance totale dépasse celle du portail
            </li>
            <li>
              Les points de sweep sont utilisés pour activer la fonction
              (régénérés chaque jour)
            </li>
          </ul>
          <p className="mt-2">
            Sung Jin-Woo gagne 15 points de sweep à chaque changement de métier.
            Les chasseurs en gagnent en montant leur niveau d’éveil :
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>SSR : commence avec 3 points, jusqu’à 5 au niveau 5</li>
            <li>SR : commence avec 1 point, jusqu’à 3 au niveau 5</li>
            <li>⚠️ L’éveil dimensionnel ne change pas les points de sweep</li>
          </ul>
        </section>

        {/* Types de portails */}
        <section>
          <h2 className="text-2xl font-semibold">🧭 Types de Portails</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Normaux :</strong> Jouables avec Jinwoo ou des chasseurs.
              Récompenses : composants d’amélioration d’artefacts et d’armes.
            </li>
            <li>
              <strong>Dungeon Break :</strong> Dès difficulté 5. Jouables
              uniquement avec Jinwoo. Boss obligatoire. Récompenses : Cubes de
              Fusion et Designs d’assemblage.
            </li>
            <li>
              <strong>Rouges :</strong> Nécessitent de détruire des statues de
              malus avant le boss. Débloqués après le Chapitre 7. Récompenses :
              parchemins de compétence, runes, manuels.
            </li>
            <li>
              <strong>Spéciaux :</strong> Gobelins ou coffres. N’attaquent pas.
              Récompenses : or.
            </li>
          </ul>
        </section>

        {/* Récompenses */}
      

        {/* Mining Gates */}
        <section>
          <h2 className="text-2xl font-semibold">⛏️ Portails de minage</h2>
          <p>
            Après avoir terminé un portail, vous avez 24h pour l’exploiter via
            l’onglet dédié. Cela vous rapporte des ressources supplémentaires
            selon le rang et la difficulté.
          </p>
          <p>Temps de minage par rang :</p>
          <ul className="list-disc pl-6">
            <li>S : 3h</li>
            <li>A : 2h</li>
            <li>B : 1h</li>
            <li>C : 45 min</li>
            <li>D : 25 min</li>
            <li>E : 15 min</li>
          </ul>

          <p className="mt-4">
            Vous commencez avec 3 équipes de minage. Deux autres sont débloquées
            aux niveaux 11 et 30, et une sixième peut être achetée pour 2 000
            pierres d’essence.
          </p>
        </section>

        {/* Tableau minage */}
        <section>
          <h2 className="text-xl font-semibold mb-2">📊 Niveaux de minage</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-600 text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-600 px-2 py-1">Niveau</th>
                  <th className="border border-gray-600 px-2 py-1">Effet</th>
                  <th className="border border-gray-600 px-2 py-1">XP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "Or obtenu +4%", "0"],
                  ["2", "Temps de minage -2%", "80"],
                  ["3", "Taux de récompenses bonus +2%", ""],
                  ["4", "Or obtenu +4%", ""],
                  ["5", "Temps de minage -2%", ""],
                  ["6", "Taux de récompenses bonus +2%", "350"],
                  ["7", "Or obtenu +4%", ""],
                  ["8", "Temps de minage -2%", ""],
                  ["9", "Taux de récompenses bonus +2%", ""],
                  ["10", "Cristaux de mana obtenus +10%", ""],
                  ["11", "+1 Équipe de minage", ""],
                  ["12", "Or obtenu +4%", ""],
                  ["13", "Temps de minage -2%", ""],
                  ["14", "Taux de récompenses bonus +2%", "600"],
                  ["15", "Cristaux de mana obtenus +10%", ""],
                  ["16", "Or obtenu +4%", ""],
                  ["17", "Temps de minage -2%", ""],
                  ["18", "Taux de récompenses bonus +2%", ""],
                  ["19", "Cristaux de mana obtenus +10%", ""],
                  ["20", "Or obtenu +4%", ""],
                  ["21", "Temps de minage -3%", ""],
                  ["22", "Taux de récompenses bonus +2%", ""],
                  ["23", "Cristaux de mana obtenus +10%", ""],
                  ["24", "Or obtenu +6%", ""],
                  ["25", "Temps de minage -4%", ""],
                  ["26", "Taux de récompenses bonus +3%", ""],
                  ["27", "Cristaux de mana obtenus +10%", ""],
                  ["28", "Or obtenu +8%", ""],
                  ["29", "Temps de minage -5%", ""],
                  ["30", "+1 Équipe de minage", ""],
                ].map(([lvl, effect, xp]) => (
                  <tr key={lvl}>
                    <td className="border px-2 py-1">Niveau {lvl}</td>
                    <td className="border px-2 py-1">{effect}</td>
                    <td className="border px-2 py-1">{xp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 font-medium">Bonus cumulés au niveau 30 :</p>
          <ul className="list-disc pl-6">
            <li>Or obtenu : +38%</li>
            <li>Temps de minage réduit : -22%</li>
            <li>Taux de récompenses bonus : +15%</li>
            <li>Cristaux de mana obtenus : +50%</li>
            <li>Équipes de minage : +2</li>
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default Portal;
