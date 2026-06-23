import { motion } from "motion/react";
export function TemplateShowcase() {
  const unis = ["DIU", "BRAC", "NSU", "IUB", "AIUB", "UIU", "BUBT"];

  return (
    <section className="py-24 overflow-hidden text-white">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-2">Beautiful Cover Pages.</h2>
        <p className="text-gray-500">
          Every University has its unique identity. We respect that.
        </p>
      </div>

      <div className="flex gap-8 animate-infinite-scroll w-max text-white">
        {[...unis, ...unis].map((uni, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="w-64 h-80 bg-white/[0.03] border border-white/10 rounded-2xl p-6 flex flex-col justify-between items-center text-center backdrop-blur-xl"
          >
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-indigo-400">
              Logo
            </div>
            <div className="space-y-2">
              <div className="h-2 w-32 bg-white/10 rounded-full mx-auto" />
              <div className="h-2 w-20 bg-white/10 rounded-full mx-auto" />
            </div>
            <p className="text-sm font-bold text-gray-400">{uni} Template</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
