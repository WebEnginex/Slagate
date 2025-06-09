import React from 'react';
import { Image } from '@/components/ui/Image';

/**
 * Démo d'utilisation du composant Image avec différentes configurations
 * Ce composant peut être intégré dans n'importe quelle page pour montrer les différentes options
 */
export function ImageDemo() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Démo des effets de chargement d'image</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Image avec skeleton et shimmer (par défaut) */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Skeleton + Shimmer</h3>
          <div className="aspect-square relative overflow-hidden rounded-md">
            <Image
              src="/public/images/logo/Sohoven_Logo.webp"
              alt="Logo avec skeleton et shimmer"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Effet de chargement avec skeleton et animation shimmer (par défaut)
          </p>
        </div>

        {/* Image avec skeleton uniquement */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Skeleton uniquement</h3>
          <div className="aspect-square relative overflow-hidden rounded-md">
            <Image
              src="/public/images/logo/Sohoven_Logo.webp"
              alt="Logo avec skeleton uniquement"
              shimmer={false}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Effet de chargement avec skeleton sans animation
          </p>
        </div>

        {/* Image avec blur-in */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Effet de flou</h3>
          <div className="aspect-square relative overflow-hidden rounded-md">
            <Image
              src="/public/images/logo/Sohoven_Logo.webp"
              alt="Logo avec effet de flou"
              blur={true}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Effet de flou qui s'estompe lors du chargement complet
          </p>
        </div>
      </div>
    </div>
  );
}
