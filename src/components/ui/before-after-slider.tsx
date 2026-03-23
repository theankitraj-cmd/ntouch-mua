"use client";

import { useState, useRef, useEffect } from "react";

export function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleInteractionStart = (clientX: number) => {
    setIsDragging(true);
    handleMove(clientX);
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[3/4] sm:aspect-square md:aspect-[4/5] max-w-lg mx-auto rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none bg-surface-elevated shadow-xl"
      onMouseDown={(e) => handleInteractionStart(e.clientX)}
      onMouseMove={handleMouseMove}
      onTouchStart={(e) => handleInteractionStart(e.touches[0].clientX)}
      onTouchMove={handleTouchMove}
    >
      {/* Background/After Image (Full Width) */}
      <div className="absolute inset-0 bg-zinc-900 w-full h-full">
        <img 
          src="https://images.unsplash.com/photo-1542452378-080ed7e18ca4?auto=format&fit=crop&q=80" 
          alt="After Makeup"
          className="w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body z-10 shadow-lg border border-white/10">Glam</div>
      </div>

      {/* Foreground/Before Image (Clipped) */}
      <div 
        className="absolute inset-0 bg-zinc-800 h-full w-full z-10"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&q=80" 
          alt="Before Makeup"
          className="w-full h-full object-cover pointer-events-none grayscale opacity-80"
          style={{ filter: "sepia(0.2) contrast(0.9)" }}
        />
        <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-white/90 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body shadow-lg border border-white/20">Bare</div>
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20"
        style={{ left: `calc(${sliderPosition}% - 2px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95">
          <div className="flex gap-1 sm:gap-1.5">
            <div className="w-0.5 h-3 sm:h-4 bg-zinc-400 rounded-full" />
            <div className="w-0.5 h-3 sm:h-4 bg-zinc-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
