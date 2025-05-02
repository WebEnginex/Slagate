import React, { useEffect, useState } from "react";
import axios from "axios";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter } from "lucide-react";
import Footer from "@/components/Footer";

const Index = () => {
  // IDs des chasseurs à afficher
  const chasseur1 = 35; // ID du premier chasseur
  const chasseur2 = 13; // ID du deuxième chasseur
  const chasseur3 = 41; // ID du troisième chasseur

  const [hunters, setHunters] = useState([]);
  const [latestVideoId, setLatestVideoId] = useState(""); // État pour stocker l'ID de la dernière vidéo YouTube

  useEffect(() => {
    const fetchHunters = async () => {
      const { data, error } = await supabase
        .from("chasseurs")
        .select("*")
        .in("id", [chasseur1, chasseur2, chasseur3]);

      if (data) {
        // Organiser les chasseurs dans l'ordre des IDs
        const sortedHunters = [
          data.find((hunter) => hunter.id === chasseur1) || {
            id: chasseur1,
            nom: "",
            image_body: "",
          },
          data.find((hunter) => hunter.id === chasseur2) || {
            id: chasseur2,
            nom: "",
            image_body: "",
          },
          data.find((hunter) => hunter.id === chasseur3) || {
            id: chasseur3,
            nom: "",
            image_body: "",
          },
        ];
        setHunters(sortedHunters);
      }

      if (error) {
        console.error("Erreur lors de la récupération des chasseurs :", error);
      }
    };

    fetchHunters();
  }, []);

  // Récupération de la dernière vidéo YouTube
  useEffect(() => {
    const fetchLatestVideo = async () => {
      const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY; // Clé API depuis .env
      const CHANNEL_ID = "UCT9h3NfvJJ6eT7_Iri6CwFg"; // ID de la chaîne YouTube
      const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=1`;
  
      try {
        const response = await axios.get(url);
        const video = response.data.items[0];
        if (video && video.id.videoId) {
          setLatestVideoId(video.id.videoId);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de la dernière vidéo :", error);
      }
    };
  
    fetchLatestVideo();
  }, []);

  return (
    <Layout>
      <div className="w-full px-6 py-12 text-gray-100">
        {/* Section des chasseurs */}
        <div className="mb-16">
          <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-10">
            Derniers chasseurs sortis
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hunters.map((hunter, index) => (
              <Card
                key={hunter.id}
                className="bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
              >
                <CardContent
                  className="relative flex justify-center items-end h-64 bg-gray-700 p-0"
                  style={{
                    backgroundImage: "url('https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Bg_AchievePage_1.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {hunter.nom === "Prochainement" ? (
                    <div className="text-gray-300 text-center">
                      Image bientôt disponible
                    </div>
                  ) : (
                    <img
                      src={hunter.image_body}
                      alt={hunter.nom}
                      className="w-full h-full object-contain"
                    />
                  )}
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent text-center p-2">
                    <h3 className="text-lg font-bold text-white">{hunter.nom}</h3>
                  </div>
                </CardContent>
              </Card>
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
              src="https://player.twitch.tv/?channel=sohoven&parent=slagate.netlify.app"
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
            <div className="relative w-full max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto aspect-video">
              {/* Ratio 16:9 */}
              <iframe
                src={`https://www.youtube.com/embed/${latestVideoId}`}
                frameBorder="0"
                allowFullScreen={true}
                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
              ></iframe>
            </div>
          ) : (
            <p className="text-center text-gray-300">Chargement de la dernière vidéo...</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
