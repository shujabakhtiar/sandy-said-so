import { SectionHeader } from "@/ui/components/ui/SectionHeader";

export const FeaturesGrid = () => {
  const steps = [
    {
      title: "Identify Targets",
      sub: "PHASE ONE",
      desc: "Add names of your friends. Sandy needs to know exactly who she's dealing with.",
      icon: "🎯"
    },
    {
      title: "Spill the Tea",
      sub: "PHASE TWO",
      desc: "Tell Sandy their nicknames and soft spots. She'll use this information... responsibly.",
      icon: "🤫"
    },
    {
      title: "Obey the Deck",
      sub: "PHASE THREE",
      desc: "Receive your custom deck. Whether it's on your phone or at your door, remember: Sandy said so.",
      icon: "📜"
    }
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 bg-white relative overflow-hidden scroll-mt-32">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader 
          title={<>Sandy knows your group <br /><span className="text-brand-blue italic">better than you do.</span></>}
          subtitle="It's not just a card game. it's an intervention guided by Sandy xx."
          className="mb-24"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, i) => (
            <div key={i} className="bg-brand-cream/30 p-10 rounded-[40px] text-center border border-brand-tan/5 transition-all hover:shadow-xl hover:-translate-y-2 group">
              <div className="text-5xl mb-8 transform group-hover:rotate-12 transition-transform duration-500">{step.icon}</div>
              <div className="font-serif text-2xl font-bold text-brand-brown mb-2">{step.title}</div>
              <div className="text-brand-red font-bold text-[10px] tracking-[0.2em] mb-4 uppercase">{step.sub}</div>
              <p className="text-brand-text-muted leading-relaxed font-medium">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
