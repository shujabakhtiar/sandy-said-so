"use client";

import { useState } from "react";
import { gameCardsResource } from "@/ui/resources/game-cards.resource";
import { sandyToast } from "@/ui/lib/sandy-toast";

interface DeckCardEditProps {
  card: any;
  onUpdate: (updatedCard: any) => void;
  onClose: () => void;
}

export const DeckCardEdit = ({ card, onUpdate, onClose }: DeckCardEditProps) => {
  const [newCardText, setNewCardText] = useState(card.ruleText);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpdateCard = async () => {
    setIsProcessing(true);
    try {
      await gameCardsResource.update(card.id, { ruleText: newCardText });
      onUpdate({ ...card, ruleText: newCardText });
      sandyToast.success("Fixed your card, darling.");
      onClose();
    } catch (err: any) {
      const errorMessage = err.message || "Sorry honey, something went wrong.";
      sandyToast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative group animate-in zoom-in-95 duration-300 w-full max-w-md">
        <div className="bg-[#faf9f6] border-2 border-brand-tan/20 rounded-[24px] shadow-espresso relative overflow-hidden flex flex-col p-8 md:p-10 aspect-2/3">
          
          {/* Top Action Buttons */}
          <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-4 md:gap-6 items-center z-30">
            <button 
              className="text-xs md:text-sm font-bold text-brand-red hover:opacity-70 transition-all uppercase tracking-widest"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className="text-xs md:text-sm font-bold text-emerald-600 hover:opacity-70 transition-all uppercase tracking-widest disabled:opacity-50"
              onClick={handleUpdateCard}
              disabled={isProcessing}
            >
              {isProcessing ? "Saving..." : "Save"}
            </button>
          </div>

          {/* Top Logo */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 opacity-80">
            <div className="flex items-baseline gap-1 text-brand-red">
              <span className="font-serif text-xs md:text-sm tracking-tight font-bold">
                Sandy
              </span>
              <span className="font-script text-base md:text-lg font-normal">
                said so.
              </span>
            </div>
          </div>

          {/* Card Header */}
          <div className="text-center mt-12 md:mt-16 mb-4 md:mb-8">
            <h3 className="text-2xl md:text-4xl font-serif font-black italic leading-none underline decoration-offset-4 text-brand-red underline-brand-red/20">
              Sandy says...
            </h3>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col items-start justify-center px-4 md:px-6 relative">
            <textarea
              autoFocus
              value={newCardText}
              onChange={(e) => setNewCardText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") onClose();
              }}
              className="w-full h-full bg-transparent border-none focus:ring-0 outline-none text-xl md:text-3xl font-serif font-black text-left leading-relaxed text-brand-brown resize-none z-10 scrollbar-hide"
              placeholder="What's the rule?"
            />
          </div>

          {/* Bottom Decoration */}
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between pointer-events-none">
            <div className="flex flex-col items-start gap-1">
              <div className="h-px w-6 md:w-8 rounded-full bg-brand-red/30" />
              <p className="text-[8px] md:text-[10px] font-serif italic font-bold text-brand-red tracking-[0.2em] uppercase">
                Drink if you dare
              </p>
            </div>
            
            <div className="opacity-80">
              <div className="flex items-baseline gap-1 text-brand-red rotate-180">
                <span className="font-serif text-xs md:text-sm tracking-tight font-bold">
                  Sandy
                </span>
                <span className="font-script text-base md:text-lg font-normal">
                  said so.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
