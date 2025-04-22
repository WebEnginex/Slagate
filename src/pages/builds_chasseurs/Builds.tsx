import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { buildsChasseurs } from "@/config/builds/buildsChasseurs";
import BuildChasseurCard from "./BuildsChasseursCard";

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
    { id: "feu", image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Feu_element.webp" },
    { id: "eau", image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Eau_element.webp" },
    { id: "vent", image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Vent_element.webp" },
    { id: "lumiere", image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Lumiere_element.webp" },
    { id: "tenebres", image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/elements//Tenebre_element.webp" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [chasseurData, artefactData, noyauData, ombreData, setBonusData] = await Promise.all([
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

  const filteredBuilds = buildsChasseurs.filter((entry) => {
    const chasseur = chasseurs.find((c) => c.id === entry.chasseurId);
    if (!chasseur) return false;

    const matchSearch = chasseur.nom.toLowerCase().includes(search.toLowerCase());
    const matchElement = !selectedElement || entry.element === selectedElement;

    return matchSearch && matchElement;
  });

  return (
    <Layout>
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Filtres */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Recherche */}
            <input
              type="text"
              placeholder="Rechercher un chasseur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/3 px-4 py-2 bg-sidebar-accent border border-sidebar-border rounded-md text-white placeholder:text-gray-400"
            />

            {/* Filtres éléments */}
            <div className="flex items-center gap-2">
              {elementIcons.map((el) => (
                <div
                  key={el.id}
                  onClick={() =>
                    setSelectedElement((prev) => (prev === el.id ? null : el.id))
                  }
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer transition ${
                    selectedElement === el.id
                      ? "border-solo-purple shadow-md"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={el.image}
                    alt={el.id}
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
              ))}
              {/* Bouton reset */}
              {(search || selectedElement) && (
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedElement(null);
                  }}
                  className="text-sm text-white bg-red-600 px-3 py-1 rounded-md"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Cartes des builds */}
          {filteredBuilds.map((entry) => {
            const chasseur = chasseurs.find((c) => c.id === entry.chasseurId);
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
                elementId={entry.element} // on transmet l'élément ici
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
