// import { useState, useEffect } from "react";
// import type { Database } from "@/integrations/supabase/types";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { ChevronDown, ChevronUp, Sparkles, GemIcon, Dna, Layers, BarChart2, User, Award, Swords, CirclePlay, FlaskConical } from "lucide-react";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
// import { useExpandedTeam } from "@/contexts/useExpandedTeam";

// type TeamVulcanJinwoo = {
//   id: number;
//   nom: string;
//   chasseurs: {
//     id: number;
//     stats: Record<string, string>;
//     artefacts: {
//       [slot: string]: {
//         id: number;
//         statPrincipale: string;
//         statsSecondaires: string[];
//       };
//     };
//     noyaux: {
//       id: number;
//       statPrincipale: string;
//       statSecondaire?: string;
//     }[];
//     sets_bonus: { id: number }[];
//   }[];
//   ombres: {
//     id: number;
//     description?: string;
//   }[];
//   armes: { id: number; image: string; nom: string }[];
//   competences: { id: number; description: string }[];
//   qtes: { id: number; description: string }[];
//   pierres: { id: number; type: string; description: string }[];
// };

// type Props = {
//   team: TeamVulcanJinwoo;
//   chasseurs: Database["public"]["Tables"]["chasseurs"]["Row"][];
//   artefacts: Database["public"]["Tables"]["artefacts"]["Row"][];
//   noyaux: Database["public"]["Tables"]["noyaux"]["Row"][];
//   ombres: Database["public"]["Tables"]["ombres"]["Row"][];
//   setsBonus: Database["public"]["Tables"]["sets_bonus"]["Row"][];
//   armes: Database["public"]["Tables"]["jinwoo_armes"]["Row"][];
//   competences: Database["public"]["Tables"]["jinwoo_competences"]["Row"][];
//   qtes: Database["public"]["Tables"]["jinwoo_qte"]["Row"][];
//   pierres: Database["public"]["Tables"]["pierres_benediction"]["Row"][];
// };

// function formatTextWithBrackets(text: string) {
//   const regex =
//     /(\[[^\]]+\])|(\d+(?:[.,]\d+)? ?%?)|(\bseconde(?:s)?\b)|(\bPV\b|\bpv\b)|(\bPM\b|\bpm\b)/gi;

//   return text.split(regex).map((part, index) => {
//     if (!part) return null;

//     // Texte entre crochets
//     if (part.startsWith("[") && part.endsWith("]")) {
//       const content = part.slice(1, -1); // Retirer les crochets
//       if (content === "Bris") {
//         return (
//           <span key={index} className="text-orange-500">
//             {part}
//           </span>
//         );
//       } else {
//         return (
//           <span key={index} className="text-teal-500">
//             {part}
//           </span>
//         );
//       }
//     }

//     // Chiffres ou pourcentages (inclut les chiffres à virgules)
//     if (/^\d+(?:[.,]\d+)? ?%?$/.test(part)) {
//       return (
//         <span key={index} className="text-yellow-500">
//           {part}
//         </span>
//       );
//     }

//     // Mots "seconde" ou "secondes"
//     if (/^seconde(?:s)?$/.test(part)) {
//       return (
//         <span key={index} className="text-yellow-500">
//           {part}
//         </span>
//       );
//     }

//     // "PV" ou "pv" en rouge
//     if (/^PV$|^pv$/.test(part)) {
//       return (
//         <span key={index} className="text-red-500">
//           {part}
//         </span>
//       );
//     }

//     // "PM" ou "pm" en bleu
//     if (/^PM$|^pm$/.test(part)) {
//       return (
//         <span key={index} className="text-blue-500">
//           {part}
//         </span>
//       );
//     }

//     // Texte normal
//     return part;
//   });
// }

// export default function TeamJinwooCard({
//   team,
//   chasseurs,
//   artefacts,
//   noyaux,
//   ombres,
//   setsBonus,
//   armes,
//   competences,
//   qtes,
//   pierres,
// }: Props) {
//   const { expandedTeamId, setExpandedTeamId } = useExpandedTeam();
//   const [selectedChasseurId, setSelectedChasseurId] = useState<number | null>(null);
//   const [openSections, setOpenSections] = useState<string[]>([]);
//   const [activeNoyauIndices, setActiveNoyauIndices] = useState<Record<number, number>>({});

//   // Reset openSections when team or chasseur changes
//   useEffect(() => {
//     setOpenSections([]);
//   }, [expandedTeamId, selectedChasseurId]);

//   const getFromList = <T extends { id: number | string }>(list: T[], id: number | string): T | undefined =>
//     list.find((i) => i.id.toString() === id.toString());

//   const toggleTeam = (teamId: number) => {
//     if (expandedTeamId === teamId) {
//       setExpandedTeamId(null);
//       setSelectedChasseurId(null);
//     } else {
//       setExpandedTeamId(teamId);
//       const firstChasseurId = team.chasseurs[0]?.id ?? null;
//       setSelectedChasseurId(firstChasseurId);
//     }
//   };

//   const toggleSection = (section: string) => {
//     setOpenSections(prevSections => 
//       prevSections.includes(section)
//         ? prevSections.filter(s => s !== section)
//         : [...prevSections, section]
//     );
//   };

//   const isSectionOpen = (section: string) => openSections.includes(section);
//   const isExpanded = expandedTeamId === team.id;

//   return (
//     <Card className="mb-10 bg-sidebar border-sidebar-border overflow-hidden">
//       <CardHeader 
//         className={`p-4 flex flex-row items-center justify-between bg-sidebar cursor-pointer transition-colors hover:bg-sidebar/90`}
//         onClick={() => toggleTeam(team.id)}
//       >
//         <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
//           <User className="h-5 w-5 text-solo-purple" />
//           {team.nom}
//         </CardTitle>
//         {isExpanded ? (
//           <ChevronUp className="h-5 w-5 text-white" />
//         ) : (
//           <ChevronDown className="h-5 w-5 text-white" />
//         )}
//       </CardHeader>

//       {!isExpanded && (
//         <CardContent className="p-4 bg-sidebar-accent">
//           <div className="flex items-center justify-center gap-4 py-2">
//             {team.chasseurs.map((ch, idx) => {
//               const chasseur = getFromList(chasseurs, ch.id);
//               return (
//                 <div key={idx} className="flex flex-col items-center">
//                   <Avatar className="w-20 h-20 border-2 border-sidebar-border shadow-md">
//                     <AvatarImage src={chasseur?.image || ""} alt={chasseur?.nom} />
//                   </Avatar>
//                   <p className="mt-2 text-xs text-white text-center">{chasseur?.nom}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       )}

//       {isExpanded && (
//         <CardContent className="p-4 pt-6 bg-sidebar-accent">
//           <div className="space-y-6">
//             {/* Chasseurs selection */}
//             <div className="bg-sidebar/50 p-3 rounded-lg">
//               <h4 className="text-sm font-medium mb-3 text-white flex items-center gap-1.5">
//                 <User className="h-4 w-4 text-solo-purple" />
//                 Chasseurs
//               </h4>
//               <div className="flex flex-wrap gap-3 justify-center">
//                 {team.chasseurs.map((ch, idx) => {
//                   const chasseur = getFromList(chasseurs, ch.id);
//                   return (
//                     <div 
//                       key={idx} 
//                       className={`relative group cursor-pointer transition-all duration-200 hover:scale-105`}
//                       onClick={() => setSelectedChasseurId(ch.id)}
//                     >
//                       <div className={`w-20 h-20 rounded-full overflow-hidden border-2 ${
//                         selectedChasseurId === ch.id
//                           ? "border-solo-purple shadow-lg shadow-solo-purple/30"
//                           : "border-transparent"
//                       }`}>
//                         <img
//                           src={chasseur?.image || ""}
//                           alt={chasseur?.nom}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <div className="opacity-0 group-hover:opacity-100 absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-sidebar-accent border border-sidebar-border text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity text-white">
//                         {chasseur?.nom}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {team.chasseurs.map((ch, index) => {
//               if (ch.id !== selectedChasseurId) return null;
//               const chasseur = getFromList(chasseurs, ch.id);
//               if (!chasseur) return null;

//               return (
//                 <div key={index} className="space-y-4">
//                   <div className="flex items-center justify-between">
//                     <h4 className="text-lg font-bold flex items-center gap-2 text-white">
//                       <img 
//                         src={chasseur.image} 
//                         alt={chasseur.nom} 
//                         className="w-8 h-8 rounded-full border border-sidebar-border" 
//                       />
//                       {chasseur.nom}
//                     </h4>
//                   </div>

//                   {/* Statistiques Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible
//                       open={isSectionOpen("stats")}
//                       onOpenChange={() => toggleSection("stats")}
//                     >
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <BarChart2 className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Statistiques</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                             {Object.entries(ch.stats).map(([label, val]) => (
//                               <div
//                                 key={label}
//                                 className="bg-sidebar p-3 rounded border border-sidebar-border"
//                               >
//                                 <div className="text-xs text-solo-light-purple mb-1">
//                                   {label}
//                                 </div>
//                                 <div className="font-medium text-white">
//                                   {formatTextWithBrackets(val)}
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>

//                   {/* Armes Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible open={isSectionOpen('armes')} onOpenChange={() => toggleSection('armes')}>
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <Swords className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Armes</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="flex gap-4 justify-center">
//                             {team.armes.map((arme, i) => (
//                               <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32">
//                                 <div className="relative mb-2">
//                                   <img
//                                     src={arme.image}
//                                     className="w-20 h-20 mx-auto object-contain"
//                                     alt={arme.nom}
//                                   />
//                                 </div>
//                                 <p className="text-sm font-medium truncate text-white">{arme.nom}</p>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>

//                   {/* Artefacts Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible open={isSectionOpen('artefacts')} onOpenChange={() => toggleSection('artefacts')}>
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <GemIcon className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Artefacts</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                             {Object.entries(ch.artefacts).map(([slot, data]) => {
//                               const art = getFromList(artefacts, data.id);
//                               return (
//                                 <div key={slot} className="bg-sidebar p-3 rounded-lg border border-sidebar-border">
//                                   <div className="flex flex-col items-center">
//                                     <p className="mb-2 text-xs font-semibold text-solo-light-purple">{slot}</p>
//                                     <img
//                                       src={art?.image || ""}
//                                       className="w-16 h-16 mx-auto object-contain"
//                                       alt={art?.nom || "Artefact"}
//                                     />
//                                     <p className="mt-1 text-xs font-medium text-center text-white">{art?.nom}</p>
//                                     <div className="w-full mt-2">
//                                       <div className="text-xs bg-solo-purple/20 text-white px-2 py-1 rounded font-medium text-center">
//                                         {data.statPrincipale}
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>

//                   {/* Bonus de Set Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible
//                       open={isSectionOpen("sets")}
//                       onOpenChange={() => toggleSection("sets")}
//                     >
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <Layers className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Bonus de Sets</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                             {ch.sets_bonus.map((sb, i) => {
//                               const bonus = getFromList(setsBonus, sb.id);
//                               if (!bonus) return null;
//                               return (
//                                 <div
//                                   key={i}
//                                   className="bg-sidebar p-3 rounded-lg border border-sidebar-border"
//                                 >
//                                   <p className="font-semibold text-sm text-solo-purple">
//                                     {bonus.nom}
//                                   </p>
//                                   <p className="text-xs text-gray-300 mt-2">
//                                     {formatTextWithBrackets(bonus.description)}
//                                   </p>
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>

//                   {/* Noyaux Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible open={isSectionOpen("noyaux")} onOpenChange={() => toggleSection("noyaux")}>
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <Dna className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Noyaux</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="text-sm text-gray-300 leading-relaxed mb-4">
//                             {formatTextWithBrackets(
//                               "Les noyaux sont essentiels pour renforcer les capacités de votre chasseur. Sélectionnez-les en fonction des statistiques principales et des bonus secondaires."
//                             )}
//                           </div>
//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                             {Object.entries(ch.noyaux).map(([slot, noyauxList]) => {
//                               const slotNumber = parseInt(slot, 10);
//                               const activeIndex = activeNoyauIndices[slotNumber] || 0;
//                               const noyau = Array.isArray(noyauxList) ? noyauxList[activeIndex] : null;
//                               const noyauData = noyau ? getFromList(noyaux, noyau.id) : null;

//                               if (!noyauData) return null;

//                               return (
//                                 <div key={slot} className="bg-sidebar p-4 rounded-lg border border-sidebar-border">
//                                   <div className="flex flex-col items-center mb-3">
//                                     <img
//                                       src={noyauData.image || ""}
//                                       className="w-16 h-16 object-contain mb-2"
//                                       alt={noyauData.nom || "Noyau"}
//                                     />
//                                     <p className="text-sm font-semibold text-white text-center">
//                                       {noyauData.nom}
//                                     </p>
//                                   </div>
//                                   <div className="bg-solo-purple/20 text-white text-xs px-3 py-1.5 rounded-md text-center font-medium">
//                                     {noyau.statPrincipale}
//                                   </div>
//                                   <div className="text-xs text-gray-300 mt-1.5 text-center">
//                                     {formatTextWithBrackets(noyauData.description || "")}
//                                   </div>
//                                   {Array.isArray(noyauxList) && noyauxList.length > 1 && (
//                                     <button
//                                       onClick={() =>
//                                         setActiveNoyauIndices((prev) => ({
//                                           ...prev,
//                                           [slotNumber]:
//                                             (prev[slotNumber] || 0) + 1 >= noyauxList.length
//                                               ? 0
//                                               : (prev[slotNumber] || 0) + 1,
//                                         }))
//                                       }
//                                       className="mt-4 bg-solo-purple text-white text-xs px-4 py-2 rounded-md"
//                                     >
//                                       Alternative
//                                     </button>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>

//                   {/* Ombres Section */}
//                   <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                     <Collapsible
//                       open={isSectionOpen("ombres")}
//                       onOpenChange={() => toggleSection("ombres")}
//                     >
//                       <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                         <Sparkles className="h-4 w-4 text-solo-purple" />
//                         <span className="flex-1 text-left">Ombres</span>
//                       </CollapsibleTrigger>
//                       <CollapsibleContent>
//                         <div className="p-4">
//                           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//                             {team.ombres.map((o, i) => {
//                               const ombre = getFromList(ombres, o.id);
//                               if (!ombre) return null;
//                               return (
//                                 <div
//                                   key={i}
//                                   className="bg-sidebar p-4 rounded-lg border border-sidebar-border flex flex-col items-center"
//                                 >
//                                   <div className="relative mb-2">
//                                     <img
//                                       src={ombre.image || ""}
//                                       className="w-16 h-16 object-contain"
//                                     />
//                                     <div className="absolute -top-2 -right-2 bg-solo-purple text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center text-white border-2 border-sidebar">
//                                       {i + 1}
//                                     </div>
//                                   </div>
//                                   <p className="text-sm font-medium text-white text-center">
//                                     {ombre.nom}
//                                   </p>
//                                   {ombre.description && (
//                                     <p className="text-xs text-gray-300 mt-3 text-center">                             
//                                       {ombre.description}
//                                     </p>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                           </div>
//                         </div>
//                       </CollapsibleContent>
//                     </Collapsible>
//                   </div>                  {/* Sections spécifiques à Jinwoo */}
//                   {selectedChasseurId === team.chasseurs[0]?.id && (
//                     <div>
//                       {/* Compétences */}
//                       <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                         <Collapsible open={isSectionOpen('competences')} onOpenChange={() => toggleSection('competences')}>
//                           <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                             <Award className="h-4 w-4 text-solo-purple" />
//                             <span className="flex-1 text-left">Compétences</span>
//                           </CollapsibleTrigger>
//                           <CollapsibleContent>
//                             <div className="p-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 {team.competences.map((competence, i) => (
//                                   <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex items-start gap-3">
//                                     <img
//                                       src={`/images/competences/${competence.id}.png`}
//                                       className="w-14 h-14 object-contain"
//                                       alt={`Competence ${competence.id}`}
//                                     />
//                                     <div>
//                                       <p className="text-sm font-medium text-white">Competence {competence.id}</p>
//                                       <p className="text-xs text-gray-300 mt-1">{competence.description}</p>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           </CollapsibleContent>
//                         </Collapsible>
//                       </div>

//                       {/* QTE */}
//                       <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                         <Collapsible open={isSectionOpen('qte')} onOpenChange={() => toggleSection('qte')}>
//                           <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                             <CirclePlay className="h-4 w-4 text-solo-purple" />
//                             <span className="flex-1 text-left">QTE</span>
//                           </CollapsibleTrigger>
//                           <CollapsibleContent>
//                             <div className="p-4">
//                               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                                 {team.qtes.map((qte, i) => (
//                                   <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border flex items-start gap-3">
//                                     <img
//                                       src={`/images/qtes/${qte.id}.png`} // Construct image URL using `id`
//                                       className="w-14 h-14 object-contain"
//                                       alt={`QTE ${qte.id}`} // Use `id` for alt text
//                                     />
//                                     <div>
//                                       <p className="text-sm font-medium text-white">QTE {qte.id}</p>
//                                       <p className="text-xs text-gray-300 mt-1">
//                                         {qte.description} // Use `description` for text
//                                       </p>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </div>
//                           </CollapsibleContent>
//                         </Collapsible>
//                       </div>

//                       {/* Pierres de bénédiction */}
//                       <div className="bg-sidebar/50 rounded-lg overflow-hidden">
//                         <Collapsible open={isSectionOpen('pierres')} onOpenChange={() => toggleSection('pierres')}>
//                           <CollapsibleTrigger className="w-full p-4 font-medium flex items-center gap-1.5 text-sm text-white border-b border-sidebar-border">
//                             <FlaskConical className="h-4 w-4 text-solo-purple" />
//                             <span className="flex-1 text-left">Pierres de Bénédiction</span>
//                           </CollapsibleTrigger>
//                           <CollapsibleContent>
//                             <div className="p-4">
//                               <div className="space-y-4">
//                                 <div>
//                                   <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Booster</h6>
//                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                     {team.pierres.map((pierre, i) => (
//                                       <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32">
//                                         <div className="relative mb-2">
//                                           <img
//                                             src={`/images/pierres/${pierre.id}.png`} // Construct image URL using `id`
//                                             className="w-20 h-20 mx-auto object-contain"
//                                             alt={pierre.description} // Use `description` for alt text
//                                           />
//                                         </div>
//                                         <p className="text-sm font-medium truncate text-white">{pierre.description}</p> // Use `description` for text
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </div>
                                
//                                 <div>
//                                   <h6 className="text-xs font-medium mb-3 text-solo-light-purple ml-1">Pierres Survie</h6>
//                                   <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                                     {team.pierres.map((pierre, i) => (
//                                       <div key={i} className="bg-sidebar p-3 rounded-lg border border-sidebar-border text-center w-32">
//                                         <div className="relative mb-2">
//                                           <img
//                                             src={`/images/pierres/${pierre.id}.png`} // Construct image URL using `id`
//                                             className="w-20 h-20 mx-auto object-contain"
//                                             alt={pierre.description} // Use `description` for alt text
//                                           />
//                                         </div>
//                                         <p className="text-sm font-medium truncate text-white">{pierre.description}</p> // Use `description` for text
//                                       </div>
//                                     ))}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </CollapsibleContent>
//                         </Collapsible>
//                       </div>                    </div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </CardContent>
//       )}
//     </Card>
//   );
// }