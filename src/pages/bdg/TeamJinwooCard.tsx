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
import { Image } from "@/components/ui/Image";

// Constante pour identifier cette page dans les logs du worker et le cache
const PAGE_ID = "BDG_TEAM";

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
}: Props) {  const { expandedTeamId, setExpandedTeamId } = useExpandedTeam();
  const [selectedChasseurId, setSelectedChasseurId] = useState<number | null>(null);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({});
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({});
  const [activeNoyauIndices, setActiveNoyauIndices] = useState<{ [key: string]: number }>({});
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
  
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

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
    <Card className="mb-10 bg-sidebar border-sidebar-border overflow-hidden">      <CardHeader
        className="p-3 sm:p-4 flex flex-row items-center justify-between bg-sidebar cursor-pointer transition-colors hover:bg-sidebar/90"
        onClick={() => toggleTeam(team.id)}
      >
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-1.5 sm:gap-2 text-white truncate">
          <User className="h-4 sm:h-5 w-4 sm:w-5 text-solo-purple flex-shrink-0" />
          <span className="truncate">{team.nom}</span>
        </CardTitle>
        {expandedTeamId === team.id ? (
          <ChevronUp className="h-5 w-5 text-white flex-shrink-0" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white flex-shrink-0" />
        )}
      </CardHeader>      {expandedTeamId === team.id && (
        <CardContent className="p-3 sm:p-4 pt-4 sm:pt-6 bg-sidebar-accent">
          <div className="space-y-4 sm:space-y-6">
            {/* Sélection des chasseurs */}            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
              {team.chasseurs.map((chasseur, idx) => {
                const chasseurData = getFromList(chasseurs, chasseur.id);
                return (                  <div
                    key={idx}
                    className="relative group cursor-pointer transition-all duration-200 hover:scale-105"
                    onClick={() => {
                      setSelectedChasseurId(chasseur.id);
                      // Ouvrir l'onglet "artefacts" lorsqu'un chasseur est sélectionné
                      setOpenSections((prev) => ({ ...prev, artefacts: true, stats: false }));
                    }}
                  >
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${
                        selectedChasseurId === chasseur.id
                          ? "border-solo-purple shadow-lg shadow-solo-purple/30"
                          : "border-sidebar-border"
                      }`}
                    >
                      <Image
                        src={chasseurData?.image || ""}
                        alt={chasseurData?.nom || "Chasseur"}
                        pageId={PAGE_ID}
                        className="w-full h-full object-cover"
                        skeleton={true}
                        shimmer={true}
                      />
                    </div>
                    <p className="mt-1 sm:mt-2 text-2xs sm:text-xs text-white text-center w-full truncate">
                      {chasseurData?.nom}
                    </p>
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
                    <div className="space-y-6">
                      {/* 1. Statistiques */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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

                      {/* 2. Armes (Premier chasseur uniquement) */}
                      {selectedChasseurId === team.chasseurs[0]?.id && (
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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
                                      <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32">                                        <div className="relative mb-2">
                                          <Image 
                                            src={arme.image} 
                                            alt={arme.nom || "Arme"} 
                                            pageId={PAGE_ID} 
                                            className="w-20 h-20 mx-auto object-contain"
                                            skeleton={true}
                                            shimmer={true}
                                          />
                                          <div className="absolute -bottom-1 -right-1">
                                            <Image 
                                              src={arme.arme_element} 
                                              alt="Élément d'arme" 
                                              pageId={PAGE_ID} 
                                              className="w-6 h-6 rounded-full border border-sidebar-border"
                                              skeleton={true}
                                              shimmer={true}
                                            />
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

                      {/* 3. Artefacts Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
                        <Collapsible open={isSectionOpen('artefacts')} onOpenChange={() => toggleSection('artefacts')}>
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <GemIcon className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Artefacts</span>
                          </CollapsibleTrigger>                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-3 sm:p-4">
                              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                                {Object.entries(chasseur.artefacts).map(([slot, data]) => {
                                  const art = getFromList(artefacts, data.id);
                                  return (
                                    <div key={slot} className="bg-sidebar p-2 sm:p-3 rounded-lg border border-sidebar-border">
                                      <div className="flex flex-col items-center">                                        
                                        <p className="mb-1 text-[10px] sm:text-2xs font-semibold text-solo-light-purple">{slot.charAt(0).toUpperCase() + slot.slice(1)}</p>
                                        <Image
                                          src={art?.image || ""}
                                          alt={art?.nom || "Artefact"}
                                          pageId={PAGE_ID}
                                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto object-contain"
                                          skeleton={true}
                                          shimmer={true}
                                        />
                                        <p className="mt-1 text-[10px] sm:text-2xs font-medium text-center text-white truncate w-full">{art?.nom}</p>
                                        <div className="w-full mt-1">
                                          <div className="text-[10px] sm:text-2xs bg-solo-purple/20 text-white px-1 py-0.5 rounded font-medium text-center truncate">
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

                      {/* 4. Sets Bonus Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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
                                      </p>                                        <div className="text-xs text-gray-300 mt-2 space-y-1">
                                        {bonus.description?.split("<br>").map((line, index) => (
                                          <p key={index}>{formatTextWithBrackets(line)}</p>
                                        )) || (
                                          bonus.description?.split("\n").map((line, index) => (
                                            <p key={index}>{formatTextWithBrackets(line)}</p>
                                          )) || (
                                            <p>{formatTextWithBrackets(bonus.description || "")}</p>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </div>

                      {/* 5. Noyaux Section */}
                      <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
                        <Collapsible open={isSectionOpen('noyaux')} onOpenChange={() => toggleSection('noyaux')}>
                          <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                            <Dna className="h-4 w-4 text-solo-purple" />
                            <span className="flex-1 text-left">Noyaux</span>
                          </CollapsibleTrigger>                          <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                            <div className="p-3 sm:p-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                {Object.entries(chasseur.noyaux).map(([slot, noyauxSlot]) => {
                                  const slotKey = `${chasseur.id}-${slot}`;
                                  const activeIndex = activeNoyauIndices[slotKey] || 0;
                                  const noyauData = noyauxSlot[activeIndex];
                                  const noyau = getFromList(noyaux, noyauData.id);

                                  if (!noyau) return null;

                                  return (
                                    <div key={slot} className="bg-sidebar p-2 sm:p-4 rounded-lg border border-sidebar-border">
                                      <div className="flex flex-col">                                        
                                        <div className="flex flex-col items-center mb-2">
                                          <Image
                                            src={noyau?.image || ""}
                                            alt={noyau?.nom || "Noyau"}
                                            pageId={PAGE_ID}
                                            className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain mb-1"
                                            skeleton={true}
                                            shimmer={true}
                                          />
                                          <p className="text-[10px] sm:text-xs font-semibold text-white text-center truncate w-full">{noyau?.nom}</p>
                                        </div>
                                        <div className="bg-solo-purple/20 text-white text-[10px] sm:text-2xs px-2 py-0.5 sm:py-1 rounded-md text-center font-medium truncate">
                                          {noyauData.statPrincipale}
                                        </div>                                        <div className="text-[10px] sm:text-2xs text-gray-300 mt-1 text-center space-y-1">
                                          {noyau?.description?.split("<br>").map((line, index) => (
                                            <p key={index}>{formatTextWithBrackets(line)}</p>
                                          )) || (
                                            noyau?.description?.split("\n").map((line, index) => (
                                              <p key={index}>{formatTextWithBrackets(line)}</p>
                                            )) || (
                                              <p>{formatTextWithBrackets(noyau?.description || "")}</p>
                                            )
                                          )}
                                        </div>
                                        
                                        {noyauxSlot.length > 1 && (
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveNoyauIndices((prev) => ({
                                                ...prev,
                                                [slotKey]:
                                                  (prev[slotKey] || 0) + 1 >= noyauxSlot.length
                                                    ? 0
                                                    : (prev[slotKey] || 0) + 1,
                                              }));
                                            }}
                                            className="mt-1 bg-solo-purple/90 hover:bg-solo-purple text-white text-[10px] sm:text-2xs px-2 py-0.5 rounded text-center mx-auto block"
                                          >
                                            {activeIndex === 0 ? "Alternative" : "Meilleur"}
                                          </button>
                                        )}
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
                    
                    {/* Ajout d'un espace visuel pour séparer les sections */}
                    <div className="mb-6"></div>
                      {/* Sections spécifiques à Jinwoo */}
                    {selectedChasseurId === team.chasseurs[0]?.id && (
                      <div className="space-y-6">
                        {/* 6. Compétences Section */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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
                                          <Image
                                            src={skill.image || ""}
                                            alt={skill.nom || "Compétence"}
                                            pageId={PAGE_ID}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                                            skeleton={true}
                                            shimmer={true}
                                          />
                                          {skill.element && skill.element !== "EMPTY" && skill.element !== "NULL" && (
                                            <Image
                                              src={skill.element}
                                              alt="Element"
                                              pageId={PAGE_ID}
                                              className="absolute top-1 left-1 w-8 h-8 object-contain"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                          )}
                                        </div>                                        <div className="flex-1">
                                          <p className="text-sm sm:text-base font-medium text-white mb-2">
                                            {skill.nom}
                                          </p>
                                          <div className="flex items-center gap-1 mb-1">
                                            <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDescription(`competence-${i}`);
                                              }} 
                                              className="text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                            >
                                              {expandedDescriptions[`competence-${i}`] ? "Cacher détails" : "Voir détails"}
                                            </button>
                                          </div>
                                          {expandedDescriptions[`competence-${i}`] && (
                                            <div className="text-xs sm:text-sm text-gray-300 space-y-2 mt-2">
                                              {skill.description?.split("<br>").map((line, index) => (
                                                <p key={index}>{formatTextWithBrackets(line)}</p>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>

                        {/* 7. QTE Section */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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
                                          <Image
                                            src={qte.image || ""}
                                            alt={qte.nom || "QTE"}
                                            pageId={PAGE_ID}
                                            className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                                            skeleton={true}
                                            shimmer={true}
                                          />
                                          {qte.element && qte.element !== "EMPTY" && qte.element !== "NULL" && (
                                            <Image
                                              src={qte.element}
                                              alt="Element"
                                              pageId={PAGE_ID}
                                              className="absolute top-1 left-1 w-8 h-8 object-contain"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                          )}
                                          {qte.element2 && qte.element2 !== "EMPTY" && qte.element2 !== "NULL" && (
                                            <Image
                                              src={qte.element2}
                                              alt="Element2"
                                              pageId={PAGE_ID}
                                              className="absolute top-1 right-1 w-8 h-8 object-contain"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                          )}
                                          {qte.element3 && qte.element3 !== "EMPTY" && qte.element3 !== "NULL" && (
                                            <Image
                                              src={qte.element3}
                                              alt="Element3"
                                              pageId={PAGE_ID}
                                              className="absolute bottom-1 right-1 w-8 h-8 object-contain"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                          )}
                                        </div>                                        <div className="flex-1">
                                          <p className="text-sm sm:text-base font-medium text-white mb-2">
                                            {qte.nom}
                                          </p>
                                          <div className="flex items-center gap-1 mb-1">
                                            <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDescription(`qte-${i}`);
                                              }} 
                                              className="text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                            >
                                              {expandedDescriptions[`qte-${i}`] ? "Cacher détails" : "Voir détails"}
                                            </button>
                                          </div>
                                          {expandedDescriptions[`qte-${i}`] && (
                                            <div className="text-xs sm:text-sm text-gray-300 space-y-2 mt-2">
                                              {qte.description?.split("<br>").map((line, index) => (
                                                <p key={index}>{formatTextWithBrackets(line)}</p>
                                              ))}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>

                        {/* 8. Pierres de bénédiction */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
                          <Collapsible open={isSectionOpen('pierres')} onOpenChange={() => toggleSection('pierres')}>
                            <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
                              <FlaskConical className="h-4 w-4 text-solo-purple" />
                              <span className="flex-1 text-left">Pierres de Bénédiction</span>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="transition-all duration-300 ease-in-out overflow-hidden">
                              <div className="p-4">
                                <div className="space-y-4">
                                  <div>                                    <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Booster</h6>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">                                      {[
                                        team.pierre_benediction_booster1,
                                        team.pierre_benediction_booster2,
                                        team.pierre_benediction_booster3,
                                        team.pierre_benediction_booster4,
                                      ].map((id, i) => {
                                        const pierre = getFromList(pierres, id);
                                        if (!pierre) return null;
                                        return (
                                          <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex flex-col items-center">
                                            <Image
                                              src={pierre.image || ""}
                                              alt={pierre.nom || "Pierre de bénédiction"}
                                              pageId={PAGE_ID}
                                              className="w-12 h-12 object-contain mb-2"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                            <p className="text-xs font-medium text-white text-center">{pierre.nom}</p>
                                            <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDescription(`pierre-booster-${i}`);
                                              }} 
                                              className="text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md mt-2 hover:bg-solo-purple/50 transition-colors"
                                            >
                                              {expandedDescriptions[`pierre-booster-${i}`] ? "Cacher détails" : "Voir détails"}
                                            </button>                                            {expandedDescriptions[`pierre-booster-${i}`] && (
                                              <div className="text-xs text-gray-300 mt-2 space-y-2">
                                                {pierre.description?.split("<br>").map((line, index) => (
                                                  <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                                )) || (
                                                  pierre.description?.split("\n").map((line, index) => (
                                                    <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                                  )) || (
                                                    <p className="text-center">{formatTextWithBrackets(pierre.description || "")}</p>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                  
                                  <div>                                    <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Survie</h6>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">                                      {[
                                        team.pierre_benediction_survie1,
                                        team.pierre_benediction_survie2,
                                        team.pierre_benediction_survie3,
                                        team.pierre_benediction_survie4,
                                      ].map((id, i) => {
                                        const pierre = getFromList(pierres, id);
                                        if (!pierre) return null;
                                        return (
                                          <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex flex-col items-center">
                                            <Image
                                              src={pierre.image || ""}
                                              alt={pierre.nom || "Pierre de bénédiction"}
                                              pageId={PAGE_ID}
                                              className="w-12 h-12 object-contain mb-2"
                                              skeleton={true}
                                              shimmer={true}
                                            />
                                            <p className="text-xs font-medium text-white text-center">{pierre.nom}</p>
                                            <button 
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                toggleDescription(`pierre-survie-${i}`);
                                              }} 
                                              className="text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md mt-2 hover:bg-solo-purple/50 transition-colors"
                                            >
                                              {expandedDescriptions[`pierre-survie-${i}`] ? "Cacher détails" : "Voir détails"}
                                            </button>                                            {expandedDescriptions[`pierre-survie-${i}`] && (
                                              <div className="text-xs text-gray-300 mt-2 space-y-2">
                                                {pierre.description?.split("<br>").map((line, index) => (
                                                  <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                                )) || (
                                                  pierre.description?.split("\n").map((line, index) => (
                                                    <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                                  )) || (
                                                    <p className="text-center">{formatTextWithBrackets(pierre.description || "")}</p>
                                                  )
                                                )}
                                              </div>
                                            )}
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

                        {/* 9. Ombres Section - Spécifique à Jinwoo */}
                        <div className="bg-sidebar/50 rounded-lg overflow-hidden mb-6">
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
                                          <Image
                                            src={ombre.image || ""}
                                            alt={ombre.nom || "Ombre"}
                                            pageId={PAGE_ID}
                                            className="w-16 h-16 object-contain"
                                            skeleton={true}
                                            shimmer={true}
                                          />
                                          <div className="absolute -top-2 -right-2 bg-solo-purple text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center text-white border-2 border-sidebar">
                                            {i + 1}
                                          </div>
                                        </div>
                                        <p className="text-sm font-medium text-white text-center">
                                          {ombre.nom}
                                        </p>                                        {ombre.description && (
                                          <div className="text-xs text-gray-300 mt-3 space-y-2">
                                            {ombre.description?.split("<br>").map((line, index) => (
                                              <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                            )) || (
                                              ombre.description?.split("\n").map((line, index) => (
                                                <p key={index} className="text-center">{formatTextWithBrackets(line)}</p>
                                              )) || (
                                                <p className="text-center">{formatTextWithBrackets(ombre.description || "")}</p>
                                              )
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      </div>
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
