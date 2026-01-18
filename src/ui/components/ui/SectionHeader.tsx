import React from 'react';

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  accent?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeader = ({ 
  title, 
  subtitle, 
  accent, 
  align = 'center',
  className = ""
}: SectionHeaderProps) => {
  return (
    <div className={`flex flex-col ${align === 'center' ? 'items-start text-left md:items-center md:text-center' : 'items-start text-left'} ${className}`}>
      {accent && (
        <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-brand-tan/20 text-brand-brown font-bold text-[10px] tracking-[0.2em] uppercase">
          {accent}
        </div>
      )}
      <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-brown mb-6 leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xl text-brand-text-muted max-w-2xl font-medium leading-relaxed mb-8">
          {subtitle}
        </p>
      )}
      <div className="w-24 h-1 bg-brand-tan/30 rounded-full" />
    </div>
  );
};
