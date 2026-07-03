// "use client";

// import { motion, Variants } from "framer-motion";
// import {
//   University,
//   User,
//   Download,
//   ExternalLink,
//   Sparkles,
// } from "lucide-react";
// import { format } from "date-fns";
// import Link from "next/link";

// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 30, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 100, damping: 15 },
//   },
// };

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
//             <span className="text-sm font-medium truncate">
//               {gen?.universityName || "General Template"}
//             </span>
//           </div>
//           <div className="flex items-center gap-3 text-gray-400">
//             <User size={16} className="text-purple-500/70" />
//             <span className="text-sm font-medium">
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
//           <span className="text-sm font-bold text-white">
//             {gen?.sections?.length || 0} AI Blocks
//           </span>
//         </div>
//         <div className="flex flex-col text-right">
//           <span className="text-[10px] text-gray-600 uppercase font-black tracking-widest mb-1">
//             Created
//           </span>
//           <span className="text-sm font-bold text-white">
//             {gen?.createdAt ? format(new Date(gen.createdAt), "dd MMM") : "N/A"}
//           </span>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="grid grid-cols-2 gap-3 relative z-10">
//         <a
//           href={gen?.pdfUrl || "#"}
//           target="_blank"
//           className={`flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs font-black transition-all shadow-lg ${
//             gen?.pdfUrl
//               ? "bg-white text-black hover:bg-indigo-600 hover:text-white"
//               : "bg-white/5 text-gray-700 cursor-not-allowed"
//           }`}
//         >
//           <Download size={14} /> Download
//         </a>
//         <Link target="_blank" href={`/generation-details/${gen?.id}`}>
//           <button className="cursor-pointer flex items-center justify-center gap-2 py-3.5 bg-white/[0.05] border border-white/10 hover:bg-white/10 text-white rounded-2xl text-xs font-black transition-all">
//           <ExternalLink size={14} /> Details
//         </button>
//         </Link>
//       </div>
//     </motion.div>
//   );
// }

// export default GenerationCard

// components/home/ToolCard.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface ToolCardProps {
  title: string;
  icon: React.ReactNode;
  href: string;
  isNew?: boolean;
}

export const ToolCard = ({ title, icon, href, isNew }: ToolCardProps) => {
  return (
    <Link href={href} target="_blank">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -5 }}
        className="relative bg-white border border-slate-200 rounded-xl p-8 flex flex-col items-center text-center cursor-pointer shadow-sm hover:shadow-md transition-all"
      >
        {isNew && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold uppercase">
            New
          </span>
        )}
        <div className="mb-4 text-primary transition-transform group-hover:scale-110">
          {icon}
        </div>
        <Link
          href={href}
          className="text-xl font-bold text-black hover:text-primary transition-colors"
        >
          {title}
        </Link>
      </motion.div>
    </Link>
  );
};
