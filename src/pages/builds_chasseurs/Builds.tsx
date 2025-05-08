import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { buildsChasseurs } from "@/config/builds/buildsChasseurs";
import BuildChasseurCard from "./BuildsChasseursCard";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";
import { Separator } from "@/components/ui/separator";
import { FiRefreshCw } from "react-icons/fi";
import { useLocation } from "react-router-dom"; // Ajoute cet import

export default function BuildsPage() {
  type Chasseur = Database["public"]["Tables"]["chasseurs"]["Row"];
  type Artefact = Database["public"]["Tables"]["artefacts"]["Row"];
  type Noyau = Database["public"]["Tables"]["noyaux"]["Row"];
  type Ombre = Database["public"]["Tables"]["ombres"]["Row"];
  type SetBonus = Database["public"]["Tables"]["sets_bonus"]["Row"];

  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [noyaux, setNoyaux] = useState<Noyau[]>([]);
  const [ombres, setOmbres] = useState<Ombre[]>([]);
  const [setsBonus, setSetsBonus] = useState<SetBonus[]>([]);

  const [search, setSearch] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const elementIcons = [
    {
      id: "feu",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Feu_element.webp",
    },
    {
      id: "eau",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Eau_element.webp",
    },
    {
      id: "vent",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Vent_element.webp",
    },
    {
      id: "lumiere",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Lumiere_element.webp",
    },
    {
      id: "tenebres",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Tenebre_element.webp",
    },
  ];

  const location = useLocation(); // Ajoute ceci

  useEffect(() => {
    const fetchData = async () => {
      const [chasseurData, artefactData, noyauData, ombreData, setBonusData] =
        await Promise.all([
          supabase.from("chasseurs").select("*"),
          supabase.from("artefacts").select("*"),
          supabase.from("noyaux").select("*"),
          supabase.from("ombres").select("*"),
          supabase.from("sets_bonus").select("*"),
        ]);

      if (chasseurData.data) setChasseurs(chasseurData.data);
      if (artefactData.data) setArtefacts(artefactData.data);
      if (noyauData.data) setNoyaux(noyauData.data);
      if (ombreData.data) setOmbres(ombreData.data);
      if (setBonusData.data) setSetsBonus(setBonusData.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Quand les builds sont chargés, tente de scroller sur l'ancre
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -40; // Décalage en pixels (ajuste selon ton header)
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          // Ajoute la classe d'animation
          el.classList.add("animate-pulse-once");
          setTimeout(() => el.classList.remove("animate-pulse-once"), 900);
        }
      }, 200); // Attends un peu pour que le DOM soit prêt
    }
  }, [location, chasseurs, artefacts, noyaux, ombres, setsBonus]);
  // Ajoute toutes les dépendances qui déclenchent le rendu des cartes

  const filteredBuilds = buildsChasseurs.filter((entry) => {
    const chasseur = chasseurs.find((c) => c.id === entry.chasseurId);
    if (!chasseur) return false;

    const matchSearch = chasseur.nom
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchElement = !selectedElement || entry.element === selectedElement;

    return matchSearch && matchElement;
  });

  return (
    <Layout>
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-4">
            {/* Introduction */}
            <div className="bg-sidebar-accent p-6 rounded-lg shadow-md space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-violet-400 text-center md:text-left">
                Bienvenue sur la page des builds de chasseurs !
              </h1>
              <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
                Vous y trouverez des configurations optimisées pour chaque
                chasseur, comprenant leurs statistiques, les artefacts
                recommandés, les noyaux et les différents bonus de sets.
              </p>
              <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
                Utilisez les outils de recherche et de filtres pour trouver
                rapidement un chasseur spécifique ou explorer les meilleures
                configurations adaptées à chaque chasseur.
              </p>
              <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
                Que vous soyez débutant à la recherche d'une configuration de
                départ ou expert cherchant à affiner vos équipes, cette section
                est conçue pour vous aider à maximiser vos performances.
              </p>
              {/* Dernières modifications */}
              <div className="text-center md:text-left">
                <p className="text-sm text-gray-400 italic">
                  <span className="text-white font-medium">
                    <LastModified date={lastModifiedDates.builds} />
                  </span>
                </p>
              </div>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* Barre de recherche avec bouton reset */}
              <div className="flex items-center w-3/4 md:w-1/3 space-x-3">
                <input
                  type="text"
                  placeholder="Rechercher un chasseur..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-4 py-2 bg-sidebar-accent border border-sidebar-border rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-solo-purple"
                />
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedElement(null);
                  }}
                  className="px-3 py-2 text-sm md:text-base bg-solo-purple text-white rounded-md shadow-md border border-solo-purple hover:bg-solo-purple-dark transition-colors duration-300"
                >
                  Réinitialiser
                </button>
              </div>

              {/* Filtres d'éléments */}
              <div className="flex items-center gap-3">
                {elementIcons.map((el) => (
                  <div
                    key={el.id}
                    onClick={() =>
                      setSelectedElement((prev) =>
                        prev === el.id ? null : el.id
                      )
                    }
                    className="relative w-8 h-8 md:w-10 md:h-10 cursor-pointer transition-all duration-200 hover:scale-105"
                  >
                    <img
                      src={el.image}
                      alt={el.id}
                      className="w-full h-full object-contain"
                    />
                    {selectedElement === el.id && (
                      <div className="absolute bottom-[-6px] left-1/3 w-1/3 h-[1px] bg-solo-purple"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Cartes des builds */}
            <div className="mt-6">
              {filteredBuilds.map((entry) => {
                const chasseur = chasseurs.find(
                  (c) => c.id === entry.chasseurId
                );
                if (!chasseur) return null;

                return (
                  <BuildChasseurCard
                    key={entry.chasseurId}
                    chasseur={chasseur}
                    builds={entry.builds}
                    artefacts={artefacts}
                    noyaux={noyaux}
                    ombres={ombres}
                    setsBonus={setsBonus}
                    elementId={entry.element}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
