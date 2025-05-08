import React, { useState, useEffect } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  GemIcon,
  Layers,
  Dna,
  BarChart2,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
type Artefact = Database["public"]["Tables"]["artefacts"]["Row"];
type Noyau = Database["public"]["Tables"]["noyaux"]["Row"];
type Ombre = Database["public"]["Tables"]["ombres"]["Row"];
type SetBonus = Database["public"]["Tables"]["sets_bonus"]["Row"];

type Build = {
  id: number;
  nom: string;
  stats: Record<string, string>;
  artefacts: {
    [slot: string]: {
      id: number;
      statPrincipale: string;
      statsSecondaires: string[];
    };
  };
  noyaux: {
    [slot: number]: {
      id: number;
      statPrincipale: string;
      statSecondaire?: string;
    }[]; // Assurez-vous que c'est un tableau
  };
  sets_bonus: { id: number }[];
};

type Props = {
  chasseur: Chasseur;
  builds: Build[];
  artefacts: Artefact[];
  noyaux: Noyau[];
  ombres: Ombre[];
  setsBonus: SetBonus[];
  elementId?: string;
};

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

export default function BuildChasseurCard({
  chasseur,
  builds,
  artefacts,
  noyaux,
  ombres,
  setsBonus,
  elementId,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedBuildIndex, setSelectedBuildIndex] = useState(0);
  const [openSections, setOpenSections] = useState<string[]>(["artefacts"]); // artefacts ouvert par défaut
  const [activeNoyauIndices, setActiveNoyauIndices] = useState<Record<number, number>>({});

  const build = builds[selectedBuildIndex];

  // Ouvre "artefacts" à l'ouverture d'un chasseur (quand isExpanded passe à true)
  useEffect(() => {
    if (isExpanded) {
      setOpenSections((prev) =>
        prev.length === 0 ? ["artefacts"] : prev
      );
    } else {
      setOpenSections([]); // ferme tout quand on referme le chasseur
    }
  }, [isExpanded]);

  // Ne réinitialise PAS openSections quand on change de build
  // ...supprimer ou commenter ce useEffect...
  // useEffect(() => {
  //   setOpenSections([]); // reset sections à chaque changement
  // }, [selectedBuildIndex]);

  const getById = <T extends { id: number }>(list: T[], id: number) =>
    list.find((item) => item.id === id);

  const toggleSection = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  const isSectionOpen = (key: string) => openSections.includes(key);

  const handleToggleAlternative = (slot: number, maxAlternatives: number) => {
    setActiveNoyauIndices((prev) => ({
      ...prev,
      [slot]: (prev[slot] + 1) % maxAlternatives,
    }));
  };

  console.log("Props reçues :", { builds, noyaux });

  return (
    <Card
      id={`chasseur-${chasseur.id}`} // Ajoute cet id pour l'ancre
      className="mb-10 bg-sidebar border-sidebar-border overflow-hidden"
    >
      <CardHeader
        className="p-4 flex flex-row items-center justify-between bg-sidebar cursor-pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <CardTitle className="text-xl font-bold flex items-center gap-4 text-white">
          <Avatar className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
            <AvatarImage src={chasseur.image} alt={chasseur.nom} />
          </Avatar>
          {chasseur.nom}
        </CardTitle>

        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-white" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white" />
        )}
      </CardHeader>

      {isExpanded && (
        <CardContent className="p-4 pt-6 bg-sidebar-accent space-y-6">
          {/* Sélecteur de build */}
          <div className="flex gap-4 overflow-x-auto">
            {builds.map((b, i) => {
              const firstArtefact = Object.values(b.artefacts)[0];
              const art = getById(artefacts, firstArtefact?.id);
              return (
                <div
                  key={b.id}
                  onClick={() => setSelectedBuildIndex(i)}
                  className="flex flex-col items-center w-20 cursor-pointer"
                >
                  <div
                    className={`w-16 h-16 rounded-lg border-2 ${
                      selectedBuildIndex === i
                        ? "border-solo-purple shadow shadow-solo-purple/30"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={art?.image || ""}
                      alt={b.nom}
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                  <p className="mt-1 text-xs text-white text-center">{b.nom}</p>
                </div>
              );
            })}
          </div>

          {/* Statistiques */}
          <SectionCollapsible
            label="Statistiques à viser"
            icon={<BarChart2 className="h-4 w-4 text-solo-purple" />}
            isOpen={isSectionOpen("stats")}
            onToggle={() => toggleSection("stats")}
          >
            {/* Texte informatif */}
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Voici les statistiques recommandées pour optimiser les
              performances de ce chasseur. Adaptez-les en fonction de votre
              style de jeu et des besoins de votre équipe.
            </p>

            {/* Grille des statistiques */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(build.stats).map(([label, val]) => (
                <div
                  key={label}
                  className="bg-sidebar p-3 rounded border border-sidebar-border"
                >
                  <div className="text-xs text-solo-light-purple mb-1">
                    {label}
                  </div>
                  <div className="font-medium text-white">{val}</div>
                </div>
              ))}
            </div>
          </SectionCollapsible>

          {/* Artefacts */}
          <SectionCollapsible
            label="Artefacts"
            icon={<GemIcon className="h-4 w-4 text-solo-purple" />}
            isOpen={isSectionOpen("artefacts")}
            onToggle={() => toggleSection("artefacts")}
          >
            {/* Texte informatif */}
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Les artefacts jouent un rôle clé dans l'optimisation des
              performances de votre chasseur. Choisissez-les en fonction des
              statistiques principales et secondaires qui complètent votre
              build.
            </p>

            {/* Grille des artefacts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(build.artefacts).map(([slot, conf]) => {
                const artefact = getById(artefacts, conf.id);
                return (
                  <div
                    key={slot}
                    className="bg-sidebar p-3 rounded-lg border border-sidebar-border"
                  >
                    <div className="flex flex-col items-center">
                      <p className="mb-2 text-xs font-semibold text-solo-light-purple">
                        {slot.charAt(0).toUpperCase() + slot.slice(1)}
                      </p>
                      <img
                        src={artefact?.image || ""}
                        className="w-16 h-16 object-contain"
                        alt={artefact?.nom || "Artefact"}
                      />
                      <p className="mt-1 text-xs font-medium text-center text-white">
                        {artefact?.nom}
                      </p>
                      <div className="w-full mt-2">
                        <div className="text-xs bg-solo-purple/20 text-white px-2 py-1 rounded font-medium text-center">
                          {conf.statPrincipale}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCollapsible>

          {/* Sets Bonus */}
          <SectionCollapsible
            label="Bonus de Sets"
            icon={<Layers className="h-4 w-4 text-solo-purple" />}
            isOpen={isSectionOpen("sets")}
            onToggle={() => toggleSection("sets")}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {build.sets_bonus.map((sb, i) => {
                const bonus = getById(setsBonus, sb.id);
                if (!bonus) return null;
                return (
                  <div
                    key={i}
                    className="bg-sidebar p-3 rounded-lg border border-sidebar-border"
                  >
                    <p className="font-semibold text-sm text-solo-purple">
                      {bonus.nom}
                    </p>
                    <div className="text-xs text-gray-300 mt-2">
                      {formatTextWithBrackets(bonus.description || "")}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCollapsible>

          {/* Noyaux */}
          <SectionCollapsible
            label="Noyaux"
            icon={<Dna className="h-4 w-4 text-solo-purple" />}
            isOpen={isSectionOpen("noyaux")}
            onToggle={() => toggleSection("noyaux")}
          >
            <div className="text-sm text-gray-300 leading-relaxed mb-4">
              Les noyaux sont essentiels pour renforcer les capacités de votre
              chasseur. Sélectionnez-les en fonction des statistiques principales
              et des bonus secondaires qui complètent votre stratégie.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {Object.entries(build.noyaux)
                .slice(0, 3) // Limiter aux 3 premiers slots
                .map(([slot, noyauxList]) => {
                  const slotNumber = parseInt(slot, 10);
                  const activeIndex = activeNoyauIndices[slotNumber] || 0;
                  const noyau = noyauxList[activeIndex];
                  const noyauData = noyaux.find((n) => n.id === noyau.id);

                  if (!noyauData) return null;

                  return (
                    <div
                      key={slot}
                      className="bg-sidebar p-4 rounded-lg border border-sidebar-border"
                    >
                      <div className="flex flex-col items-center mb-3">
                        <img
                          src={noyauData.image || ""}
                          className="w-16 h-16 object-contain mb-2"
                          alt={noyauData.nom || "Noyau"}
                        />
                        <p className="text-sm font-semibold text-white text-center">
                          {noyauData.nom}
                        </p>
                      </div>
                      <div className="bg-solo-purple/20 text-white text-xs px-3 py-1.5 rounded-md text-center font-medium">
                        {noyau.statPrincipale}
                      </div>
                      <div className="text-xs text-gray-300 mt-1.5 text-center">
                        {formatTextWithBrackets(noyauData.description || "")}
                      </div>
                      {noyauxList.length > 1 && (
                        <button
                          onClick={() =>
                            setActiveNoyauIndices((prev) => ({
                              ...prev,
                              [slotNumber]: (prev[slotNumber] || 0) + 1 >= noyauxList.length
                                ? 0
                                : (prev[slotNumber] || 0) + 1,
                            }))
                          }
                          className="mt-4 bg-solo-purple text-white text-xs px-4 py-2 rounded-md"
                        >
                          Alternative
                        </button>
                      )}
                    </div>
                  );
                })}
            </div>
          </SectionCollapsible>


          
        </CardContent>
      )}
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
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="p-4">{children}</div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
