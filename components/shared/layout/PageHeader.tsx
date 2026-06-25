"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, LucideIcon } from "lucide-react";

interface ToolPageHeaderProps {
  title: string;
  description: string;
  bannerImage: string;
  icon: React.ReactNode;
  badge: string;
}

export const PageHeader = ({
  title,
  description,
  bannerImage,
  icon,
  badge,
}: ToolPageHeaderProps) => {
  return (
    <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10s] scale-110 group-hover:scale-100"
        style={{ backgroundImage: `url(${bannerImage})` }}
      >
        {/* Darkening Overlay & Gradient Fade to Page Body */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/40 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-5 py-2 bg-white/10 border border-white/20 backdrop-blur-md rounded-full w-fit mx-auto mb-8"
        >
          <Sparkles size={18} className="text-indigo-400" />
          <span className="text-base font-bold tracking-widest uppercase text-white">
            {badge}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-24 h-24 bg-white/10 border border-white/20 backdrop-blur-xl rounded-[30px] flex items-center justify-center mx-auto mb-8 shadow-2xl"
        >
          {icon}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-200 text-2xl max-w-3xl mx-auto leading-relaxed font-medium drop-shadow-md"
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
};