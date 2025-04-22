export type ChasseurBuild = {
    chasseurId: number;
    element: "feu" | "eau" | "vent" | "lumiere" | "tenebres"; 
    builds: {
      id: number;
      nom: string;
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
        ombres: { id: number; description?: string }[];
        stats: Record<string, string>;
    }[];
  };


// Eléments possibles : "feu", "eau", "vent", "lumiere", "tenebres"
  
  export const buildsChasseurs: ChasseurBuild[] = [
    {
    // Alicia Blanche
      chasseurId: 1,
      element: "eau", // ← obligatoire maintenant
      builds: [
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        {
          id: 10,
          nom: "Support",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        
      ],
    },
    {
    // 
      chasseurId: 2,
      element: "vent", // ← obligatoire maintenant
      builds: [
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        
      ],
    },
    {
    // 
      chasseurId: 3,
      element: "eau", 
      builds: [
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        
      ],
    },
    {
    // Alicia Blanche
      chasseurId: 4,
      element: "lumiere", // ← obligatoire maintenant
      builds: [
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        
      ],
    },
    {
    // Alicia Blanche
      chasseurId: 5,
      element: "lumiere", // ← obligatoire maintenant
      builds: [
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        {
          id: 10,
          nom: "Full Dps",
          stats: {
            "PV ": "25000",
            "Défense ": "10000",
            "PM ": "500",
            "Attaque ": "32000",
            "Précision (%) ": "18",
            "Taux de coup critique ": "22",
            "Dégâts de coup critique (%) ": "108",
            "Hausse des dégâts (%) ": "20",
            "Pénétration de défense (%) ": "8",
            "Réduction des dégâts ": "6",
            "Réduction du temps de rechargement ": "15",
            "Hausse des soins donnés ": "0",
            "Hausse des soins reçus ": "3",
            "Hausse du taux de récupération des PM ": "8",
            "Baisse du coût de PM ": "6",
          },
          artefacts: {
            casque: {
              id: 57,
              statPrincipale: "Attaque (%)",
              statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
            },
            armure: {
              id: 1,
              statPrincipale: "Défense",
              statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
            },
            gants: {
              id: 78,
              statPrincipale: "Taux de coup critique",
              statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
            },
            bottes: {
              id: 22,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
            },
            collier: {
              id: 68,
              statPrincipale: "Hausse des dégâts",
              statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
            },
            bracelet: {
              id: 47,
              statPrincipale: "Attaque",
              statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
            },
            bague: {
              id: 12,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
            boucles: {
              id: 36,
              statPrincipale: "Précision (%)",
              statsSecondaires: ["Attaque", "PM", "Défense"],
            },
          },
          noyaux: [
            { id: 1, statPrincipale: "Attaque (%)", statSecondaire: "PM" },
            { id: 2, statPrincipale: "Taux de coup critique", statSecondaire: "Attaque (%)" },
            { id: 3, statPrincipale: "Dégâts de coup critique", statSecondaire: "Défense" },
          ],
          sets_bonus: [
            { id: 32 },
            { id: 33 },
            { id: 34 },
          ],
          ombres: [
            { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
            { id: 2 },
            { id: 3 },
          ],
        },
        
      ],
    },

  ];
  