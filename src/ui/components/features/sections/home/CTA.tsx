"use client";

import { Button } from "@/ui/components/ui/Button";
import { useAuth } from "@/ui/providers/AuthContext";
import { useRouter } from "next/navigation";

export const CTA = () => {
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
    <section className="py-20 md:py-40 px-6 text-center">
      <div className="container mx-auto max-w-4xl relative">
        <div className="hidden md:block absolute -top-20 left-1/2 -translate-x-1/2 font-script text-5xl text-brand-red pointer-events-none opacity-20 select-none">
          Sandy never forgets.
        </div>
        <h2 className="text-6xl md:text-[6rem] text-brand-brown mb-12 font-bold leading-none tracking-tight font-serif">
          Ready to listen?
        </h2>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button variant="outline" size="xl" onClick={handleCTA}>
            Now give me the tea...
          </Button>
        </div>
        <p className="mt-14 text-brand-text-muted text-xs font-bold uppercase tracking-[0.5em]">
          {user ? "Your secrets are safe with Sandy." : "Secure your secrets with an account."}
        </p>
      </div>
    </section>
  );
};
