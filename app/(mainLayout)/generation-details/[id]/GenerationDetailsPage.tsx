// "use client";

// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   University,
//   User,
//   Download,
//   ChevronLeft,
//   Sparkles,
//   Loader2,
//   Layers,
//   CheckCircle2,
//   Hash,
//   Calendar,
//   PenLine,
//   File,
//   X,
//   ShieldCheck,
//   Cloud,
//   FileText,
//   ExpandIcon,
//   ShoppingBag,
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   exportMsDocx,
//   generatePDF,
//   openInGoogleDoc,
// } from "@/services/generation";
// import { FaFilePdf, FaMicrosoft } from "react-icons/fa6";
// import PageHeader from "@/components/shared/PageHeader";
// import { FcExport, FcGoogle } from "react-icons/fc";
// import { googleLogin } from "@/services/auth/userLogin";

// const fadeIn = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
// };

// export default function GenerationDetails({ genDetails }: { genDetails: any }) {
//   const router = useRouter();
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);

//   // Initialize state from the passed genDetails prop
//   const [assignment, setAssignment] = useState<any>(genDetails);
//   const [editableSections, setEditableSections] = useState<any[]>(
//     genDetails?.sections || [],
//   );

//   // Sync state if props change (useful for real-time updates)
//   useEffect(() => {
//     if (genDetails) {
//       setAssignment(genDetails);
//       setEditableSections(genDetails?.sections || []);
//     }
//   }, [genDetails]);

//   const handleSectionUpdate = (index: number, field: string, value: string) => {
//     const updated = [...editableSections];
//     if (updated[index]) {
//       updated[index][field] = value;
//       setEditableSections(updated);
//     }
//   };

//   const handleExportInPDF = async () => {
//     if (!assignment?.id) return toast.error("Document ID missing");

//     setIsGenerating(true);
//     const payload = {
//       sections: editableSections,
//     };

//     try {
//       const result = await generatePDF(assignment?.id, payload);

//       console.log(result, "pdf res");

//       if (result?.success) {
//         toast.success("PDF Generated Successfully!");
//         if (result?.data?.url) {
//           router.push(result?.data?.url);
//         }
//       } else {
//         toast.error(result?.message || "Generation failed.");
//       }
//     } catch (err: any) {
//       toast.error("Internal Server Error occurred.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleOpenInGoogleDoc = async () => {
//     if (!assignment?.id) return toast.error("Document ID missing");

//     setIsGenerating(true);
//     const payload = {
//       sections: editableSections,
//     };

//     try {
//       const result = await openInGoogleDoc(assignment?.id, payload);

//       console.log(result, "google res");

//       if (result?.success) {
//         toast.success("Exported in Google doc Successfully!");
//         if (result?.data?.url) {
//           router.push(result?.data?.url);
//         }
//       } else if (
//         result?.error?.response?.data?.error === "invalid_grant" ||
//         result?.statusCode === 401
//       ) {
//         setIsGoogleModalOpen(true);
//       } else {
//         toast.error(result?.message || "Exporting failed.");
//       }
//     } catch (err: any) {
//       toast.error("Internal Server Error occurred.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleExportInMsWord = async () => {
//     if (!assignment?.id) return toast.error("Document ID missing");
//     setIsGenerating(true);
//     const payload = {
//       sections: editableSections,
//     };

//     try {
//       const blob = await exportMsDocx(assignment?.id, payload);
//       if (blob) {
//         const url = window.URL.createObjectURL(blob);

//         const link = document.createElement("a");
//         link.href = url;

//         const fileName = `${assignment?.topic || "Assignment"}.docx`;
//         link.setAttribute("download", fileName);

//         document.body.appendChild(link);
//         link.click();

//         if (link.parentNode) link.parentNode.removeChild(link);
//         window.URL.revokeObjectURL(url);

//         toast.success("MS Word document downloaded successfully!");
//       } else {
//         toast.error("Could not generate Word file. Please try again.");
//       }
//     } catch (err) {
//       toast.error("Internal Server Error occurred.");
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const res = await googleLogin();
//       console.log(res);

//       if (res?.success && res?.data?.url) {
//         router.push(res?.data?.url);
//       } else {
//         toast.error(res?.message || "Something went wrong");
//       }
//     } catch (err) {
//       toast.error("Something Went Wrong");
//     }
//   };

//   const handleUploadToWoocommerce = () => {
    
//   }

//   return (
//     <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30 font-sans">
//       {/* google auth modal  */}
//       <AnimatePresence>
//         {isGoogleModalOpen && (
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setIsGoogleModalOpen(false)}
//               className="absolute inset-0 bg-black/80 backdrop-blur-md"
//             />

//             <motion.div
//               initial={{ opacity: 0, scale: 0.9, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: 20 }}
//               className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-3xl overflow-hidden"
//             >
//               <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full" />

//               <button
//                 onClick={() => setIsGoogleModalOpen(false)}
//                 className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors"
//               >
//                 <X size={28} />
//               </button>

//               <div className="relative z-10 text-center">
//                 <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10">
//                   <FcGoogle size={44} />
//                 </div>

//                 <h2 className="text-3xl md:text-4xl font-black mb-6 tracking-tight">
//                   Google Access Required
//                 </h2>

//                 <p className="text-gray-400 text-xl leading-relaxed mb-10">
//                   To open this assignment in{" "}
//                   <span className="text-white font-bold">Google Docs</span> or
//                   save it to your{" "}
//                   <span className="text-white font-bold">Drive</span>, we need
//                   your permission to manage documents.
//                 </p>

//                 <div className="space-y-4 mb-12">
//                   <div className="flex items-center gap-4 text-left p-4 bg-white/5 rounded-2xl border border-white/5">
//                     <ShieldCheck className="text-emerald-500" size={24} />
//                     <p className="text-lg font-medium text-gray-300 tracking-wide">
//                       Secure OAuth 2.0 Connection
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-4 text-left p-4 bg-white/5 rounded-2xl border border-white/5">
//                     <Cloud className="text-blue-500" size={24} />
//                     <p className="text-lg font-medium text-gray-300 tracking-wide">
//                       Direct Export to your Workspace
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={handleGoogleLogin}
//                   className="w-full py-6 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all flex items-center justify-center gap-4 cursor-pointer shadow-xl active:scale-95"
//                 >
//                   <FcGoogle size={28} />
//                   Connect Google Account
//                 </button>

//                 <p className="mt-6 text-gray-600 text-base italic">
//                   You will be redirected to Google to authorize these
//                   permissions.
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       <PageHeader
//         title="Here is your Generation Details"
//         description={
//           "You can edit the generated text and then export to pdf, google doc or in a microsoft word docx format. Check the google drive save checkbox to save your file in your google drive while exporting."
//         }
//       />
//       {/* Background Ambience */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
//       </div>

//       <main className="relative z-10 max-w-7xl mx-auto px-6 pt-14 pb-40">
//         {/* Navigation Bar */}
//         <div className="flex flex-col lg:flex-row justify-between items-center md:items-center gap-8 mb-16">
//           <button
//             onClick={() => router.push("/my-generations")}
//             className="flex items-center gap-4 text-gray-400 hover:text-white transition-all group text-xl font-bold cursor-pointer"
//           >
//             <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white/10 border border-white/5 group-hover:border-white/20 transition-all">
//               <ChevronLeft size={24} />
//             </div>
//             My Library
//           </button>

//           <div className="flex flex-wrap items-center flex-col lg:flex-row gap-6 w-full md:w-auto">
//             <button
//               onClick={handleExportInPDF}
//               disabled={isGenerating}
//               className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
//             >
//               {isGenerating ? (
//                 <Loader2 className="animate-spin" size={24} />
//               ) : (
//                 <FaFilePdf size={24} className="text-red-500" />
//               )}
//               {isGenerating ? "Processing PDF..." : "Generate PDF"}
//             </button>

//             <button
//               onClick={handleOpenInGoogleDoc}
//               disabled={isGenerating}
//               className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
//             >
//               {isGenerating ? (
//                 <Loader2 className="animate-spin" size={24} />
//               ) : (
//                 <File size={24} />
//               )}
//               {isGenerating ? "Opening..." : "Open In Google Docs"}
//             </button>

//             <button
//               onClick={handleExportInMsWord}
//               disabled={isGenerating}
//               className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer group"
//             >
//               {isGenerating ? (
//                 <Loader2 className="animate-spin" size={24} />
//               ) : (
//                 <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-white/20 transition-colors">
//                   <FileText
//                     size={24}
//                     className="text-blue-400 group-hover:text-white"
//                   />
//                 </div>
//               )}
//               {isGenerating ? "Processing..." : "Download Word"}
//             </button>
//           </div>
//         </div>

//         {/* Premium Metadata Header */}
//         <motion.section
//           variants={fadeIn}
//           initial="hidden"
//           animate="visible"
//           className="bg-white/[0.02] border border-white/10 rounded-[50px] p-10 md:p-16 mb-16 backdrop-blur-3xl shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
//         >
//           <div className="flex flex-col lg:flex-row gap-16">
//             <div className="flex-1 space-y-8">
//               <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full">
//                 <Sparkles size={18} className="text-indigo-400" />
//                 <span className="text-base font-black text-indigo-400 uppercase tracking-[0.2em]">
//                   {assignment?.status || "GENERATED"}
//                 </span>
//               </div>

//               <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1.1] bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
//                 {assignment?.topic || "Loading Topic..."}
//               </h1>

//               <div className="flex flex-wrap gap-10 pt-4">
//                 <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
//                   <University size={26} className="text-indigo-500" />
//                   {assignment?.universityName || "General University"}
//                 </div>
//                 <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
//                   <Layers size={26} className="text-purple-500" />
//                   Section {assignment?.section || "N/A"}
//                 </div>
//                 <div className="flex items-center gap-4 text-gray-400 text-xl font-medium">
//                   <Hash size={26} className="text-emerald-500" />
//                   Intake {assignment?.intake || "N/A"}
//                 </div>
//               </div>
//             </div>

//             {/* Submission Detail Card */}
//             <div className="lg:w-[380px] bg-white/[0.03] border border-white/5 rounded-[40px] p-10 space-y-8 flex flex-col justify-center">
//               <div className="space-y-2">
//                 <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
//                   <User size={16} /> Submitted To
//                 </p>
//                 <p className="text-2xl font-bold">
//                   {assignment?.submittedTo || "N/A"}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
//                   <PenLine size={16} /> Submitted By
//                 </p>
//                 <p className="text-2xl font-bold">
//                   {assignment?.submittedBy || "N/A"}
//                 </p>
//               </div>
//               <div className="space-y-2">
//                 <p className="text-gray-500 text-base font-black uppercase tracking-widest flex items-center gap-2">
//                   <Calendar size={16} /> Assignment No
//                 </p>
//                 <p className="text-2xl font-bold">
//                   {assignment?.assignmentNo || "01"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.section>

//         {/* Content Editor Section */}
//         <section className="space-y-12">
//           <div className="flex items-center gap-6 mb-12">
//             <h2 className="text-3xl font-black uppercase tracking-[0.2em] text-gray-600">
//               Refine AI Content
//             </h2>
//             <div className="h-[1px] flex-1 bg-white/10" />
//           </div>

//           <div className="grid gap-12">
//             <AnimatePresence>
//               {editableSections?.length > 0 &&
//                 editableSections?.map((sec: any, index: number) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.1 }}
//                     className="bg-white/[0.015] border border-white/10 rounded-[45px] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 group shadow-2xl"
//                   >
//                     {/* Section Title Input */}
//                     <div className="p-10 border-b border-white/5 bg-white/[0.01]">
//                       <input
//                         className="w-full bg-transparent text-3xl font-black text-white focus:outline-none placeholder:text-gray-800 transition-all"
//                         value={sec?.topic || ""}
//                         onChange={(e) =>
//                           handleSectionUpdate(index, "topic", e.target.value)
//                         }
//                         placeholder="Enter topic heading..."
//                       />
//                     </div>

//                     {/* Section Content Textarea */}
//                     <div className="p-10">
//                       <textarea
//                         rows={8}
//                         className="w-full bg-transparent text-2xl text-gray-400 font-medium leading-relaxed focus:outline-none resize-none placeholder:text-gray-900 transition-all"
//                         value={sec?.content || ""}
//                         onChange={(e) =>
//                           handleSectionUpdate(index, "content", e.target.value)
//                         }
//                         placeholder="Start writing or editing AI content..."
//                       />
//                     </div>
//                   </motion.div>
//                 ))}
//             </AnimatePresence>
//           </div>
//         </section>

//         {/* Final Execution Button */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           className="mt-18 text-center"
//         >
//           <div className="p-12 bg-gradient-to-br from-indigo-900/20 to-transparent border border-white/10 rounded-[50px] backdrop-blur-xl">
//             <h2 className="text-4xl font-bold mb-6">Ready to finalize?</h2>
//             <p className="text-gray-500 text-xl mb-12 leading-relaxed">
//               Once you are happy with the edits, click the button below to
//               generate a professionally formatted PDF including your
//               university's specific cover page.
//             </p>

//             <div className="flex flex-wrap items-center justify-center flex-col lg:flex-row gap-6 w-full md:w-auto">
//               <button
//                 onClick={handleExportInPDF}
//                 disabled={isGenerating}
//                 className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
//               >
//                 {isGenerating ? (
//                   <Loader2 className="animate-spin" size={24} />
//                 ) : (
//                   <FaFilePdf size={24} className="text-red-500" />
//                 )}
//                 {isGenerating ? "Processing PDF..." : "Generate PDF"}
//               </button>

//               <button
//                 onClick={handleOpenInGoogleDoc}
//                 disabled={isGenerating}
//                 className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer"
//               >
//                 {isGenerating ? (
//                   <Loader2 className="animate-spin" size={24} />
//                 ) : (
//                   <File size={24} />
//                 )}
//                 {isGenerating ? "Opening..." : "Open In Google Docs"}
//               </button>

//               <button
//                 onClick={handleExportInMsWord}
//                 disabled={isGenerating}
//                 className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer group"
//               >
//                 {isGenerating ? (
//                   <Loader2 className="animate-spin" size={24} />
//                 ) : (
//                   <div className="p-2 bg-blue-500/20 rounded-lg group-hover:bg-white/20 transition-colors">
//                     <FileText
//                       size={24}
//                       className="text-blue-400 group-hover:text-white"
//                     />
//                   </div>
//                 )}
//                 {isGenerating ? "Processing..." : "Download Word"}
//               </button>

//               {genDetails?.docType === 'PRODUCT_DESC' &&
//                 <button
//                 onClick={handleUploadToWoocommerce}
//                 disabled={isGenerating}
//                 className="flex-1 md:flex-none flex items-center justify-center gap-4 px-10 py-5 bg-purple-500 border border-white/10 text-white hover:bg-purple-500 hover:border-bg-purple-500 rounded-[24px] font-black text-xl transition-all shadow-2xl disabled:opacity-50 cursor-pointer group"
//               >
//                 {isGenerating ? (
//                   <Loader2 className="animate-spin" size={24} />
//                 ) : (
//                   <div className="p-2 rounded-lg bg-white/20 transition-colors">
//                     <ShoppingBag
//                       size={24}
//                       className="text-white"
//                     />
//                   </div>
//                 )}
//                 Upload To Woocommerce
//               </button>
//               }
//             </div>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }



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
  PenLine,
  File,
  X,
  ShieldCheck,
  Cloud,
  FileText,
  ShoppingBag,
  ListTree,
  Box,
  Tag,
  DollarSign,
  Globe,
  Key,
  LinkIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  connectWooCommerceStore,
  exportMsDocx,
  generatePDF,
  openInGoogleDoc,
  publishToWoocommerce,
} from "@/services/generation";
import { FaFilePdf } from "react-icons/fa6";
import PageHeader from "@/components/shared/PageHeader";
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "@/services/auth/userLogin";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function GenerationDetails({ genDetails, wooStore }: { genDetails: any, wooStore: any }) {
  console.log(wooStore, 'my store');
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWooModalOpen, setIsWooModalOpen] = useState(false);

  const [assignment, setAssignment] = useState<any>(genDetails);
  const [editableSections, setEditableSections] = useState<any[]>(
    genDetails?.sections || [],
  );
  
    const [wooData, setWooData] = useState({
    storeUrl: "",
    consumerKey: "",
    consumerSecret: ""
  });
  // Controlled WooCommerce Data
  const [formData, setFormData] = useState({
    regularPrice: "",
    salePrice: "",
    stock: "",
    category: "",
  });

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
    try {
      const result = await generatePDF(assignment?.id, { sections: editableSections });
      if (result?.success && result?.data?.url) {
        window.open(result.data.url, "_blank");
      } else {
        toast.error(result?.message || "Generation failed.");
      }
    } catch (err) { toast.error("PDF Generation Error"); }
    finally { setIsGenerating(false); }
  };

  const handleOpenInGoogleDoc = async () => {
    if (!assignment?.id) return toast.error("Document ID missing");
    setIsGenerating(true);
    try {
      const result = await openInGoogleDoc(assignment?.id, { sections: editableSections });
      if (result?.success && result?.data?.url) {
        window.open(result.data.url, "_blank");
      } else if (result?.statusCode === 401) {
        setIsGoogleModalOpen(true);
      } else {
        toast.error(result?.message || "Exporting failed.");
      }
    } catch (err) { toast.error("Google Docs Error"); }
    finally { setIsGenerating(false); }
  };

  const handleExportInMsWord = async () => {
    if (!assignment?.id) return toast.error("Document ID missing");
    setIsGenerating(true);
    try {
      const blob = await exportMsDocx(assignment?.id, { sections: editableSections });
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${assignment?.topic || "Document"}.docx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Word document ready!");
      }
    } catch (err) { toast.error("Word Export Error"); }
    finally { setIsGenerating(false); }
  };

  const handleUploadToWoocommerce = async () => {
    if (!assignment?.id) return toast.error("Document ID missing");
    if (!formData.regularPrice || !formData.stock) return toast.error("Please fill in Price and Stock");

    setIsGenerating(true);
    try {
      // We pass both the edited AI text and the manual inventory numbers
      const result = await publishToWoocommerce(assignment?.id, {
        sections: editableSections,
        ...formData
      });

      if (result?.success) {
        toast.success("Synced to Store! Check your WooCommerce drafts.");
      } else {
        toast.error(result?.message || "Sync failed.");
      }
    } catch (err) { toast.error("WooCommerce API Error"); }
    finally { setIsGenerating(false); }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await googleLogin();
      if (res?.success && res?.data?.url) router.push(res.data.url);
    } catch (err) { toast.error("Google Login Error"); }
  };

  const handleConnectWoocommerce = async () => {
    // Basic Validation
    if (!wooData.storeUrl || !wooData.consumerKey || !wooData.consumerSecret) {
      return toast.error("Please fill in all API credentials");
    }

    setIsConnecting(true);
    try {
      const result = await connectWooCommerceStore(wooData);

      if (result?.success) {
        toast.success("WooCommerce Store Linked Successfully!");
        setIsWooModalOpen(false);
        // Optional: Trigger the upload logic immediately after successful connection
      } else {
        toast.error(result?.message || "Connection failed. Check your keys.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsConnecting(false);
    }
  };


  const inputStyles = "w-full bg-white/[0.03] border border-white/10 rounded-2xl md:rounded-[28px] px-6 md:px-8 py-4 md:py-6 text-base md:text-xl text-white placeholder:text-white/40 focus:outline-none focus:border-indigo-500 focus:bg-white/[0.06] transition-all duration-300";
  const labelStyles = "text-xs md:text-sm font-black uppercase tracking-[0.15em] text-indigo-400 flex items-center gap-2 md:gap-3 ml-2";

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30 font-sans">
      
      {/* GOOGLE PERMISSION MODAL */}
      <AnimatePresence>
        {isGoogleModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGoogleModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="relative w-full max-w-xl bg-[#0A0A0A] border border-white/10 rounded-[40px] p-10 md:p-14 shadow-3xl overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[80px] rounded-full" />
              <button onClick={() => setIsGoogleModalOpen(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={28} /></button>
              <div className="relative z-10 text-center">
                <FcGoogle size={60} className="mx-auto mb-8" />
                <h2 className="text-3xl font-black mb-6">Google Access Required</h2>
                <p className="text-gray-400 text-xl leading-relaxed mb-10">We need your permission to save documents directly to your workspace.</p>
                <button onClick={handleGoogleLogin} className="w-full py-6 bg-white text-black rounded-[24px] font-black text-xl hover:bg-indigo-600 hover:text-white transition-all">Connect Google Account</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* woocommerce PERMISSION MODAL */}
      <AnimatePresence>
        {isWooModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => !isConnecting && setIsWooModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-[45px] p-8 md:p-12 shadow-3xl overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-600/10 blur-[100px] rounded-full" />

              <button 
                onClick={() => setIsWooModalOpen(false)}
                className="absolute top-8 right-8 p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20">
                        <ShoppingBag className="text-purple-500" size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black tracking-tight">Connect Store</h2>
                        <p className="text-gray-500 text-lg">Integrate your WooCommerce Marketplace</p>
                    </div>
                </div>

                <div className="space-y-6 mb-10">
                  {/* Store URL */}
                  <div>
                    <label className={labelStyles}>Store URL</label>
                    <div className="relative">
                        <Globe className="absolute left-5 lg:left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                            className={`${inputStyles} pl-14`}
                            placeholder="https://yourstore.com"
                            value={wooData.storeUrl}
                            onChange={(e) => setWooData({...wooData, storeUrl: e.target.value})}
                        />
                    </div>
                  </div>

                  {/* Consumer Key */}
                  <div>
                    <label className={labelStyles}>Consumer Key</label>
                    <div className="relative">
                        <Key className="absolute left-5 lg:left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                            className={`${inputStyles} pl-14`}
                            placeholder="ck_xxxxxxxxxxxxxxxx"
                            value={wooData.consumerKey}
                            onChange={(e) => setWooData({...wooData, consumerKey: e.target.value})}
                        />
                    </div>
                  </div>

                  {/* Consumer Secret */}
                  <div>
                    <label className={labelStyles}>Consumer Secret</label>
                    <div className="relative">
                        <ShieldCheck className="absolute left-5 lg:left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                        <input 
                            type="password"
                            className={`${inputStyles} pl-14`}
                            placeholder="cs_xxxxxxxxxxxxxxxx"
                            value={wooData.consumerSecret}
                            onChange={(e) => setWooData({...wooData, consumerSecret: e.target.value})}
                        />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleConnectWoocommerce}
                  disabled={isConnecting}
                  className="w-full py-6 bg-purple-600 hover:bg-purple-500 text-white rounded-[25px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50 active:scale-95 cursor-pointer"
                >
                  {isConnecting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <LinkIcon size={24} />
                  )}
                  {isConnecting ? "VERIFYING API..." : "AUTHORIZE CONNECTION"}
                </button>
                
                <p className="mt-8 text-gray-600 text-center text-base italic leading-relaxed">
                    Keys can be found in WooCommerce &gt; Settings &gt; Advanced &gt; REST API. <br/>
                    Ensure your site uses <span className="text-gray-400">HTTPS</span> for a secure connection.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <PageHeader title="Refine & Export" description="Edit your AI-generated masterpiece and choose your preferred export format." />

      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-40">
        
        {/* HEADER NAVIGATION */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 mb-16">
          <button onClick={() => router.push("/my-generations")} className="flex items-center gap-4 text-gray-400 hover:text-white transition-all text-xl font-bold cursor-pointer">
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 transition-all"><ChevronLeft size={24} /></div>
            My Library
          </button>

          <div className="flex flex-wrap items-center justify-center gap-6 w-full lg:w-auto">
            <button onClick={handleExportInPDF} disabled={isGenerating} className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-4 bg-white text-black hover:bg-indigo-600 hover:text-white rounded-[20px] font-black text-lg transition-all shadow-xl disabled:opacity-50">
               {isGenerating ? <Loader2 className="animate-spin" /> : <FaFilePdf className="text-red-500" />} PDF
            </button>
            <button onClick={handleOpenInGoogleDoc} disabled={isGenerating} className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-[20px] font-black text-lg hover:bg-blue-600 transition-all">
               <File size={20} className="text-blue-400" /> Google Docs
            </button>
            <button onClick={handleExportInMsWord} disabled={isGenerating} className="flex-1 lg:flex-none flex items-center justify-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-[20px] font-black text-lg hover:bg-blue-600 transition-all">
               <FileText size={20} className="text-indigo-400" /> MS Word
            </button>
          </div>
        </div>

        {/* METADATA OVERVIEW */}
        <motion.section variants={fadeIn} initial="hidden" animate="visible" className="bg-white/[0.02] border border-white/10 rounded-[45px] p-10 md:p-16 mb-16 backdrop-blur-3xl shadow-2xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <Sparkles size={18} className="text-indigo-400" />
                <span className="text-base font-black text-indigo-400 uppercase tracking-widest">{assignment?.docType}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">{assignment?.topic}</h1>
              
              <div className="flex flex-wrap gap-10 pt-4">
                {assignment?.universityName && <div className="flex items-center gap-4 text-gray-400 text-xl font-medium"><University size={26} className="text-indigo-500" />{assignment.universityName}</div>}
                {assignment?.section && <div className="flex items-center gap-4 text-gray-400 text-xl font-medium"><Layers size={26} className="text-purple-500" />Section {assignment.section}</div>}
              </div>
            </div>

            <div className="lg:w-[350px] bg-white/[0.03] border border-white/5 rounded-[35px] p-10 space-y-8 flex flex-col justify-center">
                <div className="space-y-1"><p className="text-gray-500 text-base font-black uppercase tracking-widest">Author</p><p className="text-2xl font-bold">{assignment?.submittedBy || "Nabil"}</p></div>
                <div className="space-y-1"><p className="text-gray-500 text-base font-black uppercase tracking-widest">Date</p><p className="text-2xl font-bold">{new Date(assignment?.createdAt).toLocaleDateString()}</p></div>
            </div>
          </div>
        </motion.section>

        {/* AI EDITOR GRID */}
        <section className="space-y-10">
          <div className="flex items-center gap-6"><h2 className="text-2xl font-black uppercase tracking-[0.2em] text-gray-600">AI Content Editor</h2><div className="h-[1px] flex-1 bg-white/10" /></div>
          <div className="grid gap-10">
            {editableSections?.map((sec: any, index: number) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/[0.015] border border-white/10 rounded-[35px] overflow-hidden hover:border-indigo-500/40 transition-all duration-500 group shadow-xl">
                <div className="p-10 border-b border-white/5"><input className="w-full bg-transparent text-3xl font-black text-white focus:outline-none" value={sec?.topic || ""} onChange={(e) => handleSectionUpdate(index, "topic", e.target.value)} /></div>
                <div className="p-10"><textarea rows={6} className="w-full bg-transparent text-2xl text-gray-400 leading-relaxed focus:outline-none resize-none" value={sec?.content || ""} onChange={(e) => handleSectionUpdate(index, "content", e.target.value)} /></div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* WOOCOMMERCE ADD-ON FORM */}
        {assignment?.docType === 'PRODUCT_DESC' && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-20 space-y-10 bg-white/[0.01] border border-white/5 p-12 rounded-[50px]">
            <div className="flex items-center gap-4"><ShoppingBag className="text-emerald-500" /><h3 className="text-2xl font-black uppercase tracking-widest text-white">Marketplace Inventory Sync</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4"><label className={labelStyles}><DollarSign size={18} /> Regular Price (৳)</label><input type="number" className={inputStyles} placeholder="0.00" value={formData.regularPrice} onChange={(e) => setFormData({...formData, regularPrice: e.target.value})} /></div>
              <div className="space-y-4"><label className={labelStyles}><Tag size={18} /> Sale Price</label><input type="number" className={inputStyles} placeholder="Optional" value={formData.salePrice} onChange={(e) => setFormData({...formData, salePrice: e.target.value})} /></div>
              <div className="space-y-4"><label className={labelStyles}><Box size={18} /> Initial Stock</label><input type="number" className={inputStyles} placeholder="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} /></div>
              <div className="space-y-4"><label className={labelStyles}><ListTree size={18} /> Category ID</label><input type="text" className={inputStyles} placeholder="WooCommerce Category ID" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} /></div>
            </div>
            {wooStore?.success ?
              <button onClick={handleUploadToWoocommerce} disabled={isGenerating} className="w-full py-8 bg-emerald-600 text-white rounded-[30px] text-2xl font-black transition-all hover:bg-emerald-500 cursor-pointer disabled:opacity-50">
              {isGenerating ? <Loader2 className="animate-spin inline mr-4" /> : <ShoppingBag className="inline mr-4" />}
              Publish to WooCommerce Drafts
            </button>
            : 
              <button onClick={() => setIsWooModalOpen(true)} disabled={isGenerating} className="w-full py-8 bg-purple-600 text-white rounded-[30px] text-2xl font-black transition-all hover:bg-purple-600 cursor-pointer disabled:opacity-50">
              {isGenerating ? <Loader2 className="animate-spin inline mr-4" /> : <ShoppingBag className="inline mr-4" />}
              Connect To Woocommerce
            </button>
            }
          </motion.div>
        )}

        {/* FINAL PDF ACTION BOX */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-32 text-center max-w-4xl mx-auto p-16 bg-gradient-to-br from-indigo-900/20 to-transparent border border-white/10 rounded-[50px] backdrop-blur-xl">
            <h2 className="text-4xl font-bold mb-6 italic text-indigo-400 underline underline-offset-8">Ready to print?</h2>
            <p className="text-gray-400 text-2xl mb-12 leading-relaxed">Your content is refined and formatted. Generate the final high-resolution document below.</p>
            <button onClick={handleExportInPDF} disabled={isGenerating} className="px-16 py-8 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-black text-3xl transition-all shadow-3xl disabled:opacity-50 active:scale-95">
              {isGenerating ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={32} className="inline mr-4" />}
              GENERATE FINAL DOCUMENT
            </button>
        </motion.div>

      </main>
    </div>
  );
}