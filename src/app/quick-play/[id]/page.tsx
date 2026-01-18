"use client";

import { useParams } from "next/navigation";
import { Navbar } from "@/ui/components/layout/Navbar";

export default function QuickPlayGameModePage() {
  const params = useParams();
  const id = params?.id;

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col pt-32 pb-20 relative overflow-hidden">
      <Navbar />
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-tan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-red/5 rounded-full blur-[80px]" />
      </div>

      <main className="container mx-auto px-6 max-w-3xl grow relative z-10 flex flex-col items-center justify-center text-center">
        <div className="inline-block mb-4 px-4 py-1 bg-brand-tan/20 text-brand-brown rounded-full text-[10px] font-bold uppercase tracking-widest">
           Game Mode {id}
        </div>
        <h1 className="text-5xl font-serif font-bold text-brand-brown mb-4">Starting Game...</h1>
        <p className="text-xl text-brand-text-muted italic animate-pulse">
           Sandy is dealing the cards.
        </p>
      </main>
    </div>
  );
}
