"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { setAuthSession } from "@/services/auth/setAuthSession";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("accessToken");

  useEffect(() => {
    const handleSync = async () => {
      if (token) {
        await setAuthSession(token);
        if (
          typeof window !== "undefined" &&
          window.chrome?.runtime?.sendMessage
        ) {
          const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID;

          window.chrome.runtime.sendMessage(
            EXTENSION_ID!,
            {
              type: "AUTH_TOKEN",
              token: token,
            },
            (response) => {
              if (window.chrome.runtime.lastError) {
                console.warn("Extension not installed, skipping sync.");
              } else {
                console.log("Extension Synced via Google Login");
              }
            },
          );
        }

        // 2. Clear the token from the URL for security and redirect
        toast.success("Identity verified. Welcome back!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    };
    handleSync();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-10">
      <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 animate-bounce">
        <ShieldCheck className="text-primary" size={40} />
      </div>
      <h1 className="text-3xl font-black mb-4">Finalizing Connection</h1>
      <p className="text-slate-500 text-xl font-medium flex items-center gap-3">
        <Loader2 className="animate-spin" /> Syncing your AI Studio...
      </p>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <AuthSuccessContent />
    </Suspense>
  );
}
