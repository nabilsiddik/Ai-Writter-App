"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock,
  Mail,
  ArrowRight,
  User as UserIcon,
  Loader2,
  Sparkles,
} from "lucide-react";
import { registerUser } from "@/services/auth/registerUser";
import { userLogin } from "@/services/auth/userLogin";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

declare global {
  interface Window {
    chrome: typeof chrome;
  }
}

function LoginContent() {
  const searchParams = useSearchParams();
  const isRegisterParam = searchParams.get("register") === "true";
  const [isLogin, setIsLogin] = useState(!isRegisterParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const redirect = searchParams.get("redirect") || "";

  useEffect(() => {
    setIsLogin(!isRegisterParam);
  }, [isRegisterParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await userLogin({ email, password, redirectTo: redirect });
        if (res?.success) {
          const detectedId = window.sessionStorage.getItem("DETECTED_EXT_ID");

          if (detectedId && window.chrome?.runtime?.sendMessage) {
            window.chrome.runtime.sendMessage(
              detectedId,
              { type: "AUTH_TOKEN", token: res.accessToken },
              (response) => {
                if (window.chrome.runtime.lastError) {
                  console.error(
                    "Sync Error:",
                    window.chrome.runtime.lastError.message,
                  );
                } else {
                  console.log("Extension Synced Successfully");
                }
              },
            );
          }

          toast.success("Successfully Logged In");
          router.push(res.redirectTo);
        } else {
          toast.error(res?.message || "Invalid credentials");
        }
      } else {
        const res = await registerUser(null, { fullName, email, password });
        if (res?.success) {
          toast.success("Account created successfully");
          router.push(`/verify-otp?email=${res?.data?.result?.email}`);
          setIsLogin(true);
        } else {
          toast.error(res?.message || "Registration failed");
        }
      }
    } catch (err: any) {
      toast.error("Internal server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;
  };

  const inputStyles =
    "w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-primary transition-all text-black placeholder:text-slate-300 text-lg";
  const iconStyles =
    "absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-300";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 mt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full bg-white border border-slate-200 rounded-[40px] shadow-xl p-10 space-y-8"
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="p-4 bg-primary/10 rounded-2xl">
            <Sparkles size={32} className="text-primary" />
          </div>
          <h1 className="text-4xl font-black tracking-tight text-black">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            {isLogin
              ? "Login with your credentials"
              : "Start generating professional content"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-3">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <UserIcon className={iconStyles} />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputStyles}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className={iconStyles} />
              <input
                required
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputStyles}
              />
            </div>

            <div className="relative">
              <Lock className={iconStyles} />
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputStyles}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-indigo-700 disabled:bg-slate-200 text-white font-black py-5 rounded-2xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-3 cursor-pointer text-xl"
          >
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                {isLogin ? "Sign In" : "Create Free Account"}
                <ArrowRight size={24} />
              </>
            )}
          </button>
        </form>

        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <span className="relative bg-white px-4 text-lg font-bold text-slate-300 uppercase tracking-widest">
            or
          </span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-4 bg-white border-2 border-slate-100 hover:bg-slate-50 text-black rounded-2xl flex items-center justify-center gap-4 transition-all cursor-pointer font-bold text-lg shadow-sm"
        >
          <FcGoogle size={28} />
          Continue with Google
        </button>

        <div className="text-center">
          <p className="text-xl text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                if (isLogin) {
                  router.push("/login?register=true");
                } else {
                  router.push("/login");
                }
              }}
              className="text-primary font-black hover:underline cursor-pointer ml-1"
            >
              {isLogin ? "Sign up now" : "Log in"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
