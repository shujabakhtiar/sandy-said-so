import React from "react";
import { cn } from "@/ui/lib/utils";
import { formatCardText } from "@/ui/lib/text-utils";

interface DLGameCardProps {
  card: {
    id: number;
    ruleText: string;
    isDraft?: boolean;
    photo?: {
      url: string;
    };
    cardType?: string;
    targetPerson?: string;
  };
}

const PHASE_NAMES: Record<string, string> = {
  PHASE_0: "Backstory",
  PHASE_1: "Opening Moment",
  PHASE_2: "Inside the Space",
  PHASE_3: "Almost",
  PHASE_4: "Tension",
  PHASE_5: "Permission"
};

export const DLGameCard = ({ card }: DLGameCardProps) => {
  const isChaos = (card as any).isChaos;

  return (
    <div 
      className={cn(
        "aspect-3/2 rounded-[24px] shadow-2xl border relative overflow-hidden group hover:scale-[1.02] transition-all duration-500 cursor-default flex flex-col p-8",
        isChaos 
          ? "bg-[#811331] border-white/20 shadow-[#811331]/30" 
          : "bg-[#faf9f6] border-brand-tan/20",
        card.isDraft && "opacity-90"
      )}
    >
      {/* Background Droplet Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <svg width="60%" height="auto" viewBox="0 0 24 24" fill="currentColor" className={isChaos ? "text-white" : "text-brand-brown"}>
          <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
        </svg>
      </div>

      {/* Decorative Corners - Top Left */}
      <div className={cn(
        "absolute top-6 left-8 flex items-center gap-2",
        isChaos ? "text-white/60" : "text-brand-red/60"
      )}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
        </svg>
        <span className="text-[10px] font-black tracking-widest uppercase">SANDY</span>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-center items-center text-center relative z-10">
        {/* Phase Indicator - Handwritten version */}
        {card.cardType && (
          <div className={cn(
            "mb-1 font-script text-xl -rotate-2",
            isChaos ? "text-white/70" : "text-brand-red/60"
          )}>
            {PHASE_NAMES[card.cardType] || card.cardType.replace("_", " ")}
          </div>
        )}

        <div 
          className={cn(
            "text-lg md:text-xl font-serif font-bold leading-relaxed max-w-[85%]",
            isChaos ? "text-white" : "text-brand-brown"
          )}
        >
          {formatCardText(card.ruleText, isChaos)}
        </div>
      </div>

      {/* Bottom Bar - Unified row for Edition, Target, and Sandy index */}
      <div className="absolute bottom-6 left-8 right-8 flex items-end justify-between z-10">
        <div className="flex flex-col items-start gap-1">
          <div className={cn("h-px w-8", isChaos ? "bg-white/30" : "bg-brand-red/20")} />
          <p className={cn(
            "text-[9px] font-serif italic font-bold tracking-[0.2em] uppercase",
            isChaos ? "text-white/60" : "text-brand-red/60"
          )}>
            Dimmed Lights Edition
          </p>
        </div>

        {card.targetPerson && (
          <div className={cn(
            "absolute left-1/2 -translate-x-1/2 font-script text-3xl mb-[-6px] whitespace-nowrap",
            isChaos ? "text-white/80" : "text-brand-red/80"
          )}>
            For: {card.targetPerson}
          </div>
        )}

        <div className={cn(
          "flex items-center gap-2 rotate-180 opacity-60",
          isChaos ? "text-white" : "text-brand-red"
        )}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
          </svg>
          <span className="text-[10px] font-black tracking-widest uppercase">SANDY</span>
        </div>
      </div>
    </div>
  );
};
