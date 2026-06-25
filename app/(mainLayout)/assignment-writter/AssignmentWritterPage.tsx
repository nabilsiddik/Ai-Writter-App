"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  GraduationCap,
  Send,
  Edit3,
  Loader2,
} from "lucide-react";
import { generateAssignment, generatePdf } from "@/services/ai/projectAnalyser";
import { toast } from "sonner";


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


const AssignmentWritterPage = () => {
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


  const handleGenerateAIContent = async () => {
    setLoading(true);
    try {
      const res = await generateAssignment({
        ...formData,
        selectedTopics: ["Introduction", "Analysis", "Conclusion"],
      });
      const data = res?.data;


      if (res?.success) {
        toast.success("Generated");
      } else {
        toast.error("Failed");
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
  return (
    <div className="py-10 px-5">
         <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-white"
            >
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="text-indigo-400" size={32} />
                <div>
                  <h2 className="text-2xl font-bold">Assignment Details</h2>
                  <p className="text-gray-400 text-sm">
                    Fill in the metadata for your cover page.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    label: "University Name",
                    key: "universityName",
                    icon: <GraduationCap size={16} />,
                  },
                  {
                    label: "Assignment Topic",
                    key: "topic",
                    icon: <Edit3 size={16} />,
                  },
                  {
                    label: "Submitted By",
                    key: "submittedBy",
                    icon: <FileText size={16} />,
                  },
                  {
                    label: "Submitted To",
                    key: "submittedTo",
                    icon: <Send size={16} />,
                  },
                  {
                    label: "Section",
                    key: "section",
                    icon: <Sparkles size={16} />,
                  },
                  {
                    label: "Intake",
                    key: "intake",
                    icon: <Sparkles size={16} />,
                  },
                  {
                    label: "Assignment No",
                    key: "assignmentNo",
                    icon: <Sparkles size={16} />,
                  },
                  { label: "Date", key: "date", icon: <Sparkles size={16} /> },
                ].map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                      {field.icon} {field.label}
                    </label>
                    <input
                      type="text"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                      placeholder={`Enter ${field.label.toLowerCase()}...`}
                      value={(formData as any)[field.key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.key]: e.target.value,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                disabled={loading}
                onClick={handleGenerateAIContent}
                className="w-full mt-10 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Sparkles size={20} />
                )}
                {loading ? "AI is writing..." : "Generate Assignment Content"}
              </button>
            </motion.div>
    </div>
  )
}

export default AssignmentWritterPage