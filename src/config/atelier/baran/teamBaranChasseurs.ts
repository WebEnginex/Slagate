export type TeamBaranChasseur = {
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
        statSecondaire?: string;
      }[];
    };
    sets_bonus: { id: number }[];
  }[];
  ombres: {
    id: number;
    description?: string;
  }[];
  };
  
  export const teamBaranChasseurs: TeamBaranChasseur[] = [
    // {
    //   id: 1,
    //   nom: "Team Feufeffffffe",
    //   chasseurs: [
    //     // Team 1
    //     {
    //       id: 13,
    //       stats: {
    //         "PV ": "25000",
    //         "Défense ": "10000",
    //         "PM ": "500",
    //         "Attaque ": "32000",
    //         "Précision (%) ": "18",
    //         "Taux de coup critique ": "22",
    //         "Dégâts de coup critique (%) ": "108",
    //         "Hausse des dégâts (%) ": "20",
    //         "Pénétration de défense (%) ": "8",
    //         "Réduction des dégâts ": "6",
    //         "Réduction du temps de rechargement ": "15",
    //         "Hausse des soins donnés ": "0",
    //         "Hausse des soins reçus ": "3",
    //         "Hausse du taux de récupération des PM ": "8",
    //         "Baisse du coût de PM ": "6",
    //       },
    //       artefacts: {
    //         casque: {
    //           id: 57,
    //           statPrincipale: "Attaque (%)",
    //           statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
    //         },
    //         armure: {
    //           id: 1,
    //           statPrincipale: "Défense",
    //           statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
    //         },
    //         gants: {
    //           id: 78,
    //           statPrincipale: "Taux de coup critique",
    //           statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
    //         },
    //         bottes: {
    //           id: 22,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
    //         },
    //         collier: {
    //           id: 68,
    //           statPrincipale: "Hausse des dégâts",
    //           statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
    //         },
    //         bracelet: {
    //           id: 47,
    //           statPrincipale: "Attaque",
    //           statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
    //         },
    //         bague: {
    //           id: 12,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //         boucles: {
    //           id: 36,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //       },
    //       noyaux: {
    //         1: [
    //           { id: 4, statPrincipale: "Attaque" },
    //           { id: 9, statPrincipale: "Attaque" },
    //         ],
    //         2: [{ id: 12, statPrincipale: "Défense" }],
    //         3: [
    //           { id: 2, statPrincipale: "PV" },
    //           { id: 7, statPrincipale: "PV" },
    //         ],
    //       },
    //       sets_bonus: [
    //         { id: 32 },
    //         { id: 33 },
    //         { id: 34 },
    //       ],
    //     },
    //     {
    //       id: 14,
    //       stats: {
    //         "PV ": "25000",
    //         "Défense ": "10000",
    //         "PM ": "500",
    //         "Attaque ": "32000",
    //         "Précision (%) ": "18",
    //         "Taux de coup critique ": "22",
    //         "Dégâts de coup critique (%) ": "108",
    //         "Hausse des dégâts (%) ": "20",
    //         "Pénétration de défense (%) ": "8",
    //         "Réduction des dégâts ": "6",
    //         "Réduction du temps de rechargement ": "15",
    //         "Hausse des soins donnés ": "0",
    //         "Hausse des soins reçus ": "3",
    //         "Hausse du taux de récupération des PM ": "8",
    //         "Baisse du coût de PM ": "6",
    //       },
    //       artefacts: {
    //         casque: {
    //           id: 1,
    //           statPrincipale: "Attaque (%)",
    //           statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
    //         },
    //         armure: {
    //           id: 2,
    //           statPrincipale: "Défense",
    //           statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
    //         },
    //         gants: {
    //           id: 3,
    //           statPrincipale: "Taux de coup critique",
    //           statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
    //         },
    //         bottes: {
    //           id: 4,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
    //         },
    //         collier: {
    //           id: 5,
    //           statPrincipale: "Hausse des dégâts",
    //           statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
    //         },
    //         bracelet: {
    //           id: 6,
    //           statPrincipale: "Attaque",
    //           statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
    //         },
    //         bague: {
    //           id: 7,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //         boucles: {
    //           id: 7,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //       },
    //       noyaux: {
    //         1: [
    //           { id: 4, statPrincipale: "Attaque" },
    //           { id: 9, statPrincipale: "Attaque" },
    //         ],
    //         2: [{ id: 12, statPrincipale: "Défense" }],
    //         3: [
    //           { id: 2, statPrincipale: "PV" },
    //           { id: 7, statPrincipale: "PV" },
    //         ],
    //       },
    //       sets_bonus: [
    //         { id: 29 },
    //         { id: 30 },
    //         { id: 31 },
    //       ],
    //     },
    //     {
    //       id: 2,
    //       stats: {
    //         "PV ": "25000",
    //         "Défense ": "10000",
    //         "PM ": "500",
    //         "Attaque ": "32000",
    //         "Précision (%) ": "18",
    //         "Taux de coup critique ": "22",
    //         "Dégâts de coup critique (%) ": "108",
    //         "Hausse des dégâts (%) ": "20",
    //         "Pénétration de défense (%) ": "8",
    //         "Réduction des dégâts ": "6",
    //         "Réduction du temps de rechargement ": "15",
    //         "Hausse des soins donnés ": "0",
    //         "Hausse des soins reçus ": "3",
    //         "Hausse du taux de récupération des PM ": "8",
    //         "Baisse du coût de PM ": "6",
    //       },
    //       artefacts: {
    //         casque: {
    //           id: 1,
    //           statPrincipale: "Attaque (%)",
    //           statsSecondaires: ["PV", "PM", "Taux de coup critique", "Défense"],
    //         },
    //         armure: {
    //           id: 2,
    //           statPrincipale: "Défense",
    //           statsSecondaires: ["PV", "Attaque", "Réduction des dégâts", "PM"],
    //         },
    //         gants: {
    //           id: 3,
    //           statPrincipale: "Taux de coup critique",
    //           statsSecondaires: ["Précision", "Dégâts de coup critique", "Attaque", "Défense"],
    //         },
    //         bottes: {
    //           id: 4,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["PM", "Attaque", "Réduction du temps de rechargement", "PV"],
    //         },
    //         collier: {
    //           id: 5,
    //           statPrincipale: "Hausse des dégâts",
    //           statsSecondaires: ["Défense", "Attaque", "Taux de coup critique", "PM"],
    //         },
    //         bracelet: {
    //           id: 6,
    //           statPrincipale: "Attaque",
    //           statsSecondaires: ["PV", "Précision (%)", "PM", "Réduction des dégâts"],
    //         },
    //         bague: {
    //           id: 7,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //         boucles: {
    //           id: 7,
    //           statPrincipale: "Précision (%)",
    //           statsSecondaires: ["Attaque", "PM", "Défense"],
    //         },
    //       },
    //       noyaux: {
    //         1: [
    //           { id: 4, statPrincipale: "Attaque" },
    //           { id: 9, statPrincipale: "Attaque" },
    //         ],
    //         2: [{ id: 12, statPrincipale: "Défense" }],
    //         3: [
    //           { id: 2, statPrincipale: "PV" },
    //           { id: 7, statPrincipale: "PV" },
    //         ],
    //       },
    //       sets_bonus: [
    //         { id: 29 },
    //         { id: 30 },
    //         { id: 31 },
    //       ],
    //     },
        
    //   ],
    //   ombres: [
    //     { id: 1, description: "Augmente l'attaque de 10% pendant 20 secondes après une compétence" },
    //     { id: 2 },
    //     { id: 3 },
    //   ],
    // },
   

















  ];
  