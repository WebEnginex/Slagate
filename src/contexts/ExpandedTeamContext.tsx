
import React, { createContext, useContext, useState } from "react";

type ExpandedTeamContextType = {
  expandedTeamId: number | null;
  setExpandedTeamId: (id: number | null) => void;
};

const ExpandedTeamContext = createContext<ExpandedTeamContextType | undefined>(undefined);

export function ExpandedTeamProvider({ children }: { children: React.ReactNode }) {
  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);

  return (
    <ExpandedTeamContext.Provider value={{ expandedTeamId, setExpandedTeamId }}>
      {children}
    </ExpandedTeamContext.Provider>
  );
}

export function useExpandedTeam() {
  const context = useContext(ExpandedTeamContext);
  if (context === undefined) {
    throw new Error("useExpandedTeam must be used within an ExpandedTeamProvider");
  }
  return context;
}
