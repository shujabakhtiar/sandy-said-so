"use client";

import Image from "next/image";
import { Button } from "@/ui/components/ui/Button";
import { Modal } from "@/ui/components/ui/Modal";
import { useAuth } from "@/ui/providers/AuthContext";
import { useRouter } from "next/navigation";

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
    <section className="relative pt-32 pb-24 px-6 lg:pt-48 overflow-hidden lg:pb-40 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-left">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-tan/20 text-brand-brown font-bold text-[10px] tracking-[0.2em] uppercase">
            The Party Instigator &apos;25
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[7.5rem] mb-8 text-brand-brown font-serif font-bold leading-[0.85] lg:max-w-xl">
            You do it. <br />
            Because <br />
            <span className="text-brand-red italic underline decoration-brand-tan/30 underline-offset-8">Sandy said so.</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-brand-text-muted mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
Sandy knows the stories.
You play the game.          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-6 justify-center lg:justify-start">
            <Button variant="primary" size="xl" className="shadow-xl" onClick={handleCTA}>
              Do What Sandy Says
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Button>
            <Button variant="outline" size="xl" onClick={() => router.push("/quick-play")}>
              Quick Play
            </Button>
          </div>

          <div className="mt-16 text-center lg:text-left animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-700 fill-mode-both">
            <div className="inline-flex items-center group/sandy cursor-pointer">
              <div className="h-px w-0 opacity-0 bg-brand-tan/30 group-hover/sandy:w-12 group-hover/sandy:opacity-100 group-hover/sandy:mr-4 transition-all duration-500 ease-out" />
              <span className="text-brand-text-muted font-medium tracking-wide uppercase text-[11px]">
                But who is
              </span>
              <Modal
                variant="letter"
                description="Meet Sandy..."
                trigger={
                  <span className="relative inline-block ml-1">
                    <span className="font-script text-3xl text-brand-red lowercase leading-none block hover:scale-110 transition-transform duration-300">
                      Sandy
                    </span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-red/30 group-hover/sandy:w-full transition-all duration-500 rounded-full" />
                  </span>
                }
              >
                <div className="space-y-6 text-brand-brown font-script text-2xl leading-tight">
                  <p>
                    Sandy is that friend who knows everything about the group—and keeps it there.
                    The stories, the inside jokes, the “you had to be there” moments. 
                    She listens, remembers, and never leaks… unless it’s for the game.
                  </p>
                  <p>
                    She makes custom decks just for your people, built from your jokes, your chaos,
                    and your shared lore. Nothing leaves the group. Just games that make everyone laugh, confess, 
                    and say, “wait, how do you remember that?”
                  </p>
                  <p className="font-medium text-brand-red/90 pt-4 border-t border-brand-tan/10 text-center text-3xl">
                    Because some stories are only meant to be played with the people who lived them.
                  </p>
                </div>
              </Modal>
              <span className="text-brand-text-muted/60 ml-0.5 group-hover/sandy:translate-x-1 transition-transform duration-300 font-bold">?</span>
            </div>
          </div>
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
              <div className="font-script text-xl text-brand-red mb-1">Sandy sees everything.</div>
              <div className="font-serif text-base text-brand-brown uppercase font-bold tracking-widest">THE DECK OF DARES.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
