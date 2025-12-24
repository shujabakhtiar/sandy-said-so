import { Button } from "@/ui/components/ui/Button";

export const CTA = () => {
  return (
    <section className="py-40 px-6 text-center">
      <div className="container mx-auto max-w-4xl relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 font-script text-5xl text-brand-red pointer-events-none opacity-20 select-none">
          Free to start. Forever yours.
        </div>
        <h2 className="text-6xl md:text-[6rem] text-brand-brown mb-12 font-bold leading-none tracking-tight font-serif">
          Your squad, <br />in card form.
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="primary" size="xl" className="shadow-xl">
            Create Your Deck
          </Button>
          <Button variant="outline" size="xl">
            Order for Party
          </Button>
        </div>
        <p className="mt-14 text-brand-text-muted text-xs font-bold uppercase tracking-[0.5em]">
          No login required to start building.
        </p>
      </div>
    </section>
  );
};
