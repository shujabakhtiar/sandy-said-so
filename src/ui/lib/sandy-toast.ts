import { toast } from "sonner";

const sandyErrors = [
  "Sandy didn't like that.",
  "Sandy says no.",
  "Sandy rolled her eyes. Try again.",
  "Not cool, darling. Something broke.",
  "Sandy is unimpressed with this error.",
  "Chaos rejected this. Try later.",
  "Sandy yawns... fix it yourself.",
];

const sandySuccesses = [
  "Sandy approves of this change.",
  "Cheers, darling! It's done.",
  "Pure chaos. Sandy winks.",
  "Sandy shuffled the secrets.",
  "A toast to your success!",
  "Sandy has recorded your move.",
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
