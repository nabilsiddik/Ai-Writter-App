"use client";
import { motion } from "framer-motion";
import { Sparkles, ShieldCheck, Zap, BookOpen } from "lucide-react";

const features = [
  {
    title: "Academic Integrity",
    desc: "Content is structured to meet high university standards with proper citations.",
    icon: <ShieldCheck className="text-indigo-400" />,
    delay: 0.1,
  },
  {
    title: "GPT-4o Precision",
    desc: "Uses the latest models to ensure your assignment logic is flawless and up-to-date.",
    icon: <Sparkles className="text-purple-400" />,
    delay: 0.2,
  },
  {
    title: "Instant Formatting",
    desc: "No more wrestling with MS Word. One click and your PDF is perfectly aligned.",
    icon: <Zap className="text-blue-400" />,
    delay: 0.3,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 text-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter">
            Powered by Intelligence.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            We don't just generate text; we engineer academic excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: f.delay }}
              whileHover={{ y: -10 }}
              className="p-8 bg-white/[0.02] border border-white/10 rounded-[40px] hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/[0.05] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-2xl">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
