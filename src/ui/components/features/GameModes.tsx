import Image from "next/image";

export const GameModes = () => {
  const modes = [
    { title: "Drinking Classic", tag: "Heavy Social", color: "bg-brand-tan" },
    { title: "Truth or Dare", tag: "Chaos Mode", color: "bg-brand-blue" },
    { title: "Couples Night", tag: "Strictly Spicy", color: "bg-brand-red" }
  ];

  return (
    <section id="modes" className="py-32 px-6 bg-brand-cream/50">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative rounded-[48px] overflow-hidden aspect-square border-8 border-white shadow-2xl">
            <Image 
              src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop" 
              alt="Friends laughing" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-linear-to-t from-brand-brown to-transparent h-1/2 flex items-end">
              <p className="text-white font-script text-3xl italic">Laughter guaranteed, or the next round is on us.</p>
            </div>
          </div>

          <div>
            <h2 className="text-5xl md:text-6xl text-brand-brown mb-8 leading-tight font-bold font-serif">Three ways to <br />break the ice.</h2>
            <p className="text-xl text-brand-text-muted mb-12 font-medium">Select the game mode that fits your group&apos;s dynamic. Every deck is generated uniquely for you.</p>
            
            <div className="space-y-6">
              {modes.map((mode, i) => (
                <div key={i} className="flex items-center justify-between p-8 bg-white rounded-3xl group cursor-pointer hover:shadow-2xl transition-all border border-transparent hover:border-brand-tan/20">
                  <div className="flex items-center gap-6">
                    <div className={`w-4 h-4 rounded-full ${mode.color} shadow-inner shadow-black/20`} />
                    <div>
                      <div className="font-bold text-brand-brown text-xl">{mode.title}</div>
                      <div className="text-brand-text-muted text-[10px] font-bold uppercase tracking-[0.2em]">{mode.tag}</div>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-brand-tan/30 flex items-center justify-center group-hover:bg-brand-brown group-hover:text-white transition-all transform group-hover:rotate-45">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
