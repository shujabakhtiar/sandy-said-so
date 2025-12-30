"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/ui/lib/utils";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { gameModesResource } from "@/ui/resources/game-modes.resource";

export default function DecksPage() {
  const { user, loading } = useAuth();
  const [decks, setDecks] = useState<any[]>([]);
  const [modes, setModes] = useState<any[]>([]);
  const [selectedModeId, setSelectedModeId] = useState<number | null>(null);
  const [editingDeck, setEditingDeck] = useState<any>(null);
  const [newTitle, setNewTitle] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  const fetchData = async () => {
    if (user) {
      try {
        const [decksData, modesData] = await Promise.all([
          gameDecksResource.getAll<any[]>(selectedModeId || undefined),
          gameModesResource.getAll<any[]>()
        ]);
        setDecks(decksData);
        setModes(modesData);
      } catch (err) {
        console.error(err);
      } finally {
        setIsInitialLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [user, selectedModeId]);

  const handleUpdateTitle = async () => {
    if (!editingDeck) return;
    setIsUpdating(true);
    try {
      await gameDecksResource.update(editingDeck.id, { title: newTitle });
      setDecks(decks.map(d => d.id === editingDeck.id ? { ...d, title: newTitle } : d));
      setEditingDeck(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading || isInitialLoading) {
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
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-brand-blue/10 text-brand-blue font-bold text-[10px] tracking-widest uppercase">
              Authenticated • {user?.email}
            </div>
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
              const isChaos = deck.gameMode?.name?.toLowerCase().includes("chaos");
              return (
                <div 
                  key={deck.id} 
                  onClick={() => router.push(`/decks/${deck.id}`)}
                  className="group relative cursor-pointer"
                >
                  {/* Subtle 3D Depth Layer */}
                  <div className="absolute inset-0 bg-brand-brown/5 rounded-[24px] translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-all duration-500 ease-out" />
                  
                  {/* The Deck Card */}
                  <div className="relative aspect-[3/4.2] bg-white border border-brand-tan/10 rounded-[24px] shadow-xl group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden flex flex-col">
                    
                    {/* Header: Consistent Height & Clean Gradient */}
                    <div className={cn(
                      "h-36 w-full relative overflow-hidden flex flex-col items-center justify-center",
                      isChaos 
                        ? "bg-linear-to-b from-brand-red to-[#811331]" 
                        : "bg-linear-to-b from-brand-brown to-brand-text"
                    )}>
                      {/* Subdued Decorative Gloss */}
                      <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-30" />
                      
                      <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                            <path d="M12 2s-5 7-5 10c0 3 2.5 5 5 5s5-2 5-5c0-3-5-10-5-10z" />
                          </svg>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
                          {deck.gameMode?.name ? deck.gameMode.name : (isChaos ? "CHAOS MODE" : "SANDY'S CONFESSION")}
                        </span>
                      </div>
                    </div>

                    {/* Content Section: Left Aligned as per image */}
                    <div className="flex-1 p-8 flex flex-col relative">
                      <div className="flex-1 flex flex-col justify-start pt-2">
                        <h3 className="text-3xl font-serif font-black text-brand-brown tracking-tight leading-none mb-4 group-hover:text-brand-red transition-colors duration-300">
                          {deck.title || "New Deck"}
                        </h3>
                      </div>

                      {/* Footer: Stats & Brand Mark */}
                      <div className="mt-auto flex items-end justify-between border-t border-brand-tan/10 pt-6">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-brand-tan mb-1">Total Cards</span>
                          <span className="text-4xl font-serif font-black text-brand-brown leading-none">
                            {deck._count?.gameCards || 0}
                          </span>
                        </div>
                        
                        {/*div className="flex items-baseline gap-1 text-brand-red pb-1">
                          <span className="font-serif text-base tracking-tight font-bold">
                            Sandy
                          </span>
                          <span className="font-script text-xl font-normal">
                            said so.
                          </span>
                        </div> */}
                      </div>
                    </div>

                    {/* Rename Anchor Tool */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingDeck(deck);
                        setNewTitle(deck.title || "");
                      }}
                      className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Edit Title Modal */}
      {editingDeck && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={() => setEditingDeck(null)} />
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative shadow-espresso animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-brand-brown mb-2">Change the secret.</h2>
              <p className="text-sm text-brand-text-muted italic">Sandy is listening...</p>
            </div>
            
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
                  if (e.key === "Escape") setEditingDeck(null);
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
                onClick={() => setEditingDeck(null)}
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
          </div>
        </div>
      )}

      {/* Decorative Overlays */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
