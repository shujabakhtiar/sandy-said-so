import { SectionHeader } from "@/ui/components/ui/SectionHeader";

export const FeaturesGrid = () => {
  const steps = [
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
  ];

  return (
    <section id="how-it-works" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <SectionHeader 
          title={<>Custom rules for <br /><span className="text-brand-blue italic">specific people.</span></>}
          subtitle="We don't just put a face on a card. We build a logic engine that knows who is playing."
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
