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
          const data = await gameDecksResource.getById(id as string);
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
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin" />
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
          gameCards: deck.gameCards?.filter((c: any) => !c.isDraft) || []
        }} 
      />

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-10 select-none rotate-12">
        <div className="font-script text-8xl text-brand-red">Play on.</div>
      </div>
    </div>
  );
}
