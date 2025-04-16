import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Atelier de la Lumière</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {bosses.map((boss) => (
            <div
              key={boss.id}
              onClick={() => navigate(`/atelier/${boss.nom}`)}
              className="bg-[#1e1e2e] rounded-xl shadow hover:scale-105 transition cursor-pointer p-4 text-center"
            >
              <img
                src={boss.image || ""}
                alt={boss.nom}
                className="w-full h-40 object-contain mx-auto mb-3"
              />
              <h2 className="text-lg font-semibold text-white">{boss.nom}</h2>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
