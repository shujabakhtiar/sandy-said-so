import Image from "next/image";
import { Button } from "@/ui/components/ui/Button";

export const Hero = () => {
  return (
    <section className="relative pt-12 pb-24 px-6 lg:pt-20 lg:pb-40 container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-tan/20 text-brand-brown font-bold text-[10px] tracking-[0.2em] uppercase">
            Product of the Year &apos;24
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] mb-8 text-brand-brown font-serif font-bold leading-[0.85] lg:max-w-xl">
            Turn your <br />
            Squad into <br />
            <span className="text-brand-red italic underline decoration-brand-tan/30 underline-offset-8">The Cards.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-text-muted mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
            The world&apos;s first card generator that builds custom drinking rules around your friends&apos; faces.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button variant="primary" size="xl" className="shadow-xl">
              Build Your Free Deck
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
            </Button>
            <Button variant="outline" size="xl">
              See Examples
            </Button>
          </div>

          <div className="mt-16 flex items-center justify-center lg:justify-start gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-tan flex items-center justify-center overflow-hidden">
                  <Image 
                    src={`https://i.pravatar.cc/150?u=${i+10}`} 
                    alt="user" 
                    width={48} 
                    height={48} 
                  />
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="font-bold text-brand-brown text-sm">Join 15,000+ creators</div>
              <div className="text-brand-text-muted text-xs font-semibold uppercase italic tracking-tighter">Played at every major house party</div>
            </div>
          </div>
        </div>

        <div className="relative group" id="the-deck">
          <div className="absolute -inset-4 bg-brand-tan/20 rounded-[40px] blur-2xl group-hover:bg-brand-blue/20 transition-all duration-700" />
          <div className="relative aspect-4/5 rounded-[32px] overflow-hidden border-8 border-white shadow-2xl animate-float">
            <Image
              src="/espresso_cards.png"
              alt="Custom Playing Cards"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-brand-tan/20 text-center">
              <div className="font-script text-2xl text-brand-red mb-1">Your photos. Our rules.</div>
              <div className="font-serif text-lg text-brand-brown uppercase font-bold tracking-widest">THE ULTIMATE PARTY DECK.</div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand-red rounded-full flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest text-center leading-tight rotate-12 shadow-xl animate-pulse">
            Worldwide <br /> Shipping <br /> Available
          </div>
        </div>
      </div>
    </section>
  );
};
