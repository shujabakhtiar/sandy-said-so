"use client";

import { Toaster } from "sonner";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#FFFBF5", // brand-cream
          border: "1px solid rgba(139, 69, 19, 0.1)", // brand-brown/10
          color: "#5C3D2E", // brand-brown
          fontFamily: "var(--font-serif)",
          borderRadius: "16px",
          boxShadow: "0 10px 30px -10px rgba(92, 61, 46, 0.1)", // shadow-espresso
        },
        className: "group",
        descriptionClassName: "text-brand-text-muted text-xs",
        actionButtonStyle: {
          background: "#8B4513", // brand-brown
          color: "white",
        },
        cancelButtonStyle: {
          background: "#F5F5F0", // brand-tan/10
          color: "#5C3D2E",
        },
      }}
    />
  );
};
