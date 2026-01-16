"use client";

import React from "react";
import { cn } from "@/ui/lib/utils";

export const LoadingModeShuffle = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="relative w-full max-w-[180px] aspect-2/3 flex items-center justify-center">
        {/* Card 1 */}
        <div className="absolute w-full h-full bg-[#faf9f6] rounded-[24px] border border-brand-tan/20 shadow-xl animate-shuffle-1 flex flex-col p-4 overflow-hidden">
          <div className="text-center mb-2">
            <div className="text-[10px] font-serif font-black italic text-brand-red/40 underline decoration-brand-red/10">Sandy says...</div>
          </div>
          <div className="flex-1 flex flex-col gap-2 mt-4">
            <div className="w-full h-1.5 bg-brand-tan/10 rounded-full" />
            <div className="w-[80%] h-1.5 bg-brand-tan/10 rounded-full" />
            <div className="w-[90%] h-1.5 bg-brand-tan/10 rounded-full" />
          </div>
          <div className="mt-auto flex justify-between items-center opacity-20">
             <div className="w-4 h-4 rounded-full bg-brand-red/20" />
             <div className="text-[8px] font-bold text-brand-red">SANDY</div>
          </div>
        </div>
        
        {/* Card 2 (Chaos style) */}
        <div className="absolute w-full h-full bg-[#811331] rounded-[24px] border border-white/10 shadow-xl animate-shuffle-2 flex flex-col p-4 overflow-hidden">
          <div className="text-center mb-2">
            <div className="text-[10px] font-serif font-black italic text-white/40 underline decoration-white/10">SANDY'S CHAOS</div>
          </div>
          <div className="flex-1 flex items-center justify-center uppercase opacity-10">
            <span className="font-serif font-black text-white text-3xl rotate-12">Chaos</span>
          </div>
          <div className="mt-auto flex justify-between items-center opacity-20">
             <div className="w-4 h-4 rounded-full bg-white/20" />
             <div className="text-[8px] font-bold text-white uppercase">Chaos</div>
          </div>
        </div>
        
        {/* Card 3 (Regular style) */}
        <div className="absolute w-full h-full bg-[#faf9f6] rounded-[24px] border border-brand-tan/20 shadow-2xl animate-shuffle-3 flex flex-col p-4 overflow-hidden">
          <div className="text-center mb-2">
            <div className="text-[10px] font-serif font-black italic text-brand-red/60 underline decoration-brand-red/20">Sandy says...</div>
          </div>
          <div className="flex-1 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full border-4 border-brand-red/10 border-t-brand-red animate-spin" />
          </div>
          <div className="mt-auto flex justify-between items-center">
             <div className="w-4 h-4 rounded-full bg-brand-red/40" />
             <p className="text-[8px] font-serif italic font-bold text-brand-red animate-pulse tracking-widest uppercase">
              Drink if you dare
            </p>
          </div>
        </div>
      </div>
      
      <p className="mt-6 text-brand-brown font-serif italic text-base animate-pulse">
        Sandy is shuffling the secrets...
      </p>

      <style jsx>{`
        @keyframes shuffle-1 {
          0%, 100% { transform: translateX(0) scale(1) rotate(0); z-index: 10; }
          33% { transform: translateX(-60px) scale(0.95) rotate(-10deg); z-index: 0; }
          66% { transform: translateX(30px) scale(0.9) rotate(5deg); z-index: 5; }
        }
        @keyframes shuffle-2 {
          0%, 100% { transform: translateX(30px) scale(0.9) rotate(5deg); z-index: 5; }
          33% { transform: translateX(0) scale(1) rotate(0); z-index: 10; }
          66% { transform: translateX(-60px) scale(0.95) rotate(-10deg); z-index: 0; }
        }
        @keyframes shuffle-3 {
          0%, 100% { transform: translateX(-60px) scale(0.95) rotate(-10deg); z-index: 0; }
          33% { transform: translateX(30px) scale(0.9) rotate(5deg); z-index: 5; }
          66% { transform: translateX(0) scale(1) rotate(0); z-index: 10; }
        }
        .animate-shuffle-1 {
          animation: shuffle-1 1.5s infinite ease-in-out;
        }
        .animate-shuffle-2 {
          animation: shuffle-2 1.5s infinite ease-in-out;
        }
        .animate-shuffle-3 {
          animation: shuffle-3 1.5s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};
