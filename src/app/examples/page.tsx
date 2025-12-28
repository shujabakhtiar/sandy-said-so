"use client";

import { useState } from "react";
import { Navbar } from "@/ui/components/layout/Navbar";
import { GameEngine } from "@/ui/components/features/GameEngine";
import { EXAMPLE_DECKS } from "@/lib/example-decks";
import { Button } from "@/ui/components/ui/Button";

export default function ExamplesPage() {
  const [selectedDeck, setSelectedDeck] = useState<any>(null);

  const handleSelectMode = (deck: any) => {
    setSelectedDeck(deck);
  };

  const handleBackToSelection = () => {
    setSelectedDeck(null);
  };

  const modesMap = [
    { title: "Sandy's Confession", color: "bg-brand-tan" },
    { title: "Pure Provocation", color: "bg-brand-blue" },
    { title: "The Verdict", color: "bg-brand-red" }
  ];

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />

      {!selectedDeck ? (
        <main className="container mx-auto px-6 max-w-5xl grow flex flex-col text-center">
          <header className="mb-16">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-tan/20 text-brand-brown font-bold text-[10px] tracking-[0.2em] uppercase">
              Sandbox Mode
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-brown mb-8 leading-tight">
              See how <br />
              <span className="text-brand-red italic underline decoration-brand-tan/30 underline-offset-8">Sandy Plays.</span>
            </h1>
            <p className="text-xl md:text-2xl text-brand-text-muted max-w-2xl mx-auto leading-relaxed font-medium italic">
              Imagine Alex, Jordan, Sam, and Taylor are mid-party. Sandy has already scanned their group chat. Pick a mode to see how she instigates.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
            {EXAMPLE_DECKS.map((deck) => {
              const modeInfo = modesMap.find(m => m.title === deck.gameMode.name);
              return (
                <div 
                  key={deck.id}
                  onClick={() => handleSelectMode(deck)}
                  className="bg-white p-10 rounded-[40px] border border-brand-tan/10 shadow-espresso hover:shadow-espresso-hover hover:-translate-y-2 transition-all cursor-pointer group flex flex-col items-center"
                >
                  <div className={`w-12 h-12 rounded-full ${modeInfo?.color} mb-6 flex items-center justify-center shadow-inner`}>
                    <div className="w-4 h-4 rounded-full bg-white/20 animate-pulse" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-brand-brown mb-2">{deck.gameMode.name}</h3>
                  <p className="text-brand-text-muted text-sm font-medium italic mb-8">
                    Sample card set: &quot;{deck.title}&quot;
                  </p>
                  <Button variant="outline" className="mt-auto group-hover:bg-brand-brown group-hover:text-white transition-colors">
                    Try This Mode
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="mt-24 text-brand-brown/30 font-bold uppercase text-[10px] tracking-[0.4em]">
            No account needed for examples. Just play.
          </div>
        </main>
      ) : (
        <GameEngine 
          deck={selectedDeck} 
          isExample={true} 
          onBack={handleBackToSelection} 
        />
      )}

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-10 select-none rotate-12">
        <div className="font-script text-8xl text-brand-red">Examples.</div>
      </div>
    </div>
  );
}
