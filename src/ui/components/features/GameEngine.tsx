"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/ui/lib/utils";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { GameCard } from "@/ui/components/features/GameCard";
import { DLGameCard } from "@/ui/components/features/DLGameCard";
import { getRulesForMode } from "@/lib/game-rules";
import { formatCardText } from "@/ui/lib/text-utils";

interface GameEngineProps {
  deck: {
    id: number;
    title: string;
    gameMode?: {
      name: string;
    };
    gameCards: any[];
    extra?: string;
  };
  isExample?: boolean;
  onBack?: () => void;
}

export const GameEngine = ({ deck, isExample, onBack }: GameEngineProps) => {
  const router = useRouter();
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);

  // Dimmed Lights specific state
  const [activeParticipantIndex, setActiveParticipantIndex] = useState<number>(0);
  const [showHandover, setShowHandover] = useState(false);

  const modeName = deck.gameMode?.name || "Standard Mode";
  const rules = getRulesForMode(modeName);

  const isDimmedLights = modeName === "Dimmed Lights";

  // Extract participants from deck.extra
  const getParticipants = () => {
    const peopleMatch = deck.extra?.match(/People in the room: (.*)/);
    if (!peopleMatch) return ["Him", "Her"]; // Fallback
    return peopleMatch[1].split(",").map((p: string) => p.trim().split(" (")[0]);
  };

  const participants = getParticipants();

  useEffect(() => {
    if (deck?.gameCards) {
      // Collect both types of cards
      const regularCards = (deck.gameCards || []).map(card => ({ ...card, isChaos: false }));
      const chaosCards = ((deck as any).sandyChaosCards || []).map((card: any) => ({ ...card, isChaos: true }));
      
      const allCards = [...regularCards, ...chaosCards];
      
      if (isDimmedLights) {
        // Special sorting for Dimmed Lights - pick EXACTLY one card per phase
        const phases = ["PHASE_0", "PHASE_1", "PHASE_2", "PHASE_3", "PHASE_4", "PHASE_5"];
        
        // Pick one shared backstory (Phase 0)
        const backstoryCards = allCards.filter(c => c.cardType === "PHASE_0");
        const shared = backstoryCards.length > 0 
          ? [backstoryCards[Math.floor(Math.random() * backstoryCards.length)]] 
          : [];
        
        const participant1Cards = [];
        const participant2Cards = [];

        // For subsequent phases (1-5), pick one card for each participant
        for (const phase of phases.slice(1)) {
          const phaseCards = allCards.filter(c => c.cardType === phase);
          
          const himCards = phaseCards.filter(c => c.targetPerson === "Him");
          const herCards = phaseCards.filter(c => c.targetPerson === "Her");
          
          if (himCards.length > 0) {
            participant1Cards.push(himCards[Math.floor(Math.random() * himCards.length)]);
          }
          if (herCards.length > 0) {
            participant2Cards.push(herCards[Math.floor(Math.random() * herCards.length)]);
          }
        }

        // The flow: shared backstory + first participant's turn (1-5), then handover, then second participant's turn (1-5)
        const flow = [...shared, ...participant1Cards, { isHandover: true }, ...participant2Cards];
        setShuffledCards(flow);
      } else {
        // Shuffle the cards on mount
        const shuffled = allCards.sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
      }
    }
  }, [deck, isDimmedLights]);

  const handleRevealSet = () => {
    if (isRevealing || revealedCards.length === shuffledCards.length) return;

    setIsRevealing(true);
    
    // Find how many cards to reveal (until end or handover)
    const newRevealed = [...revealedCards];
    let nextIdx = revealedCards.length;
    
    let addedNonHandover = false;
    while (nextIdx < shuffledCards.length) {
      const card = shuffledCards[nextIdx];
      if (card.isHandover) {
        // If we revealed other cards in this click, stop before the handover
        if (addedNonHandover) {
          break;
        }
        // Otherwise (first card is handover), reveal it
        newRevealed.push(nextIdx);
        break;
      }
      newRevealed.push(nextIdx);
      addedNonHandover = true;
      nextIdx++;
    }

    // Animate the reveal
    setTimeout(() => {
      setRevealedCards(newRevealed);
      setCurrentCardIndex(newRevealed[newRevealed.length - 1]);
      setIsRevealing(false);
      
      // If the last revealed card is a handover, show it
      if (shuffledCards[newRevealed[newRevealed.length - 1]]?.isHandover) {
        setShowHandover(true);
      }
    }, 300);
  };

  const handleDeckClick = () => {
    if (isDimmedLights) {
      handleRevealSet();
      return;
    }
    
    if (isRevealing || revealedCards.length === shuffledCards.length) return;
    
    const nextIndex = revealedCards.length;
    const nextCard = shuffledCards[nextIndex];

    if (nextCard?.isHandover) {
      setShowHandover(true);
      setRevealedCards([...revealedCards, nextIndex]);
      return;
    }

    setIsRevealing(true);
    
    // Animate the reveal
    setTimeout(() => {
      setCurrentCardIndex(nextIndex);
      setRevealedCards([...revealedCards, nextIndex]);
      setIsRevealing(false);
    }, 300);
  };

  const handleHandoverComplete = () => {
    setShowHandover(false);
    setActiveParticipantIndex(1);
    // In Dimmed Lights, we show the next set when they click again
  };

  const resetGame = () => {
    if (isDimmedLights) {
      setCurrentCardIndex(null);
      setRevealedCards([]);
      setActiveParticipantIndex(0);
      setShowHandover(false);
      // Re-shuffle/pick new cards
      if (deck?.gameCards) {
        const regularCards = (deck.gameCards || []).map(card => ({ ...card, isChaos: false }));
        const chaosCards = ((deck as any).sandyChaosCards || []).map((card: any) => ({ ...card, isChaos: true }));
        const allCards = [...regularCards, ...chaosCards];
        
        const phases = ["PHASE_0", "PHASE_1", "PHASE_2", "PHASE_3", "PHASE_4", "PHASE_5"];
        const backstoryCards = allCards.filter(c => c.cardType === "PHASE_0");
        const shared = backstoryCards.length > 0 
          ? [backstoryCards[Math.floor(Math.random() * backstoryCards.length)]] 
          : [];
        
        const p1 = [];
        const p2 = [];

        for (const phase of phases.slice(1)) {
          const pCards = allCards.filter(c => c.cardType === phase);
          const h = pCards.filter(c => c.targetPerson === "Him");
          const r = pCards.filter(c => c.targetPerson === "Her");
          if (h.length > 0) p1.push(h[Math.floor(Math.random() * h.length)]);
          if (r.length > 0) p2.push(r[Math.floor(Math.random() * r.length)]);
        }
        setShuffledCards([...shared, ...p1, { isHandover: true }, ...p2]);
      }
    } else {
      const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
      setCurrentCardIndex(null);
      setRevealedCards([]);
    }
  };

  const currentCard = currentCardIndex !== null ? shuffledCards[currentCardIndex] : null;
  const cardsRemaining = shuffledCards.length - revealedCards.length;
  const gameComplete = revealedCards.length === shuffledCards.length && !showHandover;

  // For Dimmed Lights, get all currently revealed cards for the active participant
  const getActiveRevealedCards = () => {
    if (!isDimmedLights) return currentCard ? [currentCard] : [];
    
    // Find index of handover
    const handoverIdx = shuffledCards.findIndex(c => c.isHandover);
    
    if (activeParticipantIndex === 0) {
      // Shared (Backstory) + P1 cards
      return shuffledCards
        .slice(0, handoverIdx)
        .filter((_, idx) => revealedCards.includes(idx));
    } else {
      // Shared (Backstory) + P2 cards
      const p2Cards = shuffledCards
        .slice(handoverIdx + 1)
        .filter((_, idx) => revealedCards.includes(idx + handoverIdx + 1));
        
      // If none of her specific cards are revealed yet, show nothing (to keep "Reveal Cards" button active)
      if (p2Cards.length === 0) return [];

      const backstory = shuffledCards
        .slice(0, handoverIdx)
        .filter(c => c.cardType === "PHASE_0" && revealedCards.includes(shuffledCards.indexOf(c)));
        
      return [...backstory, ...p2Cards];
    }
  };

  const activeCards = getActiveRevealedCards();

  return (
    <main className="container mx-auto px-6 max-w-5xl grow flex flex-col">
      <header className="mb-12 text-center relative">
        <div className="inline-block px-3 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold text-[10px] tracking-widest uppercase mb-6">
          {modeName}
        </div>

        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-brown mb-6">
          {deck.title}
        </h1>

        <div className="flex items-center justify-center gap-6">
          <p className="text-xl text-brand-text-muted italic font-medium">
            {gameComplete ? "Game Complete!" : `${cardsRemaining} cards remaining`}
          </p>

          <div className="w-px h-4 bg-brand-tan/30" />

          {isDimmedLights && participants.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-brown/40">Active:</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-red">{participants[activeParticipantIndex]}</span>
            </div>
          )}

          <Modal
            variant="letter"
            description="Sandy's guide to Pure Provocation."
            trigger={
              <button className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-brand-brown/40 hover:text-brand-red transition-colors uppercase group">
                <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[8px] font-bold group-hover:scale-110 transition-transform">?</span>
                How to play
              </button>
            }
          >
            <div className="space-y-8 text-brand-brown">
              <div className="text-2xl text-brand-brown/80 font-script mb-10 text-center leading-tight">
                {formatCardText(rules.description)}
              </div>

              <div className="space-y-8">
                {rules.rules.map((rule: any) => (
                  <div key={rule.step} className="flex gap-4 group">
                    <span className="font-script text-4xl text-brand-tan/40 shrink-0 group-hover:text-brand-brown/40 transition-colors duration-300">
                      {rule.step.toString().padStart(2, '0')}
                    </span>
                    <div className="pt-2">
                      <h4 className="font-script text-3xl text-brand-brown tracking-tight mb-2 relative inline-block after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-brand-tan/40">
                        {rule.title}
                      </h4>
                      <p className="text-xl font-script text-brand-brown/80 leading-none">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-script text-3xl text-brand-brown/90 pt-6 border-t border-brand-tan/10 text-center">
                Rule zero: What happens with Sandy, stays with Sandy.
              </p>
            </div>
          </Modal>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-24 relative px-4">
        {/* Current Cards Display */}
        {activeCards.length > 0 && !showHandover && (
          <div className={cn(
            "w-full animate-in zoom-in-95 fade-in duration-500 perspective-1000",
            isDimmedLights ? "max-w-4xl overflow-x-auto pb-12 scrollbar-hide" : "max-w-[320px] md:max-w-sm"
          )}>
            <div className={cn(
              "flex gap-6",
              isDimmedLights ? "flex-row px-4" : "justify-center"
            )}>
              {activeCards.map((card, idx) => (
                <div key={idx} className={cn(
                  "shrink-0 transition-all duration-700",
                  isDimmedLights ? "w-[450px] md:w-[550px]" : "w-72 md:w-80"
                )}>
                  {isDimmedLights ? (
                    <DLGameCard card={card} />
                  ) : (
                    <GameCard card={card} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Handover Modal/Screen */}
        {showHandover && (
          <div className="text-center animate-in zoom-in-95 fade-in duration-500">
            <h2 className="text-4xl font-serif font-bold text-brand-brown mb-8 leading-tight">
              Hand the phone to <span className="text-brand-red">{participants[1] || "the other person"}</span>.
            </h2>
            <p className="text-xl text-brand-text-muted italic mb-12 max-w-sm mx-auto">
              It&apos;s their turn to receive Sandy&apos;s directions.
            </p>
            <Button size="xl" onClick={handleHandoverComplete}>
              I have the phone
            </Button>
          </div>
        )}

        {/* Deck Stack */}
        {!gameComplete && !showHandover && (
          <div className="relative flex flex-col items-center">
            <button
              onClick={handleDeckClick}
              disabled={isRevealing}
              className={cn(
                "relative group transition-all duration-700",
                isRevealing 
                  ? (isDimmedLights ? "opacity-50 scale-95" : "-translate-y-20 md:translate-y-0 md:translate-x-32 opacity-0 scale-110") 
                  : "hover:scale-105 active:scale-95"
              )}
            >
              {/* Physical Stack Shadow effect */}
              <div className="absolute inset-0 bg-brand-brown/20 rounded-[32px] translate-x-3 translate-y-3 blur-md" />
              <div className="absolute inset-x-0 bottom-[-12px] h-10 bg-brand-brown/10 rounded-[32px] -z-10" />
              <div className="absolute inset-x-0 bottom-[-6px] h-10 bg-brand-brown/20 rounded-[32px] -z-10" />
              
              {/* Main deck card back */}
              <div className={cn(
                "relative bg-brand-brown rounded-[32px] shadow-2xl border-4 border-brand-tan/20 flex flex-col items-center justify-center p-10 overflow-hidden transition-all duration-700",
                isDimmedLights ? "w-[450px] md:w-[550px] aspect-3/2" : "w-72 md:w-80 aspect-2/3"
              )}>
                {/* Decorative corner indices */}
                <div className="absolute top-6 left-6 flex flex-col items-center text-brand-cream/30">
                  <span className="text-[10px] font-bold tracking-tighter mb-1 select-none">SANDY</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z"/></svg>
                </div>

                <div className="absolute bottom-6 right-6 flex flex-col items-center text-brand-cream/30 rotate-180">
                  <span className="text-[10px] font-bold tracking-tighter mb-1 select-none">SANDY</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z"/></svg>
                </div>

                {/* Center Content: Deck Title */}
                <div className="relative z-10 text-center px-4">
                  <div className="font-script text-8xl text-brand-cream/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none italic">S</div>
                  <h3 className="text-3xl md:text-4xl font-serif font-black text-brand-cream leading-tight mb-4 relative z-10 wrap-break-word">
                    {deck.title}
                  </h3>
                  <div className="text-brand-tan font-bold text-xs uppercase tracking-[0.3em] relative z-10">
                    {isDimmedLights 
                      ? (activeCards.length > 0 
                          ? (activeParticipantIndex === 0 ? "Handover" : "Finish") 
                          : "Reveal Cards") 
                      : `${cardsRemaining} cards remaining`}
                  </div>
                </div>
                
                {/* Bottom Left: Sandy Said So */}
                <div className="absolute bottom-10 left-10 flex flex-col items-start gap-1">
                  <div className="h-px w-6 bg-brand-tan/30 rounded-full" />
                  <p className="text-[9px] font-serif italic text-brand-tan font-bold tracking-[0.2em] uppercase">
                    Sandy said so
                  </p>
                </div>
              </div>
            </button>

            {/* Tap indicator - Now below the card */}
            <div className={cn(
              "mt-8 text-brand-brown/40 text-[10px] font-bold uppercase tracking-[0.4em] animate-pulse flex flex-col items-center gap-2 transition-opacity duration-300",
              isRevealing ? "opacity-0" : "opacity-100"
            )}>
              <div className="w-px h-8 bg-linear-to-b from-brand-brown/40 to-transparent" />
              {isDimmedLights ? "Tap to reveal cards" : "Tap to reveal"}
            </div>
          </div>
        )}

        {/* Game Complete State */}
        {gameComplete && activeCards.length === 0 && (
          <div className="text-center animate-in zoom-in-95 fade-in duration-500">
            <div className="w-32 h-32 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-red">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2 className="text-4xl font-serif font-bold text-brand-brown mb-4">
              All secrets revealed!
            </h2>
            <p className="text-xl text-brand-text-muted italic mb-8">
              Sandy has no more surprises for you... this time.
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex justify-center gap-4">
        {!isExample && (
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => router.push(`/decks/${deck.id}`)}
          >
            View All Cards
          </Button>
        )}
        {revealedCards.length > 0 && (
          <Button 
            variant="secondary" 
            size="lg"
            onClick={resetGame}
          >
            Shuffle & Restart
          </Button>
        )}
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => isExample && onBack ? onBack() : router.push("/decks")}
        >
          {isExample ? "Try Another Mode" : "Back to Decks"}
        </Button>
      </div>

      {/* Progress Indicator */}
      {shuffledCards.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
              Progress
            </span>
            <div className="flex-1 h-2 bg-brand-tan/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-brown transition-all duration-500 rounded-full"
                style={{ width: `${(revealedCards.length / shuffledCards.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-brand-brown">
              {revealedCards.length}/{shuffledCards.length}
            </span>
          </div>
        </div>
      )}

    </main>
  );
};
