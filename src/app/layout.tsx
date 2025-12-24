import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Outfit, La_Belle_Aurore } from "next/font/google";
import "@/ui/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const sansFont = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const scriptFont = La_Belle_Aurore({
  weight: "400",
  variable: "--font-script",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandy said so | The Imaginary Instigator",
  description: "The drinking game where your secrets aren't safe. Sandy knows your friends, Sandy makes the rules, and you do what Sandy says.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${serifFont.variable} ${sansFont.variable} ${scriptFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
