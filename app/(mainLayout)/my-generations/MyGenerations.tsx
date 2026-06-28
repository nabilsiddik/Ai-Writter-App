// "use client";

// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, Variants } from "framer-motion";
// import {
//   FileText,
//   Calendar,
//   University,
//   User,
//   Download,
//   ExternalLink,
//   Search,
//   Sparkles,
//   Loader2,
//   Clock,
//   ArrowRight,
// } from "lucide-react";
// import { format } from "date-fns";
// import Link from "next/link";
// import { FaFilePdf } from "react-icons/fa6";

// // --- Animation Variants ---
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 },
//   },
// };

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 30, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
// };

// export default function MyGenerations({ generations }: { generations: any }) {
//   const [loading, setLoading] = useState(!generations);
//   const [searchQuery, setSearchQuery] = useState("");

//   return (
//     <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500/30">
//       {/* --- Dynamic Background Atmosphere --- */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[140px] rounded-full animate-pulse" />
//         <div
//           className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[140px] rounded-full animate-pulse"
//           style={{ animationDelay: "2s" }}
//         />
//       </div>

//       <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24">
//         {/* --- Header Section --- */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//           >
//             <div className="flex items-center gap-3 mb-4">
//               <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
//                 <FileText size={20} className="text-white" />
//               </div>
//               <span className="text-indigo-400 font-bold tracking-widest   uppercase">
//                 Dashboard
//               </span>
//             </div>
//             <h1 className="text-5xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
//               My Library
//             </h1>
//             <p className="text-gray-400 mt-4 text-lg max-w-md leading-relaxed">
//               Access your previous AI-generated assignments and refined academic
//               documents.
//             </p>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="relative w-full lg:w-96"
//           >
//             <Search
//               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder="Search topics..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all backdrop-blur-md placeholder:text-gray-600"
//             />
//           </motion.div>
//         </div>

//         {/* --- Grid Section --- */}
//         <AnimatePresence mode="wait">
//           {loading ? (
//             <motion.div
//               key="loading"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="flex flex-col items-center justify-center py-40"
//             >
//               <div className="relative">
//                 <Loader2 className="animate-spin text-indigo-500" size={48} />
//                 <div className="absolute inset-0 blur-xl bg-indigo-500/20 animate-pulse" />
//               </div>
//               <p className="mt-6 text-gray-500 font-medium tracking-widest uppercase  ">
//                 Syncing your data...
//               </p>
//             </motion.div>
//           ) : generations?.length > 0 ? (
//             <motion.div
//               key="grid"
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
//             >
//               {generations?.map((gen: any) => (
//                 <GenerationCard key={gen?.id} gen={gen} />
//               ))}
//             </motion.div>
//           ) : (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-32 rounded-[40px] border border-dashed border-white/10 bg-white/[0.01]"
//             >
//               <div className="w-20 h-20 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <Sparkles size={32} className="text-indigo-400" />
//               </div>
//               <h2 className="text-2xl font-bold mb-2">No documents found</h2>
//               <p className="text-gray-500 mb-10">
//                 Start by creating your first AI assignment.
//               </p>
//               <Link
//                 href="/"
//                 className="px-8 py-4 bg-white text-black rounded-2xl font-black hover:bg-indigo-500 hover:text-white transition-all inline-flex items-center gap-2 group"
//               >
//                 Generate Now{" "}
//                 <ArrowRight
//                   size={18}
//                   className="group-hover:translate-x-1 transition-transform"
//                 />
//               </Link>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// }

// function GenerationCard({ gen }: { gen: any }) {
//   return (
//     <motion.div
//       variants={cardVariants}
//       whileHover={{ y: -8, transition: { duration: 0.2 } }}
//       className="group relative flex flex-col bg-white/[0.03] border border-white/10 rounded-[35px] p-8 hover:bg-white/[0.06] hover:border-white/20 transition-all shadow-2xl"
//     >
//       {/* Background Glow Effect on Hover */}
//       <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/5 group-hover:to-purple-600/5 rounded-[35px] transition-all duration-500" />

//       {/* Card Header */}
//       <div className="flex justify-between items-start mb-8">
//         <div className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full">
//           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//           <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
//             {gen?.status || "PENDING"}
//           </span>
//         </div>
//         <div className="text-gray-600 group-hover:text-indigo-400 transition-colors">
//           <Sparkles size={20} />
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 space-y-4">
//         <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2">
//           {gen?.topic || "Untitled Document"}
//         </h3>

//         <div className="space-y-3 pt-2">
//           <div className="flex items-center gap-3 text-gray-400">
//             <University size={16} className="text-indigo-500/70" />
//             <span className="  font-medium truncate">
//               {gen?.universityName || "General Template"}
//             </span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-400">
//             <User size={16} className="text-purple-500/70" />
//             <span className="  font-medium">
//               To: {gen?.submittedTo || "N/A"}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Divider & Metadata */}
//       <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

//       <div className="flex items-center justify-between mb-8">
//         <div className="flex flex-col">
//           <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">
//             Sections
//           </span>
//           <span className="  font-bold text-white">
//             {gen?.sections?.length || 0} AI Blocks
//           </span>
//         </div>
//         <div className="flex flex-col text-right">
//           <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">
//             Created
//           </span>
//           <span className="  font-bold text-white">
//             {gen?.createdAt ? format(new Date(gen.createdAt), "dd MMM") : "N/A"}
//           </span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="grid grid-cols-2 gap-3 relative z-10">
//         <a
//           href={gen?.pdfUrl}
//           target={gen?.pdfUrl && "_blank"}
//           className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-md font-black transition-all shadow-lg ${
//             gen?.pdfUrl
//               ? "bg-white text-black hover:bg-indigo-600 hover:text-white"
//               : "bg-white/5 text-gray-700 cursor-not-allowed"
//           }`}
//         >
//           <FaFilePdf className="text-read-500" size={24} /> View PDF
//         </a>

//         <Link target="_blank" href={`/generation-details/${gen?.id}`}>
//           <button className="cursor-pointer flex items-center justify-center gap-2 py-3.5 px-10 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-2xl   font-black transition-all">
//             <ExternalLink size={24} /> Details
//           </button>
//         </Link>
//       </div>
//     </motion.div>
//   );
// }


"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FileText,
  University,
  User,
  ExternalLink,
  Search,
  Sparkles,
  Loader2,
  ArrowRight,
  FileSearch,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { FaFilePdf } from "react-icons/fa6";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function MyGenerations({ generations }: { generations: any }) {
  const [searchQuery, setSearchQuery] = useState("");
  const loading = !generations;

  const filtered = generations?.filter((gen: any) =>
    gen?.topic?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    gen?.universityName?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-20 bg-white text-black selection:bg-primary/20">
      <header className="bg-slate-50 border-b border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="p-3 bg-primary rounded-xl shadow-lg shadow-primary/20">
              <FileSearch size={28} className="text-white" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
          >
            Document Library
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 text-xl max-w-2xl mb-12"
          >
            Manage, edit, and export all your AI-generated documents and university assignments in one place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative w-full max-w-xl group"
          >
            <Search
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
              size={24}
            />
            <input
              type="text"
              placeholder="Search by topic or institution..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl pl-14 pr-6 py-5 text-xl focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/10 transition-all placeholder:text-slate-300"
            />
          </motion.div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32"
            >
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="mt-6 text-slate-500 font-bold text-xl">
                Fetching your documents...
              </p>
            </motion.div>
          ) : filtered?.length > 0 ? (
            <motion.div
              key="grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered?.map((gen: any) => (
                <GenerationCard key={gen?.id} gen={gen} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[40px]"
            >
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 text-slate-300">
                <Sparkles size={40} />
              </div>
              <h2 className="text-3xl font-black mb-4">No documents found</h2>
              <p className="text-slate-500 text-xl mb-10">
                You haven't generated any documents matching this criteria.
              </p>
              <Link
                href="/tools"
                className="px-10 py-4 bg-primary hover:bg-indigo-700 text-white rounded-xl font-black text-xl transition-all inline-flex items-center gap-3 shadow-lg shadow-primary/20 cursor-pointer"
              >
                Create Now <ArrowRight size={24} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function GenerationCard({ gen }: { gen: any }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5 }}
      className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-100 border border-slate-200 rounded-full">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-black text-slate-600 uppercase tracking-wider">
            {gen?.status || "READY"}
          </span>
        </div>
        <div className="text-slate-300 group-hover:text-primary transition-colors">
          <FileText size={24} />
        </div>
      </div>

      <div className="flex-1 space-y-4">
        <h3 className="text-2xl font-black text-black leading-tight line-clamp-2 transition-colors group-hover:text-primary">
          {gen?.topic || "Untitled Generation"}
        </h3>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-3 text-slate-500">
            <University size={20} className="text-primary/60" />
            <span className="text-lg font-medium truncate">
              {gen?.universityName || "Standard Format"}
            </span>
          </div>
          <div className="flex items-center gap-3 text-slate-500">
            <User size={20} className="text-secondary/60" />
            <span className="text-lg font-medium truncate">
              To: {gen?.submittedTo || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <div className="my-8 h-px w-full bg-slate-100" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <span className="text-slate-400 font-bold uppercase tracking-tight mb-1">
            Blocks
          </span>
          <span className="text-lg font-black text-black">
            {gen?.sections?.length || 0} Units
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-slate-400 font-bold uppercase tracking-tight mb-1">
            Date
          </span>
          <span className="text-lg font-black text-black">
            {gen?.createdAt ? format(new Date(gen.createdAt), "dd MMM") : "N/A"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 relative z-10">
        <Link
          href={gen?.pdfUrl || "#"}
          target={gen?.pdfUrl ? "_blank" : undefined}
          className={`flex items-center justify-center gap-2 py-4 rounded-xl text-lg font-bold transition-all text-white ${
            gen?.pdfUrl
              ? "bg-primary hover:bg-primary"
              : "bg-slate-300 text-slate-500 cursor-not-allowed"
          }`}
        >
          <FaFilePdf size={20} className={gen?.pdfUrl ? "text-white group-hover:text-white" : ""} /> View PDF
        </Link>

        <Link target={'_blank'} href={`/generation-details/${gen?.id}`}>
          <button className="w-full cursor-pointer flex items-center justify-center gap-2 py-4 bg-slate-100 hover:bg-secondary hover:text-white text-black rounded-xl text-lg font-bold transition-all">
            <ExternalLink size={20} /> Details
          </button>
        </Link>
      </div>
    </motion.div>
  );
}
