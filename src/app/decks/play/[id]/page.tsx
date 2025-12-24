"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/ui/lib/utils";

export default function GamePlayPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [shuffledCards, setShuffledCards] = useState<any[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number | null>(null);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [isRevealing, setIsRevealing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && id) {
      fetch(`/api/game-decks/${id}`)
        .then(res => res.json())
        .then(data => {
          setDeck(data);
          // Shuffle the cards
          const shuffled = [...(data.gameCards || [])].sort(() => Math.random() - 0.5);
          setShuffledCards(shuffled);
        })
        .finally(() => setLoading(false));
    }
  }, [user, id]);

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

  if (authLoading || loading) return null;
  if (!deck) return <div className="p-20 text-center">Deck not found.</div>;

  const currentCard = currentCardIndex !== null ? shuffledCards[currentCardIndex] : null;
  const cardsRemaining = shuffledCards.length - revealedCards.length;
  const gameComplete = revealedCards.length === shuffledCards.length;

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
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

        <div className="flex-1 flex flex-col items-center justify-center gap-12">
          {/* Current Card Display */}
          {currentCard && (
            <div 
              className={cn(
                "w-full max-w-2xl bg-white p-12 rounded-[48px] shadow-espresso border-2 border-brand-brown relative overflow-hidden",
                "animate-in zoom-in-95 fade-in duration-500"
              )}
            >
              <div className="absolute top-0 right-0 p-8 font-serif text-5xl text-brand-tan/20 italic">
                #{revealedCards.length}
              </div>
              <p className="text-3xl md:text-4xl font-serif font-bold text-brand-brown leading-relaxed text-center relative z-10">
                {currentCard.ruleText}
              </p>
              <div className="mt-12 pt-8 border-t-2 border-brand-tan/20 text-center text-sm font-bold uppercase tracking-widest text-brand-text-muted">
                Sandy says...
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
                  "relative group transition-all duration-300",
                  isRevealing ? "scale-95 opacity-50" : "hover:scale-105 active:scale-95"
                )}
              >
                {/* Stack effect with multiple cards */}
                <div className="absolute inset-0 bg-brand-brown rounded-[32px] translate-x-2 translate-y-2 opacity-30" />
                <div className="absolute inset-0 bg-brand-brown rounded-[32px] translate-x-1 translate-y-1 opacity-50" />
                
                {/* Main deck card */}
                <div className="relative w-64 h-96 bg-linear-to-br from-brand-brown to-brand-brown/80 rounded-[32px] shadow-espresso border-4 border-brand-tan/30 flex flex-col items-center justify-center p-8 overflow-hidden">
                  {/* Decorative pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 left-4 w-16 h-16 border-4 border-brand-cream rounded-full" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-4 border-brand-cream rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-brand-cream rounded-full" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="font-script text-7xl text-brand-cream mb-6">S</div>
                    <div className="text-brand-cream/90 font-bold text-sm uppercase tracking-widest mb-2">
                      Sandy Said So
                    </div>
                    <div className="text-brand-cream/70 font-bold text-xs uppercase tracking-wider">
                      {cardsRemaining} Cards Left
                    </div>
                  </div>
                  
                  {/* Tap indicator */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-cream/60 text-xs font-bold uppercase tracking-widest animate-pulse">
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
            onClick={() => router.push(`/decks/${id}`)}
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

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-10 select-none rotate-12">
        <div className="font-script text-8xl text-brand-red">Play on.</div>
      </div>
    </div>
  );
}
