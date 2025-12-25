"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useAuth } from "@/ui/providers/AuthContext";
import { cn } from "@/ui/lib/utils";

import { ModeSelectionStep } from "@/ui/components/features/deck-build/ModeSelectionStep";
import { VisualPreferenceStep } from "@/ui/components/features/deck-build/VisualPreferenceStep";
import { ContextDetailsStep } from "@/ui/components/features/deck-build/ContextDetailsStep";

const modes = [
  { id: 1, title: "Sandy's Confession", tag: "Truth or Dare", description: "Deep secrets, uncomfortable truths, and social sabotage.", color: "bg-brand-tan" },
  { id: 2, title: "Pure Provocation", tag: "Drinking Rituals", description: "The ultimate drinking game. Sandy makes the rules for the circle, Kings Cup style.", color: "bg-brand-blue" },
  { id: 3, title: "The Verdict", tag: "Naughty & Spicy", description: "For the brave ones. High-stakes adult games and spicy sex dares.", color: "bg-brand-red" }
];

function BuildDeckContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode");
  
  const [step, setStep] = useState(1);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);

  useEffect(() => {
    if (modeParam) {
      const modeId = parseInt(modeParam);
      if (!isNaN(modeId) && modes.some(m => m.id === modeId)) {
        setSelectedMode(modeId);
        setStep(2);
      }
    }
  }, [modeParam]);
  const [useImages, setUseImages] = useState<boolean | null>(null);
  const [notes, setNotes] = useState("");
  const [goal, setGoal] = useState("");
  const [secrets, setSecrets] = useState("");
  const [extra, setExtra] = useState("");
  const [people, setPeople] = useState<{name: string, note: string}[]>([]);
  const [personInput, setPersonInput] = useState("");
  const [personNote, setPersonNote] = useState("");
  const [title, setTitle] = useState("");
  const [chaosLevel, setChaosLevel] = useState(3);
  const [loading, setLoading] = useState(false);

  const addPerson = () => {
    if (personInput.trim() && !people.some(p => p.name === personInput.trim())) {
      setPeople([...people, { name: personInput.trim(), note: personNote.trim() }]);
      setPersonInput("");
      setPersonNote("");
    }
  };

  const removePerson = (name: string) => {
    setPeople(people.filter(p => p.name !== name));
  };

  const handleCreateDeck = async () => {
    if (!selectedMode) return;
    
    setLoading(true);
    
    // Append people to extra context to inform AI without DB change
    const peopleContext = people.map(p => `${p.name}${p.note ? ` (${p.note})` : ''}`).join(', ');
    const fullExtra = people.length > 0 
      ? `${extra}${extra ? '\n' : ''}People in the room: ${peopleContext}`
      : extra;

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
          extra: fullExtra,
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
          <ModeSelectionStep
            modes={modes}
            selectedMode={selectedMode}
            onSelectMode={setSelectedMode}
            onNext={nextStep}
          />
        )}

        {step === 2 && (
          <VisualPreferenceStep
            useImages={useImages}
            onSetUseImages={setUseImages}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {step === 3 && (
          <ContextDetailsStep
            title={title}
            setTitle={setTitle}
            personInput={personInput}
            setPersonInput={setPersonInput}
            personNote={personNote}
            setPersonNote={setPersonNote}
            people={people}
            onAddPerson={addPerson}
            onRemovePerson={removePerson}
            goal={goal}
            setGoal={setGoal}
            secrets={secrets}
            setSecrets={setSecrets}
            extra={extra}
            setExtra={setExtra}
            onPrev={prevStep}
            onCreateDeck={handleCreateDeck}
            loading={loading}
            chaosLevel={chaosLevel}
            setChaosLevel={setChaosLevel}
          />
        )}
      </main>



      {/* Decorative Branding */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20 select-none">
        <div className="font-script text-6xl text-brand-red rotate-12">Listen to Sandy.</div>
      </div>
    </div>
  );
}

export default function BuildDeckPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="animate-pulse font-serif text-2xl text-brand-brown">Sandy is watching...</div>
      </div>
    }>
      <BuildDeckContent />
    </Suspense>
  );
}
