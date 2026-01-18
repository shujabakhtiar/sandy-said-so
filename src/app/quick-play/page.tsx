"use client";

import { Navbar } from "@/ui/components/layout/Navbar";
import { Button } from "@/ui/components/ui/Button";
import { useRouter } from "next/navigation";

export default function QuickPlayPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-brand-tan/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[30%] bg-brand-red/5 rounded-full blur-[80px]" />
      </div>
      <Navbar />

      <div className="relative z-10 w-full max-w-2xl text-center">
        <button 
          onClick={() => router.push("/")}
          className="absolute -top-20 left-0 flex items-center gap-2 text-brand-brown/60 hover:text-brand-brown transition-colors uppercase text-[10px] font-bold tracking-[0.2em]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7M5 12h14"/></svg>
          Back to Home
        </button>

        <div className="mb-12">
          <div className="inline-block mb-4 px-4 py-1 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-bold uppercase tracking-widest">
            Choose Your Path
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-brand-brown mb-6">
            Ready to <br />
            <span className="text-brand-red italic underline decoration-brand-tan/30 underline-offset-8 leading-tight">Start?</span>
          </h1>
          <p className="text-lg md:text-xl text-brand-text-muted font-medium max-w-md mx-auto">
            Choose how you want to experience the chaos today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            className="group relative cursor-pointer"
            onClick={() => router.push("/quick-play/init")}
          >
            <div className="absolute inset-0 bg-brand-brown opacity-0 group-hover:opacity-5 rounded-[24px] transition-opacity duration-300 pointer-events-none" />
            <div className="p-8 rounded-[24px] border-2 border-brand-tan/20 flex flex-col items-center text-center group-hover:border-brand-brown transition-all duration-300">
              <div className="w-12 h-12 bg-brand-brown text-white rounded-full flex items-center justify-center mb-6 text-xl">
                1
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-brown mb-4 uppercase tracking-wider">Start Playing</h3>
              <p className="text-sm text-brand-text-muted mb-8 italic">
                Jump straight into the action with a quick game.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full"
              >
                Go Live
              </Button>
            </div>
          </div>

          <div 
            className="group relative cursor-pointer"
            onClick={() => router.push("/examples")}
          >
            <div className="absolute inset-0 bg-brand-red opacity-0 group-hover:opacity-5 rounded-[24px] transition-opacity duration-300 pointer-events-none" />
            <div className="p-8 rounded-[24px] border-2 border-brand-tan/20 flex flex-col items-center text-center group-hover:border-brand-red transition-all duration-300">
              <div className="w-12 h-12 bg-brand-red text-white rounded-full flex items-center justify-center mb-6 text-xl">
                2
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-brown mb-4 uppercase tracking-wider">See Examples</h3>
              <p className="text-sm text-brand-text-muted mb-8 italic">
                Not sure yet? See what Sandy has in store.
              </p>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
              >
                View Decks
              </Button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Removed copyright text */}
    </main>
  );
}
