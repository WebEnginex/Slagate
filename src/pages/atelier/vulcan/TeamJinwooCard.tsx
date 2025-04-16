
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Star, Shield, Sword, BarChart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TeamVulcanJinwoo } from "@/config/atelier/vulcan/teamVulcanJinwoo";

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
    <Card className="mb-10 bg-card shadow-lg border-muted overflow-hidden">
      <CardHeader 
        className={`p-4 flex flex-row items-center justify-between bg-gradient-to-r from-sidebar-accent to-card cursor-pointer transition-colors hover:from-sidebar-accent/80 hover:to-card/80`}
        onClick={() => toggleTeam(team.id)}
      >
        <CardTitle className="text-xl font-bold flex items-center gap-2">
          <Sword className="h-5 w-5 text-primary" />
          {team.nom}
        </CardTitle>
        {expandedTeamId === team.id ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </CardHeader>

      {expandedTeamId === team.id && (
        <CardContent className="p-4 pt-6">
          <div className="space-y-6">
            {/* Chasseurs selection */}
            <div className="bg-muted/40 p-3 rounded-lg">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground flex items-center gap-1.5">
                <Star className="h-4 w-4 text-primary" />
                Chasseurs
              </h4>
              <div className="flex flex-wrap gap-3">
                {team.chasseurs.map((ch, idx) => {
                  const chasseur = getFromList(chasseurs, ch.id);
                  return (
                    <div 
                      key={idx} 
                      className={`relative group cursor-pointer transition-all duration-200 hover:scale-105`}
                      onClick={() => setSelectedChasseurId(ch.id)}
                    >
                      <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 ${
                        selectedChasseurId === ch.id
                          ? "border-primary shadow-md shadow-primary/20"
                          : "border-transparent"
                      }`}>
                        <img
                          src={chasseur?.image || ""}
                          alt={chasseur?.nom}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className={`absolute -bottom-1 -right-1 rounded-full p-0.5 ${
                        selectedChasseurId === ch.id ? "bg-primary" : "bg-muted"
                      }`}>
                        <Star className="h-3 w-3 text-background" fill={selectedChasseurId === ch.id ? "currentColor" : "none"} />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-popover border border-border text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                        {chasseur?.nom}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {team.chasseurs.map((ch, index) => {
              if (ch.id !== selectedChasseurId) return null;
              const chasseur = getFromList(chasseurs, ch.id);
              if (!chasseur) return null;

              return (
                <div key={index} className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold flex items-center gap-2">
                      <img 
                        src={chasseur.image} 
                        alt={chasseur.nom} 
                        className="w-8 h-8 rounded-full" 
                      />
                      {chasseur.nom}
                    </h4>
                  </div>

                  {/* Stats */}
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                      <BarChart className="h-4 w-4 text-primary" />
                      Statistiques
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(ch.stats).map(([label, val]) => (
                        <div key={label} className="bg-background p-2 rounded border border-border">
                          <div className="text-xs text-muted-foreground">{label}</div>
                          <div className="font-medium">{val}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Armes - uniquement pour le 1er chasseur */}
                  {selectedChasseurId === team.chasseurs[0]?.id && (
                    <div className="bg-muted/40 p-4 rounded-lg">
                      <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                        <Sword className="h-4 w-4 text-primary" />
                        Armes
                      </h5>
                      <div className="flex gap-4 mt-2">
                        {[team.arme1, team.arme2].map((armeId, i) => {
                          const arme = getFromList(armes, armeId);
                          if (!arme) return null;
                          return (
                            <div key={i} className="bg-background p-3 rounded-lg border border-border text-center w-24">
                              <div className="relative mb-2">
                                <img
                                  src={arme.image}
                                  className="w-16 h-16 mx-auto object-contain"
                                />
                                <div className="absolute -bottom-1 -right-1">
                                  <img
                                    src={arme.arme_element}
                                    className="w-6 h-6 rounded-full border border-border"
                                  />
                                </div>
                              </div>
                              <p className="text-sm font-medium truncate">{arme.nom}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Artefacts */}
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      Artefacts
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(ch.artefacts).map(([slot, data]) => {
                        const art = getFromList(artefacts, data.id);
                        return (
                          <div key={slot} className="bg-background p-3 rounded-lg border border-border">
                            <div className="flex flex-col items-center">
                              <img
                                src={art?.image || ""}
                                className="w-16 h-16 mx-auto object-contain"
                              />
                              <p className="mt-1 text-xs font-medium text-center">{art?.nom}</p>
                              
                              <div className="w-full mt-2">
                                <div className="text-xs bg-primary/20 text-primary-foreground px-2 py-1 rounded mb-1.5 font-medium text-center">
                                  {data.statPrincipale}
                                </div>
                                <div className="space-y-1">
                                  {data.statsSecondaires.map((s, i) => (
                                    <div key={i} className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded text-center">
                                      {s}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sets Bonus */}
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                      <Star className="h-4 w-4 text-primary" />
                      Sets Bonus
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      {ch.sets_bonus.map((sb, i) => {
                        const bonus = getFromList(setsBonus, sb.id);
                        if (!bonus) return null;
                        return (
                          <div key={i} className="bg-background p-3 rounded-lg border border-border">
                            <p className="font-semibold text-sm">{bonus.nom}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {bonus.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Noyaux */}
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      Noyaux
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {ch.noyaux.map((n, i) => {
                        const noyau = getFromList(noyaux, n.id);
                        return (
                          <div key={i} className="bg-background p-3 rounded-lg border border-border flex items-start gap-3">
                            <img
                              src={noyau?.image || ""}
                              className="w-12 h-12 object-contain"
                            />
                            <div>
                              <p className="text-sm font-semibold">{noyau?.nom}</p>
                              <div className="mt-1 space-y-1">
                                <div className="text-xs bg-primary/20 text-primary-foreground px-2 py-0.5 rounded">
                                  {n.statPrincipale}
                                </div>
                                {n.statSecondaire && (
                                  <div className="text-xs text-muted-foreground px-2 py-0.5 bg-muted/50 rounded">
                                    {n.statSecondaire}
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mt-1.5">{noyau?.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Ombres */}
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                      <Star className="h-4 w-4 text-primary" />
                      Ombres
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {team.ombres.map((o, i) => {
                        const ombre = getFromList(ombres, o.id);
                        if (!ombre) return null;
                        return (
                          <div key={i} className="bg-background p-3 rounded-lg border border-border">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex-shrink-0 relative">
                                <img
                                  src={ombre.image || ""}
                                  className="w-12 h-12 object-contain"
                                />
                                <div className="absolute -top-1 -right-1 bg-primary text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white">
                                  {i + 1}
                                </div>
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">{ombre.nom}</p>
                              </div>
                            </div>
                            {o.description && (
                              <p className="text-xs text-muted-foreground mt-1 border-t border-border pt-2">
                                {o.description}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Compétences, QTE et Pierres de Bénédiction - uniquement pour le 1er chasseur */}
                  {selectedChasseurId === team.chasseurs[0]?.id && (
                    <>
                      {/* Compétences */}
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                          <Sword className="h-4 w-4 text-primary" />
                          Compétences
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[team.competence1, team.competence2].map((id, i) => {
                            const skill = getFromList(competences, id);
                            if (!skill) return null;
                            return (
                              <div key={i} className="bg-background p-3 rounded-lg border border-border flex items-start gap-3">
                                <img
                                  src={skill.image || ""}
                                  className="w-14 h-14 object-contain"
                                />
                                <div>
                                  <p className="text-sm font-medium">{skill.nom}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {skill.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* QTE */}
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                          <Sword className="h-4 w-4 text-primary" />
                          QTE
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {[team.qte1, team.qte2].map((id, i) => {
                            const qte = getFromList(qtes, id);
                            if (!qte) return null;
                            return (
                              <div key={i} className="bg-background p-3 rounded-lg border border-border flex items-start gap-3">
                                <img
                                  src={qte.image || ""}
                                  className="w-14 h-14 object-contain"
                                />
                                <div>
                                  <p className="text-sm font-medium">{qte.nom}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {qte.description}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Pierres de bénédiction */}
                      <div className="bg-muted/40 p-4 rounded-lg">
                        <h5 className="font-medium mb-3 flex items-center gap-1.5 text-sm">
                          <Shield className="h-4 w-4 text-primary" />
                          Pierres de Bénédiction
                        </h5>
                        <div className="space-y-3">
                          <div>
                            <h6 className="text-xs font-medium mb-2 text-muted-foreground">Pierres Booster</h6>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {[
                                team.pierre_benediction_booster1,
                                team.pierre_benediction_booster2,
                                team.pierre_benediction_booster3,
                                team.pierre_benediction_booster4,
                              ].map((id, i) => {
                                const pierre = getFromList(pierres, id);
                                if (!pierre) return null;
                                return (
                                  <div key={i} className="bg-background p-3 rounded-lg border border-border text-center">
                                    <img
                                      src={pierre.image || ""}
                                      className="w-12 h-12 mx-auto object-contain"
                                    />
                                    <p className="text-xs font-medium mt-1">{pierre.nom}</p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {pierre.description}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="text-xs font-medium mb-2 text-muted-foreground">Pierres Survie</h6>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {[
                                team.pierre_benediction_survie1,
                                team.pierre_benediction_survie2,
                                team.pierre_benediction_survie3,
                                team.pierre_benediction_survie4,
                              ].map((id, i) => {
                                const pierre = getFromList(pierres, id);
                                if (!pierre) return null;
                                return (
                                  <div key={i} className="bg-background p-3 rounded-lg border border-border text-center">
                                    <img
                                      src={pierre.image || ""}
                                      className="w-12 h-12 mx-auto object-contain"
                                    />
                                    <p className="text-xs font-medium mt-1">{pierre.nom}</p>
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                      {pierre.description}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
