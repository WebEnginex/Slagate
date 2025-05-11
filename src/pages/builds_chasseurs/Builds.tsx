import Layout from "@/components/Layout";
import { useEffect, useState, useMemo, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { buildsChasseurs } from "@/config/builds/buildsChasseurs";
import BuildChasseurCard from "./BuildsChasseursCard";
import LastModified from "@/components/LastModified";
import { lastModifiedDates } from "@/config/last-modification-date/lastModifiedDates";
import { Separator } from "@/components/ui/separator";
import { FiRefreshCw } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import SEO from "@/components/SEO";

// Créer un cache global pour les images basé sur les URLs (sera préservé entre les rendus)
// Ce cache sera maintenu tant que l'onglet/page reste ouvert
const imageCache = new Map<string, string>();

// Compteurs pour suivre l'efficacité du cache
const cacheStats = {
  hits: 0,
  misses: 0,
  get hitRate() {
    const total = this.hits + this.misses;
    return total > 0 ? `${(this.hits / total * 100).toFixed(1)}%` : '0%';
  }
};

export default function BuildsPage() {
  type Chasseur = Omit<Database["public"]["Tables"]["chasseurs"]["Row"], "created_at"> & {
    created_at?: string;
  };
  type Artefact = Omit<Database["public"]["Tables"]["artefacts"]["Row"], "created_at"> & {
    created_at?: string;
  };
  type Noyau = Omit<Database["public"]["Tables"]["noyaux"]["Row"], "created_at"> & {
    created_at?: string;
  };
  type Ombre = Omit<Database["public"]["Tables"]["ombres"]["Row"], "created_at"> & {
    created_at?: string;
  };
  type SetBonus = Omit<Database["public"]["Tables"]["sets_bonus"]["Row"], "created_at"> & {
    created_at?: string;
  };

  // États pour les données de base
  const [chasseurs, setChasseurs] = useState<Chasseur[]>([]);
  const [artefacts, setArtefacts] = useState<Artefact[]>([]);
  const [noyaux, setNoyaux] = useState<Noyau[]>([]);
  const [ombres, setOmbres] = useState<Ombre[]>([]);
  const [setsBonus, setSetsBonus] = useState<SetBonus[]>([]);
  
  // État pour suivre quels onglets de chasseurs sont ouverts
  const [openChasseurs, setOpenChasseurs] = useState<Set<number>>(new Set());
  // État pour suivre quels chasseurs ont déjà eu leurs données chargées
  const [loadedChasseurs, setLoadedChasseurs] = useState<Set<number>>(new Set());

  const [search, setSearch] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  
  // Cache en mémoire des données de chasseurs (pour éviter de refaire des requêtes)
  const chasseursDataCache = useRef<Map<number, {
    artefacts: Artefact[],
    noyaux: Noyau[],
    ombres: Ombre[],
    setsBonus: SetBonus[]
  }>>(new Map());

  const elementIcons = [
    {
      id: "jinwoo",
      image:
        "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/hunter-portrait//SungJinWoo_Jeju_Portrait.png",
    },
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

  const location = useLocation();
  
  // Fonction pour normaliser les URLs (éliminer différences mineures qui pointent vers la même ressource)
  const normalizeUrl = (url: string): string => {
    try {
      // Supprimer les paramètres potentiels de query string
      return url.split('?')[0];
    } catch (e) {
      return url;
    }
  };
  
  // Fonction pour charger une image et la mettre en cache basé sur l'URL
  const fetchImageAsBase64 = async (url: string): Promise<string> => {
    try {
      if (!url) return ''; // Protection contre les URLs undefined ou vides
      
      // Normaliser l'URL pour une comparaison plus fiable
      const normalizedUrl = normalizeUrl(url);
      
      // Vérifier d'abord si l'image est déjà en cache par URL normalisée
      if (imageCache.has(normalizedUrl)) {
        cacheStats.hits++;
        console.log(`🔄 Image chargée depuis le cache: ${normalizedUrl.substring(0, 50)}... (Taux de réussite: ${cacheStats.hitRate})`);
        return imageCache.get(normalizedUrl)!;
      }
      
      cacheStats.misses++;
      console.log(`📥 Téléchargement d'une nouvelle image: ${normalizedUrl.substring(0, 50)}... (Taux de réussite: ${cacheStats.hitRate})`);
      // Si pas en cache, télécharger l'image
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const blob = await response.blob();
      
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64data = reader.result as string;
          // Mettre en cache l'image encodée avec l'URL normalisée comme clé
          imageCache.set(normalizedUrl, base64data);
          console.log(`✅ Image mise en cache: ${normalizedUrl.substring(0, 50)}...`);
          resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error(`❌ Erreur lors du chargement de l'image: ${url?.substring(0, 50) || 'URL invalide'}...`, error);
      return url || ''; // Fallback à l'URL originale en cas d'erreur
    }
  };
  
  // Fonction pour charger les données spécifiques à un chasseur
  const loadChasseurData = async (chasseurId: number) => {
    if (loadedChasseurs.has(chasseurId)) {
      console.log(`🔄 Données déjà chargées pour le chasseur #${chasseurId}`);
      return;
    }
    
    console.log(`🔍 Chargement des données pour le chasseur #${chasseurId}...`);
    
    // Vérifier si les données sont en cache mémoire
    if (chasseursDataCache.current.has(chasseurId)) {
      const cachedData = chasseursDataCache.current.get(chasseurId)!;
      
      // Utiliser les données en cache pour mettre à jour les états
      setArtefacts(prev => {
        const newArtefacts = [...prev];
        cachedData.artefacts.forEach(artefact => {
          if (!newArtefacts.some(a => a.id === artefact.id)) {
            newArtefacts.push(artefact);
          }
        });
        return newArtefacts;
      });
      
      setNoyaux(prev => {
        const newNoyaux = [...prev];
        cachedData.noyaux.forEach(noyau => {
          if (!newNoyaux.some(n => n.id === noyau.id)) {
            newNoyaux.push(noyau);
          }
        });
        return newNoyaux;
      });
      
      setOmbres(prev => {
        const newOmbres = [...prev];
        cachedData.ombres.forEach(ombre => {
          if (!newOmbres.some(o => o.id === ombre.id)) {
            newOmbres.push(ombre);
          }
        });
        return newOmbres;
      });
      
      setSetsBonus(prev => {
        const newSets = [...prev];
        cachedData.setsBonus.forEach(setBonus => {
          if (!newSets.some(s => s.id === setBonus.id)) {
            newSets.push(setBonus);
          }
        });
        return newSets;
      });
      
      // Marquer ce chasseur comme chargé
      setLoadedChasseurs(prev => new Set(prev).add(chasseurId));
      console.log(`✅ Données du chasseur #${chasseurId} chargées depuis le cache mémoire`);
      return;
    }
    
    // Si pas de cache, charger depuis Supabase
    try {
      // Obtenir les builds associés à ce chasseur
      const chasseurBuild = buildsChasseurs.find(b => b.chasseurId === chasseurId);
      if (!chasseurBuild) {
        console.log(`❌ Pas de build trouvé pour le chasseur #${chasseurId}`);
        return;
      }
      
      // Récupérer les IDs des artefacts, noyaux, ombres et sets utilisés dans les builds
      const artefactIds = new Set<number>();
      const noyauIds = new Set<number>();
      const ombreIds = new Set<number>();
      const setBonusIds = new Set<number>();
      
      chasseurBuild.builds.forEach(build => {
        // Collecter les IDs des artefacts
        Object.values(build.artefacts).forEach(art => {
          artefactIds.add(art.id);
        });
        
        // Collecter les IDs des noyaux
        Object.values(build.noyaux).forEach(noyauList => {
          noyauList.forEach(noyau => {
            noyauIds.add(noyau.id);
          });
        });
        
        // Collecter les IDs des ombres s'ils existent
        if (build.ombre) ombreIds.add(build.ombre);
        
        // Collecter les IDs des sets bonus
        build.sets_bonus.forEach(set => setBonusIds.add(set.id));
      });
      
      // Préparer les conteneurs pour les données récupérées
      const fetchedData = {
        artefacts: [] as Artefact[],
        noyaux: [] as Noyau[],
        ombres: [] as Ombre[],
        setsBonus: [] as SetBonus[]
      };
      
      // Récupérer les artefacts si nécessaire
      if (artefactIds.size > 0) {
        const { data: artefactData } = await supabase
          .from("artefacts")
          .select("id, nom, image, categorie")
          .in("id", Array.from(artefactIds));
        
        if (artefactData && artefactData.length > 0) {
          // Traiter les images
          const artefactsWithImages = await Promise.all(
            artefactData.map(async (artefact) => {
              if (artefact.image) {
                try {
                  const imageData = await fetchImageAsBase64(artefact.image);
                  return {
                    ...artefact,
                    image: imageData
                  };
                } catch (e) {
                  console.warn(`⚠️ Impossible de charger l'image pour l'artefact #${artefact.id}`, e);
                  return artefact;
                }
              }
              return artefact;
            })
          );
          
          fetchedData.artefacts = artefactsWithImages;
          setArtefacts(prev => {
            const newArtefacts = [...prev];
            artefactsWithImages.forEach(artefact => {
              const index = newArtefacts.findIndex(a => a.id === artefact.id);
              if (index >= 0) {
                newArtefacts[index] = artefact;
              } else {
                newArtefacts.push(artefact);
              }
            });
            return newArtefacts;
          });
        }
      }
      
      // Récupérer les noyaux si nécessaire
      if (noyauIds.size > 0) {
        const { data: noyauData } = await supabase
          .from("noyaux")
          .select("id, nom, image, description")
          .in("id", Array.from(noyauIds));
        
        if (noyauData && noyauData.length > 0) {
          // Traiter les images
          const noyauxWithImages = await Promise.all(
            noyauData.map(async (noyau) => {
              if (noyau.image) {
                try {
                  const imageData = await fetchImageAsBase64(noyau.image);
                  return {
                    ...noyau,
                    image: imageData
                  };
                } catch (e) {
                  console.warn(`⚠️ Impossible de charger l'image pour le noyau #${noyau.id}`, e);
                  return noyau;
                }
              }
              return noyau;
            })
          );
          
          fetchedData.noyaux = noyauxWithImages;
          setNoyaux(prev => {
            const newNoyaux = [...prev];
            noyauxWithImages.forEach(noyau => {
              const index = newNoyaux.findIndex(n => n.id === noyau.id);
              if (index >= 0) {
                newNoyaux[index] = noyau;
              } else {
                newNoyaux.push(noyau);
              }
            });
            return newNoyaux;
          });
        }
      }
      
      // Récupérer les ombres si nécessaire  
      if (ombreIds.size > 0) {
        const { data: ombreData } = await supabase
          .from("ombres")
          .select("id, nom, image, description")
          .in("id", Array.from(ombreIds));
        
        if (ombreData && ombreData.length > 0) {
          // Traiter les images
          const ombresWithImages = await Promise.all(
            ombreData.map(async (ombre) => {
              if (ombre.image) {
                try {
                  const imageData = await fetchImageAsBase64(ombre.image);
                  return {
                    ...ombre,
                    image: imageData
                  };
                } catch (e) {
                  console.warn(`⚠️ Impossible de charger l'image pour l'ombre #${ombre.id}`, e);
                  return ombre;
                }
              }
              return ombre;
            })
          );
          
          fetchedData.ombres = ombresWithImages;
          setOmbres(prev => {
            const newOmbres = [...prev];
            ombresWithImages.forEach(ombre => {
              const index = newOmbres.findIndex(o => o.id === ombre.id);
              if (index >= 0) {
                newOmbres[index] = ombre;
              } else {
                newOmbres.push(ombre);
              }
            });
            return newOmbres;
          });
        }
      }
      
      // Récupérer les sets bonus si nécessaire
      if (setBonusIds.size > 0) {
        const { data: setBonusData } = await supabase
          .from("sets_bonus")
          .select("id, nom, description")
          .in("id", Array.from(setBonusIds));
        
        if (setBonusData && setBonusData.length > 0) {
          fetchedData.setsBonus = setBonusData;
          setSetsBonus(prev => {
            const newSets = [...prev];
            setBonusData.forEach(setBonus => {
              const index = newSets.findIndex(s => s.id === setBonus.id);
              if (index >= 0) {
                newSets[index] = setBonus;
              } else {
                newSets.push(setBonus);
              }
            });
            return newSets;
          });
        }
      }
      
      // Mettre en cache les données récupérées
      chasseursDataCache.current.set(chasseurId, fetchedData);
      console.log(`💾 Données du chasseur #${chasseurId} mises en cache mémoire`);
      
      // Marquer ce chasseur comme chargé
      setLoadedChasseurs(prev => new Set(prev).add(chasseurId));
      console.log(`✅ Données du chasseur #${chasseurId} chargées depuis Supabase avec les images`);
      
    } catch (error) {
      console.error(`❌ Erreur lors du chargement des données pour le chasseur #${chasseurId}:`, error);
    }
  };
  
  // Fonction pour gérer l'ouverture/fermeture d'un onglet de chasseur
  const handleChasseurToggle = (chasseurId: number, isOpen: boolean) => {
    setOpenChasseurs(prev => {
      const newSet = new Set(prev);
      if (isOpen) {
        newSet.add(chasseurId);
        // Déclencher le chargement des données
        loadChasseurData(chasseurId);
      } else {
        newSet.delete(chasseurId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      // Charger depuis Supabase
      console.log("🔄 Récupération des données de base des chasseurs depuis Supabase...");
      const { data: chasseurData } = await supabase
        .from("chasseurs")
        .select("id, nom, image, element, rarete");
      
      if (chasseurData) {
        // Traiter les images des chasseurs
        const chasseursWithImages = await Promise.all(
          chasseurData.map(async (chasseur) => {
            if (chasseur.image) {
              try {
                const imageData = await fetchImageAsBase64(chasseur.image);
                return {
                  ...chasseur,
                  image: imageData
                };
              } catch (e) {
                console.warn(`⚠️ Impossible de charger l'image pour le chasseur #${chasseur.id}`, e);
                return chasseur;
              }
            }
            return chasseur;
          })
        );
        
        setChasseurs(chasseursWithImages);
        console.log(`✅ ${chasseursWithImages.length} chasseurs chargés avec leurs images`);
      }
    };

    fetchInitialData();
    
    // Précharger les images des éléments (utilisées pour le filtrage)
    elementIcons.forEach(el => {
      fetchImageAsBase64(el.image);
    });
    
  }, []);

  useEffect(() => {
    // Quand les builds sont chargés, tente de scroller sur l'ancre
    if (location.hash && chasseurs.length > 0) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const yOffset = -40;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          el.classList.add("animate-pulse-once");
          setTimeout(() => el.classList.remove("animate-pulse-once"), 900);
          
          // Si un chasseur est ciblé directement par l'ancre, charger ses données
          const chasseurMatch = id.match(/chasseur-(\d+)/);
          if (chasseurMatch) {
            const chasseurId = parseInt(chasseurMatch[1]);
            if (!isNaN(chasseurId)) {
              loadChasseurData(chasseurId);
              setOpenChasseurs(prev => new Set(prev).add(chasseurId));
            }
          }
        }
      }, 200);
    }
  }, [location, chasseurs]);

  // Indexer les chasseurs pour un accès plus rapide
  const chasseurIndex = useMemo(() => {
    const index = new Map<number, Chasseur>();
    chasseurs.forEach((c) => index.set(c.id, c));
    return index;
  }, [chasseurs]);

  // Utiliser l'index pour filtrer les builds
  const filteredBuilds = buildsChasseurs.filter((entry) => {
    const chasseur = chasseurIndex.get(entry.chasseurId);
    if (!chasseur) return false;

    const matchSearch = chasseur.nom
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchElement = !selectedElement || entry.element === selectedElement;

    return matchSearch && matchElement;
  });

  return (
    <Layout>
      <SEO
        title="Builds des Chasseurs - Solo Leveling: ARISE"
        description="Découvrez les meilleurs builds pour vos chasseurs dans Solo Leveling: ARISE. Optimisez vos équipes avec des artefacts, noyaux et bonus de sets adaptés."
        keywords="Solo Leveling, builds chasseurs, artefacts, noyaux, sets bonus, ARISE"
      />

      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="space-y-4">
            {/* Introduction */}
            <div className="bg-sidebar-accent p-6 rounded-lg shadow-md space-y-4">
              <h1 className="text-3xl md:text-4xl font-extrabold text-violet-400 text-center md:text-left">
                Builds de Chasseurs pour Solo Leveling: ARISE
              </h1>
              <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
                Découvrez les meilleures configurations pour vos chasseurs dans
                Solo Leveling: ARISE. Ce guide inclut des statistiques,
                artefacts, noyaux et bonus de sets pour optimiser vos équipes.
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
                      src={imageCache.get(normalizeUrl(el.image)) || el.image}
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
                    isOpen={openChasseurs.has(entry.chasseurId)}
                    onToggle={(isOpen) => handleChasseurToggle(entry.chasseurId, isOpen)}
                  />
                );
              })}
              
              {/* Afficher un message si aucun résultat n'est trouvé */}
              {filteredBuilds.length === 0 && (
                <div className="bg-sidebar p-8 rounded-lg border border-sidebar-border text-center">
                  <p className="text-lg text-gray-300">
                    Aucun chasseur ne correspond à votre recherche.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedElement(null);
                    }}
                    className="mt-4 px-4 py-2 bg-solo-purple text-white rounded-md hover:bg-solo-purple-dark transition-colors"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}