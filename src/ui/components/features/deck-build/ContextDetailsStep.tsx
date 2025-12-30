"use client";

import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";

interface Person {
  name: string;
  note: string;
}

interface ContextDetailsStepProps {
  title: string;
  setTitle: (title: string) => void;
  personInput: string;
  setPersonInput: (input: string) => void;
  personNote: string;
  setPersonNote: (note: string) => void;
  people: Person[];
  onAddPerson: () => void;
  onRemovePerson: (name: string) => void;
  goal: string;
  setGoal: (goal: string) => void;
  secrets: string;
  setSecrets: (secrets: string) => void;
  extra: string;
  setExtra: (extra: string) => void;
  onPrev: () => void;
  onCreateDeck: () => void;
  loading: boolean;
  chaosLevel: number;
  setChaosLevel: (level: number) => void;
  selectedModeId: number | null;
}

export const ContextDetailsStep = ({
  title,
  setTitle,
  personInput,
  setPersonInput,
  personNote,
  setPersonNote,
  people,
  onAddPerson,
  onRemovePerson,
  goal,
  setGoal,
  secrets,
  setSecrets,
  extra,
  setExtra,
  onPrev,
  onCreateDeck,
  loading,
  chaosLevel,
  setChaosLevel,
  selectedModeId,
}: ContextDetailsStepProps) => {
  const isVerdict = selectedModeId === 3;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-start gap-1 mb-12">
        <button 
          onClick={onPrev}
          className="group shrink-0 pt-1"
          title="Go Back"
        >
          <div className="w-10 h-10 rounded-full text-brand-brown flex items-center justify-center group-hover:bg-brand-brown/10 transition-all duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </div>
        </button>
        <div>
          <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4 tracking-tight">Context matters.</h1>
          <p className="text-xl text-brand-text-muted italic font-medium leading-relaxed">
            Tell Sandy about the occasion or any specific rules you want her to enforce.
          </p>
        </div>
      </div>

      <div className="space-y-10">
        {/* Title */}
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

        {/* People */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
            Who is in the room? (Sandy likes names)
          </label>
          <div className="flex flex-col gap-4 mb-6 bg-white p-6 rounded-3xl border border-brand-tan/20 shadow-sm">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={personInput}
                onChange={(e) => setPersonInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddPerson())}
                className="px-6 py-4 rounded-xl bg-brand-cream/30 border border-brand-tan/10 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all"
                placeholder="Name (e.g. Harshal)"
              />
              <input
                type="text"
                value={personNote}
                onChange={(e) => setPersonNote(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), onAddPerson())}
                className="px-6 py-4 rounded-xl bg-brand-cream/30 border border-brand-tan/10 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all"
                placeholder="One line about them (Optional personalization)"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  onAddPerson();
                }}
                className="rounded-xl w-40"
              >
                Add Person
              </Button>
            </div>
          </div>

          {people.length > 0 && (
            <div className="flex flex-wrap gap-2 p-4 bg-brand-tan/5 rounded-3xl border border-dashed border-brand-tan/30">
              {people.map((person) => (
                <button
                  key={person.name}
                  onClick={() => onRemovePerson(person.name)}
                  className="group flex flex-col items-start px-5 py-3 bg-white rounded-2xl border border-brand-tan/20 hover:border-brand-red/30 hover:bg-brand-red/5 transition-all text-left"
                >
                  <div className="flex items-center gap-2 w-full justify-between">
                    <span className="text-sm font-bold text-brand-brown group-hover:text-brand-red transition-colors">
                      {person.name}
                    </span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-tan/60 group-hover:text-brand-red/60 transition-colors"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </div>
                  {person.note && (
                    <span className="text-[10px] text-brand-text-muted italic leading-tight group-hover:text-brand-red/80 transition-colors mt-0.5">
                      {person.note}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Chaos Level */}
        {!isVerdict && (
          <div className="bg-white rounded-[40px] p-10 border border-brand-tan/10 shadow-espresso/5 mb-2">
            <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-8 ml-1">
              Chaos Level: How much trouble do you want?
            </label>
            
            <div className="px-2">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-6">
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
                className="w-full h-2 bg-brand-tan/20 rounded-lg appearance-none cursor-pointer accent-brand-red mb-6"
              />
              <div className="flex justify-between px-1 mb-10">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300",
                      chaosLevel >= i ? "bg-brand-red scale-110" : "bg-brand-tan/20 scale-100"
                    )} 
                  />
                ))}
              </div>
              
              <div className="text-center bg-brand-cream/50 py-5 rounded-3xl border border-brand-tan/10">
                <span className="text-sm font-bold text-brand-brown uppercase tracking-[0.2em]">
                  {chaosLevel === 1 && "Level 1: Just talking"}
                  {chaosLevel === 2 && "Level 2: Mild discomfort"}
                  {chaosLevel === 3 && "Level 3: The standard secret"}
                  {chaosLevel === 4 && "Level 4: High alert"}
                  {chaosLevel === 5 && "Level 5: Sandy's Revenge"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Goal */}
        {!isVerdict && (
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
                "Absolute chaos and bad decisions.",
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
        )}

        {/* Secrets */}
        {!isVerdict && (
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
                "Someone here has a crush on X.",
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
        )}

        {/* Extra */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-3 ml-1">
            {isVerdict ? "Anything you'd like Sandy to know? (Optional)" : "Help Sandy make the game? (Optional)"}
          </label>
          <textarea
            rows={3}
            value={extra}
            onChange={(e) => setExtra(e.target.value)}
            className="w-full px-8 py-6 rounded-[32px] bg-white border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium shadow-sm transition-all resize-none mb-3"
            placeholder={isVerdict ? "Occasion, specific items you have, or spicy vibes..." : "Occasion, specific rules, or vibes..."}
          />
          <div className="flex flex-wrap gap-2">
            {[
              "It's a bachelor party.",
              "No physical dares, please.",
              "Focus more on group votes.",
              "Include rules about the birthday girl.",
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

      <div className="mt-12 flex justify-end">
        <Button
          variant="primary"
          size="xl"
          className="shadow-espresso"
          disabled={loading}
          onClick={onCreateDeck}
        >
          Generate My Secret Deck
        </Button>
      </div>
    </div>
  );
};
