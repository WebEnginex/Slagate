import React from "react";
import SideNav from "@/components/SideNav";

const Prochainement = () => {
  return (
    <div className="flex">
      <SideNav isMobileOpen={false} setIsMobileOpen={() => {}} />
      <div className="flex-1 flex items-center justify-center h-screen bg-sidebar text-white">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Contenu prochainement disponible</h1>
          <p className="text-gray-400">
            Cette page est en cours de développement. Revenez bientôt pour plus de contenu !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Prochainement;