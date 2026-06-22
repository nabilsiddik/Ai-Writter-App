'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { Lock, Mail, ArrowRight, User as UserIcon, Loader2 } from 'lucide-react';
import { registerUser } from '@/services/auth/registerUser';
import { userLogin } from '@/services/auth/userLogin';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { Button } from '@/components/ui/button';


function LoginContent() {
  const searchParams = useSearchParams();
  const isRegister = searchParams.get('register') === 'true'
  const [isLogin, setIsLogin] = useState(isRegister ? false : true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const redirect = searchParams.get('redirect') || '/';

  useEffect(() => {
    if(isRegister){
      setIsLogin(false)
    }else{
      setIsLogin(true)
    }
  }, [searchParams, isLogin])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const res = await userLogin({ email, password, redirectTo: redirect });
        console.log(res, 'login res');
        if(res?.success){
          // router.push(`/?login=true`)
        }else{
          toast.error(res?.message || 'লগিন সফল হয় নি')
        }
      } else {
        const res = await registerUser(null, {
          fullName,
          email,
          password
        });
        console.log(res, 'reg res');

        if (res?.success) {
          // router.push(`/?loginReg=true`)
          setIsLogin(true);
        }else{
          toast.error('একাউন্ট নিবন্ধন বাতিল হয়েছে')
        }
      }
    } catch (err: any) {
      console.log('Something went wrong', err)
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async() => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] border border-slate-100 shadow-2xl p-10 space-y-8"
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-display font-black text-slate-900">
            {isLogin ? 'লগইন করুন' : 'নিবন্ধন করুন'}
          </h1>
          <p className="text-slate-500">
            {isLogin ? 'আপনার অ্যাকাউন্টে প্রবেশ করতে তথ্য দিন' : 'নতুন অ্যাকাউন্ট তৈরি করতে তথ্য দিন'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative overflow-hidden"
                >
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="পুরো নাম"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-all font-medium"
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="email"
                placeholder="ইমেইল অ্যাড্রেস"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 focus:border-primary rounded-2xl focus:outline-none transition-all font-medium"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                required
                type="password"
                placeholder="পাসওয়ার্ড"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-primary transition-all font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-slate-900 disabled:bg-slate-300 text-white font-black py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
              <>
                {isLogin ? 'প্রবেশ করুন' : 'তৈরি করুন'} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            {isLogin ? 'অ্যাকাউন্ট নেই?' : 'আগেই অ্যাকাউন্ট আছে?'} {' '}
            {isLogin ?
<button 
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.set('register', 'true')
                router.push('/login?register=true')
              }}
              className="text-brand-orange font-bold hover:underline"
            >
              নতুন খুলুন
            </button>
            : 
            
              <button 
              onClick={() => {
                router.push('/login')
              }}
              className="text-brand-orange font-bold hover:underline"
            >
              লগইন করুন
            </button>
            
            }
          </p>
        </div>

        <div>
          <Button onClick={handleGoogleLogin} variant={'outline'} className='text-lg font-bold w-full py-7 rounded-xl cursor-pointer'> <FcGoogle/> গুগল দিয়ে লগিন</Button>
        </div>
      </motion.div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-brand-orange animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
