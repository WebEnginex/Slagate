import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter } from "lucide-react";
import Footer from "@/components/Footer";

const Index = () => {
  // IDs des chasseurs à afficher
  const featuredHunterIds = [1, 2, 3]; // Remplacez par les IDs des chasseurs à afficher
  const [hunters, setHunters] = useState([]);

  useEffect(() => {
    const fetchHunters = async () => {
      const { data, error } = await supabase
        .from("chasseurs")
        .select("*")
        .in("id", featuredHunterIds);

      if (data) setHunters(data);
      if (error) console.error("Erreur lors de la récupération des chasseurs :", error);
    };

    fetchHunters();
  }, []);

  return (
    <Layout>
      <div className="w-full px-6 py-8">
        {/* Section des chasseurs */}
        <div className="mb-12">
  <h1 className="text-3xl font-bold text-white mb-6">Derniers chasseurs sortis</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {hunters.map((hunter, index) => (
      <Card key={hunter.id} className="bg-sidebar border-sidebar-border flex flex-col items-center relative">
        <CardHeader>
          <CardTitle className="text-xl text-white text-center">{hunter.nom}</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-64">
          <img
            src={hunter.image_body}
            alt={hunter.nom}
            className="h-full max-h-full object-contain rounded-md"
          />
        </CardContent>
        {/* Badge pour le chasseur prochainement */}
        {index === 2 && (
          <div className="absolute top-2 right-2 bg-solo-purple text-white text-xs font-bold px-2 py-1 rounded">
            Prochainement
          </div>
        )}
      </Card>
    ))}
  </div>
</div>

        {/* Section Twitch */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Stream en direct</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://player.twitch.tv/?channel=nom_du_streamer&parent=localhost"
              frameBorder="0"
              allowFullScreen={true}
              scrolling="no"
              className="w-full h-full rounded-md"
            ></iframe>
          </div>
        </div>

        {/* Section YouTube */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Dernière vidéo YouTube</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.youtube.com/embed/ID_DE_LA_VIDEO"
              frameBorder="0"
              allowFullScreen={true}
              className="w-full h-full rounded-md"
            ></iframe>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Layout>
  );
};

export default Index;