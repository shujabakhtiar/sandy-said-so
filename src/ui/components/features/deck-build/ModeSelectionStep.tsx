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
      <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-brown mb-4">How dangerous?</h1>
      <p className="text-lg md:text-xl text-brand-text-muted mb-8 md:mb-12 italic font-medium">
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
              "p-6 md:p-8 bg-white rounded-[24px] md:rounded-[32px] border-2 transition-all cursor-pointer group hover:shadow-xl",
              selectedMode === mode.id ? "border-brand-brown shadow-espresso" : "border-transparent"
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6">
              <div className="flex items-start gap-4 md:gap-6">
                <div className={cn("w-4 h-4 rounded-full shadow-inner shadow-black/20 mt-1.5 md:mt-2 shrink-0", mode.color)} />
                <div className="grow">
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-brand-brown leading-none md:leading-normal mb-1">{mode.title}</h3>
                  <div className="md:hidden text-[10px] font-bold uppercase tracking-widest text-brand-text-muted opacity-50 mb-2">
                    ({mode.tag})
                  </div>
                  <p className="text-brand-text-muted text-sm font-medium leading-relaxed">{mode.description}</p>
                </div>
              </div>
              <div className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-brand-text-muted opacity-50 shrink-0">
                {mode.tag}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
