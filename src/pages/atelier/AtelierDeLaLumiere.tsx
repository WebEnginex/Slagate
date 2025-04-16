
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
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-solo-purple" />
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Atelier de la Lumière
            </h1>
          </div>
          <Separator className="bg-sidebar-border" />
          <p className="text-muted-foreground">
            Sélectionnez un boss pour voir plus de détails
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bosses.map((boss) => (
            <Card
              key={boss.id}
              onClick={() => navigate(`/atelier/${boss.nom}`)}
              className="group h-full cursor-pointer overflow-hidden border-sidebar-border bg-sidebar transition-all duration-300 hover:-translate-y-1 hover:border-solo-purple hover:shadow-lg hover:shadow-solo-purple/20 relative flex flex-col"
            >
              <CardContent className="p-0 flex-grow flex flex-col">
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex h-full items-center justify-center bg-sidebar-accent p-6 transition-transform duration-500 group-hover:scale-105">
                      <img
                        src={boss.image || ""}
                        alt={boss.nom}
                        className="h-full max-h-[160px] w-auto object-contain"
                      />
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-white transition-colors group-hover:text-solo-purple mb-3">
                    {boss.nom}
                  </h2>
                  
                  <div className="mt-2 mb-4">
                    <div className="text-sm text-muted-foreground mb-2">Faiblesses:</div>
                    <div className="flex flex-wrap items-center gap-2">
                      {boss.faiblesse1 && (
                        <img
                          src={boss.faiblesse1}
                          alt="Faiblesse 1"
                          className="h-5 w-5 object-contain"
                        />
                      )}
                      {boss.faiblesse2 && (
                        <img
                          src={boss.faiblesse2}
                          alt="Faiblesse 2"
                          className="h-5 w-5 object-contain"
                        />
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-2 border-t border-sidebar-border flex items-center justify-end text-sm text-muted-foreground">
                    <Sword className="mr-2 h-4 w-4 text-solo-purple" />
                    {boss.puissance_facile}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {bosses.length === 0 && (
          <div className="mt-20 flex flex-col items-center justify-center">
            <Flame className="h-16 w-16 text-muted-foreground/50" />
            <p className="mt-4 text-center text-muted-foreground">
              Chargement des boss...
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
