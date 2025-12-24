import { Button } from "@/ui/components/ui/Button";

export const Navbar = () => {
  const navLinks = [
    { label: "How it Works", href: "#how-it-works" },
    { label: "The Deck", href: "#the-deck" },
    { label: "Game Modes", href: "#modes" },
  ];

  return (
    <nav className="relative z-50 flex items-center justify-between px-8 py-8 lg:px-16 container mx-auto">
      <div className="font-serif text-2xl tracking-tight font-bold text-brand-brown">
        Flip it <span className="font-script text-3xl font-normal ml-1">Drink it</span>
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
    </nav>
  );
};
