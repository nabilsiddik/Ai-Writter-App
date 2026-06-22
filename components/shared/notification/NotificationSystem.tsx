'use client';

import { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function NotificationSystem() {
  const [notification, setNotification] = useState<{ id: number, text: string } | null>(null);

  useEffect(() => {
    // Simulate a push notification after 8 seconds
    const timer = setTimeout(() => {
      setNotification({
        id: Date.now(),
        text: '🔥 অফার! রাজশাহীর ল্যাংড়া আমে আজ ২০% ছাড় চলছে। এখনই অর্ডার করুন!'
      });
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-[100] max-w-xs md:max-w-md bg-white border border-slate-100 shadow-2xl rounded-3xl p-6 flex items-start gap-4"
        >
          <div className="w-12 h-12 rounded-2xl orange-gradient flex items-center justify-center shrink-0">
            <Bell className="w-6 h-6 text-white animate-bounce" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="text-xs font-bold text-brand-orange uppercase tracking-wider">নতুন নোটিফিকেশন</h4>
            <p className="text-sm font-medium text-slate-700 leading-snug">{notification.text}</p>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="p-1 hover:bg-slate-50 rounded-full transition-colors text-slate-400"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
