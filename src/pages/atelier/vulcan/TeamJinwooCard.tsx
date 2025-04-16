import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type TeamVulcanJinwoo = {
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
  arme1: number;
  arme2: number;
  competence1: number;
  competence2: number;
  qte1: number;
  qte2: number;
  pierre_benediction_booster1: number;
  pierre_benediction_booster2: number;
  pierre_benediction_booster3: number;
  pierre_benediction_booster4: number;
  pierre_benediction_survie1: number;
  pierre_benediction_survie2: number;
  pierre_benediction_survie3: number;
  pierre_benediction_survie4: number;
};

type Props = {
  team: TeamVulcanJinwoo;
  chasseurs: Database["public"]["Tables"]["chasseurs"]["Row"][];
  artefacts: Database["public"]["Tables"]["artefacts"]["Row"][];
  noyaux: Database["public"]["Tables"]["noyaux"]["Row"][];
  ombres: Database["public"]["Tables"]["ombres"]["Row"][];
  setsBonus: Database["public"]["Tables"]["sets_bonus"]["Row"][];
  armes: Database["public"]["Tables"]["jinwoo_armes"]["Row"][];
  competences: Database["public"]["Tables"]["jinwoo_competences"]["Row"][];
  qtes: Database["public"]["Tables"]["jinwoo_qte"]["Row"][];
  pierres: Database["public"]["Tables"]["pierres_benediction"]["Row"][];
};

export default function TeamJinwooCard({
  team,
  chasseurs,
  artefacts,
  noyaux,
  ombres,
  setsBonus,
  armes,
  competences,
  qtes,
  pierres,
}: Props) {
  const [expandedTeamId, setExpandedTeamId] = useState<number | null>(null);
  const [selectedChasseurId, setSelectedChasseurId] = useState<number | null>(
    null
  );

  const getFromList = (list: any[], id: number | string) =>
    list.find((i) => i.id.toString() === id.toString());

  const toggleTeam = (teamId: number) => {
    setExpandedTeamId((prevId) => (prevId === teamId ? null : teamId));
    const firstChasseurId = team.chasseurs[0]?.id ?? null;
    setSelectedChasseurId(firstChasseurId);
  };

  return (
    <div className="mb-10 border p-4 rounded bg-background">
      <h3
        className="text-xl font-bold cursor-pointer mb-2"
        onClick={() => toggleTeam(team.id)}
      >
        {team.nom}
      </h3>

      {expandedTeamId === team.id && (
        <>
          <div className="flex gap-2 mb-4">
            {team.chasseurs.map((ch, idx) => {
              const chasseur = getFromList(chasseurs, ch.id);
              return (
                <img
                  key={idx}
                  src={chasseur?.image || ""}
                  alt={chasseur?.nom}
                  className={`w-14 h-14 object-contain border-2 rounded-full cursor-pointer transition hover:scale-105 ${
                    selectedChasseurId === ch.id
                      ? "border-purple-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedChasseurId(ch.id)}
                />
              );
            })}
          </div>

          {team.chasseurs.map((ch, index) => {
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

                {/* Armes - uniquement pour le 1er chasseur */}
                {selectedChasseurId === team.chasseurs[0]?.id && (
                  <>
                    <h5 className="font-bold mt-4">Armes</h5>
                    <div className="flex gap-4 mt-2">
                      {[team.arme1, team.arme2].map((armeId, i) => {
                        const arme = getFromList(armes, armeId);
                        if (!arme) return null;
                        return (
                          <div key={i} className="text-center">
                            <img
                              src={arme.image}
                              className="w-16 h-16 mx-auto"
                            />
                            <p className="text-sm font-medium">{arme.nom}</p>
                            <img
                              src={arme.arme_element}
                              className="w-5 h-5 mx-auto mt-1"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {/* Artefacts */}
                <h5 className="font-bold mt-4">Artefacts</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(ch.artefacts).map(([slot, data]) => {
                    const art = getFromList(artefacts, data.id);
                    return (
                      <div key={slot} className="text-center">
                        <img
                          src={art?.image || ""}
                          className="w-16 h-16 mx-auto"
                        />
                        <p className="mt-1 text-xs font-medium">{art?.nom}</p>
                        <p className="text-xs text-muted-foreground">
                          {data.statPrincipale}
                        </p>
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
                        <p className="text-xs text-muted-foreground mt-1">
                          {bonus.description}
                        </p>
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
                        <img
                          src={noyau?.image || ""}
                          className="w-14 h-14 mx-auto"
                        />
                        <p className="text-sm font-semibold mt-1">
                          {noyau?.nom}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {n.statPrincipale}
                        </p>
                        {n.statSecondaire && (
                          <p className="text-xs text-muted-foreground">
                            {n.statSecondaire}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {noyau?.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Ombres */}
                <h5 className="font-bold mt-6">Ombres</h5>
                <div className="flex flex-wrap gap-4 mt-2">
                  {team.ombres.map((o, i) => {
                    const ombre = getFromList(ombres, o.id);
                    if (!ombre) return null;
                    return (
                      <div key={i} className="text-center w-24">
                        <img
                          src={ombre.image || ""}
                          className="w-16 h-16 mx-auto"
                        />
                        <p className="text-sm font-medium mt-1">{ombre.nom}</p>
                        {o.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {o.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Compétences, QTE et Pierres de Bénédiction - uniquement pour le 1er chasseur */}
                {selectedChasseurId === team.chasseurs[0]?.id && (
                  <>
                    {/* Compétences */}
                    <h5 className="font-bold mt-6">Compétences</h5>
                    <div className="flex flex-wrap gap-6">
                      {[team.competence1, team.competence2].map((id, i) => {
                        const skill = getFromList(competences, id);
                        if (!skill) return null;
                        return (
                          <div key={i} className="text-center w-32">
                            <img
                              src={skill.image || ""}
                              className="w-16 h-16 mx-auto"
                            />
                            <p className="text-sm font-medium mt-1">
                              {skill.nom}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {skill.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* QTE */}
                    <h5 className="font-bold mt-6">QTE</h5>
                    <div className="flex flex-wrap gap-6">
                      {[team.qte1, team.qte2].map((id, i) => {
                        const qte = getFromList(qtes, id);
                        if (!qte) return null;
                        return (
                          <div key={i} className="text-center w-32">
                            <img
                              src={qte.image || ""}
                              className="w-16 h-16 mx-auto"
                            />
                            <p className="text-sm font-medium mt-1">
                              {qte.nom}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {qte.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Pierres de bénédiction */}
                    <h5 className="font-bold mt-6">Pierres de Bénédiction</h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        team.pierre_benediction_booster1,
                        team.pierre_benediction_booster2,
                        team.pierre_benediction_booster3,
                        team.pierre_benediction_booster4,
                        team.pierre_benediction_survie1,
                        team.pierre_benediction_survie2,
                        team.pierre_benediction_survie3,
                        team.pierre_benediction_survie4,
                      ].map((id, i) => {
                        const pierre = getFromList(pierres, id);
                        if (!pierre) return null;
                        return (
                          <div key={i} className="text-center">
                            <img
                              src={pierre.image || ""}
                              className="w-14 h-14 mx-auto"
                            />
                            <p className="text-sm mt-1">{pierre.nom}</p>
                            <p className="text-xs text-muted-foreground">
                              {pierre.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}