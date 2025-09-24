// Configuration des chasseurs organisés par rôles avec leurs tiers respectifs
export const hunterRoles = {
  Breakers: {
    SSS: [13, 41], // Chasseurs breakers de tier SSS
    SS: [12, 10, 9, 32], // Chasseurs breakers de tier SS
    S: [3, 4, 16, 37, 26], // Chasseurs breakers de tier S
    A: [29, 22], // Chasseurs breakers de tier A
    B: [18, 23] // Chasseurs breakers de tier B
  },
  DPS: {
    SSS: [44, 43, 35], // Chasseurs DPS de tier SSS
    SS: [36, 2], // Chasseurs DPS de tier SS
    S: [39, 5, 6], // Chasseurs DPS de tier S
    A: [1, 7], // Chasseurs DPS de tier A
    B: [17, 26], // Chasseurs DPS de tier B
    C: [15, 21, 34], // Chasseurs DPS de tier C
    D: [20, 30] // Chasseurs DPS de tier D
  },
  Supports: {
    SSS: [19, 24, 47], // Chasseurs supports de tier SSS
    SS: [28, 27, 11], // Chasseurs supports de tier SS
    S: [14, 33], // Chasseurs supports de tier S
    A: [25] // Chasseurs supports de tier A
    
  },
  Collab: {
    SSS: [48], // Chasseurs collab de tier SSS
    SS: [49, 50], // Chasseurs collab de tier SS
    S: [45, 46], // Chasseurs collab de tier S
    A: [], // Chasseurs collab de tier A
    B: [], // Chasseurs collab de tier B
    C: [], // Chasseurs collab de tier C
    D: [], // Chasseurs collab de tier D
    E: [] // Chasseurs collab de tier E
  }
};

// Types pour TypeScript
export type HunterRole = keyof typeof hunterRoles;
export type TierLevel = keyof typeof hunterRoles.Breakers;