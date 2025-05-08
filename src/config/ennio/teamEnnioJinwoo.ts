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
    nom: "Faiblesse Lumière | Feu",
    team1: {
      id: 1,
      nom: "Team Lumière",
      chasseurs: [
        {
          id: 40,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        // Ajoutez 3 autres chasseurs ici
      ],
      ombres: [
        { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
      ],
      arme1: 1,
      arme2: 2,
      competence1: 1,
      competence2: 2,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 1,
      pierre_benediction_booster2: 2,
      pierre_benediction_booster3: 3,
      pierre_benediction_booster4: 4,
      pierre_benediction_survie1: 5,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 7,
      pierre_benediction_survie4: 8,
    },
    team2: {
      id: 1,
      nom: "Team 1",
      chasseurs: [
        {
          id: 40,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        {
          id: 1,
          stats: {
            "Force": "25000",
            "Vitalité": "30000",
            "Agilité": "1000",
            "Intelligence": "15",
            "Perception": "8000",
            "PV": "25000",
            "Attaque": "30000",
            "PM": "1000",
            "Précision": "15",
            "Défense": "8000",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "Défense"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Agilité"],
            },
          },
          noyaux: {
            1: [
              { id: 1, statPrincipale: "Attaque (%)" },
              { id: 2, statPrincipale: "Taux de coup critique" },
            ],
            2: [
              { id: 3, statPrincipale: "Défense" },
              { id: 4, statPrincipale: "PV" },
            ],
            3: [
              { id: 5, statPrincipale: "Attaque" },
              { id: 6, statPrincipale: "Précision" },
            ],
          },
          sets_bonus: [{ id: 29 }, { id: 30 }],
        },
        // Ajoutez 3 autres chasseurs ici
      ],
      ombres: [
        { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
      ],
      arme1: 1,
      arme2: 2,
      competence1: 1,
      competence2: 2,
      qte1: 1,
      qte2: 2,
      pierre_benediction_booster1: 1,
      pierre_benediction_booster2: 2,
      pierre_benediction_booster3: 3,
      pierre_benediction_booster4: 4,
      pierre_benediction_survie1: 5,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 7,
      pierre_benediction_survie4: 8,
    },
  },
  {
    id: 2,
    nom: "Team 2",
    team1: {
      id: 3,
      nom: "Team Jinwoo Gamma",
      chasseurs: [
        // Ajoutez les chasseurs ici
      ],
      ombres: [],
      arme1: 0,
      arme2: 0,
      competence1: 0,
      competence2: 0,
      qte1: 0,
      qte2: 0,
      pierre_benediction_booster1: 0,
      pierre_benediction_booster2: 0,
      pierre_benediction_booster3: 0,
      pierre_benediction_booster4: 0,
      pierre_benediction_survie1: 0,
      pierre_benediction_survie2: 0,
      pierre_benediction_survie3: 0,
      pierre_benediction_survie4: 0,
    },
    team2: {
      id: 4,
      nom: "Team Jinwoo Delta",
      chasseurs: [
        // Ajoutez les chasseurs ici
      ],
      ombres: [],
      arme1: 0,
      arme2: 0,
      competence1: 0,
      competence2: 0,
      qte1: 0,
      qte2: 0,
      pierre_benediction_booster1: 0,
      pierre_benediction_booster2: 0,
      pierre_benediction_booster3: 0,
      pierre_benediction_booster4: 0,
      pierre_benediction_survie1: 0,
      pierre_benediction_survie2: 0,
      pierre_benediction_survie3: 0,
      pierre_benediction_survie4: 0,
    },
  },
];
