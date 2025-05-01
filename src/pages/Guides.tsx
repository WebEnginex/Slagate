import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter } from "lucide-react";
import Footer from "@/components/Footer";

const guides = [
    {
      id: 1,
      title: "Guide des Chasseurs",
      description: "Découvrez les meilleurs chasseurs à recruter et d'autres informations à propos des chasseurs.",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Chasseur.png",
      link: "/guides/hunters",
    },
    {
      id: 3,
      title: "Guide des Ombres",
      description: "Découvrez comment maîtriser les ombres.",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Ombres.png",
      link: "/guides/cores",
    },
    {
      id: 3,
      title: "Guide des Portails",
      description: "Découvrez comment fonctionne les portails.",
      image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Portails.png",
      link: "/guides/cores",
    },
    {
        id: 4,
        title: "Guide des Boss",
        description: "Découvrez les stratégies pour vaincre les boss.",
        image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Boss.png",
        link: "/guides/boss",
      },
  ];
  
  const Guides = () => {
    return (
      <Layout>
        <div className="w-full px-6 py-8">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">Guides disponibles</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div
                key={guide.id}
                className="bg-sidebar border border-sidebar-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-2">{guide.title}</h2>
                  <p className="text-sm text-gray-400 mb-4">{guide.description}</p>
                  <a
                    href={guide.link}
                    className="block text-center px-4 py-2 bg-solo-purple text-white rounded-md font-medium hover:bg-solo-purple/90 transition-colors"
                  >
                    Voir le guide
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  };

export default Guides;