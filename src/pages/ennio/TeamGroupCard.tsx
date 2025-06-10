import { useState, useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  User,
  ChevronDown,
  ChevronUp,
  BarChart2,
  GemIcon,
  Layers,
  Dna,
  Sword,
  Zap,
  Gem,
} from "lucide-react";
import { Image } from "@/components/ui/Image";
import type { TeamGroup } from "@/config/ennio/teamEnnioJinwoo";
type Props = {
  group: TeamGroup; // Un groupe contenant deux équipes
  chasseurs: (Omit<
    Database["public"]["Tables"]["chasseurs"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  artefacts: (Omit<
    Database["public"]["Tables"]["artefacts"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  noyaux: (Omit<Database["public"]["Tables"]["noyaux"]["Row"], "created_at"> & {
    created_at?: string;
  })[];
  ombres: (Omit<Database["public"]["Tables"]["ombres"]["Row"], "created_at"> & {
    created_at?: string;
  })[];
  setsBonus: (Omit<
    Database["public"]["Tables"]["sets_bonus"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  armes: (Omit<
    Database["public"]["Tables"]["jinwoo_armes"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  competences: (Omit<
    Database["public"]["Tables"]["jinwoo_competences"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  qtes: (Omit<
    Database["public"]["Tables"]["jinwoo_qte"]["Row"],
    "created_at"
  > & { created_at?: string })[];
  pierres: (Omit<
    Database["public"]["Tables"]["pierres_benediction"]["Row"],
    "created_at"
  > & { created_at?: string })[];
};

// Constante pour identifier ce composant dans le système de logs
const PAGE_ID = "EnnioTeamCard";

// Fonction pour formater le texte avec des crochets et appliquer un style coloré
function formatTextWithBrackets(text: string) {
  const regex = /(\[[^\]]+\])|(\d+(?:[.,]\d+)? ?%?)|(\bseconde(?:s)?\b)|(\bPV\b|\bpv\b)|(\bPM\b|\bpm\b)/gi;

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

export default function TeamGroupCard({
  group,
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
  const [openSections, setOpenSections] = useState<string[]>(["artefacts"]); // artefacts ouvert par défaut
  const [activeNoyauIndices, setActiveNoyauIndices] = useState<
    Record<string, number>
  >({}); // Pour alterner entre noyaux alternatifs
  const [expandedDescriptions, setExpandedDescriptions] = useState<{ [key: string]: boolean }>({}); // Pour afficher/masquer les descriptions

  const toggleTeam = (teamId: number) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
    setSelectedChasseurId(null); // Réinitialiser le chasseur sélectionné
    setOpenSections(["stats"]); // Réinitialiser à la section stats
  };

  const getFromList = (list: any[], id: number | string) =>
    list.find((item) => item.id.toString() === id.toString());
  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const isSectionOpen = (key: string) => openSections.includes(key);
  
  const toggleDescription = (id: string) => {
    setExpandedDescriptions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="mb-10 bg-sidebar border-sidebar-border overflow-hidden">
      {" "}
      <div className="p-3 sm:p-5">
        <h2 className="text-xl sm:text-2xl font-bold text-white">
          {group.nom}
        </h2>
      </div>
      {[group.team1, group.team2].map((team, index) => (
        <div key={team.id}>
          {index === 1 && (
            <div className="h-px bg-solo-purple/60 mx-3 sm:mx-4 my-2 sm:my-3"></div>
          )}
          {/* Header de l'équipe */}
          <CardHeader
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
          </CardHeader>
          {/* Contenu de l'équipe */}{" "}
          {expandedTeamId === team.id && (
            <CardContent className="p-3 sm:p-4 pt-4 sm:pt-6 bg-sidebar-accent">
              <div className="space-y-4 sm:space-y-6">
                {/* Sélection des chasseurs */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                  {team.chasseurs.map((chasseur, idx) => {
                    const chasseurData = getFromList(chasseurs, chasseur.id);
                    return (
                      <div
                        key={idx}
                        className="relative group cursor-pointer transition-all duration-200 hover:scale-105"
                        onClick={() => {
                          setSelectedChasseurId(chasseur.id);
                          // Ouvrir l'onglet "artefacts" lorsqu'un chasseur est sélectionné
                          if (!openSections.includes("artefacts")) {
                            setOpenSections((prev) => {
                              const newSections = [...prev];
                              if (newSections.includes("stats")) {
                                const statsIndex = newSections.indexOf("stats");
                                newSections.splice(statsIndex, 1);
                              }
                              if (!newSections.includes("artefacts")) {
                                newSections.push("artefacts");
                              }
                              return newSections;
                            });
                          }
                        }}
                      >
                        <div
                          className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 ${
                            selectedChasseurId === chasseur.id
                              ? "border-solo-purple shadow-lg shadow-solo-purple/30"
                              : "border-gray-700"
                          }`}
                        >
                          <Image
                            src={chasseurData?.image || ""}
                            alt={chasseurData?.nom || "Chasseur"}
                            pageId="Ennio"
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
                  })}{" "}
                </div>

                {/* Détails du chasseur sélectionné */}
                {team.chasseurs.map((chasseur) => {
                  if (chasseur.id !== selectedChasseurId) return null;
                  const chasseurData = getFromList(chasseurs, chasseur.id);
                  const isFirstHunter = team.chasseurs[0].id === chasseur.id;
                  return (
                    <div key={chasseur.id} className="space-y-3 sm:space-y-4">
                      {/* 1. Statistiques */}
                      <SectionCollapsible
                        label="Statistiques à viser"
                        icon={
                          <BarChart2 className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                        }
                        isOpen={isSectionOpen("stats")}
                        onToggle={() => toggleSection("stats")}
                      >
                        {/* Texte informatif */}{" "}
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 sm:mb-4">
                          Voici les statistiques recommandées pour optimiser les
                          performances de ce chasseur. Adaptez-les en fonction
                          de votre style de jeu et des besoins de votre équipe.
                        </p>
                        
                        {/* Affichage séparé pour les Infos */}
                        {Object.entries(chasseur.stats).map(([label, value]) => {
                          if (label === "Infos") {
                            return (
                              <div key={label} className="bg-sidebar p-3 sm:p-4 rounded border border-sidebar-border mb-4">
                                <div className="text-xs sm:text-sm text-solo-light-purple mb-1 sm:mb-2 font-medium">
                                  {label}
                                </div>
                                <div className="text-gray-300 text-[9px] sm:text-xs leading-tight max-h-[80px] overflow-y-auto">
                                  {value}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                        
                        {/* Grille pour les autres statistiques */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
                          {Object.entries(chasseur.stats).map(
                            ([label, value]) => {
                              if (label === "Infos") return null; // Skip Infos car déjà affiché au-dessus
                              
                              return (
                                <div
                                  key={label}
                                  className="bg-sidebar p-2 sm:p-3 rounded border border-sidebar-border h-[70px] sm:h-[80px] flex flex-col"
                                >
                                  <div className="text-[10px] sm:text-2xs text-solo-light-purple mb-0.5 sm:mb-1 truncate">
                                    {label}
                                  </div>
                                  <div className="font-medium flex-1 flex items-center">
                                    <span className="text-white text-[14px] sm:text-base">{value}</span>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </SectionCollapsible>                      {/* 2. Armes (Premier chasseur uniquement) */}
                      {isFirstHunter && (
                        <SectionCollapsible
                          label="Armes"
                          icon={
                            <Sword className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                          }
                          isOpen={isSectionOpen("armes")}
                          onToggle={() => toggleSection("armes")}
                        >
                          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                            {[team.arme1, team.arme2].map((armeId, i) => {
                              const arme = getFromList(armes, armeId);
                              if (!arme) return null;
                              return (
                                <div
                                  key={i}
                                  className="bg-sidebar p-3 sm:p-4 rounded-lg border border-sidebar-border text-center w-full sm:w-48 relative"
                                >
                                  {arme.arme_element && (
                                    <div className="absolute top-2 left-2 z-10">                                        <Image
                                        src={arme.arme_element}
                                        alt="Élément"
                                        pageId={PAGE_ID}
                                        className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                        skeleton={true}
                                        shimmer={true}
                                      />
                                    </div>
                                  )}
                                  <Image
                                    src={arme.image || ""}
                                    alt={arme.nom}
                                    pageId={PAGE_ID}
                                    className="w-16 h-16 sm:w-24 sm:h-24 mx-auto object-contain"
                                    skeleton={true}
                                    shimmer={true}
                                  />
                                  <p className="text-xs sm:text-sm font-medium text-white mt-1 sm:mt-2 truncate">
                                    {arme.nom}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </SectionCollapsible>
                      )}

                      {/* 3. Artefacts */}
                      <SectionCollapsible
                        label="Artefacts"
                        icon={
                          <GemIcon className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                        }
                        isOpen={isSectionOpen("artefacts")}
                        onToggle={() => toggleSection("artefacts")}
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4">
                          {Object.entries(chasseur.artefacts).map(
                            ([slot, data]) => {
                              const artefact = getFromList(artefacts, data.id);
                              return (
                                <div
                                  key={slot}
                                  className="bg-sidebar p-2 sm:p-3 rounded-lg border border-sidebar-border"
                                >
                                  <div className="flex flex-col items-center">
                                    {" "}
                                    <p className="mb-1 text-[10px] sm:text-2xs font-semibold text-solo-light-purple">
                                      {slot.charAt(0).toUpperCase() +
                                        slot.slice(1)}
                                    </p>
                                    <Image
                                      src={artefact?.image || ""}
                                      alt={artefact?.nom || "Artefact"}
                                      pageId={PAGE_ID}
                                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto object-contain"
                                      skeleton={true}
                                      shimmer={true}
                                    />
                                    <p className="mt-1 text-[10px] sm:text-2xs font-medium text-center text-white truncate w-full">
                                      {artefact?.nom}
                                    </p>
                                    <div className="w-full mt-1">
                                      <div className="text-[10px] sm:text-2xs bg-solo-purple/20 text-white px-1 py-0.5 rounded font-medium text-center truncate">
                                        {data.statPrincipale}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </SectionCollapsible>

                      {/* 4. Bonus de Sets */}
                      <SectionCollapsible
                        label="Bonus de Sets"
                        icon={
                          <Layers className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                        }
                        isOpen={isSectionOpen("sets")}
                        onToggle={() => toggleSection("sets")}
                      >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 text-sm">
                          {chasseur.sets_bonus.map((set, index) => {
                            const setBonus = getFromList(setsBonus, set.id);
                            if (!setBonus) return null;
                            return (
                              <div
                                key={index}
                                className="bg-sidebar p-2 sm:p-3 rounded-lg border border-sidebar-border"
                              >
                                <p className="font-semibold text-xs sm:text-sm text-solo-purple">
                                  {setBonus.nom}{" "}
                                  {setBonus.pieces_count &&
                                    `(${setBonus.pieces_count})`}
                                </p>                                  <div className="text-2xs sm:text-xs text-gray-300 mt-1 sm:mt-2 space-y-1">
                                  {setBonus?.description
                                    ?.replace(/<br\s*\/?>/gi, "\n")
                                    ?.split("\n")
                                    .map((line, idx) => (
                                      <p key={idx}>{formatTextWithBrackets(line)}</p>
                                    ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </SectionCollapsible>

                      {/* 5. Noyaux */}
                      <SectionCollapsible
                        label="Noyaux"
                        icon={
                          <Dna className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                        }
                        isOpen={isSectionOpen("noyaux")}
                        onToggle={() => toggleSection("noyaux")}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                          {Object.entries(chasseur.noyaux).map(
                            ([slot, noyauxSlot]) => {
                              const slotKey = `${chasseur.id}-${slot}`;
                              const activeIndex =
                                activeNoyauIndices[slotKey] || 0;
                              const noyauData = noyauxSlot[activeIndex];
                              const noyau = getFromList(noyaux, noyauData.id);

                              if (!noyau) return null;

                              return (
                                <div
                                  key={slot}
                                  className="bg-sidebar p-2 sm:p-4 rounded-lg border border-sidebar-border"
                                >
                                  {" "}
                                  <div className="flex flex-col items-center mb-2">
                                    <Image
                                      src={noyau.image || ""}
                                      alt={noyau.nom || "Noyau"}
                                      pageId={PAGE_ID}
                                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain mb-1"
                                      skeleton={true}
                                      shimmer={true}
                                    />
                                    <p className="text-[10px] sm:text-xs font-semibold text-white text-center truncate w-full">
                                      {noyau.nom}
                                    </p>
                                  </div>
                                  <div className="bg-solo-purple/20 text-white text-[10px] sm:text-2xs px-2 py-0.5 sm:py-1 rounded-md text-center font-medium truncate">
                                    {noyauData.statPrincipale}
                                  </div>                                  <div className="text-[10px] sm:text-2xs text-gray-300 mt-1 text-center space-y-1">
                                    {noyau.description
                                      ?.replace(/<br\s*\/?>/gi, "\n")
                                      ?.split("\n")
                                      .map((line, idx) => (
                                        <p key={idx}>{formatTextWithBrackets(line)}</p>
                                      ))}
                                  </div>
                                  {noyauxSlot.length > 1 && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveNoyauIndices((prev) => ({
                                          ...prev,
                                          [slotKey]:
                                            (prev[slotKey] || 0) + 1 >=
                                            noyauxSlot.length
                                              ? 0
                                              : (prev[slotKey] || 0) + 1,
                                        }));
                                      }}
                                      className="mt-1 bg-solo-purple/90 hover:bg-solo-purple text-white text-[10px] sm:text-2xs px-2 py-0.5 rounded text-center mx-auto block"
                                    >
                                      {activeIndex === 0
                                        ? "Alternative"
                                        : "Meilleur"}
                                    </button>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </SectionCollapsible>
                      
                      {/* 6. Compétences (Premier chasseur uniquement) */}
                      {isFirstHunter && (
                        <SectionCollapsible
                          label="Compétences"
                          icon={<Zap className="h-4 w-4 text-solo-purple" />}
                          isOpen={isSectionOpen("competences")}
                          onToggle={() => toggleSection("competences")}
                        >
                          <div className="flex flex-wrap gap-4 justify-center">
                            {[team.competence1, team.competence2].map(
                              (competenceId, i) => {
                                const competence = getFromList(
                                  competences,
                                  competenceId
                                );
                                if (!competence) return null;
                                return (
                                  <div
                                    key={i}
                                    className="bg-sidebar p-4 rounded-lg border border-sidebar-border text-center w-72 relative"
                                  >                                    {" "}
                                    {/* Premier élément en haut à gauche */}
                                    {competence.element && (
                                      <div className="absolute top-2 left-2 z-10">
                                        {" "}
                                        <Image
                                          src={competence.element}
                                          alt="Élément"
                                          pageId={PAGE_ID}
                                          className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                          skeleton={true}
                                          shimmer={true}
                                          showErrorMessage={false}
                                        />
                                      </div>
                                    )}{" "}
                                    
                                    {/* Second élément en dessous du premier */}
                                    {(competence as any).element2 && 
                                      (competence as any).element2 !== "EMPTY" && 
                                      (competence as any).element2 !== "NULL" && (
                                      <div className="absolute top-11 left-2 z-10">
                                        <Image
                                          src={(competence as any).element2}
                                          alt="Élément 2"
                                          pageId={PAGE_ID}
                                          className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
                                          skeleton={true}
                                          shimmer={true}
                                          showErrorMessage={false}
                                        />
                                      </div>
                                    )}{" "}
                                    <Image
                                      src={competence.image || ""}
                                      alt={competence.nom}
                                      pageId={PAGE_ID}
                                      className="w-20 h-20 mx-auto object-contain"
                                      skeleton={true}
                                      shimmer={true}
                                      showErrorMessage={false}
                                    />{" "}                                    <p className="text-sm font-medium text-white mt-2">
                                      {competence.nom}
                                    </p>
                                    {/* Element icons are already shown in the top left corner */}
                                    {competence.description && (
                                      <>
                                        <button 
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleDescription(`competence-${i}`);
                                          }} 
                                          className="mt-2 text-[10px] sm:text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                        >
                                          {expandedDescriptions[`competence-${i}`] ? "Cacher détails" : "Voir détails"}
                                        </button>                                        {expandedDescriptions[`competence-${i}`] && (                                          <div className="text-xs text-gray-300 mt-2 space-y-2">
                                            {competence.description
                                              ?.replace(/<br\s*\/?>/gi, "\n")
                                              ?.split("\n")
                                              .map((line, idx) => (
                                                <p key={idx}>{formatTextWithBrackets(line)}</p>
                                              ))}
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        </SectionCollapsible>
                      )}

                      {/* 7. QTE (Premier chasseur uniquement) */}
                      {isFirstHunter && (
                        <SectionCollapsible
                          label="QTE"
                          icon={<Zap className="h-4 w-4 text-solo-purple" />}
                          isOpen={isSectionOpen("qte")}
                          onToggle={() => toggleSection("qte")}
                        >
                          <div className="flex flex-wrap gap-4 justify-center">
                            {[team.qte1, team.qte2].map((qteId, i) => {
                              const qte = getFromList(qtes, qteId);
                              if (!qte) return null;
                              return (
                                <div
                                  key={i}
                                  className="bg-sidebar p-4 rounded-lg border border-sidebar-border text-center w-72 relative"
                                >                                  {" "}
                                  {/* Premier élément en haut à gauche */}
                                  {qte.element && (
                                    <div className="absolute top-2 left-2 z-10 w-7 h-7 flex items-center justify-center">
                                      <Image
                                        src={qte.element}
                                        alt="Élément"
                                        pageId={PAGE_ID}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-contain"
                                        skeleton={true}
                                        shimmer={true}
                                        showErrorMessage={false}
                                        style={{
                                          maxWidth: "28px",
                                          maxHeight: "28px",
                                          objectFit: "contain"
                                        }}
                                      />
                                    </div>
                                  )}{" "}
                                  
                                  {/* Second élément en dessous du premier */}
                                  {qte.element2 && 
                                    qte.element2 !== "EMPTY" && 
                                    qte.element2 !== "NULL" && (
                                    <div className="absolute top-12 left-2 z-10 w-7 h-7 flex items-center justify-center">
                                      <Image
                                        src={qte.element2}
                                        alt="Élément 2"
                                        pageId={PAGE_ID}
                                        width={28}
                                        height={28}
                                        className="w-full h-full object-contain"
                                        skeleton={true}
                                        shimmer={true}
                                        showErrorMessage={false}
                                        style={{
                                          maxWidth: "28px",
                                          maxHeight: "28px",
                                          objectFit: "contain"
                                        }}
                                      />
                                    </div>
                                  )}{" "}
                                  
                                  <Image
                                    src={qte.image || ""}
                                    alt={qte.nom}
                                    pageId={PAGE_ID}
                                    className="w-20 h-20 mx-auto object-contain"
                                    skeleton={true}
                                    shimmer={true}
                                    showErrorMessage={false} 
                                    style={{ aspectRatio: '1/1' }} // Force un ratio carré
                                  />{" "}                                      <p className="text-sm font-medium text-white mt-2">
                                      {qte.nom}
                                    </p>
                                    {/* Element icons are already shown in the top left corner */}
                                  {qte.description && (
                                    <>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleDescription(`qte-${i}`);
                                        }} 
                                        className="mt-2 text-[10px] sm:text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                      >
                                        {expandedDescriptions[`qte-${i}`] ? "Cacher détails" : "Voir détails"}
                                      </button>                                      {expandedDescriptions[`qte-${i}`] && (                                        <div className="text-xs text-gray-300 mt-2 space-y-2">
                                          {qte.description
                                            ?.replace(/<br\s*\/?>/gi, "\n")
                                            ?.split("\n")
                                            .map((line, idx) => (
                                              <p key={idx}>{formatTextWithBrackets(line)}</p>
                                            ))}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </SectionCollapsible>
                      )}

                      {/* 8. Pierres de bénédiction (Premier chasseur uniquement) */}
                      {isFirstHunter && (
                        <SectionCollapsible
                          label="Pierres de bénédiction"
                          icon={<Gem className="h-4 w-4 text-solo-purple" />}
                          isOpen={isSectionOpen("pierres")}
                          onToggle={() => toggleSection("pierres")}
                        >
                          <div className="space-y-6">
                            <div>
                              {" "}
                              <h4 className="text-base font-medium text-solo-purple mb-3">
                                Pierres de bénédiction - Booster
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                  team.pierre_benediction_booster1,
                                  team.pierre_benediction_booster2,
                                  team.pierre_benediction_booster3,
                                  team.pierre_benediction_booster4,
                                ].map((pierreId, i) => {
                                  const pierre = getFromList(pierres, pierreId);
                                  if (!pierre) return null;
                                  return (
                                    <div
                                      key={i}
                                      className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center"
                                    >
                                      <Image
                                        src={pierre.image || ""}
                                        alt={pierre.nom}
                                        pageId={PAGE_ID}
                                        className="w-16 h-16 mx-auto object-contain"
                                        skeleton={true}
                                        shimmer={true}
                                      />
                                      <p className="text-sm font-medium text-white mt-2">
                                        {pierre.nom}
                                      </p>
                                      {pierre.description && (
                                        <>                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleDescription(`pierre-booster-${i}`);
                                            }} 
                                            className="mt-2 text-[10px] sm:text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                          >
                                            {expandedDescriptions[`pierre-booster-${i}`] ? "Cacher détails" : "Voir détails"}
                                          </button>                                          {expandedDescriptions[`pierre-booster-${i}`] && (
                                            <div className="text-xs text-gray-300 mt-2 space-y-2">
                                              {pierre.description
                                                ?.replace(/<br\s*\/?>/gi, "\n")
                                                ?.split("\n")
                                                .map((line, idx) => (
                                                  <p key={idx}>{formatTextWithBrackets(line)}</p>
                                                ))}
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                            <div>
                              {" "}
                              <h4 className="text-base font-medium text-solo-purple mb-3">
                                Pierres de bénédiction - Survie
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                {[
                                  team.pierre_benediction_survie1,
                                  team.pierre_benediction_survie2,
                                  team.pierre_benediction_survie3,
                                  team.pierre_benediction_survie4,
                                ].map((pierreId, i) => {
                                  const pierre = getFromList(pierres, pierreId);
                                  if (!pierre) return null;
                                  return (
                                    <div
                                      key={i}
                                      className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center"
                                    >
                                      <Image
                                        src={pierre.image || ""}
                                        alt={pierre.nom}
                                        pageId={PAGE_ID}
                                        className="w-16 h-16 mx-auto object-contain"
                                        skeleton={true}
                                        shimmer={true}
                                      />
                                      <p className="text-sm font-medium text-white mt-2">
                                        {pierre.nom}
                                      </p>
                                      {pierre.description && (
                                        <>
                                          <button 
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleDescription(`pierre-survie-${i}`);
                                            }} 
                                            className="mt-2 text-[10px] sm:text-xs bg-solo-purple/30 text-white px-2 py-1 rounded-md hover:bg-solo-purple/50 transition-colors"
                                          >
                                            {expandedDescriptions[`pierre-survie-${i}`] ? "Cacher détails" : "Voir détails"}
                                          </button>                                          {expandedDescriptions[`pierre-survie-${i}`] && (
                                            <div className="text-xs text-gray-300 mt-2 space-y-2">
                                              {pierre.description
                                                ?.replace(/<br\s*\/?>/gi, "\n")
                                                ?.split("\n")
                                                .map((line, idx) => (
                                                  <p key={idx}>{formatTextWithBrackets(line)}</p>
                                                ))}
                                            </div>
                                          )}
                                        </>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </SectionCollapsible>
                      )}
                      
                      {/* 9. Ombres (Premier chasseur uniquement) */}
                      {isFirstHunter && (
                        <SectionCollapsible
                          label="Ombres"
                          icon={
                            <Gem className="h-3.5 sm:h-4 w-3.5 sm:w-4 text-solo-purple" />
                          }
                          isOpen={isSectionOpen("ombres")}
                          onToggle={() => toggleSection("ombres")}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                            {team.ombres.map((o, i) => {
                              const ombre = getFromList(ombres, o.id);
                              if (!ombre) return null;
                              return (
                                <div
                                  key={i}
                                  className="bg-sidebar p-2 sm:p-4 rounded-lg border border-sidebar-border flex flex-col items-center"
                                >
                                  <div className="relative mb-2">
                                    <Image
                                      src={ombre.image || ""}
                                      alt={ombre.nom || "Ombre"}
                                      pageId={PAGE_ID}
                                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 object-contain"
                                      skeleton={true}
                                      shimmer={true}
                                    />
                                    <div className="absolute -top-2 -right-2 bg-solo-purple text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center text-white border-2 border-sidebar">
                                      {i + 1}
                                    </div>
                                  </div>
                                  <p className="text-[10px] sm:text-xs font-medium text-white text-center">
                                    {ombre.nom}
                                  </p>
                                  {(ombre.description || o.description) && (                                    <div className="text-[10px] sm:text-2xs text-gray-300 mt-2 space-y-1">
                                      {(ombre.description || o.description)
                                        ?.replace(/<br\s*\/?>/gi, "\n")
                                        ?.split("\n")
                                        .map((line, idx) => (
                                          <p key={idx} className="text-center">{formatTextWithBrackets(line)}</p>
                                        ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </SectionCollapsible>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          )}
        </div>
      ))}
    </Card>
  );
}

// Section réutilisable avec état externe
function SectionCollapsible({
  label,
  icon,
  isOpen,
  onToggle,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-sidebar/50 rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={onToggle}>
        <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
          {icon}
          <span className="flex-1 text-left">{label}</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-solo-light-purple" />
          ) : (
            <ChevronDown className="h-4 w-4 text-solo-light-purple" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
