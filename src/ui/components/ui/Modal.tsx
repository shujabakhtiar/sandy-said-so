"use client";

import { cn } from "@/ui/lib/utils";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  trigger?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  title?: string;
  description?: string;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: 'default' | 'letter';
}

export const Modal = ({
  trigger,
  size = 'md',
  title,
  description,
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
  variant = 'default',
}: ModalProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (value: boolean) => {
    if (setControlledOpen) {
      setControlledOpen(value);
    }
    if (!isControlled) {
      setUncontrolledOpen(value);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent scrolling when modal is open
  useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            
        }
        return () => {
             document.body.style.overflow = 'unset';
        }
  }, [isOpen])


  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
  };

  const isLetter = variant === 'letter';

  return (
    <>
      {trigger && (
        <div onClick={() => setOpen(true)} className="inline-block">
          {trigger}
        </div>
      )}

      {isOpen && 
        createPortal(
            <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <div 
                className="absolute inset-0 bg-brand-brown/40 backdrop-blur-sm animate-in fade-in duration-300" 
                onClick={() => setOpen(false)} 
            />
            <div 
                className={cn(
                    "bg-brand-cream rounded-[10px] p-12 w-full relative shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col max-h-[90vh] border border-brand-tan/20",
                    isLetter && "rotate-[-0.5deg] before:absolute before:inset-0 before:bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] before:opacity-20 before:pointer-events-none before:rounded-[10px]",
                    sizeClasses[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Fold-like element */}
                {isLetter && <div className="absolute top-0 right-0 w-16 h-16 bg-brand-tan/5 rounded-bl-[40px] border-l border-b border-brand-tan/10 pointer-events-none" />}

                {(title || description) && (
                    <div className={cn(
                        "relative shrink-0 border-b border-brand-tan/10",
                        isLetter ? "text-left mb-10 pb-6" : "text-center mb-8 pb-4"
                    )}>
                      {isLetter && <div className="absolute -top-4 -left-6 w-12 h-12 bg-brand-red/5 rounded-full blur-xl pointer-events-none" />}
                      {title && <h2 className="text-4xl font-serif font-black text-brand-brown mb-3 tracking-tight">{title}</h2>}
                      {description && <p className="text-md text-brand-text-muted italic font-medium">{description}</p>}
                    </div>
                )}
                
                <div className="overflow-y-auto custom-scrollbar flex-1 pr-2">
                    {children}
                </div>

                {/* Sandy's Signature */}
                {isLetter && (
                    <div className="mt-10 pt-6 border-t border-brand-tan/10 flex justify-end shrink-0">
                        <div className="text-right">
                            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-brand-tan mb-1">From the desk of</span>
                            <span className="font-script text-4xl text-brand-red lowercase leading-none">Sandy xx</span>
                        </div>
                    </div>
                )}
            </div>
            </div>,
            document.body
        )
      }
    </>
  );
};
