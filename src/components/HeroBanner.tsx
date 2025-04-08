
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";

const HeroBanner = () => {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-tr from-sidebar to-solo-dark-purple p-8 text-center lg:p-12">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/5ea924c3-9279-44c8-ae86-ae1b1a5bee4c.png')] bg-cover bg-center opacity-10" />
      <div className="relative">
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-solo-purple md:text-5xl">
          Solo Leveling: Arise
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-300">
          Le compagnon ultime pour les joueurs de Solo Leveling: Arise. Accédez aux guides, 
          builds de hunters et stratégies.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button className="gap-2" variant="secondary">
            <BookOpen size={18} />
            Parcourir les guides
          </Button>
          <Button className="gap-2" variant="outline">
            <ExternalLink size={18} />
            Jeu Officiel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
