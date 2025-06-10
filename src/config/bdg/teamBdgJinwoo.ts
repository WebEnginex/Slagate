export type TeamBdgJinwoo = {
  id: number;
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

export const TeamBdgJinwoo: TeamBdgJinwoo[] = [
  {
    id: 1,
    nom: "Team Feu",
    // Sung Jinwoo
    chasseurs: [
      {
        id: 40,
        stats: {
          "Force": "534",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "190",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50% (8000)",
          "Dégâts de coup critique ": "200%",
          "Hausse des dégâts ": "30%",
          "Pénétration de défense ": "7%%",
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
            statsSecondaires: [""],
          },
          armure: {
            id: 114,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: [""],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: [""],
          },
          collier: {
            id: 71,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: [""],
          },
          bracelet: {
            id: 50,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: [""],
          },
          bague: {
            id: 15,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          boucles: {
            id: 39,
            statPrincipale: "PM",
            statsSecondaires: [""],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 58 }, { id: 29 }, { id: 23 }, { id: 24 }],
      },
      {
        // Tawata Kanae
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
          "Pénétration de défense ": "10% - 20%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "1000 +",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
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
          "Taux de coup critique ": "9000 +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "27% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "1000 +",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
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
          "Taux de coup critique ": "9000 +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "27% +",
          "Pénétration de défense": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "1000 +",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 5 }, { id: 6 }, { id: 41 }, { id: 42 }],
      },
      {
        // Yoo Soohyun
        id: 39,
        stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "9000 +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "27% +",
          "Pénétration de défense": "30% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 57,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          armure: {
            id: 1,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: [""],
          },
          gants: {
            id: 89,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          bottes: {
            id: 33,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: [""],
          },
          collier: {
            id: 76,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: [""],
          },
          bracelet: {
            id: 54,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: [""],
          },
          bague: {
            id: 19,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          boucles: {
            id: 43,
            statPrincipale: "PM",
            statsSecondaires: [""],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 29 }, { id: 1 }, { id: 39 }, { id: 40 }],
      },
      {
        // Choi Jongin
        id: 8,
        stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "0",
          "Dégâts de coup critique ": "0",
          "Hausse des dégâts ": "27% +",
          "Pénétration de défense": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 97,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          armure: {
            id: 98,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: [""],
          },
          gants: {
            id: 99,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          bottes: {
            id: 100,
            statPrincipale: "Pénétration de défense",
            statsSecondaires: [""],
          },
          collier: {
            id: 76,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: [""],
          },
          bracelet: {
            id: 54,
            statPrincipale: "Dégâts de feu",
            statsSecondaires: [""],
          },
          bague: {
            id: 19,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          boucles: {
            id: 43,
            statPrincipale: "PM",
            statsSecondaires: [""],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 52 }, { id: 53 }, { id: 39 }, { id: 40 }],
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
          "Taux de coup critique ": "9000 +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "27% +",
          "Pénétration de défense": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 65,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          armure: {
            id: 95,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: [""],
          },
          gants: {
            id: 88,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          bottes: {
            id: 32,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: [""],
          },
          collier: {
            id: 73,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: [""],
          },
          bracelet: {
            id: 55,
            statPrincipale: "Dégâts de ténèbres",
            statsSecondaires: [""],
          },
          bague: {
            id: 20,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          boucles: {
            id: 44,
            statPrincipale: "PM",
            statsSecondaires: [""],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 35 }, { id: 36 }, { id: 41 }, { id: 42 }],
      },
    ],
    ombres: [{ id: 8 }, { id: 2 }, { id: 6 }],
    arme1: 5,
    arme2: 16,
    competence1: 2,
    competence2: 1,
    qte1: 3,
    qte2: 4,
    pierre_benediction_booster1: 26,
    pierre_benediction_booster2: 17,
    pierre_benediction_booster3: 11,
    pierre_benediction_booster4: 27,
    pierre_benediction_survie1: 30,
    pierre_benediction_survie2: 6,
    pierre_benediction_survie3: 8,
    pierre_benediction_survie4: 14,
  },

  {
    id: 2,
    nom: "Team Vent",
    // Sung Jinwoo
    chasseurs: [
      {
        id: 40,
        stats: {
          "Force": "574",
          "Vitalité": "-",
          "Agilité": "-",
          "Intelligence": "150",
          "Perception": "-",
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50% (8000)",
          "Dégâts de coup critique ": "200%",
          "Hausse des dégâts ": "30%",
          "Pénétration de défense ": "7%%",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "-",
        },
        artefacts: {
          casque: {
            id: 61,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          armure: {
            id: 8,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: [""],
          },
          gants: {
            id: 86,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          bottes: {
            id: 30,
            statPrincipale: "Dégâts de coup critique",
            statsSecondaires: [""],
          },
          collier: {
            id: 76,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: [""],
          },
          bracelet: {
            id: 54,
            statPrincipale: "Dégâts de vent",
            statsSecondaires: [""],
          },
          bague: {
            id: 19,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: [""],
          },
          boucles: {
            id: 43,
            statPrincipale: "PM",
            statsSecondaires: [""],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 29 }, { id: 30 }, { id: 39 }, { id: 40 }],
      },
      {
        // Goto
        id: 13,
        stats: {
          "PV supplémentaire": "Le plus possible",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50% (9000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 57,
            statPrincipale: "PV supplémentaire",
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
            statPrincipale: "Dégâts de coup critique | PV (%)",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 109,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 110,
            statPrincipale: "Dégâts de vent",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 32 }, { id: 33 }, { id: 55 }, { id: 56 }],
      },
      {
        // Han se-mi
        id: 14,
        stats: {
          "PV supplémentaire": "Le plus possible",
          "Défense supplémentaire": "-",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50% (9000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "4000 +",
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
            statPrincipale: "PV (%) | Dégâts de coup critique",
            statsSecondaires: ["-"],
          },
          collier: {
            id: 73,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 55,
            statPrincipale: "Dégâts de vent",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 5 }, { id: 6 }, { id: 41 }, { id: 42 }],
      },
      {
        // Lennart
        id: 44,
        stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "Le plus possible",
          "PM ": "-",
          "Attaque supplémentaire": "-",
          "Précision": "-",
          "Taux de coup critique ": "50% (9000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 113,
            statPrincipale: "Défense supplémentaire",
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
            statPrincipale: "Dégâts de vent",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 119,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 120,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 58 }, { id: 59 }, { id: 60 }],
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
          "Taux de coup critique ": "50% (5000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
        },
        artefacts: {
          casque: {
            id: 65,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          armure: {
            id: 95,
            statPrincipale: "Défense supplémentaire",
            statsSecondaires: ["-"],
          },
          gants: {
            id: 88,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          bottes: {
            id: 32,
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
            statPrincipale: "Dégâts de lumière",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 35 }, { id: 36 }, { id: 23 }, { id: 24 }],
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
          "Taux de coup critique ": "50% (9000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
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
            id: 77,
            statPrincipale: "PV supplémentaire",
            statsSecondaires: ["-"],
          },
          bracelet: {
            id: 56,
            statPrincipale: "Dégâts d'eau",
            statsSecondaires: ["-"],
          },
          bague: {
            id: 21,
            statPrincipale: "Attaque supplémentaire",
            statsSecondaires: ["-"],
          },
          boucles: {
            id: 45,
            statPrincipale: "PM",
            statsSecondaires: ["-"],
          },
        },
        noyaux: {
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 32 }, { id: 33 }, { id: 27 }, { id: 28 }],
      },
      {
        // Mirei
        id: 2,
        stats: {
          "PV supplémentaire": "-",
          "Défense supplémentaire": "-",
          "PM ": "1500+",
          "Attaque supplémentaire": "Le plus possible",
          "Précision": "-",
          "Taux de coup critique ": "50% (5000) +",
          "Dégâts de coup critique ": "200% +",
          "Hausse des dégâts ": "25% +",
          "Pénétration de défense ": "7% +",
          "Réduction des dégâts ": "-",
          "Réduction du temps de rechargement ": "-",
          "Hausse des soins donnés ": "-",
          "Hausse des soins reçus ": "-",
          "Hausse du taux de récupération des PM ": "-",
          "Baisse du coût de PM ": "2000 +",
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
            statPrincipale: "Dégâts de vent",
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
          1: [{ id: 8, statPrincipale: "Attaque" }],
          2: [{ id: 12, statPrincipale: "Défense" }],
          3: [{ id: 7, statPrincipale: "PV" }],
        },
        sets_bonus: [{ id: 58 }, { id: 59 }, { id: 60 }],
      },
    ],
    ombres: [{ id: 8 }, { id: 2 }, { id: 6 }],
    arme1: 14,
    arme2: 15,
    competence1: 4,
    competence2: 3,
    qte1: 3,
    qte2: 4,
    pierre_benediction_booster1: 26,
    pierre_benediction_booster2: 17,
    pierre_benediction_booster3: 11,
    pierre_benediction_booster4: 27,
    pierre_benediction_survie1: 30,
    pierre_benediction_survie2: 6,
    pierre_benediction_survie3: 8,
    pierre_benediction_survie4: 14,
  },
];
