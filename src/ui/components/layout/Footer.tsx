export const Footer = () => {
  return (
    <footer className="py-20 px-8 border-t-2 border-brand-tan/10 bg-white">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="font-serif text-3xl font-bold text-brand-brown mb-2 tracking-tighter">Sandy said so.</div>
          <p className="max-w-xs text-brand-text-muted font-medium leading-relaxed italic">
            Revolutionizing the way you listen to the imaginary friend in your head.
          </p>
        </div>
        <div className="flex gap-12 font-bold uppercase text-[10px] tracking-[0.2em] text-brand-brown/80">
          <div className="flex flex-col gap-5">
             <a href="#" className="hover:text-brand-red transition-colors">TikTok Series</a>
             <a href="#" className="hover:text-brand-red transition-colors">Instagram Feed</a>
          </div>
          <div className="flex flex-col gap-5">
             <a href="#" className="hover:text-brand-red transition-colors">Support Center</a>
             <a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a>
          </div>
        </div>
        <div className="text-brand-brown/30 font-bold uppercase text-[10px] tracking-[0.4em]">
          © 2025 SANDY SAID SO. LISTEN TO SANDY.
        </div>
      </div>
    </footer>
  );
};
