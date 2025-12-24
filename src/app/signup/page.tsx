"use client";

import { useState } from "react";
import { useAuth } from "@/ui/providers/AuthContext";
import { Button } from "@/ui/components/ui/Button";
import Link from "next/link";
import { Navbar } from "@/ui/components/layout/Navbar";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup({ email, password, name });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-cream flex flex-col">
      <Navbar />
      
      <main className="grow flex items-center justify-center px-6 pt-20">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-[32px] p-10 shadow-espresso border border-brand-tan/20 relative overflow-hidden group">
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -ml-16 -mt-16 group-hover:bg-brand-blue/10 transition-colors" />
            
            <div className="relative">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold text-brand-brown mb-3">Join the Party.</h1>
                <p className="text-brand-text-muted font-medium italic">Introduce yourself to Sandy. She doesn&apos;t bite.</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-brand-red/10 border border-brand-red/20 rounded-xl text-brand-red text-sm font-bold text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-2 ml-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 transition-all outline-none text-brand-brown font-medium"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-2 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 transition-all outline-none text-brand-brown font-medium"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-brand-text-muted mb-2 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-6 py-4 rounded-2xl bg-brand-cream/50 border border-brand-tan/30 focus:border-brand-brown focus:ring-0 transition-all outline-none text-brand-brown font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button variant="primary" size="xl" className="w-full shadow-lg" disabled={loading}>
                  {loading ? "Introducing..." : "Start Your Deck"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-brand-text-muted font-medium">
                  Already in on the secret?{" "}
                  <Link href="/login" className="text-brand-red font-bold hover:underline underline-offset-4 decoration-brand-red/30 italic">
                    Login here.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 pointer-events-none opacity-20">
        <div className="font-script text-6xl text-brand-brown -rotate-12">Secrets start here.</div>
      </div>
    </div>
  );
}
