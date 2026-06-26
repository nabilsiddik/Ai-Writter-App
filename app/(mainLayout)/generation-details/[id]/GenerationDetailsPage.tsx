"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  University,
  User,
  Download,
  ChevronLeft,
  Sparkles,
  Loader2,
  Layers,
  CheckCircle2,
  Hash,
  Calendar,
  PenLine,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { generatePDF, openInGoogleDoc } from "@/services/generation";
import { FaFilePdf, FaMicrosoft } from "react-icons/fa6";
import PageHeader from "@/components/shared/PageHeader";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GenerationDetails({ genDetails }: { genDetails: any }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);

  // Initialize state from the passed genDetails prop
  const [assignment, setAssignment] = useState<any>(genDetails);
  const [editableSections, setEditableSections] = useState<any[]>(
    genDetails?.sections || [],
  );

  // Sync state if props change (useful for real-time updates)
  useEffect(() => {
    if (genDetails) {
      setAssignment(genDetails);
      setEditableSections(genDetails?.sections || []);
    }
  }, [genDetails]);

  const handleSectionUpdate = (index: number, field: string, value: string) => {
    const updated = [...editableSections];
    if (updated[index]) {
      updated[index][field] = value;
      setEditableSections(updated);
    }
  };

  const handleExportInPDF = async () => {
    if (!assignment?.id) return toast.error("Document ID missing");

    setIsGenerating(true);
    const payload = {
      sections: editableSections,
    };

    try {
      const result = await generatePDF(assignment?.id, payload);

      console.log(result, "pdf res");

      if (result?.success) {
        toast.success("PDF Generated Successfully!");
        if (result?.data?.url) {
          router.push(result?.data?.url);
        }
      } else {
        toast.error(result?.message || "Generation failed.");
      }
    } catch (err: any) {
      toast.error("Internal Server Error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOpenInGoogleDoc = async () => {
    if (!assignment?.id) return toast.error("Document ID missing");

    setIsGenerating(true);
    const payload = {
      sections: editableSections,
    };

    try {
      const result = await openInGoogleDoc(assignment?.id, payload);

      console.log(result, "google res");

      if (result?.success) {
        toast.success("Exported in Google doc Successfully!");
        if (result?.data?.url) {
          router.push(result?.data?.url);
        }
      } else if (result?.error?.response?.data?.error === "invalid_grant") {
        toast.error("You need to login with google with required permissions.");
      } else {
        toast.error(result?.message || "Exporting failed.");
      }
    } catch (err: any) {
      toast.error("Internal Server Error occurred.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportInMsWord = async () => {};

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30 font-sans">
      <PageHeader
        title="Here is your Generation Details"
        description={
          "You can edit the generated text and then export to pdf, google doc or in a microsoft word docx format. Check the google drive save checkbox to save your file in your google drive while exporting."
        }
      />
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-40">
        {/* Navigation Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group text-xl font-bold cursor-pointer"
          >
            <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 border border-white/5 group-hover:border-white/20 transition-all">
              <ChevronLeft size={24} />
            </div>
            Back to Library
          </button>

          <div className="flex flex-wrap items-center flex-col lg:flex-row gap-6 w-full md:w-auto">
            <button
              onClick={handleExportInPDF}
              disabled={isGenerating}
              className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <FaFilePdf size={24} className="text-red-500" />
              )}
              {isGenerating ? "Processing PDF..." : "Generate PDF"}
            </button>

            <button
              onClick={handleOpenInGoogleDoc}
              disabled={isGenerating}
              className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <File size={24} />
              )}
              {isGenerating ? "Opening..." : "Open In Google Docs"}
            </button>

            <button
              onClick={handleExportInMsWord}
              disabled={isGenerating}
              className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <FaMicrosoft size={24} />
              )}
              {isGenerating ? "Exporting Docx..." : "Export In MS Docx"}
            </button>
          </div>
        </div>

        {/* <div>
          <button
            onClick={handleFinalizeAndDownload}
            disabled={isGenerating}
            className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
          >
            {isGenerating ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <Download size={24} />
            )}
            {isGenerating ? "Downloading PDF..." : "Download PDF"}
          </button>
        </div> */}

        {/* Premium Metadata Header */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="bg-white/[0.02] border border-white/10 rounded-[50px] p-10 md:p-16 mb-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
                <Sparkles size={18} className="text-indigo-400" />
                <span className="text-base font-black text-indigo-400 uppercase tracking-[0.2em]">
                  {assignment?.status || "GENERATED"}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                {assignment?.topic || "Loading Topic..."}
              </h1>

              <div className="flex flex-wrap gap-10 pt-4">
                <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
                  <University size={26} className="text-indigo-500" />
                  {assignment?.universityName || "General University"}
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
                  <Layers size={26} className="text-purple-500" />
                  Section {assignment?.section || "N/A"}
                </div>
                <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
                  <Hash size={26} className="text-emerald-500" />
                  Intake {assignment?.intake || "N/A"}
                </div>
              </div>
            </div>

            {/* Submission Detail Card */}
            <div className="lg:w-[380px] bg-white/[0.03] border border-white/5 rounded-[40px] p-10 space-y-8 flex flex-col justify-center">
              <div className="space-y-2">
                <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
                  <User size={16} /> Submitted To
                </p>
                <p className="text-2xl font-bold">
                  {assignment?.submittedTo || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
                  <PenLine size={16} /> Submitted By
                </p>
                <p className="text-2xl font-bold">
                  {assignment?.submittedBy || "N/A"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
                  <Calendar size={16} /> Assignment No
                </p>
                <p className="text-2xl font-bold">
                  {assignment?.assignmentNo || "01"}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content Editor Section */}
        <section className="space-y-12">
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-gray-600">
              Refine AI Content
            </h2>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="grid gap-12">
            <AnimatePresence>
              {editableSections?.length > 0 &&
                editableSections?.map((sec: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/[0.015] border border-white/10 rounded-[45px] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 group shadow-2xl"
                  >
                    {/* Section Title Input */}
                    <div className="p-10 border-b border-white/5 bg-white/[0.01]">
                      <input
                        className="w-full bg-transparent text-3xl font-black text-white focus:outline-none placeholder:text-gray-800 transition-all"
                        value={sec?.topic || ""}
                        onChange={(e) =>
                          handleSectionUpdate(index, "topic", e.target.value)
                        }
                        placeholder="Enter topic heading..."
                      />
                    </div>

                    {/* Section Content Textarea */}
                    <div className="p-10">
                      <textarea
                        rows={8}
                        className="w-full bg-transparent text-2xl text-gray-400 font-medium leading-relaxed focus:outline-none resize-none placeholder:text-gray-900 transition-all"
                        value={sec?.content || ""}
                        onChange={(e) =>
                          handleSectionUpdate(index, "content", e.target.value)
                        }
                        placeholder="Start writing or editing AI content..."
                      />
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </section>

        {/* Final Execution Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="max-w-3xl mx-auto p-12 bg-gradient-to-br from-indigo-900/20 to-transparent border border-white/10 rounded-[50px] backdrop-blur-xl">
            <h2 className="text-4xl font-bold mb-6">Ready to finalize?</h2>
            <p className="text-gray-500 text-xl mb-12 leading-relaxed">
              Once you are happy with the edits, click the button below to
              generate a professionally formatted PDF including your
              university's specific cover page.
            </p>
            {/* <button
              onClick={handleFinalizeAndDownload}
              disabled={isGenerating}
              className="inline-flex items-center gap-6 px-16 py-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-[35px] font-black text-3xl transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] disabled:opacity-50 cursor-pointer active:scale-95"
            >
              {isGenerating ? (
                <Loader2 className="animate-spin" size={32} />
              ) : (
                <CheckCircle2 size={32} />
              )}
              {isGenerating ? "GENERATING..." : "GENERATE FINAL PDF"}
            </button> */}

            <div className="flex flex-wrap items-center flex-col lg:flex-row gap-6 w-full md:w-auto">
              <button
                onClick={handleExportInPDF}
                disabled={isGenerating}
                className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <FaFilePdf size={24} className="text-red-500" />
                )}
                {isGenerating ? "Processing PDF..." : "Generate PDF"}
              </button>

              <button
                onClick={handleOpenInGoogleDoc}
                disabled={isGenerating}
                className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <File size={24} />
                )}
                {isGenerating ? "Opening..." : "Open In Google Docs"}
              </button>

              <button
                onClick={handleExportInMsWord}
                disabled={isGenerating}
                className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
              >
                {isGenerating ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <FaMicrosoft size={24} />
                )}
                {isGenerating ? "Exporting Docx..." : "Export In MS Docx"}
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
