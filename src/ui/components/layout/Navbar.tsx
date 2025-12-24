"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "The Deck", href: "#the-deck" },
    { label: "Game Modes", href: "#modes" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-8 py-4 lg:px-16 w-full",
        isScrolled 
          ? "bg-brand-cream/80 backdrop-blur-md shadow-espresso py-4" 
          : "bg-transparent py-8"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="font-serif text-2xl tracking-tight font-bold text-brand-brown">
          Sandy <span className="font-script text-3xl font-normal ml-1">said so.</span>
        </div>
        <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-brand-text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-brand-brown transition-colors">
              {link.label}
            </a>
          ))}
        </div>
        <Button variant="primary" size="md">
          Build Now
        </Button>
      </div>
    </nav>
  );
};
