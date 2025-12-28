"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/ui/lib/utils";
import { Button } from "@/ui/components/ui/Button";
import { GameCard } from "@/ui/components/features/GameCard";

interface GameEngineProps {
  deck: {
    id: number;
    title: string;
    gameMode?: {
      name: string;
    };
    gameCards: any[];
  };
}

export const GameEngine = ({ deck }: GameEngineProps) => {
  const router = useRouter();
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    if (deck?.gameCards) {
      // Shuffle the cards on mount
      const shuffled = [...deck.gameCards].sort(() => Math.random() - 0.5);
      setShuffledCards(shuffled);
    }
  }, [deck]);

  const handleDeckClick = () => {
    if (isRevealing || revealedCards.length === shuffledCards.length) return;
    
    setIsRevealing(true);
    const nextIndex = revealedCards.length;
    
    // Animate the reveal
    setTimeout(() => {
      setCurrentCardIndex(nextIndex);
      setRevealedCards([...revealedCards, nextIndex]);
      setIsRevealing(false);
    }, 300);
  };

  const resetGame = () => {
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentCardIndex(null);
    setRevealedCards([]);
  };

  const currentCard = currentCardIndex !== null ? shuffledCards[currentCardIndex] : null;
  const cardsRemaining = shuffledCards.length - revealedCards.length;
  const gameComplete = revealedCards.length === shuffledCards.length;

  return (
    <main className="container mx-auto px-6 max-w-5xl grow flex flex-col">
      <header className="mb-12 text-center">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold text-[10px] tracking-widest uppercase">
          {deck.gameMode?.name || "Standard Mode"}
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-brown mb-4">{deck.title}</h1>
        <p className="text-xl text-brand-text-muted italic font-medium">
          {gameComplete ? "Game Complete!" : `${cardsRemaining} cards remaining`}
        </p>
      </header>

      <div className="flex-1 flex flex-col md:flex-row-reverse items-center justify-center gap-12 md:gap-16 lg:gap-24 relative px-4">
        {/* Current Card Display */}
        {currentCard && (
          <div className="w-full max-w-[320px] md:max-w-sm animate-in zoom-in-95 fade-in duration-500 perspective-1000">
            <div className="relative transform transition-all duration-700 transform-3d">
              <GameCard 
                card={currentCard} 
              />
            </div>
          </div>
        )}

        {/* Deck Stack */}
        {!gameComplete && (
          <div className="relative">
            <button
              onClick={handleDeckClick}
              disabled={isRevealing}
              className={cn(
                "relative group transition-all duration-700",
                isRevealing 
                  ? "-translate-y-20 md:translate-y-0 md:translate-x-32 opacity-0 scale-110" 
                  : "hover:scale-105 active:scale-95"
              )}
            >
              {/* Physical Stack Shadow effect */}
              <div className="absolute inset-0 bg-brand-brown/20 rounded-[32px] translate-x-3 translate-y-3 blur-md" />
              <div className="absolute inset-x-0 bottom-[-12px] h-10 bg-brand-brown/10 rounded-[32px] -z-10" />
              <div className="absolute inset-x-0 bottom-[-6px] h-10 bg-brand-brown/20 rounded-[32px] -z-10" />
              
              {/* Main deck card back */}
              <div className="relative w-72 md:w-80 aspect-2/3 bg-brand-brown rounded-[32px] shadow-2xl border-4 border-brand-tan/20 flex flex-col items-center justify-center p-10 overflow-hidden">
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
                    {cardsRemaining} cards remaining
                  </div>
                </div>
                
                {/* Bottom Left: Sandy Said So */}
                <div className="absolute bottom-10 left-10 flex flex-col items-start gap-1">
                  <div className="h-px w-6 bg-brand-tan/30 rounded-full" />
                  <p className="text-[9px] font-serif italic text-brand-tan font-bold tracking-[0.2em] uppercase">
                    Sandy said so
                  </p>
                </div>
                
                {/* Tap indicator */}
                <div className="absolute bottom-10 right-1/2 translate-x-1/2 text-brand-cream/40 text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
                  Tap to reveal
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Game Complete State */}
        {gameComplete && !currentCard && (
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
        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => router.push(`/decks/${deck.id}`)}
        >
          View All Cards
        </Button>
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
          onClick={() => router.push("/decks")}
        >
          Back to Decks
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
