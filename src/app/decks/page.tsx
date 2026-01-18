"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { DeckCover } from "@/ui/components/features/decks/DeckCover";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/ui/lib/utils";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { formatCardText } from "@/ui/lib/text-utils";
import { gameModesResource } from "@/ui/resources/game-modes.resource";
import { useApi } from "@/ui/hooks/use-api";
import { PaginatedResponse } from "@/api/types";

export default function DecksPage() {
  const { user, loading: authLoading } = useAuth();
  const [selectedModeId, setSelectedModeId] = useState<number | null>(null);
  const router = useRouter();

  const {
    data: decksResponse,
    loading: decksLoading,
    execute: fetchDecks
  } = useApi<PaginatedResponse<any>>(gameDecksResource.getAll);

  const {
    data: modesData,
    loading: modesLoading,
    execute: fetchModes
  } = useApi<any[]>(gameModesResource.getAll);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchModes();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchDecks(selectedModeId || undefined);
    }
  }, [user, selectedModeId]);

  const decks = decksResponse?.data || [];
  const modes = modesData || [];
  const isLoading = authLoading || (decksLoading && !decks.length) || (modesLoading && !modes.length);



  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-brand-tan/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-3 bg-brand-brown/5 rounded-full flex items-center justify-center">
            <span className="font-script text-3xl text-brand-red">S</span>
          </div>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-brown animate-pulse">Sandy is fetching your secrets...</h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-6 grow">
        <header className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-brown">Your Decks.</h1>
            <p className="mt-4 text-brand-text-muted font-medium italic text-xl">The secrets you&apos;ve collected so far.</p>
          </div>
          
          <Button 
            variant="primary" 
            size="lg" 
            className="shadow-espresso"
            onClick={() => router.push("/decks/build")}
          >
            Build a New Deck
          </Button>
        </header>

        {/* Mode Filter */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedModeId(null)}
              className={cn(
                "px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                selectedModeId === null 
                  ? "bg-brand-brown text-white shadow-lg scale-105" 
                  : "bg-white text-brand-brown/60 hover:bg-brand-tan/10"
              )}
            >
              All Modes
            </button>
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSelectedModeId(mode.id)}
                className={cn(
                  "px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap",
                  selectedModeId === mode.id 
                    ? "bg-brand-red text-white shadow-lg scale-105" 
                    : "bg-white text-brand-brown/60 hover:bg-brand-tan/10"
                )}
              >
                {mode.name}
              </button>
            ))}
          </div>
        </div>

        {decks.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border-4 border-dashed border-brand-tan/30 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-8 opacity-50">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-brown/40">
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/>
                <line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/>
              </svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-brand-brown mb-4">
              {selectedModeId ? "Nothing in this category." : "No secrets yet."}
            </h2>
            <p className="text-brand-text-muted mb-10 max-w-md mx-auto leading-relaxed">
              {selectedModeId 
                ? "Sandy hasn't seen any decks for this game mode yet. Try a different one or build something new!"
                : "Sandy is bored. She needs photos of your friends and a bit of your imagination to start generating dares."
              }
            </p>
            <Button 
              variant="outline" 
              size="xl"
              onClick={() => {
                if (selectedModeId) setSelectedModeId(null);
                else router.push("/decks/build");
              }}
            >
              {selectedModeId ? "See All Decks" : "Start Your First Deck"}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
            {decks.map((deck: any) => {
              return (
                <DeckCover
                  key={deck.id}
                  deck={deck}
                  onClick={() => router.push(`/decks/${deck.id}`)}
                  onUpdate={() => fetchDecks(selectedModeId || undefined)}
                />
              );
            })}
          </div>
        )}
      </main>



      {/* Decorative Overlays */}
      <div className="hidden lg:absolute top-[20%] right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="hidden lg:absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
