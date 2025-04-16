
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Flame, Sword } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";

type Boss = Database["public"]["Tables"]["bosses"]["Row"];

export default function AtelierDeLaLumiere() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchBosses = async () => {
      const { data } = await supabase.from("bosses").select("*");
      if (data) setBosses(data);
    };
    fetchBosses();
  }, []);

  return (
    <Layout>
      <div className="w-full px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8 space-y-2 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-solo-purple sm:h-6 sm:w-6 md:h-7 md:w-7" />
            <h1 className="text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Atelier de la Lumière
            </h1>
          </div>
          <Separator className="bg-sidebar-border" />
          <p className="text-muted-foreground text-xs sm:text-sm md:text-base">
            Sélectionnez un boss pour voir plus de détails
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-4 md:gap-6">
          {bosses.map((boss) => (
            <Card
              key={boss.id}
              onClick={() => navigate(`/atelier/${boss.nom}`)}
              className="group h-full cursor-pointer overflow-hidden border-sidebar-border bg-sidebar transition-all duration-300 hover:-translate-y-1 hover:border-solo-purple hover:shadow-lg hover:shadow-solo-purple/20 relative flex flex-col"
            >
              <CardContent className="p-0 flex-grow flex flex-col">
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex h-full items-center justify-center bg-sidebar-accent p-3 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={boss.image || ""}
                        alt={boss.nom}
                        className="h-full max-h-[160px] w-auto object-contain"
                      />
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white transition-colors group-hover:text-solo-purple mb-2">
                    {boss.nom}
                  </h2>
                  
                  <div className="mt-auto pt-2 border-t border-sidebar-border">
                    <div className="flex flex-col space-y-2 text-xs sm:text-sm md:text-base text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Sword className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 flex-shrink-0 text-solo-purple" />
                        <span className="whitespace-nowrap">{boss.puissance_facile}</span>
                      </div>
                      
                      <div className="flex items-center flex-wrap gap-1 sm:gap-2">
                        <span className="whitespace-nowrap mr-1 text-xs sm:text-sm md:text-base">Faiblesses:</span>
                        <div className="flex flex-shrink-0 gap-2 sm:gap-3">
                          {boss.faiblesse1 && (
                            <img
                              src={boss.faiblesse1}
                              alt="Faiblesse 1"
                              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 object-contain"
                            />
                          )}
                          {boss.faiblesse2 && (
                            <img
                              src={boss.faiblesse2}
                              alt="Faiblesse 2"
                              className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 object-contain"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {bosses.length === 0 && (
          <div className="mt-12 flex flex-col items-center justify-center">
            <Flame className="h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 text-muted-foreground/50" />
            <p className="mt-4 text-center text-muted-foreground text-sm sm:text-base md:text-lg">
              Chargement des boss...
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
