"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "group w-full rounded-2xl p-4 shadow-xl border flex items-start gap-3 font-sans bg-brand-cream/80 backdrop-blur-md",
          title: "font-serif font-bold text-base",
          description: "text-sm mt-1 opacity-80",
          success: "border-brand-blue/30 text-brand-blue",
          error: "border-brand-red/30 text-brand-red",
          info: "border-brand-blue/30 text-brand-blue",
          warning: "border-amber-200 text-amber-700",
          default: "border-brand-tan/30 text-brand-brown",
          actionButton: "!bg-brand-brown !text-white !px-4 !py-2 !rounded-lg !font-bold !text-sm hover:!bg-brand-text transition-colors",
          cancelButton: "!bg-brand-tan/20 !text-brand-brown !px-4 !py-2 !rounded-lg !font-medium !text-sm hover:!bg-brand-tan/30 transition-colors",
        },
      }}
    />
  );
};
