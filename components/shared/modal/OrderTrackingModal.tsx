'use client';
import { motion } from 'framer-motion';
import { X, Check, Truck, Package, Clock, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { status: 'PENDING', label: 'অর্ডার গ্রহণ করা হয়েছে', icon: Clock },
  { status: 'PROCESSING', label: 'প্যাকেজিং চলছে', icon: Package },
  { status: 'SHIPPED', label: 'রাস্তায় আছে', icon: Truck },
  { status: 'DELIVERED', label: 'ডেলিভারি সম্পন্ন', icon: Home },
];

export function OrderTrackingModal({ order, onClose }: any) {
  const currentStepIndex = steps.findIndex(s => s.status === order.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-lg bg-white rounded-[40px] p-10 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="text-2xl font-black text-slate-900">অর্ডার ট্র্যাকিং</h3>
          <button onClick={onClose} className="p-2 bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-10 relative">
          {/* Vertical Line */}
          <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100" />

          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={idx} className="relative flex items-center gap-6">
                <div className={cn(
                  "relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm transition-colors",
                  isCompleted ? "bg-primary text-white" : "bg-slate-100 text-slate-400"
                )}>
                  {isCompleted && !isCurrent ? <Check className="w-6 h-6" /> : <step.icon className="w-6 h-6" />}
                </div>
                <div>
                  <p className={cn("font-black text-sm", isCompleted ? "text-slate-900" : "text-slate-400")}>{step.label}</p>
                  {isCurrent && <p className="text-[10px] font-bold text-primary uppercase mt-1 tracking-widest animate-pulse">Current Status</p>}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}