
"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorCode = searchParams.get("error_code");
  const errorDescription = searchParams.get("error_description");

  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white rounded-[32px] p-10 shadow-espresso border border-brand-tan/20 w-full max-w-lg">
        <h1 className="text-3xl font-serif font-bold text-brand-brown mb-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-brand-text-muted mb-8">
          We couldn't verify your login. Here's what the system said:
        </p>

        <div className="bg-brand-red/5 border border-brand-red/20 rounded-xl p-6 mb-8 text-left overflow-x-auto">
          {error && (
            <p className="font-mono text-sm text-brand-red mb-2">
              <span className="font-bold">Error:</span> {error}
            </p>
          )}
          {errorCode && (
            <p className="font-mono text-sm text-brand-red mb-2">
              <span className="font-bold">Code:</span> {errorCode}
            </p>
          )}
          {errorDescription && (
            <p className="font-mono text-sm text-brand-red">
              <span className="font-bold">Description:</span> {errorDescription}
            </p>
          )}
          {!error && !errorCode && !errorDescription && (
             <p className="font-mono text-sm text-brand-text-muted">
               No specific error details provided.
             </p>
          )}
        </div>

        <Link 
          href="/login" 
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-brown px-8 font-serif text-lg font-medium text-brand-cream shadow-lg transition-all hover:bg-brand-brown/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand-tan focus:ring-offset-2"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}

export default function AuthCodeErrorPage() {
  return (
    <Suspense fallback={<div>Loading error details...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
