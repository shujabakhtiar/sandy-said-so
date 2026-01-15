"use client";

import { useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";

interface DeckEditTitleProps {
  deck: any;
  onUpdate?: () => void;
}

export const DeckEditTitle = ({ deck, onUpdate }: DeckEditTitleProps) => {
  const [newTitle, setNewTitle] = useState(deck.title || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [open, setOpen] = useState(false);

  // Sync state with prop if deck changes (optional, but good practice if deck prop updates)
  // useEffect(() => {
  //   setNewTitle(deck.title || "");
  // }, [deck.title]); 
  // Commented out to avoid overwriting user input if re-render happens during edit, 
  // but usually deck prop shouldn't change while modal is open.

  const handleUpdateTitle = async () => {
    setIsUpdating(true);
    try {
      await gameDecksResource.update(deck.id, { title: newTitle });
      if (onUpdate) {
        onUpdate();
      }
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const EditTrigger = (
    <button
      className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto"
      onClick={(e) => {
         // The Modal wrapper also handles onClick to open, but we need to stop bubbling
         // so it doesn't navigate to the deck page which is handled by the parent card click.
         // However, the Modal trigger wrapper does not stop propagation by default.
         // Wait, the Modal component wraps the trigger in a div that sets open=true.
         // If I rely on that, I can't easily stop propagation there without passing props to Modal trigger.
         // But the `onClick` here on the button inside the trigger will fire.
         // Actually, if I just don't put onClick here, the Modal wrapper will catch it.
         // But I need stopPropagation.
         // The Modal trigger wrapper is: <div onClick={() => setOpen(true)} className="inline-block">
         // If I click this button, the event bubbles to that div, executes setOpen, then bubbles further to the Deck Card which navigates.
         // I need to stop bubbling.
         e.stopPropagation();
         // But if I stop propagation here, does the Modal wrapper see it?
         // React events bubble. If I stop propagation, the Modal's wrapper onClick might not fire depending on how it's attached?
         // No, if I stop propagation, the parent div onClick WON'T fire.
         // So I must handle opening myself?
         // Or I can just set open(true) here and rely on controlled state.
         setOpen(true);
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    </button>
  );

  return (
    <Modal
      trigger={EditTrigger}
      open={open}
      onOpenChange={setOpen}
      title="Change the secret."
      description="Sandy is listening..."
      size="md"
    >
      <div className="mb-8">
        <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
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
  );
};
