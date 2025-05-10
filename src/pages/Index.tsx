import React, { useEffect, useState, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter } from "lucide-react";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// =========================
// Utilitaire pour charger une image et la convertir en base64
// =========================
const fetchImageAsBase64 = async (url: string): Promise<string | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Image fetch failed");
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error(`Erreur lors du chargement de l'image ${url}:`, error);
    return null;
  }
};

// =========================
// Typage explicite pour les chasseurs
// =========================
type Hunter = {
  id: number;
  nom: string;
  image: string | null;
};

// =========================
// Composant Memo pour la carte d'un chasseur
// =========================
const HunterCard = memo(({ hunter, imageUrl }: { hunter: Hunter, imageUrl: string }) => {
  // Gestion du cache local : on utilise le cache si présent, sinon l'URL fournie
  const cacheKey = `hunterImg_${hunter.id}`;
  const cached = localStorage.getItem(cacheKey);
  const displayImage = cached || imageUrl;
  return (
    <Link
      to={`/builds#chasseur-${hunter.id}`}
      className="block"
    >
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
          {hunter.nom === "Prochainement" ? (
            <div className="text-gray-300 text-center">Image bientôt disponible</div>
          ) : (
            <img
              src={displayImage}
              alt={hunter.nom}
              className="w-full h-full object-contain"
              onError={(e) => {
                if (cached) {
                  localStorage.removeItem(cacheKey);
                  (e.target as HTMLImageElement).src = imageUrl;
                } else {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }
              }}
            />
          )}
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-center p-2">
            <h3 className="text-lg font-bold text-white">{hunter.nom}</h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});
HunterCard.displayName = "HunterCard";

// =========================
// Composant Memo pour l'iframe YouTube
// =========================
const YoutubeEmbed = memo(({ videoId }: { videoId: string }) => (
  <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto aspect-video">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      frameBorder="0"
      allowFullScreen={true}
      className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
    ></iframe>
  </div>
));
YoutubeEmbed.displayName = "YoutubeEmbed";

// =========================
// Composant principal
// =========================
const Index = () => {
  // Tableau statique des chasseurs à afficher (id, nom, image locale)
  const hunters = [
    {
      id: 43,
      nom: "Cha Hae-In",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/hunter-body//ChaHaeIn_MM_Portrait_Body.webp",
    },
    {
      id: 41,
      nom: "Seo Lin",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/hunter-body//SeoLin_Portrait_Body.webp",

    },
    {
      id: 13,
      nom: "Goto Ryuji",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/hunter-body//GotoRyuji_Portrait_Body.webp",

    },
  ];

  // =========================
  // Récupération de la dernière vidéo YouTube avec cache local (24h)
  // =========================
  const [latestVideoId, setLatestVideoId] = useState("");
  useEffect(() => {
    const fetchLatestVideo = async () => {
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
      if (!API_KEY) {
        console.error("Clé API YouTube non définie !");
        return;
      }
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
    fetchLatestVideo();
  }, []);

  // =========================
  // Render principal
  // =========================
  return (
    <Layout>
      {/* Ajout du composant SEO */}
      <SEO
        title="Accueil - SLAGATE | Solo Leveling: ARISE"
        description="Bienvenue sur SLAGATE, votre portail dédié à Solo Leveling: ARISE. Découvrez des guides stratégiques, des builds optimisés, des compositions d'équipes et bien plus encore."
        keywords="Solo Leveling, ARISE, chasseurs, builds, guides, compositions d'équipes, SLAGATE"
      />
      <div className="w-full px-6 py-12 text-gray-100">
        {/* Section des chasseurs */}
        <div className="mb-16">
          <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-10">
            Derniers chasseurs sortis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hunters.map((hunter) => (
              <HunterCard key={hunter.id} hunter={hunter} imageUrl={hunter.image} />
            ))}
          </div>
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
            {/* Ratio 16:9 */}
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
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
