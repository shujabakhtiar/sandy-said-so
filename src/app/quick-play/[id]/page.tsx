"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";
import { GameEngine } from "@/ui/components/features/GameEngine";
import { QUICK_PLAY_DECKS } from "@/lib/quick-play-decks";
import { injectPlayerNames } from "@/lib/utils/deck-utils";

export default function QuickPlayGameModePage() {
  const params = useParams();
  const router = useRouter();
  const idStr = params?.id as string;
  const modeId = parseInt(idStr);

  const [gameDeck, setGameDeck] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Get players
    const savedPlayers = sessionStorage.getItem("quickPlayPlayers");
    if (!savedPlayers) {
      // No players found? Go back to init
      router.push("/quick-play/init");
      return;
    }

    let players: string[] = [];
    try {
      players = JSON.parse(savedPlayers);
    } catch (e) {
      console.error("Failed to parse players", e);
      router.push("/quick-play/init");
      return;
    }

    if (players.length < 2) {
      router.push("/quick-play/init");
      return;
    }

    // 2. Find template deck
    const templateDeck = QUICK_PLAY_DECKS.find(d => d.id === modeId);
    if (!templateDeck) {
      // Invalid mode? Go back or show error
      console.error("Invalid game mode id");
      router.push("/quick-play/init");
      return;
    }

    // 3. Inject names
    const playableDeck = injectPlayerNames(templateDeck, players);
    setGameDeck(playableDeck);
    setLoading(false);

  }, [modeId, router]);

  const handleBack = () => {
    router.push("/quick-play/init");
  };

  if (loading || !gameDeck) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col pt-32 pb-20 relative overflow-hidden">
        <Navbar />
         <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-tan/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-red/5 rounded-full blur-[80px]" />
        </div>
        <main className="container mx-auto px-6 max-w-3xl grow relative z-10 flex flex-col items-center justify-center text-center">
          <div className="animate-pulse font-serif text-3xl text-brand-brown">
            Sandy is shuffling the cards...
          </div>
        </main>
      </div>
    );
  }

  // Use GameEngine similar to examples page
  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      <GameEngine 
        deck={gameDeck} 
        isExample={true} // Reusing verification/example logic to avoid DB saves for now
        onBack={handleBack} 
      />
    </div>
  );
}
