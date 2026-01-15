"use client";

import { useState } from "react";
import { GameCard } from "@/ui/components/features/GameCard";
import { DeckCardEdit } from "./DeckCardEdit";
import { DeckCardDelete } from "./DeckCardDelete";

interface DeckCardProps {
  card: any;
  activeTab: "live" | "drafts";
  onUpdate: (updatedCard: any) => void;
  onDelete: (cardId: number) => void;
  onPromote?: (card: any) => void;
  showStatusBadge?: boolean;
}

export const DeckCard = ({ 
  card, 
  activeTab, 
  onUpdate, 
  onDelete, 
  onPromote,
  showStatusBadge 
}: DeckCardProps) => {
  const [editingCard, setEditingCard] = useState<any>(null);
  const [deletingCard, setDeletingCard] = useState<any>(null);

  return (
    <>
      <GameCard 
        card={card} 
        onEdit={card.isChaos ? undefined : (c) => setEditingCard(c)}
        onDelete={card.isChaos ? undefined : (c) => setDeletingCard(c)}
        onPromote={onPromote}
        showStatusBadge={showStatusBadge}
      />

      {editingCard && (
        <DeckCardEdit
          card={editingCard}
          onUpdate={(updatedCard) => {
            onUpdate(updatedCard);
            setEditingCard(null);
          }}
          onClose={() => setEditingCard(null)}
        />
      )}

      {deletingCard && (
        <DeckCardDelete
          card={deletingCard}
          activeTab={activeTab}
          onDelete={(cardId) => {
            onDelete(cardId);
            setDeletingCard(null);
          }}
          onClose={() => setDeletingCard(null)}
        />
      )}
    </>
  );
};
