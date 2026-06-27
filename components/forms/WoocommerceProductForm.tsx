"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShoppingBag, 
  Tag, 
  DollarSign, 
  Box, 
  Rocket, 
  Sparkles, 
  Loader2,
  ListTree,
  Megaphone
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { generateContent } from "@/services/generation";

const WooCommerceProductForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    topic: "", // This maps to Product Name
    prompt: "", // This maps to additionalInfo
    // regularPrice: "",
    // salePrice: "",
    // stock: "",
    // category: "",
    // docType: "PRODUCT_DESC"
  });


  const inputStyles = "w-full bg-white/[0.02] border border-white/10 rounded-2xl md:rounded-[30px] px-6 md:px-8 py-4 md:py-6 text-base md:text-xl text-white placeholder:text-white/40 focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all duration-300 shadow-xl";
  const labelStyles = "text-xs md:text-sm font-black uppercase tracking-[0.2em] text-purple-400 flex items-center gap-2 md:gap-3 ml-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData, 'data form')
    const toastId = toast.loading('Generating product content...')
    const payload = {
      docType: 'PRODUCT_DESC',
      topic: formData?.topic,
      prompt: formData?.prompt
    }

    try {
      const res = await generateContent(payload)
      console.log(res, 'my rs po');
      const data = await res.json();

      if (data?.success) {
        toast.success("Product content generated", {id: toastId});
        router.push(`/generation-details/${data?.data?.id}`);
      } else {
        toast.error(data?.message || "Generation failed.", {id: toastId});
      }
    } catch (error) {
      toast.error("Network error. Please try again.", {id: toastId});
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-7xl mx-auto px-5 my-10"
    >
      <form onSubmit={handleSubmit} className="space-y-10 md:space-y-16">
        
        {/* Section 1: Core Identity */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-purple-500" />
            <h3 className="text-xl font-black uppercase tracking-widest text-white">Product Identity</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="md:col-span-2 space-y-4">
              <label className={labelStyles}>
                <ShoppingBag size={18} /> Product Name / Main Idea
              </label>
              <input
                required
                className={inputStyles}
                placeholder="e.g. Ergonomic Standing Desk - Bamboo Edition"
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            {/* <div className="space-y-4">
              <label className={labelStyles}>
                <ListTree size={18} /> Category
              </label>
              <input
                className={inputStyles}
                placeholder="e.g. Home Office"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div> */}
{/* 
            <div className="space-y-4">
              <label className={labelStyles}>
                <Box size={18} /> Inventory Stock
              </label>
              <input
                type="number"
                className={inputStyles}
                placeholder="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              />
            </div> */}
          </div>
        </div>

        {/* Section 2: Commercial Values */}
        {/* <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-emerald-500" />
            <h3 className="text-xl font-black uppercase tracking-widest text-white">Pricing Strategy</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <label className={labelStyles.replace('purple-400', 'emerald-400')}>
                <DollarSign size={18} /> Regular Price (৳)
              </label>
              <input
                required
                type="number"
                className={inputStyles.replace('purple-500', 'emerald-500')}
                placeholder="0.00"
                value={formData.regularPrice}
                onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
              />
            </div>

            <div className="space-y-4">
              <label className={labelStyles.replace('purple-400', 'emerald-400')}>
                <Tag size={18} /> Sale Price (Optional)
              </label>
              <input
                type="number"
                className={inputStyles.replace('purple-500', 'emerald-500')}
                placeholder="0.00"
                value={formData.salePrice}
                onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
              />
            </div>
          </div>
        </div> */}

        {/* Section 3: AI Creative Intelligence */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-indigo-500" />
            <h3 className="text-xl font-black uppercase tracking-widest text-white">AI Content Specs</h3>
          </div>

          <div className="space-y-4">
            <label className={labelStyles.replace('purple-400', 'indigo-400')}>
              <Megaphone size={18} /> Key Features & Selling Points
            </label>
            <textarea
              required
              rows={6}
              className="w-full bg-white/[0.02] border border-white/10 rounded-[35px] md:rounded-[50px] px-8 md:px-12 py-8 md:py-10 text-base md:text-2xl text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all duration-300 shadow-2xl resize-none"
              placeholder="List the best things about this product. Claude 3.5 will turn these into high-converting HTML descriptions..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-6">
          <motion.button
            whileHover={{ scale: 1.01, y: -5 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full group relative overflow-hidden bg-white text-black py-6 md:py-6 rounded-3xl md:rounded-[45px] text-lg font-black flex items-center justify-center gap-4 transition-all hover:bg-purple-600 hover:text-white disabled:opacity-50 cursor-pointer shadow-[0_20px_80px_rgba(168,85,247,0.2)]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Rocket size={24} className="group-hover:-translate-y-2 group-hover:translate-x-2 transition-transform duration-500" />
                <span>GENERATE & PREPARE FOR SYNC</span>
              </>
            )}
          </motion.button>
          <div className="flex items-center justify-center gap-4 mt-10 text-gray-500">
             <div className="flex items-center gap-2"><Sparkles size={16} /> SEO Friendly</div>
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <div className="flex items-center gap-2"><Box size={16} /> Ready for WooCommerce</div>
          </div>
        </div>

      </form>
    </motion.div>
  );
};

export default WooCommerceProductForm;