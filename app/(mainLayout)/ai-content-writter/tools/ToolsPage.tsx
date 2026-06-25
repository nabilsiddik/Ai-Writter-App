"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  FileText,
  UserCheck,
  Globe,
  ShoppingBag,
  Mail,
  FileSearch,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Trophy
} from "lucide-react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

const tools = [
  {
    title: "Academic Assignment",
    description: "Create university-standard assignments with precise citations and automated cover pages.",
    icon: <FileText className="text-orange-500" />,
    slug: "academic-assignment-writter",
    color: "from-orange-500/10 to-transparent",
    label: "Education"
  },
  {
    title: "ATS-Friendly Resume",
    description: "Build a high-performance resume optimized for modern Applicant Tracking Systems.",
    icon: <UserCheck className="text-blue-500" />,
    slug: "ats-friendly-resume-writter",
    color: "from-blue-500/10 to-transparent",
    label: "Career"
  },
  {
    title: "SEO-Optimized Blog",
    description: "Generate long-form articles with data-driven keywords and high-engagement structures.",
    icon: <Globe className="text-emerald-500" />,
    slug: "seo-friendly-blog-writter",
    color: "from-emerald-500/10 to-transparent",
    label: "Marketing"
  },
  {
    title: "eCommerce Content",
    description: "Persuasive product descriptions and sales copy designed to maximize conversion rates.",
    icon: <ShoppingBag className="text-purple-500" />,
    slug: "ecommerce-product-writter",
    color: "from-purple-500/10 to-transparent",
    label: "Business"
  },
  {
    title: "Professional Email",
    description: "Draft high-stakes business correspondence, pitches, and formal announcements.",
    icon: <Mail className="text-pink-500" />,
    slug: "professional-email-writter",
    color: "from-pink-500/10 to-transparent",
    label: "Communication"
  },
  {
    title: "Technical Report",
    description: "Synthesize complex data into structured, professional reports for corporate use.",
    icon: <FileSearch className="text-cyan-500" />,
    slug: "technical-report-writter",
    color: "from-cyan-500/10 to-transparent",
    label: "Enterprise"
  }
];

const ToolsPage = () => {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30">
      
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: "3s" }} />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-8 pt-10 pb-40">
        
        {/* <header className="max-w-4xl mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 px-4 py-2 bg-white/[0.05] border border-white/10 rounded-full w-fit mb-8"
          >
            <Sparkles size={18} className="text-indigo-400" />
            <span className="text-base font-bold tracking-widest uppercase text-indigo-400">Advanced AI Agent Library</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[1.1] mb-8"
          >
            Empower Your <br /> 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-600">Document Workflow.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-2xl max-w-2xl leading-relaxed"
          >
            Select a specialized AI model engineered for your specific document type. 
            Experience unprecedented precision and professional formatting.
          </motion.p>
        </header> */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.slug}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative flex flex-col bg-white/[0.03] border border-white/10 rounded-[45px] p-10 hover:bg-white/[0.06] hover:border-white/20 transition-all shadow-2xl overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10 flex justify-between items-start mb-10">
                <div className="p-5 bg-white/[0.05] rounded-3xl group-hover:scale-110 transition-transform duration-500 shadow-xl border border-white/5">
                  {React.cloneElement(tool.icon, { size: 36 })}
                </div>
                <span className="px-5 py-2 bg-white text-black text-xs font-black uppercase tracking-widest rounded-full shadow-lg">
                  {tool.label}
                </span>
              </div>

              <div className="relative z-10 flex-1">
                <h3 className="text-3xl font-bold text-white tracking-tight mb-4">
                  {tool.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-xl line-clamp-3">
                  {tool.description}
                </p>
              </div>

              <div className="relative z-10 mt-12">
                <Link href={`/ai-content-writter/tools/${tool.slug}`}>
                  <button className="w-full flex items-center justify-center gap-4 py-5 bg-white text-black rounded-[25px] text-lg font-black transition-all hover:bg-indigo-600 hover:text-white group/btn cursor-pointer shadow-xl active:scale-95">
                    Try Now
                    <ArrowRight size={22} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* <section className="mt-56 border-t border-white/10 pt-32 grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-6 p-10 bg-white/[0.02] rounded-[40px] border border-white/5">
            <div className="w-16 h-16 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
              <Zap size={32} />
            </div>
            <h4 className="text-3xl font-bold tracking-tight">Rapid Processing</h4>
            <p className="text-gray-500 text-xl leading-relaxed">Infrastructure optimized for speed, delivering fully structured documents in under 30 seconds.</p>
          </div>

          <div className="space-y-6 p-10 bg-white/[0.02] rounded-[40px] border border-white/5">
            <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400">
              <ShieldCheck size={32} />
            </div>
            <h4 className="text-3xl font-bold tracking-tight">Bank-Level Security</h4>
            <p className="text-gray-500 text-xl leading-relaxed">Your data remains private. We utilize AES-256 encryption for every document generation.</p>
          </div>

          <div className="space-y-6 p-10 bg-white/[0.02] rounded-[40px] border border-white/5">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
              <Trophy size={32} />
            </div>
            <h4 className="text-3xl font-bold tracking-tight">Premium Standards</h4>
            <p className="text-gray-500 text-xl leading-relaxed">AI fine-tuned on million-point datasets to ensure academic and professional excellence.</p>
          </div>
        </section> */}

      </main>
    </div>
  );
};

export default ToolsPage;