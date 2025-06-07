export const teamChasseursTiers = {
  "S+": [
    {
      id: 1,
      name: "Team Feu",
      hunters: [10, 11, 35],
    },
    {
      id: 2,
      name: "Team Vent",
      hunters: [13, 14, 44],
      // Exemple d'alternative pour la team Vent avec Lennart Niermann au lieu de Mirei
      alternative: {
        hunters: [13, 14, 2], // Alternative avec Lennart au lieu de Mirei
        description: "Alternative avec Mirei" // Description de l'alternative
      }
    },
    {
      id: 3,
      name: "Team Lumière",
      hunters: [12, 33, 36],
    },
    {
      id: 4,
      name: "Team Eau",
      hunters: [41, 27, 43],
    },
  ],
  A: [],
  B: [
    {
      id: 5,
      name: "Team Ténèbres",
      hunters: [16, 7, 19],
    },
  ],
  C: [],
  D: [],
};


