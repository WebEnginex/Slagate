// Configuration des teams chasseurs organisées par éléments avec rôles modifiables
export interface RoleBasedTeam {
  id: number;
  name: string;
  description?: string;
  breakers: number[];
  supports: number[];
  dps: number[];
}

export interface ElementTeams {
  [element: string]: RoleBasedTeam;
}

export const elementBasedTeams: ElementTeams = {
  "Feu": {
    id: 1,
    name: "Team Feu",
    description: "Composition optimale pour maximiser les dégâts de feu - Adaptez selon vos chasseurs disponibles",
    breakers: [49, 10, 9], // 
    supports: [11, 8], // 
    dps: [35, 39, 34] // 
  },
  "Vent": {
    id: 2,
    name: "Team Vent",
    description: "Composition optimale pour les dégâts de vent - Choisissez les meilleurs selon vos chasseurs",
    breakers: [50, 13, 37, 23], // 
    supports: [47, 14, 31], // 
    dps: [44, 2, 17, 30] // 
  },
  "Lumière": {
    id: 3,
    name: "Team Lumière",
    description: "Composition optimale pour les dégâts de lumière - Modulez selon votre collection",
    breakers: [12, 4, 38, 22], // 
    supports: [46, 28, 33], // 
    dps: [36, 6, 20] // 
  },
  "Eau": {
    id: 4,
    name: "Team Eau",
    description: "Composition optimale pour les dégâts d'eau - Personnalisez votre équipe",
    breakers: [41, 32, 29, 3, 15], // 
    supports: [27, 25], // 
    dps: [43, 45, 1] // 
  },
  "Ténèbres": {
    id: 5,
    name: "Team Ténèbres",
    description: "Composition optimale pour les dégâts de ténèbres - Ajustez selon vos besoins",
    breakers: [16, 26, 18], // 
    supports: [19, 24], // 
    dps: [48, 5, 7, 21] // 
  }
};

// Types pour TypeScript
export type TeamRole = 'breakers' | 'supports' | 'dps';
export type RoleDisplayName = 'Breaker' | 'Support' | 'DPS';

// Mapping pour l'affichage
export const roleDisplayNames: Record<TeamRole, RoleDisplayName> = {
  breakers: 'Breaker',
  supports: 'Support', 
  dps: 'DPS'
};

// Icônes pour chaque rôle (sera utilisé dans le composant)
export const roleIcons = {
  breakers: 'Shield',
  supports: 'Plus',
  dps: 'Sword'
} as const;