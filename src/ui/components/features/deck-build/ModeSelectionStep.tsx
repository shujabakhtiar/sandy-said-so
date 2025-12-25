"use client";

import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";

interface Mode {
  id: number;
  title: string;
  tag: string;
  description: string;
  color: string;
}

interface ModeSelectionStepProps {
  modes: Mode[];
  selectedMode: number | null;
  onSelectMode: (id: number) => void;
  onNext: () => void;
}

export const ModeSelectionStep = ({
  modes,
  selectedMode,
  onSelectMode,
  onNext,
}: ModeSelectionStepProps) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">How dangerous?</h1>
      <p className="text-xl text-brand-text-muted mb-12 italic font-medium">
        Sandy has several ways of ruining your night. Choose wisely.
      </p>

      <div className="space-y-4">
        {modes.map((mode) => (
          <div
            key={mode.id}
            onClick={() => {
              onSelectMode(mode.id);
              onNext();
            }}
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
    </div>
  );
};
