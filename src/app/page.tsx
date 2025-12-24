import { Navbar } from "@/ui/components/layout/Navbar";
import { Footer } from "@/ui/components/layout/Footer";
import { Hero } from "@/ui/components/features/Hero";
import { FeaturesGrid } from "@/ui/components/features/FeaturesGrid";
import { GameModes } from "@/ui/components/features/GameModes";
import { CTA } from "@/ui/components/features/CTA";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-brand-cream selection:bg-brand-tan/30 selection:text-brand-brown">
      {/* Visual Overlays */}
      <div className="sunkissed" />
      
      {/* Background Decor */}
      <div className="absolute top-0 right-[-10%] w-[60%] h-[80%] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[70%] bg-brand-tan/20 rounded-full blur-[100px] pointer-events-none" />

      <Navbar />
      
      <main>
        <Hero />
        <FeaturesGrid />
        <GameModes />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}
