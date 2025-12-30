"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";
import { formatCardText } from "@/ui/lib/text-utils";

type DeckSuggestion = {
  theme: string;
  cards: string[];
};

export default function SelectCardsPage() {
  const router = useRouter();
  const params = useParams();
  const deckId = params.deckId as string;

  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState<DeckSuggestion[]>([]);
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);

  const hasFetched = useRef(false);

  useEffect(() => {
    if (deckId && !hasFetched.current) {
      fetchSuggestions();
    }
  }, [deckId]);

  const fetchSuggestions = async () => {
    if (!deckId || hasFetched.current) return;
    hasFetched.current = true;
    
    try {
      setLoading(true);
      const response = await fetch("/api/ai-cards-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "suggestions",
          deckId: parseInt(deckId) 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions);
      } else {
        console.error("Failed to fetch suggestions");
        hasFetched.current = false; // Allow retry if failed
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      hasFetched.current = false; // Allow retry if error
    } finally {
      setLoading(false);
    }
  };

  const toggleCard = (card: string) => {
    const newSelected = new Set(selectedCards);
    if (newSelected.has(card)) {
      newSelected.delete(card);
    } else {
      newSelected.add(card);
    }
    setSelectedCards(newSelected);
  };

  const selectEntireDeck = (cards: string[]) => {
    const newSelected = new Set(selectedCards);
    const allSelected = cards.every(card => newSelected.has(card));
    
    if (allSelected) {
      // Deselect all cards from this deck
      cards.forEach(card => newSelected.delete(card));
    } else {
      // Select all cards from this deck
      cards.forEach(card => newSelected.add(card));
    }
    setSelectedCards(newSelected);
  };

  const saveFinalDeck = async () => {
    if (selectedCards.size === 0) {
      alert("Please select at least one card to save your deck.");
      return;
    }

    setSaving(true);
    try {
      // Save the selected cards to the deck
      const cardsArray = Array.from(selectedCards);
      const response = await fetch(`/api/game-cards/bulk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deckId: parseInt(deckId),
          cards: cardsArray.map((ruleText, index) => ({
            ruleText,
            orderIndex: index,
          })),
        }),
      });

      if (response.ok) {
        // Redirect to the deck page
        router.push(`/decks/${deckId}`);
      } else {
        console.error("Failed to save cards");
        alert("Failed to save cards. Please try again.");
      }
    } catch (error) {
      console.error("Error saving cards:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 border-4 border-brand-tan/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-4 bg-brand-brown/10 rounded-full flex items-center justify-center">
            <span className="font-script text-4xl text-brand-red">S</span>
          </div>
        </div>
        <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4 animate-pulse">Sandy&apos;s cooking...</h1>
        <p className="text-xl text-brand-text-muted italic max-w-sm mx-auto">
          Sandy is crafting two unique variations just for you. This might take a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-6 max-w-7xl grow">
        <div className="mb-12">
          <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">Pick your poison.</h1>
          <p className="text-xl text-brand-text-muted italic font-medium mb-6">
            Sandy has prepared two variations of your chosen game mode. Selected cards will be active, others will stay in your drafts.
          </p>
          <div className="flex items-center gap-4 bg-white rounded-3xl p-6 shadow-sm border border-brand-tan/10">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif font-black text-brand-brown">
                  {selectedCards.size}
                </span>
                <span className="text-sm font-bold text-brand-text-muted uppercase tracking-widest pt-1">
                  Cards selected for active deck
                </span>
              </div>
              <p className="text-xs text-brand-text-muted italic mt-1 font-medium">
                The remaining {20 - selectedCards.size} cards will be saved in Sandy&apos;s Drafts for later.
              </p>
            </div>
            <Button
              variant="primary"
              size="lg"
              disabled={selectedCards.size === 0 || saving}
              onClick={saveFinalDeck}
            >
              {saving ? "Creating Deck..." : "Finalize & Start Playing"}
            </Button>
          </div>
        </div>

        <div className="space-y-12">
          {suggestions.map((suggestion, deckIndex) => {
            const deckCards = suggestion.cards;
            const allSelected = deckCards.every(card => selectedCards.has(card));
            const someSelected = deckCards.some(card => selectedCards.has(card));
            
            // Better labels for the variations
            const variationLabels = [
              { name: "Bold & Daring", description: "Push boundaries and create memorable moments" },
              { name: "Wild & Chaotic", description: "Maximum unpredictability and hilarious chaos" }
            ];
            
            const variation = variationLabels[deckIndex] || { name: suggestion.theme, description: "" };
            
            return (
              <div key={deckIndex} className="bg-white rounded-[48px] p-10 shadow-lg">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-3xl font-serif font-bold text-brand-brown mb-2">
                      {variation.name}
                    </h2>
                    <p className="text-sm text-brand-text-muted italic mb-1">
                      {variation.description}
                    </p>
                    <p className="text-xs text-brand-text-muted uppercase tracking-widest font-bold">
                      {deckCards.filter(card => selectedCards.has(card)).length} of {deckCards.length} selected
                    </p>
                  </div>
                  <Button
                    variant={allSelected ? "secondary" : "primary"}
                    size="lg"
                    onClick={() => selectEntireDeck(deckCards)}
                  >
                    {allSelected ? "Deselect All" : someSelected ? "Select Remaining" : "Select All"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deckCards.map((card, cardIndex) => {
                    const isSelected = selectedCards.has(card);
                    return (
                      <div
                        key={cardIndex}
                        onClick={() => toggleCard(card)}
                        className={cn(
                          "p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg group",
                          isSelected 
                            ? "border-brand-brown bg-brand-brown/5 shadow-md" 
                            : "border-brand-tan/20 hover:border-brand-tan/50"
                        )}
                      >
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all",
                            isSelected 
                              ? "border-brand-brown bg-brand-brown" 
                              : "border-brand-tan/40 group-hover:border-brand-tan"
                          )}>
                            {isSelected && (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <div className="text-brand-brown font-medium leading-relaxed flex-1">
                            {formatCardText(card)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 select-none">
        <div className="font-script text-6xl text-brand-red rotate-12">Choose wisely.</div>
      </div>
    </div>
  );
}
