"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  GraduationCap,
  Send,
  Download,
  Edit3,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { generateAssignment, generatePdf } from "@/services/ai/projectAnalyser";
import { toast } from "sonner";
import Link from "next/link";
import { generateContent } from "@/services/generation";

// --- Types ---
type Section = {
  topic: string;
  content: string;
};

type AssignmentMetadata = {
  universityName: string;
  topic: string;
  submittedBy: string;
  submittedTo: string;
  section: string;
  intake: string;
  assignmentNo: string;
  date: string;
};

export default function HomePageContent({ user }: { user: any }) {
  const [step, setStep] = useState<"hero" | "form" | "editing" | "result">(
    "hero",
  );
  const [loading, setLoading] = useState(false);
  const [assignmentId, setAssignmentId] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const [formData, setFormData] = useState<AssignmentMetadata>({
    universityName: "",
    topic: "",
    submittedBy: "",
    submittedTo: "",
    section: "",
    intake: "",
    assignmentNo: "",
    date: new Date().toLocaleDateString(),
  });

  console.log(user, "user");

  const handleGenerateAIContent = async () => {
    setLoading(true);
    try {
      const res = await generateContent(formData);
      const data = res?.data;

      if (res?.success) {
        toast.success("Your Assignment Content Generated.");
      } else {
        toast.error("Assignment Content Generation Failed");
      }

      setAssignmentId(data?.id);
      setSections(data?.sections);
      setStep("editing");
    } catch (err) {
      alert("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizePDF = async () => {
    setLoading(true);
    try {
      // Step 2: Call your /generate-pdf API
      const res = await generatePdf(assignmentId, {
        sections,
      });

      if (res?.success) {
        toast.success("Generated");

        if (res?.data) {
          const data = res?.data;
          setPdfUrl(data?.url);
          setStep("result");
        }
      } else {
        toast.error("Failed");
      }
    } catch (err) {
      alert("Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] text-white selection:bg-indigo-500/30 font-sans">
      {/* --- Gradient Backgrounds --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        <AnimatePresence mode="wait">
          {/* --- HERO STEP --- */}
          {step === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6">
                <Sparkles size={14} /> Powered by GPT-4o & LangGraph JS
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
                Generate Professional <br /> Assignments in Minutes.
              </h1>
              <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                The ultimate academic assistant for university students. From
                research to perfectly formatted PDF cover pages—all in one
                click.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  target="_blank"
                  href={user ? "/ai-content-writter/tools" : "/login"}
                >
                  <button
                    onClick={() => setStep("form")}
                    className="px-8 py-4 bg-indigo-600 cursor-pointer hover:bg-indigo-500 rounded-xl font-bold text-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
                  >
                    Get Started For Free <ChevronRight size={20} />
                  </button>
                </Link>
                <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-lg hover:bg-white/10 transition-all">
                  View Templates
                </button>
              </div>
            </motion.div>
          )}

          {/* --- EDITING STEP --- */}
          {step === "editing" && (
            <motion.div
              key="editing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <div className="flex justify-between items-center bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-2xl">
                <div>
                  <h2 className="text-xl font-bold">Review & Refine</h2>
                  <p className="text-indigo-300/70 text-sm">
                    AI has drafted your content. Feel free to tweak it.
                  </p>
                </div>
                <button
                  onClick={handleFinalizePDF}
                  className="px-6 py-3 bg-indigo-600 rounded-xl font-bold flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-lg"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Download size={18} />
                  )}
                  Generate Final PDF
                </button>
              </div>

              <div className="space-y-6">
                {sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl"
                  >
                    <input
                      className="bg-transparent text-xl font-bold mb-4 w-full focus:outline-none text-indigo-400"
                      value={sec.topic}
                      onChange={(e) => {
                        const newSecs = [...sections];
                        newSecs[idx].topic = e.target.value;
                        setSections(newSecs);
                      }}
                    />
                    <textarea
                      className="w-full bg-black/20 border border-white/5 rounded-lg p-4 text-gray-300 leading-relaxed focus:outline-none min-h-[150px]"
                      value={sec.content}
                      onChange={(e) => {
                        const newSecs = [...sections];
                        newSecs[idx].content = e.target.value;
                        setSections(newSecs);
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* --- RESULT STEP --- */}
          {step === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center py-20 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
                <CheckCircle2 size={40} className="text-green-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Your Assignment is Ready!
              </h2>
              <p className="text-gray-400 mb-10 px-10">
                The high-quality PDF with your cover page has been generated and
                uploaded safely.
              </p>

              <div className="flex flex-col gap-4 px-10">
                <a
                  href={pdfUrl}
                  target="_blank"
                  className="w-full py-4 bg-indigo-600 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-indigo-500 transition-all"
                >
                  <Download size={20} /> Download PDF
                </a>
                <button
                  onClick={() => setStep("hero")}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-xl font-bold text-gray-400 hover:text-white transition-all"
                >
                  Make Another One
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
