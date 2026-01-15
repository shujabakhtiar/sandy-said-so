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
}

export const Modal = ({
  trigger,
  size = 'md',
  title,
  description,
  children,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
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
                    "bg-white rounded-[40px] p-10 w-full relative shadow-espresso animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]",
                    sizeClasses[size]
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {(title || description) && (
                    <div className="text-center mb-8 shrink-0">
                    {title && <h2 className="text-3xl font-serif font-bold text-brand-brown mb-2">{title}</h2>}
                    {description && <p className="text-sm text-brand-text-muted italic">{description}</p>}
                    </div>
                )}
                
                <div className="overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
            </div>,
            document.body
        )
      }
    </>
  );
};
