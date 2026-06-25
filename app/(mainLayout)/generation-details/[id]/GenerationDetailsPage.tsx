"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  University, 
  User, 
  Download, 
  Save, 
  ChevronLeft,
  Sparkles,
  Loader2,
  Calendar,
  Layers,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function GenerationDetails() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [assignment, setAssignment] = useState<any>(null);
  const [editableSections, setEditableSections] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      try {
        // Replace with your real API call:
        // const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/assignments/${params.id}`);
        // const data = await res.json();
        // setAssignment(data?.data);
        // setEditableSections(data?.data?.sections || []);

        // Mocking your specific JSON response
        const mockData = {
          id: params?.id,
          universityName: "Daffodil International University",
          topic: "Dark side of smoking",
          submittedBy: "Nabil Siddik",
          submittedTo: "Prof. Dr. Muhammad Yunus",
          section: "09",
          intake: "49",
          assignmentNo: "01",
          status: "GENERATED",
          createdAt: "2026-06-23T02:34:26.856Z",
          sections: [
            { topic: "Introduction", content: "Smoking is a widely practiced habit..." },
            { topic: "Physical Consequences", content: "Smoking is a leading cause..." },
            { topic: "Conclusion", content: "In conclusion, the dark side..." }
          ]
        };

        setAssignment(mockData);
        setEditableSections(mockData?.sections || []);
      } catch (error) {
        toast.error("Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };

    if (params?.id) fetchAssignmentDetails();
  }, [params?.id]);

  const handleSectionUpdate = (index: number, field: string, value: string) => {
    const updated = [...editableSections];
    updated[index][field] = value;
    setEditableSections(updated);
  };

  const handleGeneratePDF = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/assignments/${params.id}/generate-pdf`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ sections: editableSections }),
      });
      const data = await response.json();
      
      if (data?.success) {
        toast.success("PDF Generated Successfully!");
        if (data?.data?.url) window.open(data?.data?.url, "_blank");
      }
    } catch (err) {
      toast.error("Error generating PDF");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center">
      <Loader2 className="animate-spin text-indigo-500" size={48} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        
        {/* --- Top Navigation & Actions --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-3 text-gray-400 hover:text-white transition-all group text-lg"
          >
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
                <ChevronLeft size={24} />
            </div>
            Back to Library
          </button>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button 
              onClick={handleGeneratePDF}
              disabled={isSaving}
              className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
              Generate PDF
            </button>
          </div>
        </div>

        {/* --- Hero Metadata Section --- */}
        <motion.section 
          variants={fadeIn} initial="hidden" animate="visible"
          className="bg-white/[0.03] border border-white/10 rounded-[40px] p-8 md:p-12 mb-12 backdrop-blur-xl"
        >
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <Sparkles size={18} className="text-indigo-400" />
                <span className="text-base font-bold text-indigo-400 uppercase tracking-widest">
                    {assignment?.status || "Processing"}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
                {assignment?.topic || "Loading Topic..."}
              </h1>
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-3 text-gray-400 text-lg">
                  <University size={22} className="text-indigo-500" />
                  {assignment?.universityName}
                </div>
                <div className="flex items-center gap-3 text-gray-400 text-lg">
                  <Layers size={22} className="text-purple-500" />
                  Section {assignment?.section} | Intake {assignment?.intake}
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 bg-white/[0.03] border border-white/5 rounded-3xl p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg font-medium">Submitted To</span>
                    <span className="font-bold text-lg text-right">{assignment?.submittedTo}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg font-medium">Author</span>
                    <span className="font-bold text-lg text-right">{assignment?.submittedBy}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-lg font-medium">Assignment No</span>
                    <span className="font-bold text-lg">{assignment?.assignmentNo || "01"}</span>
                </div>
            </div>
          </div>
        </motion.section>

        {/* --- Interactive Editor Section --- */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 mb-8">
             <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
             <h2 className="text-2xl font-black uppercase tracking-widest text-gray-500">Edit Content</h2>
             <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <AnimatePresence>
            {editableSections?.map((sec, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/[0.02] border border-white/10 rounded-[35px] overflow-hidden hover:border-indigo-500/30 transition-all group"
              >
                {/* Section Title Input */}
                <div className="p-8 border-b border-white/5 bg-white/[0.01]">
                   <label className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-3 block">Topic Title</label>
                   <input 
                      className="w-full bg-transparent text-2xl font-bold text-white focus:outline-none placeholder:text-gray-700"
                      value={sec?.topic || ""}
                      onChange={(e) => handleSectionUpdate(index, "topic", e.target.value)}
                   />
                </div>

                {/* Section Content Textarea */}
                <div className="p-8">
                   <label className="text-xs font-black text-purple-500 uppercase tracking-widest mb-3 block">Markdown Content</label>
                   <textarea 
                      className="w-full bg-transparent text-xl text-gray-400 leading-relaxed min-h-[250px] focus:outline-none resize-none placeholder:text-gray-800"
                      value={sec?.content || ""}
                      onChange={(e) => handleSectionUpdate(index, "content", e.target.value)}
                   />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>

        {/* --- Bottom Final Action --- */}
        <motion.div 
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          className="mt-20 text-center"
        >
           <button 
             onClick={handleGeneratePDF}
             disabled={isSaving}
             className="inline-flex items-center gap-4 px-12 py-6 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[30px] font-black text-2xl transition-all shadow-2xl disabled:opacity-50"
           >
             {isSaving ? <Loader2 className="animate-spin" /> : <CheckCircle2 />}
             Finalize and Generate PDF
           </button>
           <p className="mt-6 text-gray-500 text-lg italic">The generated PDF will follow your University's Cover Page style.</p>
        </motion.div>

      </main>
    </div>
  );
}