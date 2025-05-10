import React from "react";
import { useNavigate } from "react-router-dom";

const bosses = [
  {
    id: "ennio",
    name: "Ennio",
    image: "https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/boss//WorldBoss_Ennio_Portrait.webp",
  },
  // Ajoutez d'autres boss ici si nécessaire
];

const Boss = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Guides des Boss</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bosses.map((boss) => (
          <div
            key={boss.id}
            className="bg-sidebar border border-sidebar-border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/guides/boss/${boss.id}`)} // Redirection vers la page du boss
          >
            <img
              src={boss.image}
              alt={boss.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white text-center">{boss.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boss;