"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Navbar } from "@/ui/components/layout/Navbar";
import { useParams, useRouter } from "next/navigation";
import { GameEngine } from "@/ui/components/features/GameEngine";
import { gameDecksResource } from "@/ui/resources/game-decks.resource";

export default function GamePlayPage() {
  const { id } = useParams();
  const { user, loading: authLoading } = useAuth();
  const [deck, setDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchDeck = async () => {
      if (user && id) {
        try {
          const data = await gameDecksResource.getById(id as string, { limit: 1000, isDraft: false });
          setDeck(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchDeck();
  }, [user, id]);

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
        <h2 className="text-3xl font-serif font-bold text-brand-brown animate-pulse">Sandy is shuffling the secrets...</h2>
      </div>
    );
  }

  if (!deck) return <div className="p-20 text-center font-serif text-2xl text-brand-brown">Deck not found.</div>;

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
      <GameEngine 
        deck={{
          ...deck,
          gameCards: deck.gameCards?.data || []
        }} 
      />

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-10 select-none rotate-12">
        <div className="font-script text-8xl text-brand-red">Play on.</div>
      </div>
    </div>
  );
}
