
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type Boss = Database["public"]["Tables"]["bosses"]["Row"];

export default function AtelierDeLaLumiere() {
  const [bosses, setBosses] = useState<Boss[]>([]);
  const navigate = useNavigate();

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Atelier de la Lumière
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sélectionnez un boss pour voir plus de détails
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {bosses.map((boss) => (
            <Card
              key={boss.id}
              onClick={() => navigate(`/atelier/${boss.nom}`)}
              className="group h-full cursor-pointer overflow-hidden bg-sidebar border-sidebar-border transition-all duration-300 hover:border-solo-purple hover:shadow-md hover:shadow-solo-purple/20"
            >
              <CardContent className="p-0">
                <div className="relative">
                  <AspectRatio ratio={16 / 9}>
                    <div className="flex h-full items-center justify-center bg-sidebar-accent p-6">
                      <img
                        src={boss.image || ""}
                        alt={boss.nom}
                        className="h-full max-h-[160px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </AspectRatio>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white group-hover:text-solo-purple transition-colors">
                    {boss.nom}
                  </h2>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      Puissance min: {boss.puissance_facile}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
