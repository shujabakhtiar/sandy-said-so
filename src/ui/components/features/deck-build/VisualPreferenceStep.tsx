"use client";

import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";

interface VisualPreferenceStepProps {
  useImages: boolean | null;
  onSetUseImages: (use: boolean) => void;
  onNext: () => void;
  onPrev: () => void;
}

export const VisualPreferenceStep = ({
  useImages,
  onSetUseImages,
  onNext,
  onPrev,
}: VisualPreferenceStepProps) => {
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
          <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4 tracking-tight">The visual element.</h1>
          <p className="text-xl text-brand-text-muted italic font-medium leading-relaxed">
            Do you want Sandy to analyze photos of your friends for specific dares?
          </p>
        </div>
      </div>
     

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Use Images - Disabled for V1 */}
        <div
          className={cn(
            "p-10 bg-white/50 rounded-[32px] border-2 text-center transition-all cursor-not-allowed relative overflow-hidden group",
            "border-transparent opacity-60"
          )}
        >
          <div className="absolute inset-0 bg-brand-cream/20 backdrop-blur-[2px] z-10 flex items-center justify-center">
            <span className="bg-brand-brown text-brand-cream text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full rotate-[-10deg] shadow-lg">
              Coming in V2
            </span>
          </div>
          <div className="w-16 h-16 bg-brand-blue/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-blue/40">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-brand-brown/40 mb-2">Use Images</h3>
          <p className="text-brand-text-muted/40 text-xs font-bold uppercase tracking-widest leading-relaxed">
            Personalized chaos based on who is actually there.
          </p>
        </div>

        {/* Text Only - Default and only option for V1 */}
        <div
          onClick={() => {onSetUseImages(false); onNext()}}
          className={cn(
            "p-10 bg-white rounded-[32px] border-2 text-center transition-all cursor-pointer hover:shadow-xl",
            useImages === false ? "border-brand-brown shadow-espresso" : "border-transparent"
          )}
        >
          <div className="w-16 h-16 bg-brand-tan/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-brown">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v19" />
              <path d="M5 8h14" />
              <path d="M15 21a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6Z" />
            </svg>
          </div>
          <h3 className="text-xl font-serif font-bold text-brand-brown mb-2">Text Only</h3>
          <p className="text-brand-text-muted text-xs font-bold uppercase tracking-widest leading-relaxed">
            Generic but brutal rules. No camera needed.
          </p>
        </div>
      </div>
    </div>
  );
};
