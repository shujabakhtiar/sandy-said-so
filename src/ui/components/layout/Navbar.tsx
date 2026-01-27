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
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
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

  // Handle path changes - close dropdowns
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsSideNavOpen(false);
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
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-8 w-full transition-all duration-500",
          // Mobile: Always solid background, no transparency transition
          "bg-brand-cream/90 backdrop-blur-lg py-4",
          // Desktop: Transparent at top, solid when scrolled
          "md:py-8 md:bg-transparent md:shadow-none",
          isScrolled && "md:bg-brand-cream/90 md:backdrop-blur-lg md:py-3 lg:px-16"
        )}
      >
        <div className={cn(
          "container mx-auto flex items-center justify-between transition-all duration-500",
          isScrolled ? "md:scale-[0.98] md:opacity-100" : "md:scale-100"
        )}>
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

          <div className="flex items-center gap-4">
            {/* Hamburger Menu - Mobile Only */}
            <button 
              onClick={() => setIsSideNavOpen(true)}
              className="md:hidden p-2 text-brand-brown hover:bg-brand-brown/5 rounded-full transition-colors order-last"
              title="Open Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>

            {!user && (
              <div className="hidden md:block">
                <Button variant="primary" size="md" onClick={handleCTA}>
                  Build Now
                </Button>
              </div>
            )}

            {user && (
              <div className="hidden md:flex items-center gap-8 relative user-menu">
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
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-muted mb-1">Hey there,</p>
                      <p className="text-brand-brown font-script font-bold text-lg leading-tight">{user.name || "Mystery Culprit"}</p>
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
        </div>
      </nav>

      {/* Mobile Side Nav - Completely isolated from the nav scaling/transform context */}
      <div 
        className={cn(
          "fixed inset-0 z-9999 md:hidden transition-all duration-300 pointer-events-none",
          isSideNavOpen ? "pointer-events-auto" : ""
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-brand-brown/60 backdrop-blur-md transition-opacity duration-500",
            isSideNavOpen ? "opacity-100" : "opacity-0"
          )} 
          onClick={() => setIsSideNavOpen(false)} 
        />
        <div 
          className={cn(
            "absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-brand-cream shadow-2xl p-8 transition-transform duration-500 ease-out flex flex-col z-10000",
            isSideNavOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex justify-between items-center mb-10 shrink-0">
            <Link href="/" className="font-serif text-xl tracking-tight font-bold text-brand-brown">
              Sandy <span className="font-script text-2xl font-normal ml-1">said so.</span>
            </Link>
            <button 
              onClick={() => setIsSideNavOpen(false)}
              className="p-2 text-brand-text-muted hover:text-brand-brown transition-colors"
              title="Close Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col gap-12 grow overflow-y-auto py-4 px-2">
            {user && (
              <div className="flex flex-col gap-6">
                <div className="mb-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-text-muted mb-4">Hello my darling,</p>
                  <h2 className="font-script text-2xl font-normal text-brand-brown">{user.name || "Mystery Culprit"}</h2>
                </div>
                
                <Link 
                  href="/decks" 
                  onClick={() => setIsSideNavOpen(false)}
                  className={cn(
                    "text-2xl font-serif font-bold transition-colors",
                    pathname === "/decks" ? "text-brand-red underline decoration-2 underline-offset-8" : "text-brand-brown hover:text-brand-red"
                  )}
                >
                  Your Decks
                </Link>
              </div>
            )}

            <div className="flex flex-col gap-8">
              {navLinks.map((link) => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl font-serif font-bold text-brand-brown hover:text-brand-red transition-colors"
                >
                  {link.label}
                </a>
              ))}
              {!user && (
                  <Link 
                  href="/login" 
                  onClick={() => setIsSideNavOpen(false)}
                  className="text-2xl font-serif font-bold text-brand-brown hover:text-brand-red transition-colors"
                >
                  Log In
                </Link>
              )}
            </div>
            
            <div className="hidden md:block mt-8 pt-10 border-t border-brand-tan/10 pointer-events-none text-center">
              <div className="font-script text-4xl text-brand-red rotate-3 opacity-60">Sandy said it.</div>
            </div>

            {user && (
              <div className="mt-auto pt-8 border-t border-brand-tan/10">
                <button 
                  onClick={logout}
                  className="text-lg font-bold uppercase tracking-[0.2em] text-brand-red hover:text-brand-red/80 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
