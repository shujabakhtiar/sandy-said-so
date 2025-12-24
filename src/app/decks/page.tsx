"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DecksPage() {
  const { user, loading } = useAuth();
  const [decks, setDecks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetch("/api/game-decks")
        .then((res) => res.json())
        .then((data) => setDecks(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  if (loading) return null;

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
          
          <Button variant="primary" size="lg" className="shadow-espresso">
            Build a New Deck
          </Button>
        </header>

        {decks.length === 0 ? (
          <div className="bg-white rounded-[40px] p-20 text-center border-4 border-dashed border-brand-tan/30 shadow-sm">
            <div className="w-24 h-24 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-8 opacity-50">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand-brown/40"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="12" x2="12" y1="8" y2="16"/><line x1="8" x2="16" y1="12" y2="12"/></svg>
            </div>
            <h2 className="text-3xl font-serif font-bold text-brand-brown mb-4">No secrets yet.</h2>
            <p className="text-brand-text-muted mb-10 max-w-md mx-auto leading-relaxed">
              Sandy is bored. She needs photos of your friends and a bit of your imagination to start generating dares.
            </p>
            <Button variant="outline" size="xl">
              Start Your First Deck
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {decks.map((deck: any) => (
              <div key={deck.id} className="group bg-white rounded-[32px] overflow-hidden border border-brand-tan/20 shadow-espresso hover:shadow-2xl transition-all duration-500 cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-brown/10 group-hover:bg-brand-brown/0 transition-colors duration-500 z-10" />
                  <Image 
                    src="/espresso_cards.png" 
                    alt={deck.title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-widest text-brand-brown">
                      {deck.gameMode?.name || "Standard"}
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold text-brand-brown mb-2">{deck.title || "Untitled Secret"}</h3>
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-brand-text-muted">
                    <span>{deck._count?.gameCards || 0} Cards</span>
                    <span className="w-1 h-1 bg-brand-tan rounded-full" />
                    <span>Created {new Date(deck.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Decorative Overlays */}
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none -z-10" />
    </div>
  );
}
