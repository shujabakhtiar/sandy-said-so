"use client";

import { cn } from "@/ui/lib/utils";
import { DeckEditTitle } from "@/ui/components/features/decks/DeckEditTitle";

interface DeckCoverProps {
  deck: any;
  onClick: () => void;
  onUpdate?: () => void;
}

export const DeckCover = ({ deck, onClick, onUpdate }: DeckCoverProps) => {
  const isChaos = deck.gameMode?.name?.toLowerCase().includes("chaos");

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      {/* Subtle 3D Depth Layer */}
      <div className="absolute inset-0 bg-brand-brown/5 rounded-[24px] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-500 ease-out" />

      {/* The Deck Card */}
      <div className="relative aspect-[3/4.2] bg-white border border-brand-tan/10 rounded-[24px] shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden flex flex-col">

        {/* Header: Consistent Height & Clean Gradient */}
        <div className={cn(
          "h-36 w-full relative overflow-hidden flex flex-col items-center justify-center",
          isChaos
            ? "bg-linear-to-b from-brand-red to-[#811331]"
            : "bg-linear-to-b from-brand-brown to-brand-text"
        )}>
          {/* Subdued Decorative Gloss */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-30" />

          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
              </svg>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
              {deck.gameMode?.name ? deck.gameMode.name : (isChaos ? "CHAOS MODE" : "SANDY'S CONFESSION")}
            </span>
          </div>
        </div>

        {/* Content Section: Left Aligned as per image */}
        <div className="flex-1 p-8 flex flex-col relative">
          <div className="flex-1 flex flex-col justify-start pt-2">
            <h3 className="text-3xl font-serif font-black text-brand-brown tracking-tight leading-none mb-4 group-hover:text-brand-red transition-colors duration-300">
              {deck.title || "New Deck"}
            </h3>
          </div>

          {/* Footer: Stats & Brand Mark */}
          <div className="mt-auto flex items-end justify-between border-t border-brand-tan/10 pt-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-widest text-brand-tan mb-1">Total Cards</span>
              <span className="text-4xl font-serif font-black text-brand-brown leading-none">
                {deck._count?.gameCards || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Rename Anchor Tool */}
        <div className="absolute top-4 right-4 z-20">
             <DeckEditTitle deck={deck} onUpdate={onUpdate} />
        </div>
      </div>
    </div>
  );
};