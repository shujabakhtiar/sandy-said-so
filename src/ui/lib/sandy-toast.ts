import { toast } from "sonner";

const sandyErrors = [
  "Sandy says no.",
  "Sandy rolled her eyes.",
  "Not cool, darling.",
  "Try again, sweetie.",
  "Sandy is unimpressed.",
  "Chaos rejected this.",
  "Sandy yawns.",
];

const sandySuccesses = [
  "Sandy approves.",
  "Cheers, darling!",
  "You're on fire.",
  "Sandy winks.",
  "Pure chaos. Perfect.",
  "A toast to you!",
];

export const sandyToast = {
  success: (message: string) => {
    const randomTitle = sandySuccesses[Math.floor(Math.random() * sandySuccesses.length)];
    toast.success(randomTitle, {
      description: message,
      duration: 4000,
      position: "top-right",
    });
  },

  error: (message: string) => {
    const randomTitle = sandyErrors[Math.floor(Math.random() * sandyErrors.length)];
    toast.error(randomTitle, {
      description: message,
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
