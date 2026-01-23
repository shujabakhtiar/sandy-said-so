"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/ui/lib/utils";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { GameCard } from "@/ui/components/features/GameCard";
import { DLGameCard } from "@/ui/components/features/DLGameCard";
import { DeckBack } from "@/ui/components/features/DeckBack";
import { CardStack } from "@/ui/components/features/CardStack";
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
  const [swipedIndices, setSwipedIndices] = useState<Set<number>>(new Set());
  const [swipeHistory, setSwipeHistory] = useState<number[]>([]);
  const [showTitleCard, setShowTitleCard] = useState(true);

  // Dimmed Lights specific state
  const [activeParticipantIndex, setActiveParticipantIndex] = useState<number>(0);
  const [showHandover, setShowHandover] = useState(false);

  const modeName = deck.gameMode?.name || "Standard Mode";
  const rules = getRulesForMode(modeName);

  const isDimmedLights = modeName === "Dimmed Lights";

  // Extract participants from deck.extra or provide intelligent fallbacks
  const getParticipants = () => {
    // 1. Try to extract from deck.extra (standard AI deck flow)
    const peopleMatch = deck.extra?.match(/People in the room: (.*)/);
    if (peopleMatch) {
      return peopleMatch[1].split(",").map((p: string) => p.trim().split(" (")[0]);
    }

    // 2. Try to find names in example cards if it's a known example deck (heuristic)
    if (isExample && (deck as any).id === 103) {
      return ["Taylor", "Jordan"]; // Specific names used in the spicy example
    }

    // 3. Absolute fallback
    return ["Him", "Her"];
  };

  const participants = getParticipants();

  useEffect(() => {
    if (deck?.gameCards) {
      // Collect regular cards
      const regularCards = (deck.gameCards || []).map(card => ({ ...card, isChaos: false }));
      
      if (isDimmedLights) {
        // Special sorting for Dimmed Lights - pick EXACTLY one card per phase
        const phases = ["PHASE_0", "PHASE_1", "PHASE_2", "PHASE_3", "PHASE_4", "PHASE_5"];
        const backstoryCards = regularCards.filter(c => c.cardType === "PHASE_0");
        const shared = backstoryCards.length > 0 
          ? [backstoryCards[Math.floor(Math.random() * backstoryCards.length)]] 
          : [];
        
        const p1 = [];
        const p2 = [];

        for (const phase of phases.slice(1)) {
          const phaseCards = regularCards.filter(c => c.cardType === phase);
          
          const himCards = phaseCards.filter(c => c.targetPerson === "Him");
          const herCards = phaseCards.filter(c => c.targetPerson === "Her");
          
          if (himCards.length > 0) {
            p1.push(himCards[Math.floor(Math.random() * himCards.length)]);
          }
          if (herCards.length > 0) {
            p2.push(herCards[Math.floor(Math.random() * herCards.length)]);
          }
        }

        // The flow: shared backstory + first set, then handover marker, then second set
        setShuffledCards([...shared, ...p1, { isHandover: true }, ...p2]);
      } else {
        // Shuffle the cards on mount - include chaos if not dimmed lights
        const chaosCards = ((deck as any).sandyChaosCards || []).map((card: any) => ({ ...card, isChaos: true }));
        const shuffled = [...regularCards, ...chaosCards].sort(() => Math.random() - 0.5);
        setShuffledCards(shuffled);
      }
    }
  }, [deck, isDimmedLights]);

  const handleHandoverComplete = () => {
    setShowHandover(false);
    setActiveParticipantIndex(1);
    setShowTitleCard(true);
    setSwipedIndices(new Set());
    setSwipeHistory([]);
  };

  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    
    const lastIndex = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory(prev => prev.slice(0, -1));

    if (lastIndex === -1) {
      setShowTitleCard(true);
    } else {
      setSwipedIndices(prev => {
        const next = new Set(prev);
        next.delete(lastIndex);
        return next;
      });
    }
  };

  const resetGame = () => {
    setShowTitleCard(true);
    setSwipedIndices(new Set());
    setSwipeHistory([]);
    setActiveParticipantIndex(0);
    setShowHandover(false);
    
    if (isDimmedLights) {
      if (deck?.gameCards) {
        const regularCards = (deck.gameCards || []).map(card => ({ ...card, isChaos: false }));
        const phases = ["PHASE_0", "PHASE_1", "PHASE_2", "PHASE_3", "PHASE_4", "PHASE_5"];
        const backstoryCards = regularCards.filter(c => c.cardType === "PHASE_0");
        const shared = backstoryCards.length > 0 
          ? [backstoryCards[Math.floor(Math.random() * backstoryCards.length)]] 
          : [];
        
        const p1 = [];
        const p2 = [];

        for (const phase of phases.slice(1)) {
          const pCards = regularCards.filter(c => c.cardType === phase);
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
    }
  };

  const getActiveCards = () => {
    if (!isDimmedLights) {
      return shuffledCards
        .map((card, index) => ({ card, index }))
        .filter(item => !swipedIndices.has(item.index));
    }
    
    const handoverIdx = shuffledCards.findIndex(c => c.isHandover);
    let result = [];
    if (activeParticipantIndex === 0) {
      result = shuffledCards
        .slice(0, handoverIdx)
        .map((card, idx) => ({ card, index: idx }));
    } else {
      const backstory = shuffledCards
        .slice(0, handoverIdx)
        .map((card, idx) => ({ card, index: idx }))
        .filter(item => item.card.cardType === "PHASE_0");
        
      const p2Cards = shuffledCards
        .slice(handoverIdx + 1)
        .map((card, idx) => ({ card, index: idx + handoverIdx + 1 }));
        
      result = [...backstory, ...p2Cards];
    }

    return result.filter(item => !swipedIndices.has(item.index));
  };

  const activeCards = getActiveCards();
  const stack = showTitleCard 
    ? [{ isTitle: true, index: -1 }, ...activeCards] 
    : activeCards;

  const gameComplete = (isDimmedLights 
    ? (activeParticipantIndex === 1 && activeCards.length === 0 && !showTitleCard)
    : (shuffledCards.length > 0 && activeCards.length === 0 && !showTitleCard)) && !showHandover;

  const currentParticipant = participants[activeParticipantIndex] || "the other person";
  const cardsRemaining = isDimmedLights ? activeCards.length : (shuffledCards.length - swipedIndices.size);

  return (
    <main className="container mx-auto px-6 max-w-5xl grow flex flex-col overflow-x-hidden">
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
                      <p className="text-xl font-script text-brand-brown/80 leading-relaxed">
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

        {/* Undo Row - Positioned below info row, right aligned */}
        {swipeHistory.length > 0 && (
          <div className="flex justify-end mt-6 -mb-6">
            <button 
              onClick={handleUndo}
              className="flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-brand-red hover:text-brand-red/70 transition-all active:scale-95 uppercase group h-10 px-4 rounded-full bg-brand-red/5 border border-brand-red/10"
              title="Undo last action"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M9 14 4 9l5-5"/>
                <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v.5"/>
              </svg>
              Undo
            </button>
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-12 md:gap-16 lg:gap-24 relative px-4">
        {stack.length > 0 && !showHandover && (
          <div className={cn(
            "w-full flex justify-center items-center select-none mb-12 animate-in fade-in zoom-in duration-700",
            isDimmedLights ? "max-w-4xl h-[400px]" : "max-w-[320px] md:max-w-sm h-[500px]"
          )}>
            <CardStack
              cards={stack}
              isDimmedLights={isDimmedLights}
              onSwipe={(item) => {
                setSwipeHistory(prev => [...prev, item.index]);
                if (item.isTitle) {
                  setShowTitleCard(false);
                } else {
                  setSwipedIndices(prev => {
                    const next = new Set(prev);
                    next.add(item.index);
                    return next;
                  });
                }
              }}
              renderCard={(item: any) => {
                if (item.isTitle) {
                  return (
                    <DeckBack 
                      title={deck.title} 
                      subtitle={isDimmedLights ? `For: ${currentParticipant}` : "Sandy says..."} 
                      isDimmedLights={isDimmedLights} 
                    />
                  );
                }
                return isDimmedLights ? (
                  <DLGameCard card={item.card} />
                ) : (
                  <GameCard card={item.card} />
                );
              }}
            />
          </div>
        )}

        {showHandover && (
          <div className="text-center animate-in zoom-in-95 fade-in duration-500 py-20">
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

        {/* Action Button: Handover or Finish */}
        {activeCards.length === 0 && !showTitleCard && !showHandover && !gameComplete && (
          <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
            {isDimmedLights && activeParticipantIndex === 0 ? (
              <>
                <h2 className="text-3xl font-serif font-bold text-brand-brown text-center">
                  Perfect. Now handover the phone.
                </h2>
                <Button size="xl" onClick={() => setShowHandover(true)}>
                  Ready for Handover
                </Button>
              </>
            ) : null}
          </div>
        )}

        {/* Game Complete State */}
        {gameComplete && !showHandover && (
          <div className="text-center animate-in zoom-in-95 fade-in duration-500 py-10">
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
        {swipedIndices.size > 0 && !showHandover && (
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
      {shuffledCards.length > 0 && !isDimmedLights && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-text-muted">
              Progress
            </span>
            <div className="flex-1 h-2 bg-brand-tan/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-brown transition-all duration-500 rounded-full"
                style={{ width: `${(swipedIndices.size / shuffledCards.length) * 100}%` }}
              />
            </div>
            <span className="text-xs font-bold text-brand-brown">
              {swipedIndices.size}/{shuffledCards.length}
            </span>
          </div>
        </div>
      )}
    </main>
  );
};
