"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";

const GAME_MODES = [
  { id: 1, title: "Sandy's Confession", color: "bg-brand-tan", description: "Deep secrets, uncomfortable truths." },
  { id: 2, title: "Pure Provocation", color: "bg-brand-blue", description: "The ultimate drinking game." },
  { id: 3, title: "The Verdict", color: "bg-brand-red", description: "For the brave ones. High stakes." }
];

export default function QuickPlayInitPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Players, 2: Game Mode
  const [players, setPlayers] = useState<string[]>([]);
  const [recentPlayers, setRecentPlayers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load active players from sessionStorage
  useEffect(() => {
    const savedActive = sessionStorage.getItem("quickPlayPlayers");
    if (savedActive) {
      try {
        setPlayers(JSON.parse(savedActive));
      } catch (e) {
        console.error("Parse error", e);
      }
    }

    // Load recent players from localStorage
    const savedRecents = localStorage.getItem("sandyRecentPlayers");
    if (savedRecents) {
      try {
        setRecentPlayers(JSON.parse(savedRecents));
      } catch (e) {
        console.error("Parse error", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sync active players to sessionStorage
  useEffect(() => {
    if (!isLoaded) return;
    sessionStorage.setItem("quickPlayPlayers", JSON.stringify(players));
  }, [players, isLoaded]);

  // Sync recent players to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("sandyRecentPlayers", JSON.stringify(recentPlayers));
  }, [recentPlayers, isLoaded]);

  const addPlayer = (name: string) => {
    const trimmed = name.trim();
    if (trimmed && !players.includes(trimmed)) {
      setPlayers(prev => [...prev, trimmed]);
      setInputValue("");
      
      // Add to recent players if not already there
      setRecentPlayers(prev => {
        const newRecents = [trimmed, ...prev.filter(p => p !== trimmed)].slice(0, 10); // Keep last 10
        return newRecents;
      });
    }
  };

  const removePlayer = (name: string) => {
    setPlayers(players.filter(p => p !== name));
  };

  const handleModeSelect = (modeId: number) => {
    router.push(`/quick-play/${modeId}`);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col pt-32 pb-20 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-tan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-red/5 rounded-full blur-[80px]" />
      </div>

      <main className="container mx-auto px-6 max-w-3xl grow relative z-10">
        
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-4 py-1 bg-brand-tan/20 text-brand-brown rounded-full text-[10px] font-bold uppercase tracking-widest">
                Step 1 of 2
              </div>
              <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">Who is playing?</h1>
              <p className="text-xl text-brand-text-muted italic">
                Sandy needs to know her victims.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[32px] border-2 border-brand-tan/20 shadow-sm mb-8">
              <div className="flex gap-4 mb-8">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addPlayer(inputValue))}
                  className="grow px-6 py-4 rounded-xl bg-brand-cream/30 border border-brand-tan/10 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium"
                  placeholder="Enter player name..."
                  autoFocus
                />
                <Button onClick={() => addPlayer(inputValue)} disabled={!inputValue.trim()}>
                  Add
                </Button>
              </div>

              {/* Recent Players Suggestions */}
              {recentPlayers.length > 0 && (
                <div className="mb-8 animate-in fade-in slide-in-from-top-2 duration-500">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
                    Played with recently
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentPlayers.filter(p => !players.includes(p)).map(player => (
                      <button
                        key={player}
                        onClick={() => addPlayer(player)}
                        className="px-3 py-1.5 rounded-full border border-brand-tan/20 bg-white text-xs font-medium text-brand-brown hover:bg-brand-tan/10 hover:border-brand-tan/40 transition-all"
                      >
                        + {player}
                      </button>
                    ))}
                    {recentPlayers.filter(p => !players.includes(p)).length === 0 && (
                      <span className="text-xs text-brand-text-muted/50 italic pl-1">All recent players added.</span>
                    )}
                  </div>
                </div>
              )}

              {players.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {players.map((player) => (
                    <div 
                      key={player}
                      className="group flex items-center gap-2 px-4 py-2 bg-brand-tan/10 rounded-full border border-brand-tan/20"
                    >
                      <span className="font-bold text-brand-brown text-sm">{player}</span>
                      <button 
                        onClick={() => removePlayer(player)}
                        className="text-brand-brown/50 hover:text-brand-red transition-colors"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-brand-text-muted/50 text-sm italic font-medium">
                  No players added yet.
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button 
                size="xl" 
                variant="primary"
                disabled={players.length < 2}
                onClick={() => setStep(2)}
                className="shadow-xl"
              >
                Select Game Mode
              </Button>
            </div>
            {players.length < 2 && players.length > 0 && (
               <p className="text-center text-[10px] text-brand-red font-bold uppercase tracking-widest mt-4 animate-pulse">
                 At least 2 players required
               </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setStep(1)}
              className="absolute top-0 left-0 flex items-center gap-2 text-brand-brown/60 hover:text-brand-brown transition-colors uppercase text-[10px] font-bold tracking-[0.2em]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7M5 12h14"/></svg>
              Back to Players
            </button>

            <div className="text-center mb-12 mt-8">
               <div className="inline-block mb-4 px-4 py-1 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-bold uppercase tracking-widest">
                Step 2 of 2
              </div>
              <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">Pick your poison.</h1>
              <p className="text-xl text-brand-text-muted italic">
                {players.length} players ready. How do you want to play?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {GAME_MODES.map((mode) => (
                <div 
                  key={mode.id}
                  onClick={() => handleModeSelect(mode.id)}
                  className="group relative cursor-pointer bg-white p-8 rounded-[32px] border-2 border-brand-tan/20 hover:border-brand-brown transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                >
                  <div className={cn("w-12 h-12 rounded-full mb-6 flex items-center justify-center text-white font-bold text-xl shadow-inner", mode.color)}>
                    {mode.id}
                  </div>
                  <h3 className="text-xl font-serif font-bold text-brand-brown mb-3">{mode.title}</h3>
                  <p className="text-sm text-brand-text-muted italic mb-6 leading-relaxed">
                    {mode.description}
                  </p>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-brown/40 group-hover:text-brand-brown transition-colors">
                    Select Mode &toea;
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      <div className="fixed bottom-10 right-10 pointer-events-none opacity-10 select-none rotate-6">
         <div className="font-script text-8xl text-brand-brown">Sandy.</div>
      </div>
    </div>
  );
}
