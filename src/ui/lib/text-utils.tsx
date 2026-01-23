import React from "react";
import { cn } from "./utils";

export const formatCardText = (text: string, isDark: boolean = false) => {
  if (typeof text !== 'string' || !text.trim()) return null;
  
  // 1. Handle double newlines for paragraph breaks
  const paragraphs = text.split(/\n\n/);
  
  return paragraphs.map((para, pIdx) => (
    <React.Fragment key={pIdx}>
      <span className="block mb-2 last:mb-0">
        {para.split(/\n/).map((line, lIdx) => (
          <React.Fragment key={lIdx}>
            {line.split(/(\*\*.*?\*\*)/g).map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong 
                    key={i} 
                    className={cn(
                      "font-black",
                      isDark ? "text-white underline decoration-white/20" : "text-brand-red decoration-brand-red/10"
                    )}
                  >
                    {part.slice(2, -2)}
                  </strong>
                );
              }
              return part;
            })}
            {lIdx < para.split(/\n/).length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </React.Fragment>
  ));
};
