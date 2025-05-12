import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { resetAllCaches, syncCacheStatus } from "@/utils/clearCache";

// Composant YouTube pour intégrer une vidéo
const YoutubeEmbed = ({ videoId }: { videoId: string }) => {
  return (
    <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
      />
    </div>
  );
};


// =========================
// Composant Memo pour la carte d'un chasseur
// =========================
const HunterCard = ({ hunter, imageUrl }: { hunter: { id: number; nom: string }, imageUrl: string }) => {
  return (
    <Link to={`/builds#chasseur-${hunter.id}`} className="block">
      <Card className="bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
        <CardContent
          className="relative flex justify-center items-end h-64 bg-gray-700 p-0"
          style={{
            backgroundImage:
              "url('https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Bg_AchievePage_1.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img
            src={imageUrl}
            alt={hunter.nom}
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-center p-2">
            <h3 className="text-lg font-bold text-white">{hunter.nom}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

// =========================
// Composant principal
// =========================
const Index = () => {
  const hunterIds = [43, 41, 13];
  const [hunters, setHunters] = useState<{ id: number; nom: string; image: string }[]>([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [latestVideoId, setLatestVideoId] = useState("");
  // État pour suivre si le cache est disponible
  const [cacheAvailable, setCacheAvailable] = useState(localStorage.getItem("indexedDBFailed") !== "true");
  // Cette première déclaration sera supprimée
  // Fonction de chargement des images extraite en dehors de useEffect
  const loadImages = async (huntersToLoad: { id: number; nom: string; image: string }[]) => {
    const loadedImages: { [key: number]: string } = {};
    let cacheHits = 0;
    let totalImages = 0;
    
    for (const hunter of huntersToLoad) {
      totalImages++;
      try {
        const startTime = performance.now();
        const imageResponse = await fetchImageFromWorker(hunter.image);
        const loadTime = Math.round(performance.now() - startTime);
        
        if (typeof imageResponse === 'object' && imageResponse.url && imageResponse.fromCache) {
          cacheHits++;
          loadedImages[hunter.id] = imageResponse.url;
        } else {
          loadedImages[hunter.id] = typeof imageResponse === 'object' ? imageResponse.url : imageResponse;
        }
      } catch (error) {
        loadedImages[hunter.id] = hunter.image;
      }
    }
    
    setImages(loadedImages);
    
    // Message récapitulatif simplifié
    const cachePercent = Math.round((cacheHits/totalImages) * 100);
    console.log(`📊 Images: ${cacheHits}/${totalImages} (${cachePercent}%) depuis IndexedDB, ${totalImages-cacheHits} depuis Supabase`);  };
  
  // Fonction pour réinitialiser le cache IndexedDB
  const resetCache = async () => {
    try {
      console.log("🔄 Tentative de réinitialisation du cache...");
      
      // Utiliser notre utilitaire centralisé
      const success = await resetAllCaches();
      
      if (success) {
        console.log("✅ Cache réinitialisé avec succès");
        setCacheAvailable(true);
        
        // Recharger les images pour les mettre à jour depuis le réseau
        if (hunters.length > 0) {
          loadImages(hunters);
        }
      } else {
        console.error("❌ Échec de la réinitialisation du cache");
        setCacheAvailable(false);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la réinitialisation:", error);
      localStorage.setItem("indexedDBFailed", "true");
      setCacheAvailable(false);
    }
  };
  useEffect(() => {
    // Synchroniser d'abord l'état du cache pour assurer la cohérence
    const initializeApp = async () => {
      try {
        // Vérifier et synchroniser l'état du cache
        await syncCacheStatus();
        // Mettre à jour l'état local
        setCacheAvailable(localStorage.getItem("indexedDBFailed") !== "true");
        
        // Charger les données
        const { data, error } = await supabase
          .from("chasseurs")
          .select("id, nom, image")
          .in("id", hunterIds);
  
        if (error) {
          console.error("❌ Erreur lors de la récupération des chasseurs :", error);
          return;
        }
  
        if (data) {
          setHunters(data);
          loadImages(data);
        }
      } catch (e) {
        console.error("Erreur lors de l'initialisation:", e);
      }
    };

    initializeApp();
    loadLatestYouTubeVideo();
  }, []);  useEffect(() => {
    // Vérifier si le cache IndexedDB fonctionne
    const checkIndexedDBSupport = async () => {
      try {
        // D'abord synchroniser l'état du cache pour corriger un éventuel drapeau bloqué
        const wasFixed = await syncCacheStatus();
        if (wasFixed) {
          console.log("🔄 État du cache corrigé au démarrage");
          // Mettre à jour l'état local en fonction du résultat
          setCacheAvailable(localStorage.getItem("indexedDBFailed") !== "true");
        }
        
        const worker = new Worker(new URL("@/workers/BuildWorker.ts", import.meta.url));
        worker.postMessage({ type: "checkAccess" });
        
        worker.onmessage = (event) => {
          const { success } = event.data;
          if (success) {
            console.log("✅ Cache IndexedDB opérationnel");
            // Explicitement définir le drapeau à "false" si IndexedDB fonctionne
            localStorage.setItem("indexedDBFailed", "false");
            setCacheAvailable(true);
          } else {
            console.log("⚠️ Cache IndexedDB désactivé");
            localStorage.setItem("indexedDBFailed", "true");
            setCacheAvailable(false);
          }
          worker.terminate();
        };
        
        worker.onerror = () => {
          console.warn("⚠️ IndexedDB: Worker non supporté");
          localStorage.setItem("indexedDBFailed", "true");
          worker.terminate();
        };
      } catch (error) {
        console.error("❌ IndexedDB: Inaccessible");
      }
    };

    checkIndexedDBSupport();
    // ...reste du code
  }, []);

  // =========================
  // Utilitaire pour charger une image via le Worker IndexedDB
  // =========================

const fetchImageFromWorker = async (url: string): Promise<{ url: string; fromCache: boolean } | string> => {
  // Essayer de synchroniser l'état du cache
  await syncCacheStatus();

  // Vérifier l'état du cache IndexedDB
  const indexedDBFailed = localStorage.getItem("indexedDBFailed") === "true";
  
  // Si IndexedDB a échoué précédemment et que l'état n'a pas été réinitialisé, utiliser directement l'URL
  if (indexedDBFailed) {
    // Mise à jour de l'état du cache pour la cohérence de l'UI
    setCacheAvailable(false);
    return url;
  }

  return new Promise((resolve) => {
    // Créer une nouvelle instance de Worker
    const worker = new Worker(new URL("@/workers/BuildWorker.ts", import.meta.url));
    
    // Définir un timeout plus court (5 secondes au lieu de 10)
    const timeoutId = setTimeout(() => {
      console.warn("⏱️ Timeout du worker - utilisation de l'URL directe");
      worker.terminate();
      localStorage.setItem("indexedDBFailed", "true");
      setCacheAvailable(false);
      resolve(url);
    }, 5000);
    
    worker.postMessage({ type: "getImage", url });
    
    worker.onmessage = (event) => {
      clearTimeout(timeoutId);
      const { imageBlob, fromCache, error } = event.data;
      const filename = url.split("/").pop() || url;
      
      if (error) {
        console.error(`❌ Erreur: ${error.substring(0, 100)}${error.length > 100 ? '...' : ''}`);
        resolve(url);
        worker.terminate();
        return;
      }
      
      if (imageBlob) {
        const blobUrl = URL.createObjectURL(imageBlob);
        // Si nous avons réussi à obtenir une image, le cache fonctionne
        localStorage.setItem("indexedDBFailed", "false");
        setCacheAvailable(true);
        resolve({ url: blobUrl, fromCache: fromCache });
      } else {
        console.warn(`⚠️ Aucune image reçue pour: ${filename}`);
        resolve(url);
      }
      
      worker.terminate();
    };
    
    worker.onerror = (error) => {
      clearTimeout(timeoutId);
      console.error("❌ Erreur du worker");
      resolve(url);
      worker.terminate();
    };
  });
};

  // =========================
  // Récupération de la dernière vidéo YouTube (cache 24h)
  // =========================
  const loadLatestYouTubeVideo = async () => {
    const cacheKey = "latestYoutubeVideoId";
    const cacheTimeKey = "latestYoutubeVideoId_time";
    const now = Date.now();
    const cacheTime = localStorage.getItem(cacheTimeKey);
    const cacheId = localStorage.getItem(cacheKey);

    if (cacheId && cacheTime && now - parseInt(cacheTime, 10) < 86400000) {
      setLatestVideoId(cacheId);
      return;
    }

    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    const CHANNEL_ID = "UCT9h3NfvJJ6eT7_Iri6CwFg";
    const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;

    try {
      const response = await axios.get(url);
      const video = response.data.items[0];
      if (video && video.id.videoId) {
        setLatestVideoId(video.id.videoId);
        localStorage.setItem(cacheKey, video.id.videoId);
        localStorage.setItem(cacheTimeKey, now.toString());
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de la dernière vidéo :", error);
    }
  };

  return (
    <Layout>
      <SEO title="Accueil - SLAGATE | Solo Leveling: ARISE" description="Bienvenue sur SLAGATE..." />
      <div className="w-full px-6 py-12 text-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-10">
          Derniers chasseurs sortis
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hunters.map((hunter) => (
            // Dans le rendu de votre composant Index
<HunterCard 
  key={hunter.id} 
  hunter={hunter} 
  imageUrl={typeof images[hunter.id] === 'string' ? images[hunter.id] : hunter.image} 
/>
          ))}
        </div>

        {/* Section de bienvenue */}
      <div className="my-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-violet-400">
          Bienvenue sur SLAGATE, votre portail Solo Leveling: ARISE
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          Explorez des guides stratégiques, des builds optimisés et les différentes informations autour du jeu. 
          SLAGATE est conçu pour vous accompagner dans vos progrès, que vous soyez nouveau joueur ou vétéran du terrain.
          N'hésitez pas à consulter nos tier lists, nos compositions de teams ou encore les codes promotionnels à ne pas manquer !
        </p>
      </div>

      {/* Section Twitch */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-violet-400 mb-8">
          Stream en direct
        </h2>
        <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto aspect-video">
          <iframe
            src="https://player.twitch.tv/?channel=sohoven&parent=slagate.fr"
            frameBorder="0"
            allowFullScreen={true}
            scrolling="no"
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* Section YouTube */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center text-violet-400 mb-8">
          Dernière vidéo YouTube
        </h2>
        {latestVideoId ? (
          <YoutubeEmbed videoId={latestVideoId} />
        ) : (
          <p className="text-center text-gray-300">Chargement de la dernière vidéo...</p>
        )}      </div>      {/* Panneau de débogage caché - à supprimer en production */}
      {import.meta.env.DEV && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-2 bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700">
          <div className="text-sm font-bold text-violet-400 mb-2 text-center">Outils de débogage</div>
          
          <button
            onClick={resetCache}
            className={`${cacheAvailable ? 'bg-purple-600 hover:bg-purple-700' : 'bg-red-600 hover:bg-red-700'} text-white px-4 py-2 rounded-lg shadow flex items-center justify-center mb-2`}
          >
            <span className="mr-2">{cacheAvailable ? "🔄" : "🔧"}</span>
            {cacheAvailable ? "Réinitialiser le cache" : "Réparer le cache"}
          </button>          <div className="flex space-x-2 mb-2">
            <button
              onClick={() => {
                // Afficher les statistiques locales
                import('@/utils/clearCache').then(module => {
                  module.displayCacheStats();
                });
                
                // Afficher les statistiques détaillées depuis le worker
                const worker = new Worker(new URL("@/workers/BuildWorker.ts", import.meta.url));
                worker.postMessage({ type: "debugCache" });
                
                worker.onmessage = (event) => {
                  if (event.data.type === "debugCache") {
                    console.group("📊 Statistiques détaillées du cache");
                    if (event.data.stats) {
                      console.table(event.data.stats);
                      if (event.data.stats.keys && event.data.stats.keys.length) {
                        console.log("🔑 Échantillon de clés:", event.data.stats.keys);
                      }
                    } else if (event.data.error) {
                      console.error("❌ Erreur:", event.data.error);
                    }
                    console.groupEnd();
                  }
                  worker.terminate();
                };
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow flex items-center justify-center flex-1"
            >
              <span className="mr-1">📊</span>
              Statistiques
            </button>
            
            <button
              onClick={async () => {
                console.log("🔄 Synchronisation du cache...");
                const wasSynced = await syncCacheStatus();
                setCacheAvailable(localStorage.getItem("indexedDBFailed") !== "true");
                console.log(wasSynced 
                  ? "✅ Cache synchronisé - état corrigé" 
                  : "ℹ️ Cache déjà synchronisé");
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg shadow flex items-center justify-center flex-1"
            >
              <span className="mr-1">🔄</span>
              Synchroniser
            </button>
          </div>
          
          <div className={`text-xs ${cacheAvailable ? 'text-green-400' : 'text-red-400'} text-center font-semibold mt-2 p-1 rounded ${cacheAvailable ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
            Cache IndexedDB: {cacheAvailable ? "Actif ✓" : "Désactivé ✗"}
          </div>
        </div>
      )}
      </div>
    </Layout>
  );
};

export default Index;
