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
import { Button } from "@/components/ui/button";

function LoginContent() {
  const searchParams = useSearchParams();
  const isRegisterParam = searchParams.get("register") === "true";
  const [isLogin, setIsLogin] = useState(!isRegisterParam);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    setIsLogin(!isRegisterParam);
  }, [isRegisterParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const res = await userLogin({ email, password, redirectTo: redirect });
        if (res?.ok) {
          router.push(`/?login=true`);
        }
        // if (res?.success) {
        //   toast.success("Successfully Loged In");
        //   router.push(`/?login=true`);
        // } else {
        //   toast.error(res?.message || "Login Failed");
        // }
      } else {
        const res = await registerUser(null, { fullName, email, password });
        if (res?.success) {
          toast.success("Registration Successfull");
          router.push(`/?loginReg=true`);
          setIsLogin(true);
        } else {
          toast.error(res?.message || "Registration Failed");
        }
      }
    } catch (err: any) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;
  };

  return (
    <div className="relative flex py-20 justify-center px-4 overflow-hidden bg-[#050505] text-white">
      {/* --- Animated Background Gradients --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative max-w-lg w-full bg-white/[0.03] backdrop-blur-xl rounded-[40px] border border-white/10 shadow-2xl p-10 space-y-8"
      >
        {/* Logo/Icon */}
        <div className="flex justify-center">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/40">
            <Sparkles size={24} className="text-white" />
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black tracking-tight text-white">
            {isLogin ? "Login" : "Register Account"}
          </h1>
          <p className="text-gray-400">
            {isLogin
              ? "Provide credentials to login"
              : "Provide details to create account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative"
                >
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    required
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-white"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/[0.05] border border-white/10 rounded-2xl focus:outline-none focus:border-indigo-500 transition-all text-white placeholder:text-white"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Login" : "Create Account"}{" "}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </span>
          </motion.button>
        </form>

        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="w-full py-7 bg-white/[0.02] border-white/10 hover:bg-white/5 text-white rounded-2xl flex items-center justify-center gap-3 transition-all cursor-pointer"
        >
          <FcGoogle size={24} />
          <span className="font-bold">Continue With Google</span>
        </Button>

        <div className="text-center">
          <p className="">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => {
                if (isLogin) {
                  router.push("/login?register=true");
                } else {
                  router.push("/login");
                }
              }}
              className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors ml-1 cursor-pointer underline"
            >
              {isLogin ? "Create a new one" : "Login Now"}
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
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
