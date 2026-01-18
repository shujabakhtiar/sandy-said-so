"use client";

import { useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { sandyToast } from "@/ui/lib/sandy-toast";

interface DeckEditTitleProps {
  deck: any;
  onUpdate?: () => void;
  trigger?: React.ReactNode;
}

export const DeckEditTitle = ({ deck, onUpdate, trigger }: DeckEditTitleProps) => {
  const [newTitle, setNewTitle] = useState(deck.title || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  const handleUpdateTitle = async () => {
    setIsUpdating(true);
    try {
      await gameDecksResource.update(deck.id, { title: newTitle });
      sandyToast.success("Title updated.", "Sandy changed your deck's name.");
      if (onUpdate) {
        onUpdate();
      }
      setOpen(false);
    } catch (err: any) {
      sandyToast.error(err.message || "Sandy's ink ran out. Try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const defaultTrigger = (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        setOpen(true);
      }}
      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto cursor-pointer"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    </div>
  );

  return (
    <>
      {trigger ? (
        <div 
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }} 
          className="inline-block cursor-pointer"
        >
          {trigger}
        </div>
      ) : defaultTrigger}

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="Change the secret."
        description="Sandy is listening..."
        size="md"
      >
        <div className="mb-8 mt-2">
          <label className="block text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-4 ml-1">
            Deck Title
          </label>
          <input
            type="text"
            autoFocus
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleUpdateTitle();
              if (e.key === "Escape") setOpen(false);
            }}
            className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all"
            placeholder="New deck..."
          />
        </div>

        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="lg"
            className="flex-1 shadow-md"
            disabled={isUpdating}
            onClick={handleUpdateTitle}
          >
            {isUpdating ? "Saving..." : "Save Title"}
          </Button>
        </div>
      </Modal>
    </>
  );
};
