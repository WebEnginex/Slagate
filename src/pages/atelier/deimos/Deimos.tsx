import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AtelierDeLaLumiere() {
  type Boss = Database["public"]["Tables"]["bosses"]["Row"];
  const [boss, setBoss] = useState<Boss | null>(null);
  const bossName = "Deimos"; // <- Boss

  useEffect(() => {
    const fetchBoss = async () => {
      const { data } = await supabase
        .from("bosses")
        .select("*")
        .eq("nom", bossName)
        .single();
      if (data) setBoss(data);
    };
    fetchBoss();
  }, []);

  if (!boss) return null;

  return (
    <Layout>
      <Link
        to="/atelier"
        className="mb-6 inline-flex items-center text-sm font-medium text-solo-purple hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour à l'Atelier de la Lumière
      </Link>

      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{boss.nom}</h1>

        <Tabs defaultValue="facile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="facile">Facile</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="difficile">Difficile</TabsTrigger>
          </TabsList>

          <TabsContent value="facile">
            <Card className="bg-[#1e1e2e]">
              <CardHeader>
                <CardTitle className="text-white">
                  {boss.nom} (Facile)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <img
                  src={boss.image || ""}
                  alt={boss.nom}
                  className="w-full h-auto object-contain rounded"
                />
                <div className="space-y-4">
                  <p className="text-white">
                    Puissance requise : {boss.puissance_facile}
                  </p>
                  <div className="flex gap-2">
                    <img
                      src={boss.faiblesse1 || ""}
                      alt="faiblesse 1"
                      className="h-10 w-10"
                    />
                    <img
                      src={boss.faiblesse2 || ""}
                      alt="faiblesse 2"
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="normal">
            <Card className="bg-[#1e1e2e]">
              <CardHeader>
                <CardTitle className="text-white">
                  {boss.nom} (Normal)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <img
                  src={boss.image || ""}
                  alt={boss.nom}
                  className="w-full h-auto object-contain rounded"
                />
                <div className="space-y-4">
                  <p className="text-white">
                    Puissance requise : {boss.puissance_normal}
                  </p>
                  <div className="flex gap-2">
                    <img
                      src={boss.faiblesse1 || ""}
                      alt="faiblesse 1"
                      className="h-10 w-10"
                    />
                    <img
                      src={boss.faiblesse2 || ""}
                      alt="faiblesse 2"
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="difficile">
            <Card className="bg-[#1e1e2e]">
              <CardHeader>
                <CardTitle className="text-white">
                  {boss.nom} (Difficile)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-6">
                <img
                  src={boss.image || ""}
                  alt={boss.nom}
                  className="w-full h-auto object-contain rounded"
                />
                <div className="space-y-4">
                  <p className="text-white">
                    Puissance requise : {boss.puissance_difficile}
                  </p>
                  <div className="flex gap-2">
                    <img
                      src={boss.faiblesse1 || ""}
                      alt="faiblesse 1"
                      className="h-10 w-10"
                    />
                    <img
                      src={boss.faiblesse2 || ""}
                      alt="faiblesse 2"
                      className="h-10 w-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
