import React, { useState } from "react";
import { resetAllCaches, syncCacheStatus } from "@/services/cacheImages";
import "./CacheDebugPanel.css";

interface CacheDebugPanelProps {
  cacheAvailable: boolean;
  setCacheAvailable: (isAvailable: boolean) => void;
  resetImagesCallback?: () => Promise<void>;
}

/**
 * Panneau de débogage pour le système de cache IndexedDB
 * Ce composant est conçu pour être affiché uniquement en développement
 * Permet de réinitialiser, synchroniser et voir les statistiques du cache
 * Peut être ouvert/fermé et s'affiche en haut à droite
 */
const CacheDebugPanel: React.FC<CacheDebugPanelProps> = ({
  cacheAvailable,
  setCacheAvailable,
  resetImagesCallback,
}) => {
  // État pour suivre si le panneau est ouvert ou fermé
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  // Fonction pour réinitialiser le cache IndexedDB
  const resetCache = async () => {
    try {
      console.log("🔄 Tentative de réinitialisation du cache...");

      // Utiliser notre utilitaire centralisé
      const success = await resetAllCaches();

      if (success) {
        console.log("✅ Cache réinitialisé avec succès");
        setCacheAvailable(true);

        // Si un callback de réinitialisation d'images est fourni, l'exécuter
        if (resetImagesCallback) {
          await resetImagesCallback();
        }
      } else {
        console.error("❌ Échec de la réinitialisation du cache");
        setCacheAvailable(false);
      }
    } catch (error) {
      console.error("❌ Erreur lors de la réinitialisation:", error);
      localStorage.setItem("indexedDBFailed", "true");
      setCacheAvailable(false);
    }
  };
  return (
    <>
      {/* Bouton flottant pour ouvrir/fermer le panneau */}
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className={`fixed top-4 right-4 z-50 flex items-center justify-center w-10 h-10 rounded-full shadow-lg ${
          isPanelOpen 
            ? "bg-red-600 hover:bg-red-700" 
            : `${cacheAvailable ? "bg-purple-600 hover:bg-purple-700" : "bg-red-600 hover:bg-red-700"}`
        }`}
        title={isPanelOpen ? "Fermer le panneau de débogage" : "Ouvrir le panneau de débogage"}
      >
        {isPanelOpen ? "✕" : "🛠️"}
      </button>
      
      {/* Panneau de débogage qui s'affiche conditionnellement */}
      {isPanelOpen && (
        <div className="fixed top-16 right-4 z-40 flex flex-col space-y-2 bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-700 max-w-xs animate-fade-in">
          <div className="text-sm font-bold text-violet-400 mb-2 text-center">
            Outils de débogage
          </div>
          <button
            onClick={resetCache}
            className={`${
              cacheAvailable
                ? "bg-purple-600 hover:bg-purple-700"
                : "bg-red-600 hover:bg-red-700"
            } text-white px-4 py-2 rounded-lg shadow flex items-center justify-center mb-2`}
          >
            <span className="mr-2">{cacheAvailable ? "🔄" : "🔧"}</span>
            {cacheAvailable ? "Réinitialiser le cache" : "Réparer le cache"}
          </button>
          <div className="flex space-x-2 mb-2">            <button
              onClick={() => {
                // Afficher les statistiques locales
                import("@/services/cacheImages").then((module) => {
                  module.displayCacheStats();
                });                // Afficher les statistiques détaillées depuis le worker
                const worker = new Worker(
                  new URL("../../workers/BuildWorker.ts", import.meta.url)
                );
                worker.postMessage({ type: "debugCache" });

                worker.onmessage = (event) => {
                  if (event.data.type === "debugCache") {
                    console.group("📊 Statistiques détaillées du cache");
                    if (event.data.stats) {
                      console.table(event.data.stats);
                      if (
                        event.data.stats.keys &&
                        event.data.stats.keys.length
                      ) {
                        console.log(
                          "🔑 Échantillon de clés:",
                          event.data.stats.keys
                        );
                      }
                    } else if (event.data.error) {
                      console.error("❌ Erreur:", event.data.error);
                    }
                    console.groupEnd();
                  }
                  worker.terminate();
                };
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg shadow flex items-center justify-center flex-1"
            >
              <span className="mr-1">📊</span>
              Statistiques
            </button>

            <button
              onClick={async () => {
                console.log("🔄 Synchronisation du cache...");
                const wasSynced = await syncCacheStatus();
                setCacheAvailable(
                  localStorage.getItem("indexedDBFailed") !== "true"
                );
                console.log(
                  wasSynced
                    ? "✅ Cache synchronisé - état corrigé"
                    : "ℹ️ Cache déjà synchronisé"
                );
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-2 rounded-lg shadow flex items-center justify-center flex-1"
            >
              <span className="mr-1">🔄</span>
              Synchroniser
            </button>
          </div>
          <div
            className={`text-xs ${
              cacheAvailable ? "text-green-400" : "text-red-400"
            } text-center font-semibold mt-2 p-1 rounded ${
              cacheAvailable ? "bg-green-900/20" : "bg-red-900/20"
            }`}
          >
            Cache IndexedDB: {cacheAvailable ? "Actif ✓" : "Désactivé ✗"}
          </div>
        </div>
      )}
    </>
  );
};

export default CacheDebugPanel;
