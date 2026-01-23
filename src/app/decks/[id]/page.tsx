"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { gameCardsResource } from "@/ui/resources/game-cards.resource";
import { cn } from "@/ui/lib/utils";
import { DeckDelete } from "@/ui/components/features/decks/DeckDelete";
import { DeckEditTitle } from "@/ui/components/features/decks/DeckEditTitle";
import { DeckCard } from "@/ui/components/features/deck-cards/DeckCard";
import { LoadingModeShuffle } from "@/ui/components/ui/LoadingModeShuffle";
import { sandyToast } from "@/ui/lib/sandy-toast";

export default function DeckViewPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [partialLoading, setPartialLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"live" | "drafts">("live");
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchDeck = async (targetPage = page, targetTab = activeTab, isInitial = false) => {
    if (user && id) {
      if (isInitial) setLoading(true);
      else setPartialLoading(true);
      
      try {
        const data = await gameDecksResource.getById(id as string, {
          page: targetPage,
          limit: 50,
          isDraft: targetTab === "drafts"
        });
        setDeck(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
        setPartialLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && id) {
      fetchDeck(1, activeTab, !deck);
      setPage(1);
    }
  }, [user, id, activeTab]);

  useEffect(() => {
    if (user && id && page > 1) {
      fetchDeck(page, activeTab);
    }
  }, [page, user, id]);

  const handlePromoteCard = async (card: any) => {
    try {
      await gameCardsResource.update(card.id, { isDraft: false });
      sandyToast.success("Card added to deck.", "Sandy brought this card to life.");
      await fetchDeck(); // Refetch to sync counts and pagination
    } catch (err: any) {
      sandyToast.error(err.message || "Sandy decided this card should stay in the notebook.");
    }
  };




  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-brand-tan/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-3 bg-brand-brown/5 rounded-full flex items-center justify-center">
            <span className="font-script text-3xl text-brand-red">S</span>
          </div>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-brown animate-pulse">Sandy is reading the room...</h2>
      </div>
    );
  }
  if (!deck) return <div className="p-20 text-center">Deck not found.</div>;

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-6 grow">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-brand-red/10 text-brand-red font-bold text-[10px] tracking-widest uppercase">
              {deck.gameMode?.name || "Standard Mode"}
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push("/decks")}
                className="group flex items-center gap-2 shrink-0"
                title="Back to Decks"
              >
                <div className="w-11 h-11 rounded-full bg-brand-cream border-2 border-brand-tan/20 text-brand-brown flex items-center justify-center group-hover:bg-brand-brown group-hover:text-white group-hover:shadow-espresso transition-all duration-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 19l-7-7 7-7"/>
                  </svg>
                </div>
              </button>
              <div className="flex items-center gap-3 md:gap-4 group/title">
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-brown wrap-break-word">
                  {deck.title}
                </h1>
                <DeckEditTitle 
                  deck={deck} 
                  onUpdate={() => fetchDeck()} 
                  trigger={
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-brand-brown/5 hover:bg-brand-brown/10 text-brand-brown/40 hover:text-brand-brown flex items-center justify-center transition-all duration-300">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                    </div>
                  }
                />
              </div>
            </div>
            <p className="mt-4 text-brand-text-muted font-medium italic text-lg md:text-xl md:ml-14">Rules generated by Sandy.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            <DeckDelete deck={deck} />
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto justify-center px-6 shadow-espresso"
              onClick={() => router.push(`/decks/play/${id}`)}
            >
              Start Game
            </Button>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10 border-b border-brand-tan/20 pb-6">
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setActiveTab("live")}
              className={cn(
                "relative pb-2 text-sm font-black uppercase tracking-widest transition-all",
                activeTab === "live" ? "text-brand-brown" : "text-brand-brown/40 hover:text-brand-brown/60"
              )}
            >
              Active Cards
              <span className="ml-2 px-1.5 py-0.5 rounded-md bg-brand-brown/5 text-[10px]">
                {deck.gameCards?.meta?.counts?.live || 0}
              </span>
              {activeTab === "live" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-brown rounded-full" />
              )}
            </button>
            <button 
              onClick={() => setActiveTab("drafts")}
              className={cn(
                "relative pb-2 text-sm font-black uppercase tracking-widest transition-all",
                activeTab === "drafts" ? "text-brand-brown" : "text-brand-brown/40 hover:text-brand-brown/60"
              )}
            >
              Sandy&apos;s Drafts
              <span className="ml-2 px-1.5 py-0.5 rounded-md bg-brand-red/5 text-brand-red text-[10px]">
                {deck.gameCards?.meta?.counts?.drafts || 0}
              </span>
              {activeTab === "drafts" && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-red rounded-full" />
              )}
            </button>
          </div>

          {activeTab === "drafts" && (
            <p className="text-xs text-brand-text-muted italic flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              These cards are in Sandy&apos;s notebook and won&apos;t appear in games.
            </p>
          )}
        </div>

        <div className="relative min-h-[400px]">
          {partialLoading && (
            <div className="absolute inset-0 z-50 bg-brand-cream/80 backdrop-blur-[2px] rounded-[40px] flex items-start justify-center pt-32">
              <LoadingModeShuffle />
            </div>
          )}

          <div className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 transition-all duration-500",
            partialLoading ? "opacity-30 grayscale-[0.5] blur-[1px]" : "opacity-100"
          )}>
            {[
              ...(deck.gameCards?.data || [])
                .map((c: any) => ({ ...c, isChaos: false })),
              ...(activeTab === "live" && deck.gameMode?.name !== "Dimmed Lights" ? (deck.sandyChaosCards || []).map((c: any) => ({ ...c, isChaos: true })) : [])
            ].map((card: any, idx: number) => (
              <DeckCard
                key={card.isChaos ? `chaos-${card.id}` : `reg-${card.id}`}
                card={card}
                activeTab={activeTab}
                onUpdate={(updatedCard) => {
                  fetchDeck(); // Refetch to stay in sync
                }}
                onDelete={(cardId) => {
                  fetchDeck(); // Refetch to stay in sync
                }}
                onPromote={activeTab === "drafts" && !card.isChaos ? handlePromoteCard : undefined}
                showStatusBadge={activeTab === "drafts"}
              />
            ))}
            
            {activeTab === "live" && (deck.gameCards?.meta?.counts?.live || 0) === 0 && (
              <div className="col-span-full py-20 text-center bg-white/50 rounded-[40px] border-2 border-dashed border-brand-tan/30">
                <p className="text-brand-text-muted italic text-lg">No active cards. Pull some from drafts or let Sandy generate more.</p>
              </div>
            )}
          </div>
        </div>

        {deck.gameCards?.meta?.totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-6">
            <button
              disabled={page <= 1}
              onClick={() => setPage(p => p - 1)}
              className="w-12 h-12 rounded-full bg-white border-2 border-brand-tan/20 text-brand-brown flex items-center justify-center disabled:opacity-30 hover:bg-brand-brown hover:text-white transition-all duration-300 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-brand-brown text-lg">Page</span>
              <div className="w-10 h-10 rounded-xl bg-brand-brown text-white flex items-center justify-center font-bold shadow-espresso">
                {page}
              </div>
              <span className="font-serif font-bold text-brand-brown text-lg">of {deck.gameCards.meta.totalPages}</span>
            </div>
            <button
              disabled={page >= deck.gameCards.meta.totalPages}
              onClick={() => setPage(p => p + 1)}
              className="w-12 h-12 rounded-full bg-white border-2 border-brand-tan/20 text-brand-brown flex items-center justify-center disabled:opacity-30 hover:bg-brand-brown hover:text-white transition-all duration-300 shadow-sm"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        )}
      </main>
      {/* Decorative Branding */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-10 select-none -rotate-12">
        <div className="font-script text-8xl text-brand-brown">No secrets safe.</div>
      </div>
    </div>
  );
}
