import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-espresso-cream overflow-hidden font-sans selection:bg-espresso-tan selection:text-espresso-brown">
      {/* Sunkissed Texture */}
      <div className="sunkissed" />
      
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-[-10%] w-[60%] h-[80%] bg-espresso-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[70%] bg-espresso-tan/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-16">
        <div className="font-serif text-2xl tracking-tight font-bold text-espresso-brown">
          Flip it <span className="font-script text-3xl font-normal ml-1">Drink it</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-espresso-brown/60">
          <a href="#how-it-works" className="hover:text-espresso-brown transition-colors">How it Works</a>
          <a href="#the-deck" className="hover:text-espresso-brown transition-colors">The Deck</a>
          <a href="#modes" className="hover:text-espresso-brown transition-colors">Game Modes</a>
        </div>
        <button className="text-sm font-bold uppercase tracking-widest bg-espresso-brown text-white px-6 py-3 rounded-full hover:bg-espresso-red transition-all">
          Build Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 px-6 lg:pt-20 lg:pb-40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-espresso-tan/20 text-espresso-brown font-bold text-[10px] tracking-[0.2em] uppercase">
                Product of the Year &apos;24
              </div>
              
              <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] mb-8 text-espresso-brown leading-[0.85] lg:max-w-xl">
                Turn your <br />
                Squad into <br />
                <span className="text-espresso-red italic underline decoration-espresso-tan/30 underline-offset-8">The Cards.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-espresso-brown/70 mb-12 max-w-lg mx-auto lg:mx-0 leading-relaxed font-medium">
                The world&apos;s first card generator that builds custom drinking rules around your friends&apos; faces.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                <button className="espresso-button">
                  Build Your Free Deck
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                </button>
                <button className="espresso-secondary">
                  See Examples
                </button>
              </div>

              <div className="mt-16 flex items-center justify-center lg:justify-start gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-espresso-tan flex items-center justify-center overflow-hidden">
                      <Image src={`https://i.pravatar.cc/150?u=${i+10}`} alt="user" width={48} height={48} />
                    </div>
                  ))}
                </div>
                <div className="text-left">
                  <div className="font-bold text-espresso-brown text-sm">Join 15,000+ creators</div>
                  <div className="text-espresso-brown/50 text-xs font-semibold uppercase tracking-widest italic tracking-tighter">Played at every major house party</div>
                </div>
              </div>
            </div>

            <div className="relative group" id="the-deck">
              <div className="absolute -inset-4 bg-espresso-tan/20 rounded-[40px] blur-2xl group-hover:bg-espresso-blue/20 transition-all duration-700" />
              <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border-8 border-white shadow-2xl floating">
                <Image
                  src="/espresso_cards.png"
                  alt="Custom Playing Cards"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl border border-espresso-tan/20">
                  <div className="font-script text-2xl text-espresso-red mb-1 text-center">Your photos. Our rules.</div>
                  <div className="font-serif text-lg text-espresso-brown uppercase font-bold tracking-widest text-center">THE ULTIMATE PARTY DECK.</div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-28 h-28 bg-espresso-red rounded-full flex items-center justify-center text-white text-[10px] font-bold uppercase tracking-widest text-center leading-tight rotate-12 shadow-xl animate-pulse">
                Worldwide <br /> Shipping <br /> Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Explanation */}
      <section id="how-it-works" className="py-32 px-6 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center mb-24">
            <h2 className="text-5xl md:text-7xl text-espresso-brown mb-6 max-w-3xl leading-[1.1] font-bold">
              Custom rules for <br />
              <span className="text-espresso-blue italic">specific people.</span>
            </h2>
            <p className="text-xl text-espresso-brown/60 max-w-lg mb-10 font-medium">
              We don&apos;t just put a face on a card. We build a logic engine that knows who is playing.
            </p>
            <div className="w-24 h-1 bg-espresso-tan/30 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Upload Photos",
                sub: "STEP ONE",
                desc: "Upload 10-20 photos of your friends. Groups or individuals, our system handles it all.",
                icon: "📸"
              },
              {
                title: "Name the Faces",
                sub: "STEP TWO",
                desc: "Tell us who and what they are to the group. We generate dares tailored to each personality.",
                icon: "🏷️"
              },
              {
                title: "Play or Print",
                sub: "STEP THREE",
                desc: "Play instantly on your phone for free, or order a premium physical deck delivered to your door.",
                icon: "🚚"
              }
            ].map((step, i) => (
              <div key={i} className="bg-espresso-cream/30 p-10 rounded-[40px] text-center border border-espresso-tan/5 transition-all hover:shadow-xl hover:-translate-y-2 group">
                <div className="text-5xl mb-8 transform group-hover:rotate-12 transition-transform duration-500">{step.icon}</div>
                <div className="font-serif text-2xl font-bold text-espresso-brown mb-2">{step.title}</div>
                <div className="text-espresso-red font-bold text-[10px] tracking-[0.2em] mb-4 uppercase">{step.sub}</div>
                <p className="text-espresso-brown/60 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Value Prop */}
      <section id="modes" className="py-32 px-6 bg-espresso-cream/50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="relative rounded-[48px] overflow-hidden aspect-square border-8 border-white shadow-2xl">
               <Image 
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" 
                alt="Friends laughing" 
                fill 
                className="object-cover"
               />
               <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-espresso-brown to-transparent h-1/2 flex items-end">
                  <p className="text-white font-script text-3xl">Laughter guaranteed, or the next round is on us.</p>
               </div>
            </div>

            <div>
              <h2 className="text-5xl md:text-6xl text-espresso-brown mb-8 leading-tight font-bold">Three ways to <br />break the ice.</h2>
              <p className="text-xl text-espresso-brown/60 mb-12 font-medium">Select the game mode that fits your group&apos;s dynamic. Every deck is generated uniquely for you.</p>
              
              <div className="space-y-6">
                {[
                  { title: "Drinking Classic", tag: "Heavy Social", color: "bg-espresso-tan" },
                  { title: "Truth or Dare", tag: "Chaos Mode", color: "bg-espresso-blue" },
                  { title: "Couples Night", tag: "Strictly Spicy", color: "bg-espresso-red" }
                ].map((mode, i) => (
                  <div key={i} className="flex items-center justify-between p-8 bg-white rounded-3xl group cursor-pointer hover:shadow-2xl transition-all border border-transparent hover:border-espresso-tan/20">
                    <div className="flex items-center gap-6">
                      <div className={`w-4 h-4 rounded-full ${mode.color} shadow-inner shadow-black/20`} />
                      <div>
                        <div className="font-bold text-espresso-brown text-xl">{mode.title}</div>
                        <div className="text-espresso-brown/50 text-[10px] font-bold uppercase tracking-[0.2em]">{mode.tag}</div>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-espresso-tan/30 flex items-center justify-center group-hover:bg-espresso-brown group-hover:text-white transition-all transform group-hover:rotate-45">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-40 px-6 text-center">
        <div className="container mx-auto max-w-4xl relative">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 font-script text-5xl text-espresso-red pointer-events-none opacity-20 select-none">Free to start. Forever yours.</div>
          <h2 className="text-6xl md:text-[6rem] text-espresso-brown mb-12 font-bold leading-none tracking-tight">Your squad, <br />in card form.</h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
             <button className="espresso-button px-16 py-7 text-2xl shadow-xl">
               Create Your Deck
             </button>
             <button className="espresso-secondary px-16 py-7 text-2xl">
               Order for Party
             </button>
          </div>
          <p className="mt-14 text-espresso-brown/30 text-xs font-bold uppercase tracking-[0.5em]">No login required to start building.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-8 border-t-2 border-espresso-tan/10 bg-white">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div>
            <div className="font-serif text-3xl font-bold text-espresso-brown mb-2 tracking-tighter">Flip it.</div>
            <p className="max-w-xs text-espresso-brown/50 font-medium leading-relaxed italic">
              Revolutionizing the way you remember (or forget) your favorite people.
            </p>
          </div>
          <div className="flex gap-12 font-bold uppercase text-[10px] tracking-[0.2em] text-espresso-brown/80">
            <div className="flex flex-col gap-5">
               <a href="#" className="hover:text-espresso-red transition-colors">TikTok Series</a>
               <a href="#" className="hover:text-espresso-red transition-colors">Instagram Feed</a>
            </div>
            <div className="flex flex-col gap-5">
               <a href="#" className="hover:text-espresso-red transition-colors">Support Center</a>
               <a href="#" className="hover:text-espresso-red transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="text-espresso-brown/30 font-bold uppercase text-[10px] tracking-[0.4em]">
            © 2024 FLIP IT DRINK IT. BUILT FOR THE SQUAD.
          </div>
        </div>
      </footer>
    </div>
  );
}
