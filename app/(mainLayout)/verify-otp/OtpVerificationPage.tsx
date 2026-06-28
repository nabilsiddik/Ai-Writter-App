"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Loader2, 
  RefreshCcw,
  Lock
} from "lucide-react";

import { toast } from "sonner";
import { resendOtp, verifyOtp } from "@/services/auth/otp";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

function OTPContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return toast.error("Please enter the full 6-digit code");

    setLoading(true);
    try {
      const res = await verifyOtp({ email, otp, type: 'EMAIL_VERIFICATION' });
      if (res?.success) {
        toast.success("Account verified successfully!");
        router.push("/login?verified=true");
      } else {
        toast.error(res?.message || "Invalid or expired OTP code");
      }
    } catch (err) {
      toast.error("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setResending(true);
    try {
      const res = await resendOtp({
        email, type: 'EMAIL_VERIFICATION'
      });
      if (res?.success) {
        toast.success("A fresh verification code has been sent");
        setTimer(60);
        setCanResend(false);
        setOtp("");
      } else {
        toast.error(res?.message || "Failed to resend code");
      }
    } catch (err) {
      toast.error("Error resending OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white border border-slate-200 rounded-[40px] shadow-xl p-10 md:p-16 space-y-10"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-2xl text-primary">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-black">
            Verify Identity
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            We've sent a 6-digit code to <br />
            <span className="text-black font-bold">{email || "your email"}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-10 flex flex-col items-center">
<InputOTP
  maxLength={6}
  value={otp}
  onChange={(value) => setOtp(value)}
  render={({ slots }) => (
    <InputOTPGroup className="gap-3">
      {slots.map((slot, index) => (
        <InputOTPSlot
          key={index}
          index={index}
          {...slot}
          // Added 'text-black' and 'bg-white' explicitly
          className="w-12 h-16 md:w-16 md:h-20 text-2xl font-black border-2 border-slate-200 rounded-xl bg-white text-black focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
        />
      ))}
    </InputOTPGroup>
  )}
/>

          <button
            type="submit"
            disabled={loading || otp.length < 6}
            className="w-full bg-primary hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 cursor-pointer text-xl"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Verify Code
                <ShieldCheck size={24} />
              </>
            )}
          </button>
        </form>

        <div className="text-center space-y-4">
          <div className="text-lg font-medium text-slate-500">
            {canResend ? (
              <button
                onClick={handleResend}
                disabled={resending}
                className="text-primary font-black hover:underline cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                {resending ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw size={20} />}
                Resend New Code
              </button>
            ) : (
              <p className="flex items-center justify-center gap-2">
                Resend available in <span className="text-black font-bold">{timer}s</span>
              </p>
            )}
          </div>
          
          <button 
            onClick={() => router.push('/login')}
            className="text-slate-400 font-bold hover:text-black transition-colors cursor-pointer text-base"
          >
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      }
    >
      <OTPContent />
    </Suspense>
  );
}