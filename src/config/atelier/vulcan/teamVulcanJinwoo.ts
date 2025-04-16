export type TeamVulcanJinwoo = {
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
        id: number;
        statPrincipale: string;
        statSecondaire?: string;
      }[];
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
  
  
  
  export const teamVulcanJinwoo: TeamVulcanJinwoo[] = [
    {
      id: 1,
      nom: "Team Jinwoo #1",
      chasseurs: [
        {
          id: 1,
          stats: {
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
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
          
        },
        {
          id: 2,
          stats: {
            "PV": "24000",
            "Attaque": "27000",
            "PM": "900",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        },
        {
          id: 3,
          stats: {
            "PV": "22000",
            "Attaque": "25000",
            "PM": "850"
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        },
        {
          id: 4,
          stats: {
            "PV": "26000",
            "Attaque": "28000",
            "PM": "950"
          },
          artefacts: {
            bottes: {
              id: 11,
              statPrincipale: "PM",
              statsSecondaires: ["PV", "Attaque"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        }
      ],
      ombres: [
        { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
        { id: 2 },
        { id: 3 },
      ],
      arme1: 1,
      arme2: 1,
      competence1: 1,
      competence2: 1,
      qte1: 1,
      qte2: 1,
      pierre_benediction_booster1: 1,
      pierre_benediction_booster2: 2,
      pierre_benediction_booster3: 3,
      pierre_benediction_booster4: 4,
      pierre_benediction_survie1: 5,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 7,
      pierre_benediction_survie4: 8
    },




    {
      id: 2,
      nom: "Team Jinwoo 2",
      chasseurs: [
        {
          id: 1,
          stats: {
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
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
          
        },
        {
          id: 2,
          stats: {
            "PV": "24000",
            "Attaque": "27000",
            "PM": "900",
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        },
        {
          id: 3,
          stats: {
            "PV": "22000",
            "Attaque": "25000",
            "PM": "850"
          },
          artefacts: {
            casque: {
              id: 1,
              statPrincipale: "PV",
              statsSecondaires: ["Attaque", "PM"],
            },
            armure: {
              id: 2,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "PM"],
            },
            gants: {
              id: 3,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique"]
            },
            bottes: {
              id: 4,
              statPrincipale: "PM",
              statsSecondaires: ["Attaque", "PV"]
            },
            collier: {
              id: 5,
              statPrincipale: "Attaque",
              statsSecondaires: ["PM", "Taux de coup critique"]
            },
            bracelet: {
              id: 6,
              statPrincipale: "Attaque",
              statsSecondaires: ["Précision", "Défense"]
            },
            bague: {
              id: 7,
              statPrincipale: "Dégâts de coup critique",
              statsSecondaires: ["Attaque", "PM"]
            },
            boucles: {
              id: 8,
              statPrincipale: "Précision",
              statsSecondaires: ["Attaque", "PM"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        },
        {
          id: 4,
          stats: {
            "PV": "26000",
            "Attaque": "28000",
            "PM": "950"
          },
          artefacts: {
            bottes: {
              id: 11,
              statPrincipale: "PM",
              statsSecondaires: ["PV", "Attaque"]
            }
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 29 },
            { id: 30 },
            { id: 31 },
          ],
        }
      ],
      ombres: [
        { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
        { id: 2 },
        { id: 3 },
      ],
      arme1: 1,
      arme2: 2,
      competence1: 1,
      competence2: 1,
      qte1: 1,
      qte2: 1,
      pierre_benediction_booster1: 1,
      pierre_benediction_booster2: 2,
      pierre_benediction_booster3: 3,
      pierre_benediction_booster4: 4,
      pierre_benediction_survie1: 5,
      pierre_benediction_survie2: 6,
      pierre_benediction_survie3: 7,
      pierre_benediction_survie4: 8
    }
  ];
  