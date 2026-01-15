"use client";

import { useState } from "react";
import { Button } from "@/ui/components/ui/Button";
import { sandyToast } from "@/ui/lib/sandy-toast";
import { toast } from "sonner";

type ToastType = "success" | "error" | "info" | "warning";

export const ToasterTest = () => {
  const [selectedType, setSelectedType] = useState<ToastType>("success");

  const handleTrigger = () => {
    switch (selectedType) {
      case "success":
        sandyToast.success("Your deck has been saved successfully!");
        break;
      case "error":
        sandyToast.error("Failed to load your decks. Please try again.");
        break;
      case "info":
        sandyToast.info("Sandy has 3 new suggestions for your deck.");
        break;
      case "warning":
        toast.warning("Sandy warns you", {
          description: "This action cannot be undone.",
          position: "top-right",
        });
        break;
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
      <div className="bg-white rounded-[40px] p-12 max-w-md w-full shadow-espresso">
        <h1 className="text-4xl font-serif font-bold text-brand-brown mb-2 text-center">
          Toast Tester
        </h1>
        <p className="text-brand-text-muted text-center mb-8 italic">
          Sandy's notification playground
        </p>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-3">
              Toast Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as ToastType)}
              className="w-full px-4 py-3 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 outline-none text-brand-brown font-medium transition-all"
            >
              <option value="success">Success</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
            </select>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full shadow-md"
            onClick={handleTrigger}
          >
            Trigger Toast
          </Button>
        </div>
      </div>
    </div>
  );
};
