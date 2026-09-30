import React, { useEffect, useState } from 'react';
import { BaristaStory } from '../types';
import { LOGO_URL, CAFE_INFO } from '../data/coffeeData';
import { X, ChevronLeft, ChevronRight, Volume2, Sparkles } from 'lucide-react';

interface StoryModalProps {
  stories: BaristaStory[];
  initialIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onOrderSpecial?: (storyTitle: string) => void;
}

export const StoryModal: React.FC<StoryModalProps> = ({
  stories,
  initialIndex,
  isOpen,
  onClose,
  onOrderSpecial
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setCurrentIndex(initialIndex);
    setProgress(0);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (!isOpen || isPaused) return;

    const interval = 50; // update every 50ms
    const totalDuration = (stories[currentIndex]?.duration || 5) * 1000;
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentIndex < stories.length - 1) {
            setCurrentIndex((idx) => idx + 1);
            return 0;
          } else {
            onClose();
            return 100;
          }
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isOpen, currentIndex, isPaused, stories, onClose]);

  if (!isOpen) return null;

  const currentStory = stories[currentIndex];
  if (!currentStory) return null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 select-none"
      onClick={handleNext}
    >
      <div 
        className="relative w-full max-w-sm h-full sm:h-[680px] bg-[#151312] sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between border border-[#342d2a]/60"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={currentStory.imageUrl} 
            alt={currentStory.title} 
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#100e0d] via-transparent to-black/60" />
        </div>

        {/* Top Header & Progress Bars */}
        <div className="relative z-20 p-4 pt-6 space-y-3">
          {/* Progress Indicators */}
          <div className="flex gap-1.5 w-full">
            {stories.map((story, idx) => (
              <div key={story.id} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#f8bb78] transition-all duration-75"
                  style={{
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                  }}
                />
              </div>
            ))}
          </div>

          {/* Author Meta & Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img 
                src={LOGO_URL} 
                alt="Logo" 
                className="w-9 h-9 rounded-full ring-2 ring-[#d49b5b] object-cover bg-black"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white tracking-wide">{CAFE_INFO.name}</span>
                <span className="text-[11px] text-[#f8bb78] font-medium tracking-wider uppercase">Dhanmondi Barista Live</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button 
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-8 h-8 rounded-full bg-black/40 text-white/90 hover:text-white flex items-center justify-center hover:bg-black/60 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Center Tap Area Navigation */}
        <div className="relative z-10 flex-1 flex">
          <div className="w-1/3 h-full cursor-pointer" onClick={handlePrev} />
          <div className="w-2/3 h-full cursor-pointer" onClick={handleNext} />
        </div>

        {/* Bottom Caption & Interactive Order */}
        <div className="relative z-20 p-5 pb-8 space-y-3 bg-gradient-to-t from-[#100e0d] via-[#100e0d]/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#d49b5b]/90 text-[#100e0d] text-xs font-bold uppercase tracking-wider">
              {currentStory.badge}
            </span>
            <span className="text-xs text-[#d5c4b4] tracking-wide">{currentStory.subtitle}</span>
          </div>

          <h3 className="text-2xl font-serif text-white tracking-tight leading-tight">
            {currentStory.title}
          </h3>

          <p className="text-sm text-[#e8e1df] leading-relaxed font-sans">
            {currentStory.caption}
          </p>

          <div className="pt-2 flex items-center gap-2">
            <button 
              onClick={() => {
                if (onOrderSpecial) onOrderSpecial(currentStory.title);
                onClose();
              }}
              className="flex-1 py-3 px-4 rounded-xl bg-[#d49b5b] hover:bg-[#f8bb78] text-[#482900] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore This Brew</span>
            </button>
            <button 
              onClick={handleNext}
              className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              title="Next Story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
