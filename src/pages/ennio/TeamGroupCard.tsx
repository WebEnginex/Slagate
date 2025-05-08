import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { User, ChevronDown, ChevronUp } from "lucide-react";
import type { TeamGroup } from "@/config/ennio/teamEnnioJinwoo";
type Props = {
  group: TeamGroup; // Un groupe contenant deux équipes
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

  const toggleTeam = (teamId: number) => {
    setExpandedTeamId(expandedTeamId === teamId ? null : teamId);
    setSelectedChasseurId(null); // Réinitialiser le chasseur sélectionné
  };

  const getFromList = (list: any[], id: number | string) =>
    list.find((item) => item.id.toString() === id.toString());

  return (
    <Card className="mb-10 bg-sidebar border-sidebar-border overflow-hidden">
      <h2 className="text-2xl font-bold text-white mb-4">{group.nom}</h2>
      {[group.team1, group.team2].map((team) => (
        <div key={team.id}>
          {/* Header de l'équipe */}
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

          {/* Contenu de l'équipe */}
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
                        className={`relative group cursor-pointer transition-all duration-200 hover:scale-105 ${
                          selectedChasseurId === chasseur.id
                            ? "border-solo-purple shadow-lg shadow-solo-purple/30"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedChasseurId(chasseur.id)}
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden border-2">
                          <img
                            src={chasseurData?.image || ""}
                            alt={chasseurData?.nom}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="mt-2 text-xs text-white text-center">
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
                        {/* Statistiques */}
                        <AccordionItem value="stats">
                          <AccordionTrigger>
                            Statistiques à viser
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {Object.entries(chasseur.stats).map(
                                ([label, value]) => (
                                  <div
                                    key={label}
                                    className="bg-sidebar p-3 rounded border border-sidebar-border"
                                  >
                                    <div className="text-xs text-solo-light-purple mb-1">
                                      {label}
                                    </div>
                                    <div className="font-medium text-white">
                                      {value}
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Armes */}
                        <AccordionItem value="armes">
                          <AccordionTrigger>Armes</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex gap-4 justify-center">
                              {[team.arme1, team.arme2].map((armeId, i) => {
                                const arme = getFromList(armes, armeId);
                                if (!arme) return null;
                                return (
                                  <div
                                    key={i}
                                    className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32"
                                  >
                                    <img
                                      src={arme.image}
                                      alt={arme.nom}
                                      className="w-20 h-20 mx-auto object-contain"
                                    />
                                    <p className="text-sm font-medium truncate text-white">
                                      {arme.nom}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* Artefacts */}
                        <AccordionItem value="artefacts">
                          <AccordionTrigger>Artefacts</AccordionTrigger>
                          <AccordionContent>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {Object.entries(chasseur.artefacts).map(
                                ([slot, data]) => {
                                  const artefact = getFromList(
                                    artefacts,
                                    data.id
                                  );
                                  return (
                                    <div
                                      key={slot}
                                      className="bg-sidebar p-3 rounded-lg border border-sidebar-border"
                                    >
                                      <img
                                        src={artefact?.image || ""}
                                        alt={artefact?.nom || "Artefact"}
                                        className="w-16 h-16 mx-auto object-contain"
                                      />
                                      <p className="mt-1 text-xs font-medium text-center text-white">
                                        {artefact?.nom}
                                      </p>
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
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
