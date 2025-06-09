import React, { useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CacheDebugPanel from "@/components/tools/CacheDebugPanel";
import {
  resetAllCaches,
  syncCacheStatus,
  fetchImageFromWorker,
  checkIndexedDBSupport,
} from "@/services/cacheImages";

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
const HunterCard = ({
  hunter,
  imageUrl,
}: {
  hunter: { id: number; nom: string };
  imageUrl: string;
}) => {
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
  const hunterIds = [44, 43, 41];
  const [hunters, setHunters] = useState<
    { id: number; nom: string; image: string }[]
  >([]);
  const [images, setImages] = useState<{ [key: number]: string }>({});
  const [latestVideoId, setLatestVideoId] = useState(""); // État pour suivre si le cache est disponible
  const [cacheAvailable, setCacheAvailable] = useState(
    localStorage.getItem("indexedDBFailed") !== "true"
  );

  // Fonction de chargement des images extraite en dehors de useEffect
  const loadImages = async (
    huntersToLoad: { id: number; nom: string; image: string }[]
  ) => {
    const loadedImages: { [key: number]: string } = {};
    let cacheHits = 0;
    let totalImages = 0;

    for (const hunter of huntersToLoad) {
      totalImages++;
      try {
        const startTime = performance.now();
        const imageResponse = await fetchImageFromWorker(
          hunter.image,
          setCacheAvailable
        );
        const loadTime = Math.round(performance.now() - startTime);

        if (
          typeof imageResponse === "object" &&
          imageResponse.url &&
          imageResponse.fromCache
        ) {
          cacheHits++;
          loadedImages[hunter.id] = imageResponse.url;
        } else {
          loadedImages[hunter.id] =
            typeof imageResponse === "object"
              ? imageResponse.url
              : imageResponse;
        }
      } catch (error) {
        loadedImages[hunter.id] = hunter.image;
      }
    }
    setImages(loadedImages); // Les statistiques de cache sont maintenant gérées dans les services
  };
  // La fonction resetCache a été déplacée dans le composant CacheDebugPanel
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
          // Gestion silencieuse de l'erreur
          return;
        }

        if (data) {
          setHunters(data);
          loadImages(data);
        }
      } catch (e) {
        // Gestion silencieuse des erreurs d'initialisation
      }
    };

    initializeApp();
    loadLatestYouTubeVideo();
  }, []);

  useEffect(() => {
    // Vérifier si le cache IndexedDB fonctionne
    checkIndexedDBSupport(setCacheAvailable);
    // ...reste du code
  }, []);
  // Aucun utilitaire de chargement d'image n'est défini ici car nous utilisons directement fetchImageFromWorker importé

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
      // Gestion silencieuse des erreurs YouTube
    }
  };

  return (
    <Layout>
      <SEO
        title="Accueil - SLAGATE | Solo Leveling: ARISE"
        description="Bienvenue sur SLAGATE..."
      />
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
              imageUrl={
                typeof images[hunter.id] === "string"
                  ? images[hunter.id]
                  : hunter.image
              }
            />
          ))}
        </div>
        {/* Section de bienvenue */}
        <div className="my-16 text-center">
          <h2 className="text-3xl font-bold mb-4 text-violet-400">
            Bienvenue sur SLAGATE, votre portail Solo Leveling: ARISE
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Explorez des guides stratégiques, des builds optimisés et les
            différentes informations autour du jeu. SLAGATE est conçu pour vous
            accompagner dans vos progrès, que vous soyez nouveau joueur ou
            vétéran du terrain. N'hésitez pas à consulter nos tier lists, nos
            compositions de teams ou encore les codes promotionnels à ne pas
            manquer !
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
        {/* <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-violet-400 mb-8">
            Dernière vidéo YouTube
          </h2>
          {latestVideoId ? (
            <YoutubeEmbed videoId={latestVideoId} />
          ) : (
            <p className="text-center text-gray-300">
              Chargement de la dernière vidéo...
            </p>
          )}{" "}
        </div>{" "} */}

        {/* Panneau de débogage caché - à supprimer en production */}
        {import.meta.env.DEV && (
          <CacheDebugPanel
            cacheAvailable={cacheAvailable}
            setCacheAvailable={setCacheAvailable}
            resetImagesCallback={() =>
              hunters.length > 0 ? loadImages(hunters) : undefined
            }
          />
        )}
      </div>
    </Layout>
  );
};

export default Index;
