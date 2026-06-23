import { ShieldCheck, Zap } from "lucide-react";
import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto relative overflow-hidden bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 rounded-[50px] p-16 text-center"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

        <h2 className="text-5xl font-black mb-6 relative z-10">
          Stop Stressing. Start Writing.
        </h2>
        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto relative z-10">
          Join 5,000+ students who are already using SmartAssign to save time
          and get better grades.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-5 bg-white text-black rounded-2xl font-black text-xl shadow-2xl hover:shadow-indigo-500/50 transition-all relative z-10"
        >
          Get Unlimited Access
        </motion.button>

        <div className="mt-8 flex items-center justify-center gap-6 text-gray-500 text-sm relative z-10">
          <span className="flex items-center gap-2 italic">
            <ShieldCheck size={16} /> Secure Payment
          </span>
          <span className="flex items-center gap-2 italic">
            <Zap size={16} /> Instant Setup
          </span>
        </div>
      </motion.div>
    </section>
  );
}
