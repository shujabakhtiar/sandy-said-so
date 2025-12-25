export const Footer = () => {
  return (
    <footer className="pt-12 pb-8 px-8 border-t border-brand-tan/10 bg-transparent">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div>
          <div className="font-serif text-3xl font-bold text-brand-brown mb-2 tracking-tighter">Sandy said so.</div>
          <p className="max-w-xs text-brand-text-muted font-medium leading-relaxed italic text-sm">
            Revolutionizing the way you listen to the imaginary friend in your head.
          </p>
        </div>
        
        <div className="max-w-md">
          <p className="text-brand-brown font-serif italic leading-relaxed text-base md:text-lg">
            "Created by Shuja B, who couldn’t find the right social card game, so made one."
          </p>
        </div>

        <div className="text-brand-brown/30 font-bold uppercase text-[10px] tracking-[0.4em]">
          © 2025 SANDY SAID SO.
        </div>
      </div>
    </footer>
  );
};
