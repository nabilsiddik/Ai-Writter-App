"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  User, 
  Send, 
  Layers, 
  Hash, 
  PenTool, 
  Sparkles,
  Loader2,
  BookOpenText
} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AssignmentForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    universityName: "",
    section: "",
    intake: "",
    assignmentNo: "",
    submittedBy: "",
    submittedTo: "",
    topic: "",
    prompt: "",
    docType: "ASSIGNMENT"
  });

  const inputStyles = "w-full bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-[28px] px-6 md:px-8 py-4 md:py-6 text-base md:text-xl text-white placeholder:text-white/70 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all duration-300 shadow-xl";
  const labelStyles = "text-xs md:text-sm font-black uppercase tracking-[0.15em] text-indigo-400 flex items-center gap-2 md:gap-3 ml-2";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log(formData, 'my form');

    // try {
    //   const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/assignments/generate-assignment`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Authorization": `Bearer ${localStorage.getItem("token")}`
    //     },
    //     body: JSON.stringify({
    //         ...formData,
    //         additionalInfo: formData.prompt,
    //         selectedTopics: ["Introduction", "Analysis", "Key Findings", "Conclusion"]
    //     }),
    //   });

    //   const data = await response.json();

    //   if (data?.success) {
    //     toast.success("Intelligence Engine Started!");
    //     router.push(`/generation-details/${data?.data?.id}`);
    //   } else {
    //     toast.error(data?.message || "Generation failed.");
    //   }
    // } catch (error) {
    //   toast.error("Connection error occurred.");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-7xl mx-auto px-5 md:px-10 my-10"
    >
      <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          
          <div className="space-y-3 md:space-y-4">
            <label className={labelStyles}>
              <GraduationCap size={16} className="md:w-[18px]" /> University Name
            </label>
            <input
              required
              className={inputStyles}
              placeholder="e.g. Daffodil International University"
              value={formData.universityName}
              onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <label className={labelStyles}>
              <PenTool size={16} className="md:w-[18px]" /> Assignment Topic
            </label>
            <input
              required
              className={inputStyles}
              placeholder="e.g. Soil testing Importance"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <label className={labelStyles}>
              <User size={16} className="md:w-[18px]" /> Submitted By
            </label>
            <input
              required
              className={inputStyles}
              placeholder="Your full name"
              value={formData.submittedBy}
              onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
            />
          </div>

          <div className="space-y-3 md:space-y-4">
            <label className={labelStyles}>
              <Send size={16} className="md:w-[18px]" /> Submitted To
            </label>
            <input
              required
              className={inputStyles}
              placeholder="Instructor's name"
              value={formData.submittedTo}
              onChange={(e) => setFormData({ ...formData, submittedTo: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-6 md:col-span-2">
            <div className="space-y-3 md:space-y-4">
              <label className={labelStyles}>
                <Layers size={16} /> Sec
              </label>
              <input
                className={inputStyles}
                placeholder="09"
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
              />
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className={labelStyles}>
                <Hash size={16} /> Intake
              </label>
              <input
                className={inputStyles}
                placeholder="49"
                value={formData.intake}
                onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
              />
            </div>
            <div className="space-y-3 md:space-y-4">
              <label className={labelStyles}>
                <BookOpenText size={16} /> Sl No.
              </label>
              <input
                className={inputStyles}
                placeholder="01"
                value={formData.assignmentNo}
                onChange={(e) => setFormData({ ...formData, assignmentNo: e.target.value })}
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-3 md:space-y-4">
            <label className={labelStyles}>
              <Sparkles size={16} /> Assignment Instructions
            </label>
            <textarea
              required
              rows={5}
              className="w-full bg-white/[0.03] border border-white/10 rounded-[28px] md:rounded-[40px] px-6 md:px-10 py-6 md:py-8 text-base md:text-xl text-white placeholder:text-white/70 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all duration-300 shadow-xl resize-none"
              placeholder="Paste the question or detailed instructions here..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
            />
          </div>
        </div>

        <div className="pt-6 md:pt-10">
          <motion.button
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            type="submit"
            className="w-full group relative overflow-hidden bg-white text-black py-5 md:py-8 rounded-2xl md:rounded-[35px] text-lg md:text-2xl font-black flex items-center justify-center gap-3 md:gap-4 transition-all hover:bg-indigo-600 hover:text-white disabled:opacity-50 cursor-pointer shadow-2xl"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Sparkles size={24} className="md:w-7 group-hover:rotate-12 transition-transform" />
                <span>GENERATE ASSIGNMENT</span>
              </>
            )}
          </motion.button>
          <p className="text-center mt-6 md:mt-8 text-gray-500 text-sm md:text-lg font-medium">
            Standard processing takes ~30 seconds
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default AssignmentForm;