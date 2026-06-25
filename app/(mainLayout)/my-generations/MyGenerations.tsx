"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FileText,
  Calendar,
  University,
  User,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  Loader2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function MyGenerations({ generations }: { generations: any }) {
  const [loading, setLoading] = useState(!generations);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30">
      {/* --- Dynamic Background Atmosphere --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
                <FileText size={20} className="text-white" />
              </div>
              <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">
                Dashboard
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              My Library
            </h1>
            <p className="text-gray-400 mt-4 text-lg max-w-md leading-relaxed">
              Access your previous AI-generated assignments and refined academic
              documents.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-full lg:w-96"
          >
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all backdrop-blur-md placeholder:text-gray-600"
            />
          </motion.div>
        </div>

        {/* --- Grid Section --- */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <div className="relative">
                <Loader2 className="animate-spin text-indigo-500" size={48} />
                <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse" />
              </div>
              <p className="mt-6 text-gray-500 font-medium tracking-widest uppercase text-xs">
                Syncing your data...
              </p>
            </motion.div>
          ) : generations?.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {generations?.map((gen: any) => (
                <GenerationCard key={gen?.id} gen={gen} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 rounded-[40px] border border-dashed border-white/10 bg-white/[0.01]"
            >
              <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">No documents found</h2>
              <p className="text-gray-500 mb-10">
                Start by creating your first AI assignment.
              </p>
              <Link
                href="/"
                className="px-8 py-4 bg-white text-black rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all inline-flex items-center gap-2 group"
              >
                Generate Now{" "}
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function GenerationCard({ gen }: { gen: any }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group relative flex flex-col bg-white/[0.03] border border-white/10 rounded-[35px] p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all shadow-2xl"
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 rounded-[35px] transition-all duration-500" />

      {/* Card Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
            {gen?.status || "PENDING"}
          </span>
        </div>
        <div className="text-gray-600 group-hover:text-indigo-400 transition-colors">
          <Sparkles size={20} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
          {gen?.topic || "Untitled Document"}
        </h3>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-gray-400">
            <University size={16} className="text-indigo-500/70" />
            <span className="text-sm font-medium truncate">
              {gen?.universityName || "General Template"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <User size={16} className="text-purple-500/70" />
            <span className="text-sm font-medium">
              To: {gen?.submittedTo || "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Divider & Metadata */}
      <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">
            Sections
          </span>
          <span className="text-sm font-bold text-white">
            {gen?.sections?.length || 0} AI Blocks
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">
            Created
          </span>
          <span className="text-sm font-bold text-white">
            {gen?.createdAt ? format(new Date(gen.createdAt), "dd MMM") : "N/A"}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <a
          href={gen?.pdfUrl || "#"}
          target="_blank"
          className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-black transition-all shadow-lg ${
            gen?.pdfUrl
              ? "bg-white text-black hover:bg-indigo-600 hover:text-white"
              : "bg-white/5 text-gray-700 cursor-not-allowed"
          }`}
        >
          <Download size={14} /> Download
        </a>
        <Link target="_blank" href={`/generation-details/${gen?.id}`}>
          <button className="cursor-pointer flex items-center justify-center gap-2 py-3.5 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-2xl text-xs font-black transition-all">
          <ExternalLink size={14} /> Details
        </button>
        </Link>
      </div>
    </motion.div>
  );
}
