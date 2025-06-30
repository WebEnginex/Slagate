import * as React from "react";

type ExpandedTeamContextType = {
  expandedTeamId: number | null;
  setExpandedTeamId: (id: number | null) => void;
};

export const ExpandedTeamContext = React.createContext<ExpandedTeamContextType | undefined>(undefined);

export function ExpandedTeamProvider({ children }: { children: React.ReactNode }) {
  const [expandedTeamId, setExpandedTeamId] = React.useState<number | null>(null);

  return (
    <ExpandedTeamContext.Provider value={{ expandedTeamId, setExpandedTeamId }}>
      {children}
    </ExpandedTeamContext.Provider>
  );
}
