import React, { useState, useEffect } from 'react';
import { setLogLevel, LogLevel } from '@/services/cacheImages/chargeurImages';
import 'material-icons/iconfont/material-icons.css';

/**
 * Panneau de configuration des niveaux de logs pour le système de cache d'images
 * Permet de contrôler la quantité de logs affichés dans la console
 */
const LogSettingsPanel = () => {
  const [currentLogLevel, setCurrentLogLevel] = useState<LogLevel>('minimal');
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Appliquer le niveau de log quand il change
  useEffect(() => {
    setLogLevel(currentLogLevel);
    // Sauvegarder le réglage dans le localStorage pour le conserver entre les sessions
    localStorage.setItem('logLevel', currentLogLevel);
  }, [currentLogLevel]);
  
  // Restaurer le niveau de log précédent au chargement
  useEffect(() => {
    const savedLogLevel = localStorage.getItem('logLevel') as LogLevel | null;
    if (savedLogLevel && ['none', 'minimal', 'verbose'].includes(savedLogLevel)) {
      setCurrentLogLevel(savedLogLevel as LogLevel);
    }
  }, []);
    // Fonction pour réinitialiser les statistiques
  const resetStats = () => {
    const imageWorker = getImageWorker();
    if (imageWorker) {
      imageWorker.postMessage({ type: 'resetStats' });
      console.log('🔄 Demande de réinitialisation des statistiques envoyée');
    }
  };

  // Fonction pour obtenir une instance du worker
  const getImageWorker = (): Worker | null => {
    // Vérifie si une instance du worker existe dans une variable globale
    // Sinon, renvoie null (évite de créer un worker qui ne serait pas géré correctement)
    // @ts-ignore - Accès à une propriété potentiellement globale
    return window.__imageWorker || null;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Bouton d'expansion */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg flex items-center justify-center"
        title="Réglages des logs"
      >
        <span className="material-icons text-lg">
          {isExpanded ? 'close' : 'settings'}
        </span>
      </button>
      
      {/* Panneau de configuration */}
      {isExpanded && (
        <div className="absolute bottom-12 right-0 bg-gray-800 p-4 rounded-lg shadow-xl w-64">
          <h3 className="text-white font-medium mb-2">Niveau des logs</h3>
          
          <div className="space-y-2">
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                name="logLevel"
                checked={currentLogLevel === 'none'}
                onChange={() => setCurrentLogLevel('none')}
                className="mr-2"
              />
              <span>Aucun log</span>
            </label>
            
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                name="logLevel"
                checked={currentLogLevel === 'minimal'}
                onChange={() => setCurrentLogLevel('minimal')}
                className="mr-2"
              />
              <span>Minimal (statistiques)</span>
            </label>
            
            <label className="flex items-center text-white cursor-pointer">
              <input
                type="radio"
                name="logLevel"
                checked={currentLogLevel === 'verbose'}
                onChange={() => setCurrentLogLevel('verbose')}
                className="mr-2"
              />
              <span>Détaillé (développement)</span>
            </label>
          </div>
          
          {/* Bouton de réinitialisation des statistiques */}
          <div className="mt-4 pt-3 border-t border-gray-700">
            <button
              onClick={resetStats}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm flex items-center justify-center"
            >
              <span className="material-icons text-sm mr-1">refresh</span>
              Réinitialiser les statistiques
            </button>
          </div>
          
          <p className="text-gray-400 text-xs mt-4">
            Contrôle les messages affichés dans la console du navigateur.
          </p>
        </div>
      )}
    </div>
  );
};

export default LogSettingsPanel;
