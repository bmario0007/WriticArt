import React from 'react';
import { InstagramGallery } from '../components/InstagramGallery';
import type { GalleryItem } from '../types';
import { useNavigation } from '../context/NavigationContext';

interface GalleryPageProps {
  onSelectArtPiece: (item: GalleryItem) => void;
  onOpenStory: (storyIndex: number) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onSelectArtPiece,
  onOpenStory
}) => {
  const { navigateTo } = useNavigation();

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs text-[#8C8074]">
        <button onClick={() => navigateTo('home')} className="hover:underline">Accueil</button>
        <span>/</span>
        <span className="font-semibold text-[#181716] dark:text-[#FAF8F5]">Galerie & Feed Instagram</span>
      </div>

      <InstagramGallery
        onSelectArtPiece={onSelectArtPiece}
        onOpenStory={onOpenStory}
      />

    </div>
  );
};
