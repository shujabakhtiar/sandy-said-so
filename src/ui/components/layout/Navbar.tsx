"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";
import { useAuth } from "@/ui/providers/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

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
    ...(user ? [{ label: "Your Decks", href: "/decks" }] : []),
  ];

  const handleCTA = () => {
    if (user) {
      router.push("/decks");
    } else {
      router.push("/login");
    }
  };

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
        <Link href="/" className="font-serif text-2xl tracking-tight font-bold text-brand-brown">
          Sandy <span className="font-script text-3xl font-normal ml-1">said so.</span>
        </Link>
        <div className="hidden md:flex gap-10 text-sm font-semibold uppercase tracking-widest text-brand-text-muted items-center">
          {navLinks.map((link) => (
            link.href.startsWith("#") ? (
              <a key={link.href} href={link.href} className="hover:text-brand-brown transition-colors">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className="hover:text-brand-brown transition-colors">
                {link.label}
              </Link>
            )
          ))}
          {user && (
            <button 
              onClick={logout}
              className="hover:text-brand-red transition-colors"
            >
              Logout
            </button>
          )}
        </div>
        {!user && (
          <Button variant="primary" size="md" onClick={handleCTA}>
            Build Now
          </Button>
        )}
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted hidden sm:block">
              Hey, {user.name || "Culprit"}
            </span>
            <Button variant="outline" size="md" onClick={() => router.push("/decks")}>
              Dashboard
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
