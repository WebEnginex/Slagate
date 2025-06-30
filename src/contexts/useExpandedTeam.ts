import * as React from "react";
import { ExpandedTeamContext } from "./ExpandedTeamContext";

export function useExpandedTeam() {
  const context = React.useContext(ExpandedTeamContext);
  if (context === undefined) {
    throw new Error("useExpandedTeam must be used within an ExpandedTeamProvider");
  }
  return context;
}
