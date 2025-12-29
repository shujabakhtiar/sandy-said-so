"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { GameCard } from "@/ui/components/features/GameCard";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";
import { gameCardsResource } from "@/ui/resources/game-cards.resource";
import { cn } from "@/ui/lib/utils";

export default function DeckViewPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [newCardText, setNewCardText] = useState("");
  const [deletingCard, setDeletingCard] = useState<any>(null);
  const [isDeletingDeck, setIsDeletingDeck] = useState(false);
  const [confirmDeckName, setConfirmDeckName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<"live" | "drafts">("live");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const fetchDeck = async () => {
    if (user && id) {
      setLoading(true);
      try {
        const data = await gameDecksResource.getById(id as string);
        setDeck(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDeck();
  }, [user, id]);

  const handleUpdateCard = async () => {
    if (!editingCard) return;
    setIsProcessing(true);
    try {
      await gameCardsResource.update(editingCard.id, { ruleText: newCardText });
      setDeck({
        ...deck,
        gameCards: deck.gameCards.map((c: any) => 
          c.id === editingCard.id ? { ...c, ruleText: newCardText } : c
        )
      });
      setEditingCard(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCard = async () => {
    if (!deletingCard) return;
    setIsProcessing(true);
    try {
      await gameCardsResource.delete(deletingCard.id);
      setDeck({
        ...deck,
        gameCards: deck.gameCards.filter((c: any) => c.id !== deletingCard.id)
      });
      setDeletingCard(null);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };
  const handlePromoteCard = async (card: any) => {
    setIsProcessing(true);
    try {
      await gameCardsResource.update(card.id, { isDraft: false });
      setDeck({
        ...deck,
        gameCards: deck.gameCards.map((c: any) => 
          c.id === card.id ? { ...c, isDraft: false } : c
        )
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteDeck = async () => {
    if (confirmDeckName !== deck.title) return;
    setIsProcessing(true);
    try {
      await gameDecksResource.delete(id as string);
      router.push("/decks");
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  if (authLoading || loading) return null;
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
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-brown wrap-break-word">{deck.title}</h1>
            </div>
            <p className="mt-4 text-brand-text-muted font-medium italic text-lg md:text-xl md:ml-14">Rules generated by Sandy.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 md:gap-4 w-full sm:w-auto">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto justify-center px-6 border-brand-red/30 text-brand-red hover:bg-brand-red/5"
              onClick={() => setIsDeletingDeck(true)}
            >
              Delete Deck
            </Button>
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
                {deck.gameCards?.filter((c: any) => !c.isDraft).length || 0}
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
                {deck.gameCards?.filter((c: any) => c.isDraft).length || 0}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[
            ...(deck.gameCards || [])
              .filter((c: any) => activeTab === "live" ? !c.isDraft : c.isDraft)
              .map((c: any) => ({ ...c, isChaos: false })),
            ...(activeTab === "live" ? (deck.sandyChaosCards || []).map((c: any) => ({ ...c, isChaos: true })) : [])
          ].map((card: any, idx: number) => (
            <GameCard 
              key={card.isChaos ? `chaos-${card.id}` : `reg-${card.id}`} 
              card={card} 
              onEdit={card.isChaos ? undefined : (card) => {
                setEditingCard(card);
                setNewCardText(card.ruleText);
              }}
              onDelete={card.isChaos ? undefined : (card) => setDeletingCard(card)}
              onPromote={activeTab === "drafts" && !card.isChaos ? handlePromoteCard : undefined}
              showStatusBadge={activeTab === "drafts"}
            />
          ))}
          
          {activeTab === "live" && (deck.gameCards?.filter((c: any) => !c.isDraft).length || 0) === 0 && (
            <div className="col-span-full py-20 text-center bg-white/50 rounded-[40px] border-2 border-dashed border-brand-tan/30">
              <p className="text-brand-text-muted italic text-lg">No active cards. Pull some from drafts or let Sandy generate more.</p>
            </div>
          )}
        </div>
      </main>

      {/* Edit Card Modal */}
      {editingCard && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
          <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={() => setEditingCard(null)} />
          
          <div className="relative group animate-in zoom-in-95 duration-300 w-full max-w-md">
            <div className="bg-[#faf9f6] border-2 border-brand-tan/20 rounded-[24px] shadow-espresso relative overflow-hidden flex flex-col p-8 md:p-10 aspect-2/3">
              
              {/* Top Action Buttons */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 flex gap-4 md:gap-6 items-center z-30">
                <button 
                  className="text-xs md:text-sm font-bold text-brand-red hover:opacity-70 transition-all uppercase tracking-widest"
                  onClick={() => setEditingCard(null)}
                >
                  Cancel
                </button>
                <button 
                  className="text-xs md:text-sm font-bold text-emerald-600 hover:opacity-70 transition-all uppercase tracking-widest disabled:opacity-50"
                  onClick={handleUpdateCard}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Saving..." : "Save"}
                </button>
              </div>

              {/* Top Logo */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 opacity-80">
                <div className="flex items-baseline gap-1 text-brand-red">
                  <span className="font-serif text-xs md:text-sm tracking-tight font-bold">
                    Sandy
                  </span>
                  <span className="font-script text-base md:text-lg font-normal">
                    said so.
                  </span>
                </div>
              </div>

              {/* Card Header */}
              <div className="text-center mt-12 md:mt-16 mb-4 md:mb-8">
                <h3 className="text-2xl md:text-4xl font-serif font-black italic leading-none underline decoration-offset-4 text-brand-red underline-brand-red/20">
                  Sandy says...
                </h3>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 flex flex-col items-start justify-center px-4 md:px-6 relative">
                <textarea
                  autoFocus
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                  className="w-full h-full bg-transparent border-none focus:ring-0 outline-none text-xl md:text-3xl font-serif font-black text-left leading-relaxed text-brand-brown resize-none z-10 scrollbar-hide"
                  placeholder="What's the rule?"
                />
              </div>

              {/* Bottom Decoration */}
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between pointer-events-none">
                <div className="flex flex-col items-start gap-1">
                  <div className="h-px w-6 md:w-8 rounded-full bg-brand-red/30" />
                  <p className="text-[8px] md:text-[10px] font-serif italic font-bold text-brand-red tracking-[0.2em] uppercase">
                    Drink if you dare
                  </p>
                </div>
                
                <div className="opacity-80">
                  <div className="flex items-baseline gap-1 text-brand-red rotate-180">
                    <span className="font-serif text-xs md:text-sm tracking-tight font-bold">
                      Sandy
                    </span>
                    <span className="font-script text-base md:text-lg font-normal">
                      said so.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Card Confirmation */}
      {deletingCard && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={() => setDeletingCard(null)} />
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative shadow-espresso animate-in zoom-in-95 duration-300 text-center">
            <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-brand-brown mb-4">
              {activeTab === "live" ? "Move to drafts?" : "Permanently remove?"}
            </h2>
            <p className="text-brand-text-muted mb-10 italic">
              {activeTab === "live" 
                ? "This card will be moved to your drafts. Sandy will remember it, but it won't appear in games."
                : "This draft will be permanently removed from Sandy's notebook."}
            </p>
            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setDeletingCard(null)}>
                No, Keep it
              </Button>
              <Button 
                variant="primary" 
                size="lg" 
                className={cn(
                  "flex-1 border-none hover:opacity-90",
                  activeTab === "live" ? "bg-brand-brown" : "bg-brand-red"
                )} 
                onClick={handleDeleteCard}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : activeTab === "live" ? "Move to Draft" : "Remove forever"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Deck Confirmation */}
      {isDeletingDeck && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={() => setIsDeletingDeck(false)} />
          <div className="bg-white rounded-[40px] p-10 max-w-md w-full relative shadow-espresso animate-in zoom-in-95 duration-300">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-red/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-red font-serif text-4xl italic">S</div>
              <h2 className="text-3xl font-serif font-bold text-brand-brown mb-2">Destroy this deck?</h2>
              <p className="text-sm text-brand-text-muted italic px-4">
                This action cannot be undone. All cards and rules will be permanently erased from Sandy&apos;s memory.
              </p>
            </div>

            <div className="mb-8">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-4 text-center">
                Type <span className="text-brand-brown font-black select-none">&quot;{deck.title}&quot;</span> to confirm
              </label>
              <input
                type="text"
                autoFocus
                value={confirmDeckName}
                onChange={(e) => setConfirmDeckName(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all text-center"
                placeholder="Type deck name..."
              />
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1" onClick={() => setIsDeletingDeck(false)}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                size="lg" 
                className="flex-1 bg-brand-red border-brand-red hover:bg-brand-red/90" 
                onClick={handleDeleteDeck}
                disabled={confirmDeckName !== deck.title || isProcessing}
              >
                {isProcessing ? "Destroying..." : "Destroy Deck"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative Branding */}
      <div className="fixed bottom-10 left-10 pointer-events-none opacity-10 select-none -rotate-12">
        <div className="font-script text-8xl text-brand-brown">No secrets safe.</div>
      </div>
    </div>
  );
}
