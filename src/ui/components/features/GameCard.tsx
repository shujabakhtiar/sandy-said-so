import React from "react";
import { cn } from "@/ui/lib/utils";
import { formatCardText } from "@/ui/lib/text-utils";

interface GameCardProps {
  card: {
    id: number;
    ruleText: string;
    isDraft?: boolean;
    photo?: {
      url: string;
    };
    cardType?: string;
  };
  gameType?: string;
  onEdit?: (card: any) => void;
  onDelete?: (card: any) => void;
  onPromote?: (card: any) => void;
  showStatusBadge?: boolean;
}

export const GameCard = ({ card, gameType = "standard", onEdit, onDelete, onPromote, showStatusBadge }: GameCardProps) => {
  // We can add more layouts here based on gameType
  if (gameType === "standard") {
    const isChaos = (card as any).isChaos;

    return (
      <div 
        className={cn(
          "aspect-2/3 rounded-[24px] shadow-2xl border relative overflow-hidden group hover:scale-[1.05] hover:-rotate-1 transition-all duration-500 cursor-default flex flex-col p-6",
          isChaos 
            ? "bg-[#811331] border-white/20 shadow-[#811331]/30" 
            : "bg-[#faf9f6] border-brand-tan/20",
          card.isDraft && "opacity-90"
        )}
      >
        {/* Draft Suggestion Badge */}
        {showStatusBadge && card.isDraft && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none z-0">
            <div className="border-4 border-brand-red/10 px-6 py-2 rounded-xl">
              <span className="text-4xl font-serif font-black text-brand-red/5 uppercase tracking-tighter">
                Draft suggestion
              </span>
            </div>
          </div>
        )}
        
        {/* Chaos Glow Effect */}
        {isChaos && (
          <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
        )}

        {/* Corner Indicators - Top Left */}
        <div 
          className={cn(
            "absolute top-4 left-4 flex flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity",
            isChaos ? "text-white" : "text-brand-red"
          )}
        >
          <span className="text-[10px] font-bold tracking-tighter mb-1 uppercase">
            {isChaos ? "CHAOS" : "SANDY"}
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
          </svg>
        </div>

        {/* Card Header */}
        <div className="text-center mt-6 mb-4 shrink-0">
          <h3 
            className={cn(
              "text-2xl font-serif font-black italic leading-none underline decoration-offset-4",
              isChaos 
                ? "text-white underline-white/40" 
                : "text-brand-red underline-brand-red/20"
            )}
          >
            {isChaos ? "SANDY'S CHAOS" : "Sandy says..."}
          </h3>
        </div>

        {/* Main Card Graphic / Content Area */}
        <div className="flex-1 flex flex-col items-start justify-center px-8 pb-12 pt-4 relative overflow-y-auto scrollbar-hide">
          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
            <svg width="100%" height="auto" viewBox="0 0 24 24" fill="currentColor" className={isChaos ? "text-white" : "text-brand-brown"}>
              <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
            </svg>
          </div>

          <div 
            className={cn(
              "text-sm md:text-lg font-serif font-bold text-left leading-relaxed relative z-10 w-full",
              isChaos ? "text-white" : "text-brand-brown"
            )}
          >
            {formatCardText(card.ruleText, isChaos)}
          </div>
        </div>

        {/* Bottom Decoration & Actions Layer */}
        <div className="absolute bottom-5 left-8 right-6 flex items-end justify-between pointer-events-none z-10">
          <div className="flex flex-col items-start gap-1">
            <div className={cn("h-px w-6 rounded-full", isChaos ? "bg-white/50" : "bg-brand-red/30")} />
            <p 
              className={cn(
                "text-[9px] font-serif italic font-bold animate-pulse tracking-[0.2em] uppercase",
                isChaos ? "text-white/80" : "text-brand-red"
              )}
            >
              Drink if you dare
            </p>
          </div>

          <div 
            className={cn(
              "flex flex-col items-center opacity-80 group-hover:opacity-100 transition-opacity rotate-180",
              isChaos ? "text-white" : "text-brand-red"
            )}
          >
            <span className="text-[10px] font-bold tracking-tighter mb-1 uppercase">
              {isChaos ? "CHAOS" : "SANDY"}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
            </svg>
          </div>
        </div>

        {/* Card Actions (Hover Overlay) */}
        {(onEdit || onDelete || onPromote) && !isChaos && (
          <div className="absolute inset-0 bg-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 z-20 backdrop-blur-[1px] pointer-events-auto">
            {onPromote && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPromote(card);
                }}
                className="p-4 bg-white rounded-full text-emerald-600 shadow-xl hover:bg-emerald-600 hover:text-white transition-all transform hover:scale-110"
                title="Add to Deck"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            )}
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(card);
                }}
                className="p-4 bg-white rounded-full text-brand-brown shadow-xl hover:bg-brand-brown hover:text-white transition-all transform hover:scale-110"
                title="Edit Card"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(card);
                }}
                className="p-4 bg-white rounded-full text-brand-red shadow-xl hover:bg-brand-red hover:text-white transition-all transform hover:scale-110"
                title="Delete Card"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Fallback or other layouts can be added here
  return null;
};
