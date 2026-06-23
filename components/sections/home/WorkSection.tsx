import { motion } from "motion/react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Input Data",
      desc: "Enter topic and university details.",
    },
    {
      num: "02",
      title: "AI Generation",
      desc: "Our LangGraph agent drafts the content.",
    },
    {
      num: "03",
      title: "Refine & Print",
      desc: "Edit the sections and download your PDF.",
    },
  ];

  return (
    <section className="py-24 bg-white/[0.01] border-y border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10"
            >
              <span className="text-6xl font-black text-white/50 absolute -top-10 -left-4 select-none">
                {s.num}
              </span>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500" /> {s.title}
              </h3>
              <p className="text-gray-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
