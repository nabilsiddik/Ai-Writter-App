"use client";

import { motion } from "framer-motion";
import {
  PlayCircle,
  Sparkles,
  Chrome,
  CheckCircle2,
  ArrowRight,
  Download,
  Play,
} from "lucide-react";
import Image from "next/image";

export default function ExtensionCTA() {
  return (
    <section className="max-w-7xl mx-auto px-5 bg-white py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-bold mb-8">
              <Sparkles size={20} />
              New Feature
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-black mb-8 tracking-tight leading-[1.1]">
              Source Products directly from your Browser.
            </h2>

            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Turn Amazon, Daraz, and AliExpress into your personal inventory
              hub. Scrape details, generate AI descriptions, and sync to your
              store without ever leaving the product page.
            </p>

            <div className="space-y-6 mb-12">
              {[
                "Bulk selection from product listings",
                "Automatic price and image extraction",
                "Claude / Open AI / Gemini powered SEO descriptions",
                "One-click sync to Google Sheets & WooCommerce",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-lg font-bold text-slate-700"
                >
                  <CheckCircle2 className="text-primary" size={24} />
                  {item}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-5 flex-wrap">
              <button className="bg-primary text-white hover:bg-transparent hover:text-primary px-8 py-5 border-2 border-primary rounded-xl text-lg font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
                <Download size={28} />
                Download Extension
              </button>

              <button className="bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-5 rounded-xl text-lg font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
                <Play size={28} />
                Watch video
              </button>
            </div>
          </motion.div>

          {/* Right Visual Stack */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
            {/* Background Orb Decor */}
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl" />

            {/* Image 1: Amazon (Bottom Layer) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -5 }}
              transition={{ delay: 0.2 }}
              className="absolute w-[80%] aspect-video bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden -translate-x-12 -translate-y-12 z-10"
            >
              <Image
                src="/images/home/cta/amazon.png"
                alt="Amazon Scraper"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Image 2: AliExpress (Middle Layer) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
              transition={{ delay: 0.4 }}
              className="absolute w-[80%] aspect-video bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden translate-x-4 -translate-y-4 z-20"
            >
              <Image
                src="/images/home/cta/aliexpress.png"
                alt="AliExpress Scraper"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Image 3: Daraz (Top Layer) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute w-[85%] aspect-video bg-white rounded-3xl shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] border-2 border-primary overflow-hidden translate-x-8 translate-y-16 z-30 group cursor-pointer"
            >
              <Image
                src="/images/home/cta/daraz.png"
                alt="Daraz Scraper"
                fill
                className="object-cover"
              />
              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl">
                  <PlayCircle size={48} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
