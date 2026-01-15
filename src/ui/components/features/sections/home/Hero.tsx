"use client";

import Image from "next/image";
import { Button } from "@/ui/components/ui/Button";
import { useAuth } from "@/ui/providers/AuthContext";
import { useRouter } from "next/navigation";
import { SocialProofBlock } from "../../../ui/promotional/SocialProofBlock";

export const Hero = () => {
  const { user } = useAuth();
  const router = useRouter();

  const handleCTA = () => {
    if (user) {
      router.push("/decks");
    } else {
      router.push("/login");
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6 lg:pt-48 lg:pb-40 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-tan/20 text-brand-brown font-bold text-[10px] tracking-[0.2em] uppercase">
            The Party Instigator &apos;25
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] mb-8 text-brand-brown font-serif font-bold leading-[0.85] lg:max-w-xl">
            You do it. <br />
            Because <br />
            <span className="text-brand-red italic underline decoration-brand-tan/30 underline-offset-8">Sandy said so.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-text-muted mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            Sandy is the imaginary friend who knows all your real secrets. She builds custom decks around your friends to ensure no one leaves sober.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button variant="primary" size="xl" className="shadow-xl" onClick={handleCTA}>
              Do What Sandy Says
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Button>
            <Button variant="outline" size="xl" onClick={() => router.push("/examples")}>
              See Examples
            </Button>
          </div>

          {/* <SocialProofBlock /> */}
        </div>

        <div className="relative group scroll-mt-32" id="the-deck">
          <div className="absolute -inset-4 bg-brand-tan/20 rounded-[40px] blur-2xl group-hover:bg-brand-blue/20 transition-all duration-700" />
          <div className="relative aspect-4/5 rounded-[32px] overflow-hidden border-8 border-white shadow-2xl animate-float">
            <Image
              src="/espresso_cards.png"
              alt="Custom Playing Cards"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-tan/20 text-center">
              <div className="font-script text-2xl text-brand-red mb-1">Sandy sees everything.</div>
              <div className="font-serif text-lg text-brand-brown uppercase font-bold tracking-widest">THE DECK OF DARES.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
