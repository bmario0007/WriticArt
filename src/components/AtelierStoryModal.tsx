import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { instagramStories } from '../data/galleryData';
import { atelierAudio } from '../utils/soundEffects';
import { InstagramIcon } from './InstagramIcon';

interface AtelierStoryModalProps {
  initialIndex: number;
  onClose: () => void;
  onConfigureFromStory: () => void;
}

export const AtelierStoryModal: React.FC<AtelierStoryModalProps> = ({
  initialIndex,
  onClose,
  onConfigureFromStory
}) => {
  const [index, setIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const story = instagramStories[index];

  useEffect(() => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (index < instagramStories.length - 1) {
            setIndex((i) => i + 1);
            atelierAudio.playPaperSlide();
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [index, onClose]);

  const handlePrev = () => {
    if (index > 0) {
      atelierAudio.playPaperSlide();
      setIndex(index - 1);
      setProgress(0);
    }
  };

  const handleNext = () => {
    if (index < instagramStories.length - 1) {
      atelierAudio.playPaperSlide();
      setIndex(index + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-30 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Nav Chevrons */}
      <button
        onClick={handlePrev}
        disabled={index === 0}
        className="hidden md:flex absolute left-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white disabled:opacity-20 transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-8 z-30 p-3 rounded-full bg-white/10 hover:bg-white/30 text-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Story Container (Phone ratio) */}
      <div className="relative w-full max-w-[390px] h-[680px] rounded-3xl overflow-hidden shadow-2xl bg-[#141312] border border-white/10 flex flex-col justify-between">
        
        {/* Progress bars */}
        <div className="absolute top-3 inset-x-3 z-20 flex space-x-1.5">
          {instagramStories.map((_, i) => (
            <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100 ease-linear"
                style={{
                  width: i < index ? '100%' : i === index ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="relative z-20 pt-8 px-4 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2.5">
            <img
              src={story.avatar}
              alt={story.title}
              className="w-9 h-9 rounded-full object-cover border-2 border-white/60"
            />
            <div>
              <span className="block text-xs font-semibold tracking-wide">
                @{story.author}
              </span>
              <span className="block text-[10px] text-white/70">
                {story.title} • {story.time}
              </span>
            </div>
          </div>

          <a
            href="https://www.instagram.com/writicart"
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-full bg-white/15 text-white hover:bg-white hover:text-black transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
        </div>

        {/* Story Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
        </div>

        {/* Story Caption & Action */}
        <div className="relative z-20 p-6 space-y-4 text-white">
          <p className="text-sm font-sans leading-relaxed text-white/95 bg-black/40 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            {story.caption}
          </p>

          <button
            onClick={() => {
              onClose();
              onConfigureFromStory();
            }}
            className="w-full py-3.5 rounded-full bg-[#C5A059] text-[#181716] text-xs font-['Cinzel'] font-bold uppercase tracking-wider hover:bg-white transition-all shadow-lg"
          >
            Créer ma pièce personnalisée
          </button>
        </div>

      </div>

    </div>
  );
};
