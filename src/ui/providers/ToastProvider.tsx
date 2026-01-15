"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "group w-full rounded-2xl p-4 shadow-lg border flex items-start gap-3 font-sans",
          title: "font-serif font-bold text-base",
          description: "text-sm mt-1 opacity-80",
          success: "bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 text-green-900",
          error: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 text-red-900",
          info: "bg-gradient-to-br from-blue-50 to-sky-50 border-blue-200 text-blue-900",
          warning: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 text-amber-900",
          default: "bg-gradient-to-br from-brand-cream to-brand-tan/20 border-brand-tan/30 text-brand-brown",
          actionButton: "!bg-brand-brown !text-white !px-4 !py-2 !rounded-lg !font-bold !text-sm hover:!bg-brand-text transition-colors",
          cancelButton: "!bg-brand-tan/20 !text-brand-brown !px-4 !py-2 !rounded-lg !font-medium !text-sm hover:!bg-brand-tan/30 transition-colors",
        },
      }}
    />
  );
};
