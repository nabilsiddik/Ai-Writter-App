// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Sparkles,
//   FileText,
//   GraduationCap,
//   Send,
//   Edit3,
//   Loader2,
// } from "lucide-react";
// import { generateAssignment, generatePdf } from "@/services/ai/projectAnalyser";
// import { toast } from "sonner";


// type Section = {
//   topic: string;
//   content: string;
// };

// type AssignmentMetadata = {
//   universityName: string;
//   topic: string;
//   submittedBy: string;
//   submittedTo: string;
//   section: string;
//   intake: string;
//   assignmentNo: string;
//   date: string;
// };


// const AssignmentWritterPage = () => {
//       const [step, setStep] = useState<"hero" | "form" | "editing" | "result">(
//     "hero",
//   );
//   const [loading, setLoading] = useState(false);
//   const [assignmentId, setAssignmentId] = useState("");
//   const [sections, setSections] = useState<Section[]>([]);
//   const [pdfUrl, setPdfUrl] = useState("");

//   const [formData, setFormData] = useState<AssignmentMetadata>({
//     universityName: "",
//     topic: "",
//     submittedBy: "",
//     submittedTo: "",
//     section: "",
//     intake: "",
//     assignmentNo: "",
//     date: new Date().toLocaleDateString(),
//   });


//   const handleGenerateAIContent = async () => {
//     setLoading(true);
//     try {
//       const res = await generateAssignment({
//         ...formData,
//         selectedTopics: ["Introduction", "Analysis", "Conclusion"],
//       });
//       const data = res?.data;


//       if (res?.success) {
//         toast.success("Generated");
//       } else {
//         toast.error("Failed");
//       }

//       setAssignmentId(data?.id);
//       setSections(data?.sections);
//       setStep("editing");
//     } catch (err) {
//       alert("Error generating content");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="py-10 px-5">
//          <motion.div
//               key="form"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="max-w-3xl mx-auto bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl shadow-2xl text-white"
//             >
//               <div className="flex items-center gap-3 mb-8">
//                 <GraduationCap className="text-indigo-400" size={32} />
//                 <div>
//                   <h2 className="text-2xl font-bold">Assignment Details</h2>
//                   <p className="text-gray-400 text-sm">
//                     Fill in the metadata for your cover page.
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {[
//                   {
//                     label: "University Name",
//                     key: "universityName",
//                     icon: <GraduationCap size={16} />,
//                   },
//                   {
//                     label: "Assignment Topic",
//                     key: "topic",
//                     icon: <Edit3 size={16} />,
//                   },
//                   {
//                     label: "Submitted By",
//                     key: "submittedBy",
//                     icon: <FileText size={16} />,
//                   },
//                   {
//                     label: "Submitted To",
//                     key: "submittedTo",
//                     icon: <Send size={16} />,
//                   },
//                   {
//                     label: "Section",
//                     key: "section",
//                     icon: <Sparkles size={16} />,
//                   },
//                   {
//                     label: "Intake",
//                     key: "intake",
//                     icon: <Sparkles size={16} />,
//                   },
//                   {
//                     label: "Assignment No",
//                     key: "assignmentNo",
//                     icon: <Sparkles size={16} />,
//                   },
//                   { label: "Date", key: "date", icon: <Sparkles size={16} /> },
//                 ].map((field) => (
//                   <div key={field.key} className="space-y-2">
//                     <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
//                       {field.icon} {field.label}
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
//                       placeholder={`Enter ${field.label.toLowerCase()}...`}
//                       value={(formData as any)[field.key]}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           [field.key]: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 ))}
//               </div>

//               <button
//                 disabled={loading}
//                 onClick={handleGenerateAIContent}
//                 className="w-full mt-10 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
//               >
//                 {loading ? (
//                   <Loader2 className="animate-spin" />
//                 ) : (
//                   <Sparkles size={20} />
//                 )}
//                 {loading ? "AI is writing..." : "Generate Assignment Content"}
//               </button>
//             </motion.div>
//     </div>
//   )
// }

// export default AssignmentWritterPage


"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  FileText,
  GraduationCap,
  Send,
  Loader2,
  Calendar,
  Layers,
  Hash,
  PenTool,
  ArrowRight
} from "lucide-react";
import { generateAssignment } from "@/services/ai/projectAnalyser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

const AssignmentWriterPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        docType: "ASSIGNMENT",
        prompt: `Write a university assignment about ${formData?.topic}.`,
      });

      if (res?.success) {
        toast.success("Intelligence Engine Success!");
        router.push(`/generation-details/${res?.data?.id}`);
      } else {
        toast.error(res?.message || "Generation failed");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full bg-white border-2 border-slate-200 rounded-xl px-6 py-4 text-lg text-black placeholder:text-slate-300 focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/5 transition-all duration-300";
  const labelStyles = "text-base font-black uppercase tracking-widest text-slate-400 mb-3 block ml-1";

  return (
    <div className="min-h-screen bg-white mt-20">
      <header className="bg-slate-50 border-b border-slate-200 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/20"
          >
            <GraduationCap size={40} className="text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-black text-black mb-6 tracking-tight">
            AI Assignment Writer
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Provide your assignment metadata to generate a professionally formatted academic paper with a custom cover page.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 p-8 md:p-16 rounded-[40px] shadow-sm"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-2">
              <label className={labelStyles}>University Name</label>
              <div className="relative">
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="e.g. BUBT"
                  value={formData?.universityName}
                  onChange={(e) => setFormData({ ...formData, universityName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelStyles}>Assignment Topic</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="Subject of study"
                value={formData?.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className={labelStyles}>Submitted By</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="Full student name"
                value={formData?.submittedBy}
                onChange={(e) => setFormData({ ...formData, submittedBy: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className={labelStyles}>Submitted To</label>
              <input
                type="text"
                className={inputStyles}
                placeholder="Professor or Instructor name"
                value={formData?.submittedTo}
                onChange={(e) => setFormData({ ...formData, submittedTo: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4 md:col-span-2">
              <div className="space-y-2">
                <label className={labelStyles}>Section</label>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="01"
                  value={formData?.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className={labelStyles}>Intake</label>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="49"
                  value={formData?.intake}
                  onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className={labelStyles}>Sl No.</label>
                <input
                  type="text"
                  className={inputStyles}
                  placeholder="02"
                  value={formData?.assignmentNo}
                  onChange={(e) => setFormData({ ...formData, assignmentNo: e.target.value })}
                />
              </div>
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className={labelStyles}>Submission Date</label>
              <input
                type="text"
                className={inputStyles}
                value={formData?.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="mt-16 border-t border-slate-100 pt-16">
            <button
              disabled={loading}
              onClick={handleGenerateAIContent}
              className="w-full py-6 bg-primary hover:bg-indigo-700 text-white rounded-2xl text-lg font-black transition-all flex items-center justify-center gap-4 cursor-pointer shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-default"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={28} />
              ) : (
                <Sparkles size={20} />
              )}
              {loading ? "ENGINE ANALYSING..." : "GENERATE ASSIGNMENT"}
              {!loading && <ArrowRight size={24} />}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AssignmentWriterPage;