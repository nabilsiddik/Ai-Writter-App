"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Rocket, 
  Sparkles, 
  Loader2,
  Megaphone,
  Box,
  Globe
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateContent } from "@/services/generation";

const WooCommerceProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    topic: "",
    prompt: ""
  });

  const inputStyles = "w-full bg-white border-2 border-slate-200 rounded-2xl px-6 py-5 text-xl text-black placeholder:text-slate-500 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/5 transition-all duration-300";
  const labelStyles = "text-lg font-black mb-4 block ml-1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Engine analyzing product data...");
    const payload = {
      docType: "PRODUCT_DESC",
      topic: formData?.topic,
      prompt: formData?.prompt
    };

    try {
      const res = await generateContent(payload);
      const data = res?.data;

      if (res?.success) {
        toast.success("Product copy engineered successfully", { id: toastId });
        router.push(`/generation-details/${data?.id}`);
      } else {
        toast.error(res?.message || "Generation failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Connection error. Please try again.", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto px-6 py-12"
    >
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-[40px] p-8 md:p-16 shadow-sm space-y-12">
        
        <div className="flex flex-col items-center text-center mb-4">
          <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mb-6">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">
            Generate Woocommerce Product
          </h2>
          <p className="text-xl text-slate-500 mt-3 mb-5">
            Fillup this info to generate product content. After generation you will redirect to upload the product directly to woocommerce.
          </p>
        </div>

        <div className="space-y-10">
          <div className="space-y-3">
            <label className={labelStyles}>
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                Product Title / Main Concept
              </div>
            </label>
            <input
              required
              className={inputStyles}
              placeholder="e.g. Premium Wireless Noise Cancelling Headphones"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>

          <div className="space-y-3">
            <label className={labelStyles}>
              <div className="flex items-center gap-3">
                <Megaphone size={20} className="text-primary" />
                Key Features & Instructions
              </div>
            </label>
            <textarea
              required
              rows={6}
              className={`${inputStyles} resize-none`}
              placeholder="List specific features (e.g. 40h battery, Bluetooth 5.3, Waterproof) and target audience..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-6">
          <button
            disabled={loading}
            type="submit"
            className="w-full py-6 bg-primary hover:bg-indigo-700 text-white rounded-2xl text-xl font-black transition-all flex items-center justify-center gap-4 cursor-pointer shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-default"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Rocket size={24} />
                <span>GENERATE CONTENT</span>
              </>
            )}
          </button>
          
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-slate-400 font-bold uppercase tracking-tighter">
             <div className="flex items-center gap-2"><Sparkles size={20} className="text-secondary" /> SEO Optimized</div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
             <div className="flex items-center gap-2"><Box size={20} className="text-primary" /> WooCommerce Ready</div>
          </div>
        </div>

      </form>
    </motion.div>
  );
};

export default WooCommerceProductForm;