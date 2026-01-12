"use client";

import { useState, Suspense } from "react";
import { Button } from "@/ui/components/ui/Button";
import Link from "next/link";
import { Navbar } from "@/ui/components/layout/Navbar";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/decks";
  const supabase = createClient();

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${redirectTo}`,
        },
      });
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  // ... (handleGoogleLogin remains unchanged)

  const handleResendConfirmation = async () => {
    setResendLoading(true);
    setError("");
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });
      if (error) throw error;
      setResendSuccess(true);
      setError(""); // Clear error on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setNeedsConfirmation(false);
    setResendSuccess(false);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        if (error.message === "Email not confirmed") {
            setNeedsConfirmation(true);
            throw new Error("You haven't confirmed your email yet. Please check your inbox.");
        }
        throw error;
      }
      window.location.href = redirectTo;
    } catch (err: any) {
      setError(err.message);
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
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-red/10 transition-colors" />
            
            <div className="relative">
              <div className="text-center mb-10">
                <h1 className="text-4xl font-serif font-bold text-brand-brown mb-3">Welcome Back.</h1>
                <p className="text-brand-text-muted font-medium italic">Sandy has been waiting for you.</p>
              </div>

              {(error || resendSuccess) && (
                <div className={`mb-6 p-4 rounded-xl text-sm font-bold text-center border ${resendSuccess ? 'bg-green-100 border-green-200 text-green-700' : 'bg-brand-red/10 border-brand-red/20 text-brand-red'}`}>
                  {resendSuccess ? "Confirmation email resent! Check your inbox." : error}
                  
                  {needsConfirmation && !resendSuccess && (
                    <div className="mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="bg-white border-brand-red/30 text-brand-red hover:bg-brand-red/5"
                        onClick={handleResendConfirmation}
                        disabled={resendLoading}
                        type="button"
                      >
                        {resendLoading ? "Sending..." : "Resend Confirmation Email"}
                      </Button>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-4 mb-8">
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="w-full shadow-sm flex items-center justify-center gap-3 bg-white"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-brand-tan/20"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest px-4">
                  <span className="bg-white text-brand-text-muted px-2">Or secret entrance</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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
                  {loading ? "Logging in..." : "Login to Your Secret"}
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-sm text-brand-text-muted font-medium">
                  Don&apos;t have a deck yet?{" "}
                  <Link 
                    href={searchParams.get("redirect") ? `/signup?redirect=${encodeURIComponent(searchParams.get("redirect")!)}` : "/signup"} 
                    className="text-brand-red font-bold hover:underline underline-offset-4 decoration-brand-red/30 italic"
                  >
                    Tell Sandy who you are.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Decorative Elements */}
      <div className="fixed bottom-10 right-10 pointer-events-none opacity-20">
        <div className="font-script text-6xl text-brand-red rotate-12">Sandy knows.</div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-brand-tan/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-brand-red rounded-full border-t-transparent animate-spin" />
          <div className="absolute inset-3 bg-brand-brown/5 rounded-full flex items-center justify-center">
            <span className="font-script text-3xl text-brand-red">S</span>
          </div>
        </div>
        <h2 className="text-3xl font-serif font-bold text-brand-brown animate-pulse">Sandy is watching...</h2>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
