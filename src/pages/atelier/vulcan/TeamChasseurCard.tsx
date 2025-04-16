
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronRight } from "lucide-react";

type TeamVulcanChasseur = {
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
};

type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Artefact = Database["public"]["Tables"]["artefacts"]["Row"];
type Noyau = Database["public"]["Tables"]["noyaux"]["Row"];
type Ombre = Database["public"]["Tables"]["ombres"]["Row"];
type SetBonus = Database["public"]["Tables"]["sets_bonus"]["Row"];

type ArtefactConfig = {
  id: number;
  statPrincipale: string;
  statsSecondaires: string[];
};

type NoyauConfig = {
  id: number;
  statPrincipale: string;
  statSecondaire?: string;
};

type Props = {
  team: TeamVulcanChasseur;
  chasseurs: Chasseur[];
  artefacts: Artefact[];
  noyaux: Noyau[];
  ombres: Ombre[];
  setsBonus: SetBonus[];
};

export default function TeamChasseurCard({
  team,
  chasseurs,
  artefacts,
  noyaux,
  ombres,
  setsBonus,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedChasseurId, setSelectedChasseurId] = useState<number | null>(null);

  const getFromList = (list: any[], id: number | string) =>
    list.find((i) => i.id.toString() === id.toString());

  return (
    <Card className="mb-10 bg-card/50 border-primary/20 overflow-hidden">
      <div className="p-4 bg-sidebar/30 border-b border-primary/10">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => {
            const chId = team.chasseurs[0]?.id ?? null;
            setIsExpanded(!isExpanded);
            setSelectedChasseurId(!isExpanded ? chId : null);
          }}
        >
          <h3 className="text-xl font-bold">
            {team.nom}
          </h3>
          {isExpanded ? 
            <ChevronDown className="w-5 h-5 text-primary" /> : 
            <ChevronRight className="w-5 h-5 text-primary" />
          }
        </div>
        
        {/* Team hunters preview */}
        <div className="flex flex-wrap items-center gap-3 mt-4">
          {team.chasseurs.map((ch, idx) => {
            const chasseur = getFromList(chasseurs, ch.id);
            return (
              <div 
                key={idx}
                className={`relative cursor-pointer transition-all hover:scale-105 group ${
                  selectedChasseurId === ch.id ? "scale-105" : ""
                }`}
                onClick={() => {
                  setIsExpanded(true);
                  setSelectedChasseurId(ch.id);
                }}
              >
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${
                  selectedChasseurId === ch.id ? "border-purple-500" : "border-primary/30"
                }`}>
                  <img
                    src={chasseur?.image || ""}
                    alt={chasseur?.nom}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-sidebar px-2 py-0.5 rounded-full text-xs font-medium border border-primary/20 whitespace-nowrap max-w-[80px] truncate text-center">
                  {chasseur?.nom}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isExpanded &&
        team.chasseurs.map((ch, index) => {
          if (ch.id !== selectedChasseurId) return null;
          const chasseur = getFromList(chasseurs, ch.id);
          if (!chasseur) return null;

          return (
            <CardContent key={index} className="p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={chasseur.image || ""} 
                  alt={chasseur.nom}
                  className="w-16 h-16 rounded-full border-2 border-primary/30" 
                />
                <div>
                  <h4 className="text-lg font-bold">{chasseur.nom}</h4>
                  <div className="text-xs text-muted-foreground">{chasseur.rarete}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-muted/20 rounded-lg p-3 mb-6">
                <h5 className="font-bold text-sm mb-2 text-primary/80">Statistiques</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  {Object.entries(ch.stats).map(([label, val]) => (
                    <div key={label} className="bg-card/30 rounded p-2 flex justify-between">
                      <span className="text-muted-foreground">{label}:</span>
                      <span className="font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artefacts */}
              <div className="mb-6">
                <h5 className="font-bold text-sm mb-3 text-primary/80">Artefacts</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(ch.artefacts as Record<string, ArtefactConfig>).map(([slot, data]) => {
                    const art = getFromList(artefacts, data.id);
                    return (
                      <div key={slot} className="bg-card/40 rounded-lg p-3 border border-primary/10 hover:border-primary/30 transition-colors">
                        <div className="flex flex-col items-center">
                          <img src={art?.image || ""} className="w-16 h-16 object-contain" />
                          <p className="mt-1 text-sm font-medium">{art?.nom}</p>
                          
                          {/* Primary stat */}
                          <div className="mt-2 w-full bg-primary/10 rounded p-1.5 mb-1 text-center">
                            <p className="text-xs font-semibold text-primary">{data.statPrincipale}</p>
                          </div>
                          
                          {/* Secondary stats */}
                          <div className="w-full space-y-1">
                            {data.statsSecondaires.map((s, i) => (
                              <div key={i} className="text-xs text-muted-foreground bg-muted/30 p-1 rounded">
                                {s}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sets Bonus */}
              <div className="mb-6">
                <h5 className="font-bold text-sm mb-3 text-primary/80">Sets Bonus</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {ch.sets_bonus.map((sb, i) => {
                    const bonus = getFromList(setsBonus, sb.id);
                    if (!bonus) return null;
                    return (
                      <div key={i} className="bg-muted/20 p-3 rounded-lg shadow-sm border border-primary/10">
                        <p className="font-semibold">{bonus.nom}</p>
                        <p className="text-xs text-muted-foreground mt-1">{bonus.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Noyaux */}
              <div className="mb-6">
                <h5 className="font-bold text-sm mb-3 text-primary/80">Noyaux</h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ch.noyaux.map((n, i) => {
                    const noyau = getFromList(noyaux, n.id);
                    return (
                      <div key={i} className="bg-card/40 rounded-lg p-3 border border-primary/10 flex flex-col items-center">
                        <img src={noyau?.image || ""} className="w-14 h-14 mb-2" />
                        <p className="text-sm font-semibold">{noyau?.nom}</p>
                        
                        <div className="mt-2 w-full">
                          <div className="bg-primary/10 rounded p-1.5 mb-1 text-center">
                            <p className="text-xs font-semibold text-primary">{n.statPrincipale}</p>
                          </div>
                          
                          {n.statSecondaire && (
                            <div className="bg-muted/30 rounded p-1.5 text-center mb-1">
                              <p className="text-xs text-muted-foreground">{n.statSecondaire}</p>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-2 text-center">{noyau?.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ombres */}
              <div>
                <h5 className="font-bold text-sm mb-3 text-primary/80">Ombres</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  {team.ombres.map((o, i) => {
                    const ombre = getFromList(ombres, o.id);
                    if (!ombre) return null;
                    return (
                      <div key={i} className="relative bg-card/40 rounded-lg p-3 border border-primary/10 flex flex-col items-center">
                        <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{i + 1}</span>
                        </div>
                        <img
                          src={ombre.image || ""}
                          alt={ombre.nom}
                          className="w-14 h-14 object-contain rounded-full border border-primary/20 mb-2"
                        />
                        <p className="font-medium text-sm text-center">{ombre.nom}</p>
                      </div>
                    );
                  })}
                </div>
                
                {team.ombres[0]?.description && (
                  <div className="bg-muted/20 p-3 rounded-lg mt-2 text-sm">
                    <p className="font-medium">
                      <span className="text-primary">{getFromList(ombres, team.ombres[0].id)?.nom}</span> : {team.ombres[0].description}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          );
        })}
    </Card>
  );
}
