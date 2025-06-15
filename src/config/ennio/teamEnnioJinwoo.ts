export type TeamEnnioJinwoo = {
  id: number; // Ajout de l'identifiant unique pour chaque équipe
  nom: string;
  chasseurs: {
    id: number;
    stats: Record<string, string>;
    artefacts: {
      [slot: string]: {
        id: number;
        statPrincipale: string;
        statsSecondaires: string[];
      };
    };
    noyaux: {
      [slot: number]: {
        id: number;
        statPrincipale: string;
      }[];
    };
    sets_bonus: { id: number }[];
  }[];
  ombres: {
    id: number;
    description?: string;
  }[];
  arme1: number;
  arme2: number;
  competence1: number;
  competence2: number;
  qte1: number;
  qte2: number;
  pierre_benediction_booster1: number;
  pierre_benediction_booster2: number;
  pierre_benediction_booster3: number;
  pierre_benediction_booster4: number;
  pierre_benediction_survie1: number;
  pierre_benediction_survie2: number;
  pierre_benediction_survie3: number;
  pierre_benediction_survie4: number;
};

export type TeamGroup = {
  id: number;
  nom: string; // Nom du groupe
  team1: TeamEnnioJinwoo; // Première équipe
  team2: TeamEnnioJinwoo; // Deuxième équipe
};

export const teamEnnioJinwooGroups: TeamGroup[] = [
  {
    id: 1,
    nom: "Puissance de la Destruction - Feu | Lumière",
    team1: {
      id: 1,
      nom: "Team 1",
      chasseurs: [
        {
          // Sung Jinwoo
          id: 40,
          stats: {
          "Infos": "L'intelligence requise varie selon votre niveau de Re-éveil. Avec la version mythique, atteignez 250 points d'intelligence et placez le reste en force. Pour la version légendaire ou inférieure, atteignez 520 points d'intelligence et placez également le reste en force.",
          "Force": "445 ou 175",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "250 ou 520",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de l’élément adapté à l’événement",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
          noyaux: {
            1: [
              { id: 4, statPrincipale: "Attaque supplémentaire" },
              { id: 8, statPrincipale: "Attaque supplémentaire" },
            ],
            2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
            3: [
              { id: 7, statPrincipale: "PV supplémentaire" },
              { id: 2, statPrincipale: "PV supplémentaire" },
            ],
          },
          sets_bonus: [{ id: 58 }, { id: 29 }, { id: 23 }, { id: 24 }],
        },
        {
          // Kanae
          id: 35,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 64,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 94,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
          noyaux: {
          1: [{ id: 9, statPrincipale: "Attaque supplémentaire" }],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 3, statPrincipale: "PV supplémentaire" },
          ],
        },
          sets_bonus: [{ id: 9 }, { id: 29 }, { id: 23 }, { id: 24 }],
        },
        {
          // Esil
          id: 10,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 105,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 106,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 107,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 108,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 68,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 47,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 12,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 36,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 9, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 2, statPrincipale: "PV supplémentaire" },
            { id: 7, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 55 }, { id: 56 }, { id: 32 }, { id: 33 }],
      },
        {
          // Gina
          id: 11,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 59,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 6,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 83,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 27,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 73,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 55,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 20,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 44,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 9, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 2, statPrincipale: "Attaque supplémentaire" },
            { id: 7, statPrincipale: "Attaque supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 5 }, { id: 6 }, { id: 41 }, { id: 42 }],
      },
      ],
      ombres: [
        { id: 8 },
        { id: 2 },
        { id: 6 },
      ],
      arme1: 5,
      arme2: 16,
      competence1: 1,
      competence2: 2,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 26,
      pierre_benediction_booster2: 24,
      pierre_benediction_booster3: 17,
      pierre_benediction_booster4: 27,
      pierre_benediction_survie1: 8,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 30,
      pierre_benediction_survie4: 35,
    },
    team2: {
      id: 2,
      nom: "Team 2",
      chasseurs: [
        {
          // Sung Jinwoo
          id: 40,
          stats: {
          "Infos": "L'intelligence requise varie selon votre niveau de Re-éveil. Avec la version mythique, atteignez 250 points d'intelligence et placez le reste en force. Pour la version légendaire ou inférieure, atteignez 520 points d'intelligence et placez également le reste en force.",
          "Force": "175",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "520",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de l’élément adapté à l’événement",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
          noyaux: {
            1: [
              { id: 4, statPrincipale: "Attaque supplémentaire" },
              { id: 8, statPrincipale: "Attaque supplémentaire" },
            ],
            2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
            3: [
              { id: 7, statPrincipale: "PV supplémentaire" },
              { id: 2, statPrincipale: "PV supplémentaire" },
            ],
          },
          sets_bonus: [{ id: 58 }, { id: 29 }, { id: 23 }, { id: 24 }],
        },
        {
          // Choi
          id: 8,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "-",
          "Dégâts de coup critique ": "-",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 97,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 98,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 99,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 100,
            statPrincipale: "Pénétration de défense",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 101,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 102,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 103,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 104,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 5, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 2, statPrincipale: "PV supplémentaire" },
            { id: 7, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 52 }, { id: 53 }, { id: 54 }],
      },
        {
          // Meilin
          id: 27,
          stats: {
          "PV supplémentaire": "Le plus possible",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 59,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 6,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 83,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 27,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 73,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 55,
            statPrincipale: "Dégâts d'eau",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 20,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 44,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 9, statPrincipale: "Attaque supplémentaire" },
            { id: 4, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 2, statPrincipale: "Attaque supplémentaire" },
            { id: 7, statPrincipale: "Attaque supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 5 }, { id: 6 }, { id: 41 }, { id: 42 }],
      },
      {
          // Isla
          id: 19,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "Le plus possible",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "Le plus possible",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 58,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 2,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 79,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 23,
            statPrincipale: "Dégâts de coup critique | Défense (%)",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 70,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 49,
            statPrincipale: "Dégâts de ténèbres",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 14,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 38,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [{ id: 9, statPrincipale: "Attaque supplémentaire" }],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 2, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 43 }, { id: 44 }, { id: 45 }],
      },
      ],
      ombres: [
        { id: 8 },
        { id: 2 },
        { id: 6 },
      ],
      arme1: 5,
      arme2: 16,
      competence1: 1,
      competence2: 2,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 26,
      pierre_benediction_booster2: 24,
      pierre_benediction_booster3: 17,
      pierre_benediction_booster4: 27,
      pierre_benediction_survie1: 8,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 30,
      pierre_benediction_survie4: 35,
    },
  },


  {
    id: 2,
    nom: "Puissance de la Destruction - Ténèbres | Eau",
    team1: {
      id: 3,
      nom: "Team 1",
      chasseurs: [
        {
          // Sung Jinwoo
          id: 40,
          stats: {
          "Force": "488 +",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "220",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de l’élément adapté à l’événement",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
          noyaux: {
            1: [
              { id: 4, statPrincipale: "Attaque supplémentaire" },
              { id: 8, statPrincipale: "Attaque supplémentaire" },
            ],
            2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
            3: [
              { id: 7, statPrincipale: "PV supplémentaire" },
              { id: 2, statPrincipale: "PV supplémentaire" },
            ],
          },
          sets_bonus: [{ id: 58 }, { id: 29 }, { id: 23 }, { id: 24 }],
        },
        {
          // Lee Bora
          id: 24,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 97,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 98,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 99,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 100,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 101,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 102,
            statPrincipale: "Dégâts de ténèbres",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 103,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 104,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 9, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 2, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 52 }, { id: 53 }, { id: 54 }],
      },
        {
          // Isla
          id: 19,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "Le plus possible",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "Le plus possible",
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 59,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 6,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 83,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 27,
            statPrincipale: "Dégâts de coup critique | Défense (%)",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 73,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 55,
            statPrincipale: "Dégâts de ténèbres",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 20,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 44,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [{ id: 9, statPrincipale: "Attaque supplémentaire" }],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 2, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 5 }, { id: 6 }, { id: 41 }, { id: 42 }],
      },
        {
          // Choi
          id: 8,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "-",
          "Dégâts de coup critique ": "-",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 58,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 2,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 79,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 23,
            statPrincipale: "Pénétration de défense",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 70,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 49,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 14,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 38,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 9, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 2, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 43 }, { id: 44 }, { id: 45 }],
      },
      ],
      ombres: [
        { id: 6 },
        { id: 8 },
        { id: 2 },
      ],
      arme1: 17,
      arme2: 12,
      competence1: 5,
      competence2: 6,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 26,
      pierre_benediction_booster2: 24,
      pierre_benediction_booster3: 17,
      pierre_benediction_booster4: 12,
      pierre_benediction_survie1: 8,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 30,
      pierre_benediction_survie4: 35,
    },
    team2: {
      id: 4,
      nom: "Team 2",
      chasseurs: [
        {
          // Sung Jinwoo
          id: 40,
          stats: {
          "Force": "488+",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "220",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense": "5% - 10%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
          artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de l’élément adapté à l’événement",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
          noyaux: {
            1: [
              { id: 4, statPrincipale: "Attaque supplémentaire" },
              { id: 8, statPrincipale: "Attaque supplémentaire" },
            ],
            2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
            3: [
              { id: 7, statPrincipale: "PV supplémentaire" },
              { id: 2, statPrincipale: "PV supplémentaire" },
            ],
          },
          sets_bonus: [{ id: 58 }, { id: 29 }, { id: 23 }, { id: 24 }],
        },
        {
          // Seo Lin
          id: 41,
          stats: {
          "PV supplémentaire": "Le plus possible",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 105,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 106,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 107,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 108,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 109,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 110,
            statPrincipale: "Dégâts d'eau",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 111,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 112,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 4, statPrincipale: "Attaque supplémentaire" },
            { id: 9, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 3, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 55 }, { id: 56 }, { id: 57 }],
      },
        {
          // Cha
          id: 6,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense ": "10 - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 115,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 116,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 117,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 118,
            statPrincipale: "Dégâts de lumière",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 119,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 120,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 8, statPrincipale: "Attaque supplémentaire" },
            { id: 4, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 7, statPrincipale: "PV supplémentaire" },
            { id: 2, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 58 }, { id: 59 }, { id: 60 }],
      },
      {
          // Anna Ruiz
          id: 3,
          stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50%",
          "Dégâts de coup critique ": "200% - 210%",
          "Hausse des dégâts ": "30% +",
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 57,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 1,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 78,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 22,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 68,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 47,
            statPrincipale: "Dégâts de vent",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 12,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 36,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [
            { id: 9, statPrincipale: "Attaque supplémentaire" },
            { id: 8, statPrincipale: "Attaque supplémentaire" },
          ],
          2: [{ id: 12, statPrincipale: "Défense supplémentaire" }],
          3: [
            { id: 2, statPrincipale: "PV supplémentaire" },
            { id: 3, statPrincipale: "PV supplémentaire" },
          ],
        },
        sets_bonus: [{ id: 32 }, { id: 33 }, { id: 34 }],
      },
      ],
      ombres: [
        { id: 8 },
        { id: 6 },
        { id: 2 },
      ],
      arme1: 17,
      arme2: 12,
      competence1: 5,
      competence2: 6,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 26,
      pierre_benediction_booster2: 24,
      pierre_benediction_booster3: 17,
      pierre_benediction_booster4: 11,
      pierre_benediction_survie1: 8,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 30,
      pierre_benediction_survie4: 35,
    },
  },




















];
