"use client";

import React from "react";
import { cn } from "@/ui/lib/utils";

interface DeckBackProps {
  title: string;
  subtitle?: string;
  isDimmedLights?: boolean;
  className?: string;
}

export const DeckBack = ({ title, subtitle, isDimmedLights, className }: DeckBackProps) => {
  return (
    <div className={cn(
      "relative bg-brand-brown rounded-[32px] shadow-2xl border-4 border-brand-tan/20 flex flex-col items-center justify-center p-10 overflow-hidden",
      isDimmedLights ? "aspect-3/2 w-full h-full" : "aspect-2/3 w-full h-full",
      className
    )}>
      {/* Decorative corner indices */}
      <div className="absolute top-6 left-6 flex flex-col items-center text-brand-cream/30">
        <span className="text-[10px] font-bold tracking-tighter mb-1 select-none">SANDY</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z"/>
        </svg>
      </div>

      <div className="absolute bottom-6 right-6 flex flex-col items-center text-brand-cream/30 rotate-180">
        <span className="text-[10px] font-bold tracking-tighter mb-1 select-none">SANDY</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z"/>
        </svg>
      </div>

      {/* Center Content: Deck Title */}
      <div className="relative z-10 text-center px-4">
        <div className="font-script text-8xl text-brand-cream/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none italic pointer-events-none">S</div>
        <h3 className="text-3xl md:text-4xl font-serif font-black text-brand-cream leading-tight mb-4 relative z-10 wrap-break-word">
          {title}
        </h3>
        {subtitle && (
          <div className="text-brand-tan font-bold text-xs uppercase tracking-[0.3em] relative z-10">
            {subtitle}
          </div>
        )}
      </div>
      
      {/* Bottom Left: Sandy Said So */}
      <div className="absolute bottom-10 left-10 flex flex-col items-start gap-1">
        <div className="h-px w-6 bg-brand-tan/30 rounded-full" />
        <p className="text-[9px] font-serif italic text-brand-tan font-bold tracking-[0.2em] uppercase">
          Sandy said so
        </p>
      </div>

      {/* Swipe Indicator Overlay (Subtle) */}
      <div className="absolute bottom-6 inset-x-0 flex flex-col items-center gap-1 opacity-20">
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-brand-cream animate-pulse" />
          <div className="w-1 h-1 rounded-full bg-brand-cream animate-pulse [animation-delay:200ms]" />
          <div className="w-1 h-1 rounded-full bg-brand-cream animate-pulse [animation-delay:400ms]" />
        </div>
        <span className="text-[8px] font-bold tracking-widest text-brand-cream uppercase">Swipe to begin</span>
      </div>
    </div>
  );
};
