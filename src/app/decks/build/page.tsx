"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useAuth } from "@/ui/providers/AuthContext";
import { cn } from "@/ui/lib/utils";

const modes = [
  { id: 1, title: "Sandy's Confession", tag: "Truth or Dare", description: "Deep secrets, uncomfortable truths, and social sabotage.", color: "bg-brand-tan" },
  { id: 2, title: "Pure Provocation", tag: "Drinking Rituals", description: "The ultimate drinking game. Sandy makes the rules for the circle, Kings Cup style.", color: "bg-brand-blue" },
  { id: 3, title: "The Verdict", tag: "Naughty & Spicy", description: "For the brave ones. High-stakes adult games and spicy sex dares.", color: "bg-brand-red" }
];

export default function BuildDeckPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [useImages, setUseImages] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");
  const [goal, setGoal] = useState("");
  const [secrets, setSecrets] = useState("");
  const [extra, setExtra] = useState("");
  const [title, setTitle] = useState("");
  const [chaosLevel, setChaosLevel] = useState(3);
  const [showChaosModal, setShowChaosModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreateDeck = async () => {
    if (!selectedMode) return;
    
    // Check if any fields are set
    const hasContext = goal.trim() || secrets.trim() || extra.trim() || notes.trim();
    
    if (!hasContext && !showChaosModal) {
      setShowChaosModal(true);
      return;
    }

    setLoading(true);
    try {
      // Create the Deck
      const response = await fetch("/api/game-decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameModeId: selectedMode,
          title: title || "New Deck",
          notes,
          goal,
          secrets,
          extra,
          chaosLevel,
          useImages
        }),
      });

      if (response.ok) {
        const deck = await response.json();
        
        // Redirect to card selection page
        router.push(`/decks/select-cards/${deck.id}`);
      } else {
        console.error("Failed to create deck");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-32 h-32 mb-12">
          <div className="absolute inset-0 border-4 border-brand-tan/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-4 bg-brand-brown/10 rounded-full flex items-center justify-center">
            <span className="font-script text-4xl text-brand-red">S</span>
          </div>
        </div>
        <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4 animate-pulse">Sandy&apos;s preparing...</h1>
        <p className="text-xl text-brand-text-muted italic max-w-sm mx-auto">
          Setting up your deck. You&apos;ll get to choose from Sandy&apos;s suggestions in just a moment.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col pt-32 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-6 max-w-3xl grow">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 grow rounded-full transition-all duration-500",
                  step >= i ? "bg-brand-brown" : "bg-brand-tan/30"
                )} 
              />
            ))}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-text-muted">
            Step {step} of 3 • {step === 1 ? "Choose Mode" : step === 2 ? "Configure" : "Finalize"}
          </span>
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">How dangerous?</h1>
            <p className="text-xl text-brand-text-muted mb-12 italic font-medium">Sandy has several ways of ruining your night. Choose wisely.</p>
            
            <div className="space-y-4">
              {modes.map((mode) => (
                <div 
                  key={mode.id}
                  onClick={() => {setSelectedMode(mode.id); nextStep()}}
                  className={cn(
                    "p-8 bg-white rounded-[32px] border-2 transition-all cursor-pointer group hover:shadow-xl",
                    selectedMode === mode.id ? "border-brand-brown shadow-espresso" : "border-transparent"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className={cn("w-4 h-4 rounded-full shadow-inner shadow-black/20", mode.color)} />
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-brand-brown">{mode.title}</h3>
                        <p className="text-brand-text-muted text-sm font-medium">{mode.description}</p>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted opacity-50">
                      {mode.tag}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
              <Button 
                variant="primary" 
                size="xl" 
                disabled={!selectedMode}
                onClick={nextStep}
              >
                Continue to Config
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">The visual element.</h1>
            <p className="text-xl text-brand-text-muted mb-12 italic font-medium">Do you want Sandy to analyze photos of your friends for specific dares?</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div 
                onClick={() => {setUseImages(true); nextStep()}}
                className={cn(
                  "p-10 bg-white rounded-[32px] border-2 text-center transition-all cursor-pointer hover:shadow-xl",
                  useImages === true ? "border-brand-brown shadow-espresso" : "border-transparent"
                )}
              >
                <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-brown mb-2">Use Images</h3>
                <p className="text-brand-text-muted text-xs font-bold uppercase tracking-widest leading-relaxed">Personalized chaos based on who is actually there.</p>
              </div>

              <div 
                onClick={() => {setUseImages(false); nextStep()}}
                className={cn(
                  "p-10 bg-white rounded-[32px] border-2 text-center transition-all cursor-pointer hover:shadow-xl",
                  useImages === false ? "border-brand-brown shadow-espresso" : "border-transparent"
                )}
              >
                <div className="w-16 h-16 bg-brand-tan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-brown">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v19"/><path d="M5 8h14"/><path d="M15 21a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6Z"/></svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-brand-brown mb-2">Text Only</h3>
                <p className="text-brand-text-muted text-xs font-bold uppercase tracking-widest leading-relaxed">Generic but brutal rules. No camera needed.</p>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button 
                onClick={prevStep}
                className="text-sm font-bold uppercase tracking-widest text-brand-text-muted hover:text-brand-brown transition-colors"
              >
                Back
              </button>
              <Button 
                variant="primary" 
                size="xl" 
                disabled={useImages === null}
                onClick={nextStep}
              >
                Continue to Details
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">Context matters.</h1>
            <p className="text-xl text-brand-text-muted mb-12 italic font-medium">Tell Sandy about the occasion or any specific rules you want her to enforce.</p>
            
            <div className="space-y-10">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
                  Deck Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl bg-white border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium shadow-sm transition-all"
                  placeholder="The Saturday Secret..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
                  Tell Sandy how you want to have a good time? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl bg-white border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium shadow-sm transition-all resize-none mb-3"
                  placeholder="What's the goal for the night?"
                />
                <div className="flex flex-wrap gap-2">
                  {[
                    "Help us get drunk really fast.",
                    "Make us laugh our asses off.",
                    "Keep it chill and conversational.",
                    "Absolute chaos and bad decisions."
                  ].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setGoal(ex)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-brand-tan/10 text-brand-brown border border-brand-tan/20 hover:bg-brand-tan/20 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
                  Any secrets or running jokes for Sandy? (Optional)
                </label>
                <textarea
                  rows={2}
                  value={secrets}
                  onChange={(e) => setSecrets(e.target.value)}
                  className="w-full px-8 py-5 rounded-3xl bg-white border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium shadow-sm transition-all resize-none mb-3"
                  placeholder="Sandy won't tell... probably."
                />
                <div className="flex flex-wrap gap-2">
                  {[
                    "The incident in Paris 2023.",
                    "David is secretly a cat person.",
                    "Mention the 'accounting' mishap.",
                    "Someone here has a crush on X."
                  ].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setSecrets(ex)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-brand-red/5 text-brand-red border border-brand-red/10 hover:bg-brand-red/10 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
                  Help Sandy make the game? (Optional)
                </label>
                <textarea
                  rows={3}
                  value={extra}
                  onChange={(e) => setExtra(e.target.value)}
                  className="w-full px-8 py-6 rounded-[32px] bg-white border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium shadow-sm transition-all resize-none mb-3"
                  placeholder="Occasion, specific rules, or vibes..."
                />
                <div className="flex flex-wrap gap-2">
                  {[
                    "It's a bachelor party.",
                    "No physical dares, please.",
                    "Focus more on group votes.",
                    "Include rules about the birthday girl."
                  ].map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setExtra(ex)}
                      className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-brand-blue/5 text-brand-blue border border-brand-blue/10 hover:bg-brand-blue/10 transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-between items-center">
              <button 
                onClick={prevStep}
                className="text-sm font-bold uppercase tracking-widest text-brand-text-muted hover:text-brand-brown transition-colors"
              >
                Back
              </button>
              <Button 
                variant="primary" 
                size="xl" 
                className="shadow-espresso"
                disabled={loading}
                onClick={handleCreateDeck}
              >
                Generate My Secret Deck
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Chaos Selection Modal */}
      {showChaosModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm" onClick={() => setShowChaosModal(false)} />
          <div className="bg-white rounded-[48px] p-12 max-w-xl w-full relative shadow-espresso animate-in zoom-in-95 duration-300">
            <h2 className="text-4xl font-serif font-bold text-brand-brown mb-6 text-center">Sandy likes it empty...</h2>
            <p className="text-lg text-brand-text-muted text-center mb-10 italic">
              Since you aren&apos;t telling her what to do, Sandy will decide the vibe. How much chaos can you handle?
            </p>
            
            <div className="mb-12">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-4">
                <span>Total Chill</span>
                <span>Pure Chaos</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="5" 
                step="1"
                value={chaosLevel}
                onChange={(e) => setChaosLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-brand-tan/30 rounded-lg appearance-none cursor-pointer accent-brand-red"
              />
              <div className="flex justify-between mt-4 px-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      chaosLevel >= i ? "bg-brand-red" : "bg-brand-tan/30"
                    )} 
                  />
                ))}
              </div>
              <div className="mt-8 text-center bg-brand-cream/50 py-4 rounded-2xl border border-brand-tan/20">
                <span className="text-sm font-bold text-brand-brown uppercase tracking-[0.2em]">
                  {chaosLevel === 1 && "Level 1: Just talking"}
                  {chaosLevel === 2 && "Level 2: Mild discomfort"}
                  {chaosLevel === 3 && "Level 3: The standard secret"}
                  {chaosLevel === 4 && "Level 4: High alert"}
                  {chaosLevel === 5 && "Level 5: Sandy's Revenge"}
                </span>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="xl" 
              className="w-full shadow-lg"
              onClick={handleCreateDeck}
            >
              Let the Games Begin
            </Button>
            <button 
              onClick={() => setShowChaosModal(false)}
              className="w-full mt-6 text-xs font-bold uppercase tracking-widest text-brand-text-muted hover:text-brand-brown transition-colors"
            >
              Wait, let me add notes
            </button>
          </div>
        </div>
      )}

      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 select-none">
        <div className="font-script text-6xl text-brand-red rotate-12">Listen to Sandy.</div>
      </div>
    </div>
  );
}
