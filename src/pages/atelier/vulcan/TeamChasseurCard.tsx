import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

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
    <div className="mb-10 border p-4 rounded bg-background">
      <h3
        className="text-xl font-bold cursor-pointer mb-2"
        onClick={() => {
          const chId = team.chasseurs[0]?.id ?? null;
          setIsExpanded(!isExpanded);
          setSelectedChasseurId(!isExpanded ? chId : null);
        }}
      >
        {team.nom}
      </h3>

      <div className="flex gap-2 mb-4">
        {team.chasseurs.map((ch, idx) => {
          const chasseur = getFromList(chasseurs, ch.id);
          return (
            <img
              key={idx}
              src={chasseur?.image || ""}
              alt={chasseur?.nom}
              className={`w-14 h-14 object-contain border-2 rounded-full cursor-pointer transition hover:scale-105 ${
                selectedChasseurId === ch.id ? "border-purple-500" : "border-transparent"
              }`}
              onClick={() => {
                setIsExpanded(true);
                setSelectedChasseurId(ch.id);
              }}
            />
          );
        })}
      </div>

      {isExpanded &&
        team.chasseurs.map((ch, index) => {
          if (ch.id !== selectedChasseurId) return null;
          const chasseur = getFromList(chasseurs, ch.id);
          if (!chasseur) return null;

          return (
            <div key={index}>
              <h4 className="text-lg font-bold mb-2">{chasseur.nom}</h4>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(ch.stats).map(([label, val]) => (
                  <div key={label}>
                    <strong>{label}:</strong> {val}
                  </div>
                ))}
              </div>

              {/* Artefacts */}
              <h5 className="font-bold mt-4">Artefacts</h5>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(ch.artefacts as Record<string, ArtefactConfig>).map(([slot, data]) => {
                  const art = getFromList(artefacts, data.id);
                  return (
                    <div key={slot} className="text-center">
                      <img src={art?.image || ""} className="w-16 h-16 mx-auto" />
                      <p className="mt-1 text-xs font-medium">{art?.nom}</p>
                      <p className="text-xs text-muted-foreground">{data.statPrincipale}</p>
                      <div className="text-xs">
                        {data.statsSecondaires.map((s, i) => (
                          <div key={i}>{s}</div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sets Bonus */}
              <h5 className="font-bold mt-4">Sets Bonus</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {ch.sets_bonus.map((sb, i) => {
                  const bonus = getFromList(setsBonus, sb.id);
                  if (!bonus) return null;
                  return (
                    <div key={i} className="bg-muted p-2 rounded shadow-sm">
                      <p className="font-semibold">{bonus.nom}</p>
                      <p className="text-xs text-muted-foreground mt-1">{bonus.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Noyaux */}
              <h5 className="font-bold mt-4">Noyaux</h5>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ch.noyaux.map((n, i) => {
                  const noyau = getFromList(noyaux, n.id);
                  return (
                    <div key={i} className="text-center">
                      <img src={noyau?.image || ""} className="w-14 h-14 mx-auto" />
                      <p className="text-sm font-semibold mt-1">{noyau?.nom}</p>
                      <p className="text-xs text-muted-foreground">{n.statPrincipale}</p>
                      {n.statSecondaire && (
                        <p className="text-xs text-muted-foreground">{n.statSecondaire}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">{noyau?.description}</p>
                    </div>
                  );
                })}
              </div>

              {/* Ombres */}
              <h5 className="font-bold mt-6">Ombres</h5>
              <div className="mt-2">
                <ul className="list-decimal list-inside">
                  {team.ombres.map((o, i) => {
                    const ombre = getFromList(ombres, o.id);
                    if (!ombre) return null;
                    return (
                      <li key={i} className="flex items-center gap-2 text-sm font-medium">
                        <img
                          src={ombre.image || ""}
                          alt={ombre.nom}
                          className="w-8 h-8 object-contain rounded"
                        />
                        {ombre.nom}
                      </li>
                    );
                  })}
                </ul>
                {team.ombres[0]?.description && (
                  <p className="text-sm text-muted-foreground mt-4">
                    <strong>Buff de l'ombre principal :</strong> {team.ombres[0].description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
}


