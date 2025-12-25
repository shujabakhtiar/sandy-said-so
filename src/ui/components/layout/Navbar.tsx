"use client";

import { useEffect, useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { cn } from "@/ui/lib/utils";
import { useAuth } from "@/ui/providers/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest(".user-menu")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  // Handle path changes - close dropdown
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  const navLinks = isHomePage ? [
    { label: "How it Works", href: "#how-it-works" },
    { label: "Game Modes", href: "#modes" },
  ] : [];

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
              <a key={link.href} href={link.href} className="hover:text-brand-brown transition-all duration-300">
                {link.label}
              </a>
            ) : (
              <Link key={link.href} href={link.href} className={cn(
                "hover:text-brand-brown transition-all duration-300",
                pathname === link.href && "text-brand-brown font-bold"
              )}>
                {link.label}
              </Link>
            )
          ))}
        </div>
        {!user && (
          <Button variant="primary" size="md" onClick={handleCTA}>
            Build Now
          </Button>
        )}
        {user && (
          <div className="flex items-center gap-8 relative user-menu">
            <Link 
              href="/decks" 
              className={cn(
                "text-xs font-bold uppercase tracking-[0.2em] text-brand-text-muted hover:text-brand-brown transition-all duration-300",
                pathname === "/decks" && "text-brand-brown"
              )}
            >
              Your Decks
            </Link>
            
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 shadow-sm user-menu-trigger",
                isDropdownOpen 
                  ? "border-brand-red text-brand-red bg-brand-red/5 shadow-inner" 
                  : "border-brand-brown text-brand-brown bg-transparent hover:border-brand-red hover:text-brand-red hover:bg-brand-red/5"
              )}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-brand-tan/20 py-6 px-6 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 z-100">
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-1">Signed in as</p>
                  <p className="text-brand-brown font-serif font-bold text-lg leading-tight">{user.name || "Mystery Culprit"}</p>
                  <p className="text-xs text-brand-text-muted truncate">{user.email}</p>
                </div>
                
                <div className="h-px bg-brand-tan/10 w-full mb-4" />
                
                <button 
                  onClick={logout}
                  className="w-full text-left flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-brand-red hover:bg-brand-red/5 p-2 rounded-xl transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
