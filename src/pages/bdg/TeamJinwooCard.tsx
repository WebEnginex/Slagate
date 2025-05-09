import React, { useState, useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { User, ChevronDown, ChevronUp, Dna, BarChart2, GemIcon, Swords, Layers, Sparkles, Award, CirclePlay, FlaskConical } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useExpandedTeam } from "@/contexts/ExpandedTeamContext";
import { TeamBdgJinwoo } from "@/config/bdg/teamBdgJinwoo";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

type Props = {
  team: TeamBdgJinwoo;
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
  const { expandedTeamId, setExpandedTeamId } = useExpandedTeam();
  const [selectedChasseurId, setSelectedChasseurId] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});

  const toggleTeam = (teamId: number) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
    setSelectedChasseurId(null); // Réinitialiser le chasseur sélectionné
  };

  const getFromList = <T extends { id: number | string }>(list: T[], id: number | string) =>
    list.find((item) => item.id.toString() === id.toString());

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const isSectionOpen = (section: string) => openSections[section];

  function formatTextWithBrackets(text: string) {
    const regex =
      /(\[[^\]]+\])|(\d+(?:[.,]\d+)? ?%?)|(\bseconde(?:s)?\b)|(\bPV\b|\bpv\b)|(\bPM\b|\bpm\b)/gi;
  
    return text.split(regex).map((part, index) => {
      if (!part) return null;
  
      // Texte entre crochets
      if (part.startsWith("[") && part.endsWith("]")) {
        const content = part.slice(1, -1); // Retirer les crochets
        if (content === "Bris") {
          return (
            <span key={index} className="text-orange-500">
              {part}
            </span>
          );
        } else {
          return (
            <span key={index} className="text-teal-500">
              {part}
            </span>
          );
        }
      }
  
      // Chiffres ou pourcentages (inclut les chiffres à virgules)
      if (/^\d+(?:[.,]\d+)? ?%?$/.test(part)) {
        return (
          <span key={index} className="text-yellow-500">
            {part}
          </span>
        );
      }
  
      // Mots "seconde" ou "secondes"
      if (/^seconde(?:s)?$/.test(part)) {
        return (
          <span key={index} className="text-yellow-500">
            {part}
          </span>
        );
      }
  
      // "PV" ou "pv" en rouge
      if (/^PV$|^pv$/.test(part)) {
        return (
          <span key={index} className="text-red-500">
            {part}
          </span>
        );
      }
  
      // "PM" ou "pm" en bleu
      if (/^PM$|^pm$/.test(part)) {
        return (
          <span key={index} className="text-blue-500">
            {part}
          </span>
        );
      }
  
      // Texte normal
      return part;
    });
  }

  return (
    <Card className="mb-10 bg-sidebar border-sidebar-border overflow-hidden">
      <CardHeader
        className="p-4 flex flex-row items-center justify-between bg-sidebar cursor-pointer transition-colors hover:bg-sidebar/90"
        onClick={() => toggleTeam(team.id)}
      >
        <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
          <User className="h-5 w-5 text-solo-purple" />
          {team.nom}
        </CardTitle>
        {expandedTeamId === team.id ? (
          <ChevronUp className="h-5 w-5 text-white" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white" />
        )}
      </CardHeader>

      {expandedTeamId === team.id && (
        <CardContent className="p-4 pt-6 bg-sidebar-accent">
          <div className="space-y-6">
            {/* Sélection des chasseurs */}
            <div className="flex flex-wrap gap-3 justify-center">
              {team.chasseurs.map((chasseur, idx) => {
                const chasseurData = getFromList(chasseurs, chasseur.id);
                return (
                  <div
                    key={idx}
                    className={`relative group cursor-pointer transition-all duration-200 hover:scale-105`}
                    onClick={() => setSelectedChasseurId(chasseur.id)}
                  >
                    <div
                      className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
                        selectedChasseurId === chasseur.id
                          ? "border-solo-purple"
                          : "border-sidebar-border"
                      }`}
                    >
                      <img
                        src={chasseurData?.image || ""}
                        alt={chasseurData?.nom}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Détails du chasseur sélectionné */}
            {team.chasseurs.map((chasseur) => {
              if (chasseur.id !== selectedChasseurId) return null;
              const chasseurData = getFromList(chasseurs, chasseur.id);

              return (
                <div key={chasseur.id}>
                  <h3 className="text-lg font-bold text-white text-center mb-4">
                    {chasseurData?.nom}
                  </h3>
                  <Accordion type="single" collapsible>
                    {/* Stats Section */}
                    <div className="space-y-4 md:space-y-6 lg:space-y-8">
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                        <Collapsible open={isSectionOpen('stats')} onOpenChange={() => toggleSection('stats')}>
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <BarChart2 className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Statistiques</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(chasseur.stats).map(([label, val]) => (
                                  <div key={label} className="bg-sidebar p-3 rounded border border-sidebar-border">
                                    <div className="text-xs text-solo-light-purple mb-1">{label}</div>
                                    <div className="font-medium text-white">{val}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* Armes */}
                      {selectedChasseurId === team.chasseurs[0]?.id && (
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                          <Collapsible open={isSectionOpen('armes')} onOpenChange={() => toggleSection('armes')}>
                            <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                              <Swords className="h-4 w-4 text-solo-purple" />
                              <span className="flex-1 text-left">Armes</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                              <div className="p-4">
                                <div className="flex gap-4 justify-center">
                                  {[team.arme1, team.arme2].map((armeId, i) => {
                                    const arme = getFromList(armes, armeId);
                                    if (!arme) return null;
                                    return (
                                      <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32">
                                        <div className="relative mb-2">
                                          <img src={arme.image} className="w-20 h-20 mx-auto object-contain" />
                                          <div className="absolute -bottom-1 -right-1">
                                            <img src={arme.arme_element} className="w-6 h-6 rounded-full border border-sidebar-border" />
                                          </div>
                                        </div>
                                        <p className="text-sm font-medium truncate text-white">{arme.nom}</p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )}

                      {/* Artefacts Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                        <Collapsible open={isSectionOpen('artefacts')} onOpenChange={() => toggleSection('artefacts')}>
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <GemIcon className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Artefacts</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Object.entries(chasseur.artefacts).map(([slot, data]) => {
                                  const art = getFromList(artefacts, data.id);
                                  return (
                                    <div key={slot} className="bg-sidebar p-3 rounded-lg border border-sidebar-border">
                                      <div className="flex flex-col items-center">
                                        <p className="mb-2 text-xs font-semibold text-solo-light-purple">{slot.charAt(0).toUpperCase() + slot.slice(1)}</p>
                                        <img
                                          src={art?.image || ""}
                                          className="w-16 h-16 mx-auto object-contain"
                                          alt={art?.nom || "Artefact"}
                                        />
                                        <p className="mt-1 text-xs font-medium text-center text-white">{art?.nom}</p>
                                        <div className="w-full mt-2">
                                          <div className="text-xs bg-solo-purple/20 text-white px-2 py-1 rounded font-medium text-center">
                                            {data.statPrincipale}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* Sets Bonus Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                        <Collapsible
                          open={isSectionOpen("sets")}
                          onOpenChange={() => toggleSection("sets")}
                        >
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <Layers className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Bonus de Sets</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                {chasseur.sets_bonus.map((sb, i) => {
                                  const bonus = getFromList(setsBonus, sb.id);
                                  if (!bonus) return null;
                                  return (
                                    <div
                                      key={i}
                                      className="bg-sidebar p-3 rounded-lg border border-sidebar-border"
                                    >
                                      <p className="font-semibold text-sm text-solo-purple">
                                        {bonus.nom}
                                      </p>
                                      <p className="text-xs text-gray-300 mt-2">
                                        {bonus.description.split('\n').map((line, index) => (
                                          <React.Fragment key={index}>
                                            {formatTextWithBrackets(line)}
                                            <br />
                                          </React.Fragment>
                                        ))}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>


                      {/* Noyaux Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                        <Collapsible open={isSectionOpen('noyaux')} onOpenChange={() => toggleSection('noyaux')}>
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <Dna className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Noyaux</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {Object.values(chasseur.noyaux).flat().map((n, i) => {
                                  const noyau = getFromList(noyaux, n.id);
                                  return (
                                    <div key={i} className="bg-sidebar p-4 rounded-lg border border-sidebar-border">
                                      <div className="flex flex-col">
                                        <div className="flex flex-col items-center mb-3">
                                          <img
                                            src={noyau?.image || ""}
                                            className="w-16 h-16 object-contain mb-2"
                                            alt={noyau?.nom || "Noyau"}
                                          />
                                          <p className="text-sm font-semibold text-white text-center">{noyau?.nom}</p>
                                        </div>
                                        <div className="bg-solo-purple/20 text-white text-xs px-3 py-1.5 rounded-md text-center font-medium">
                                          {n.statPrincipale}
                                        </div>
                                        <p className="text-xs text-gray-300 mt-1.5 text-center">{formatTextWithBrackets(noyau?.description)}</p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  

                    {/* Ombres Section */}
                    <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                      <Collapsible
                        open={isSectionOpen("ombres")}
                        onOpenChange={() => toggleSection("ombres")}
                      >
                        <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                          <Sparkles className="h-4 w-4 text-solo-purple" />
                          <span className="flex-1 text-left">Ombres</span>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="p-4">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              {team.ombres.map((o, i) => {
                                const ombre = getFromList(ombres, o.id);
                                if (!ombre) return null;
                                return (
                                  <div
                                    key={i}
                                    className="bg-sidebar p-4 rounded-lg border border-sidebar-border flex flex-col items-center"
                                  >
                                    <div className="relative mb-2">
                                      <img
                                        src={ombre.image || ""}
                                        className="w-16 h-16 object-contain"
                                      />
                                      <div className="absolute -top-2 -right-2 bg-solo-purple text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center text-white border-2 border-sidebar">
                                        {i + 1}
                                      </div>
                                    </div>
                                    <p className="text-sm font-medium text-white text-center">
                                      {ombre.nom}
                                    </p>
                                    {ombre.description && (
                                      <p className="text-xs text-gray-300 mt-3 text-center">                             
                                        {formatTextWithBrackets(ombre.description)}
                                      </p>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>

                    {/* Sections spécifiques à Jinwoo */}
                    {selectedChasseurId === team.chasseurs[0]?.id && (
                      <>
                        {/* Compétences Section */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                          <Collapsible
                            open={isSectionOpen("competences")}
                            onOpenChange={() => toggleSection("competences")}
                          >
                            <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                              <Award className="h-4 w-4 text-solo-purple" />
                              <span className="flex-1 text-left">Compétences</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                              <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {[team.competence1, team.competence2].map((id, i) => {
                                    const skill = getFromList(competences, id);
                                    if (!skill) return null;
                                    return (
                                      <div
                                        key={i}
                                        className="bg-sidebar p-4 rounded-lg border border-sidebar-border flex flex-col sm:flex-row items-center sm:items-start gap-4"
                                      >
                                        <div className="relative">
                                          <img
                                            src={skill.image || ""}
                                            alt={skill.nom}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                                          />
                                          {skill.element && skill.element !== "EMPTY" && skill.element !== "NULL" && (
                                            <img
                                              src={skill.element}
                                              alt="Element"
                                              className="absolute top-1 left-1 w-8 h-8 object-contain"
                                            />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-sm sm:text-base font-medium text-white mb-2">
                                            {skill.nom}
                                          </p>
                                          <div className="text-xs sm:text-sm text-gray-300 space-y-2">
                                            {skill.description?.split("<br>").map((line, index) => (
                                              <p key={index}>{formatTextWithBrackets(line)}</p>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>

                        {/* QTE Section */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                          <Collapsible
                            open={isSectionOpen("qte")}
                            onOpenChange={() => toggleSection("qte")}
                          >
                            <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                              <CirclePlay className="h-4 w-4 text-solo-purple" />
                              <span className="flex-1 text-left">QTE</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                              <div className="p-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  {[team.qte1, team.qte2].map((id, i) => {
                                    const qte = getFromList(qtes, id);
                                    if (!qte) return null;
                                    return (
                                      <div
                                        key={i}
                                        className="bg-sidebar p-4 rounded-lg border border-sidebar-border flex flex-col sm:flex-row items-center sm:items-start gap-4"
                                      >
                                        <div className="relative">
                                          <img
                                            src={qte.image || ""}
                                            alt={qte.nom}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                                          />
                                          {qte.element && qte.element !== "EMPTY" && qte.element !== "NULL" && (
                                            <img
                                              src={qte.element}
                                              alt="Element"
                                              className="absolute top-1 left-1 w-8 h-8 object-contain"
                                            />
                                          )}
                                          {qte.element2 && qte.element2 !== "EMPTY" && qte.element2 !== "NULL" && (
                                            <img
                                              src={qte.element2}
                                              alt="Element2"
                                              className="absolute top-1 right-1 w-8 h-8 object-contain"
                                            />
                                          )}
                                          {qte.element3 && qte.element3 !== "EMPTY" && qte.element3 !== "NULL" && (
                                            <img
                                              src={qte.element3}
                                              alt="Element3"
                                              className="absolute bottom-1 right-1 w-8 h-8 object-contain"
                                            />
                                          )}
                                        </div>
                                        <div className="flex-1">
                                          <p className="text-sm sm:text-base font-medium text-white mb-2">
                                            {qte.nom}
                                          </p>
                                          <div className="text-xs sm:text-sm text-gray-300 space-y-2">
                                            {qte.description?.split("<br>").map((line, index) => (
                                              <p key={index}>{formatTextWithBrackets(line)}</p>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>

                        {/* Pierres de bénédiction */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden">
                          <Collapsible open={isSectionOpen('pierres')} onOpenChange={() => toggleSection('pierres')}>
                            <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                              <FlaskConical className="h-4 w-4 text-solo-purple" />
                              <span className="flex-1 text-left">Pierres de Bénédiction</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                              <div className="p-4">
                                <div className="space-y-4">
                                  <div>
                                    <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Booster</h6>
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
                                          <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex flex-col items-center">
                                            <img
                                              src={pierre.image || ""}
                                              className="w-12 h-12 object-contain mb-2"
                                            />
                                            <p className="text-xs font-medium text-white text-center">{pierre.nom}</p>
                                            <p className="text-xs text-gray-300 mt-2 text-center">
                                              {formatTextWithBrackets(pierre.description)}
                                            </p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Survie</h6>
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
                                          <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex flex-col items-center">
                                            <img
                                              src={pierre.image || ""}
                                              className="w-12 h-12 object-contain mb-2"
                                            />
                                            <p className="text-xs font-medium text-white text-center">{pierre.nom}</p>
                                            <p className="text-xs text-gray-300 mt-2 text-center">
                                              {formatTextWithBrackets(pierre.description)}
                                            </p>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </>
                    )}
                  </Accordion>

                  


                </div>
              );
            })}
          </div>
        </CardContent>
      )}
    </Card>
  );
}