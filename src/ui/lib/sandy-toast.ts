import { toast } from "sonner";

const sandyErrors = [
   "Oops — that didn’t go as planned.",
  "Something slipped. Try again?",
  "That wasn’t supposed to happen.",
  "Tiny hiccup on our end.",
  "We hit a small snag.",
];

const sandySuccesses = [
  "Sandy approves.",
  "Sandy winks.",
  "Cheers, darling!",
  "Sandy noticed.",
  "Sandy shuffled the secrets.",
];

export const sandyToast = {
  success: (message: string, sandyMessage?: string) => {
    const title = sandyMessage || sandySuccesses[Math.floor(Math.random() * sandySuccesses.length)];
    toast.success(title, {
      description: message,
      duration: 4000,
      position: "top-right",
    });
  },

  error: (explanation: string) => {
    const randomTitle = sandyErrors[Math.floor(Math.random() * sandyErrors.length)];
    toast.error(randomTitle, {
      description: explanation,
      duration: 5000,
      position: "top-center",
    });
  },

  info: (message: string) => {
    toast.message("Sandy noticed something.", {
      description: message,
      position: "top-right",
    });
  },
};
