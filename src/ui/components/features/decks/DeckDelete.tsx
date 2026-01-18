"use client";

import { useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { sandyToast } from "@/ui/lib/sandy-toast";
import { useRouter } from "next/navigation";

interface DeckDeleteProps {
  deck: any;
  trigger?: React.ReactNode;
}

export const DeckDelete = ({ deck, trigger }: DeckDeleteProps) => {
  const [open, setOpen] = useState(false);
  const [confirmDeckName, setConfirmDeckName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  const handleDeleteDeck = async () => {
    if (confirmDeckName !== deck.title) return;
    
    setIsProcessing(true);
    try {
      await gameDecksResource.delete(deck.id);
      sandyToast.success(`Deck "${deck.title}" deleted.`, "Sandy erased it from her memory.");
      setOpen(false);
      router.push("/decks");
    } catch (err: any) {
      sandyToast.error(err.message || "Sandy refuses to let go of this deck.");
    } finally {
      setIsProcessing(false);
    }
  };

  const defaultTrigger = (
    <Button 
      variant="outline" 
      size="lg" 
      className="w-full sm:w-auto justify-center px-6 border-brand-red/30 text-brand-red hover:bg-brand-red/5"
    >
      Delete Deck
    </Button>
  );

  return (
    <Modal
      trigger={trigger || defaultTrigger}
      open={open}
      onOpenChange={(value) => {
        setOpen(value);
        if (!value) {
          setConfirmDeckName("");
        }
      }}
      title="Destroy this deck?"
      description="This action cannot be undone. All gossip and memories will be permanently erased."
      size="md"
    >
      <div className="mb-8 mt-2">
        <label className="block text-xs font-bold tracking-widest text-brand-text-muted mb-4 text-center">
          Type <span className="text-brand-brown font-black select-none">&quot;{deck.title}&quot;</span> to confirm
        </label>
        <input
          type="text"
          autoFocus
          value={confirmDeckName}
          onChange={(e) => setConfirmDeckName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && confirmDeckName === deck.title) {
              handleDeleteDeck();
            }
            if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all text-center"
          placeholder="Type deck name..."
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
          className="flex-1 bg-brand-red border-brand-red hover:bg-brand-red/90" 
          onClick={handleDeleteDeck}
          disabled={confirmDeckName !== deck.title || isProcessing}
        >
          {isProcessing ? "Destroying..." : "Destroy Deck"}
        </Button>
      </div>
    </Modal>
  );
};
