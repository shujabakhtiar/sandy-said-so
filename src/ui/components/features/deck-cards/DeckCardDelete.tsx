"use client";

import { useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { gameCardsResource } from "@/ui/resources/game-cards.resource";
import { sandyToast } from "@/ui/lib/sandy-toast";
import { cn } from "@/ui/lib/utils";

interface DeckCardDeleteProps {
  card: any;
  activeTab: "live" | "drafts";
  onDelete: (cardId: number) => void;
  onClose: () => void;
}

export const DeckCardDelete = ({ card, activeTab, onDelete, onClose }: DeckCardDeleteProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeleteCard = async () => {
    setIsProcessing(true);
    try {
      await gameCardsResource.delete(card.id);
      onDelete(card.id);
      sandyToast.success(
        activeTab === "live" 
          ? "Sandy hid that secret in her notebook. It's safe... for now." 
          : "Sandy burned that page. It's gone forever."
      );
      onClose();
    } catch (err: any) {
      sandyToast.error("Sandy is still holding onto that card. Remind her in a minute.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative shadow-espresso animate-in zoom-in-95 duration-300 text-center">
        <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-brown mb-4">
          {activeTab === "live" ? "Move to drafts?" : "Permanently remove?"}
        </h2>
        <p className="text-brand-text-muted mb-10 italic">
          {activeTab === "live" 
            ? "This card will be moved to your drafts. Sandy will remember it, but it won't appear in games."
            : "This draft will be permanently removed from Sandy's notebook."}
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="lg" className="flex-1" onClick={onClose}>
            No, Keep it
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            className={cn(
              "flex-1 border-none hover:opacity-90",
              activeTab === "live" ? "bg-brand-brown" : "bg-brand-red"
            )} 
            onClick={handleDeleteCard}
            disabled={isProcessing}
          >
            {isProcessing ? "Processing..." : activeTab === "live" ? "Move to Draft" : "Remove forever"}
          </Button>
        </div>
      </div>
    </div>
  );
};
