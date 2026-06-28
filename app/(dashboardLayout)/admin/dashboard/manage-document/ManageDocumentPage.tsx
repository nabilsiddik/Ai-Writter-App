"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FileText, 
  Trash2, 
  Eye, 
  Zap, 
  Layers,
  ShoppingBag,
  UserCheck,
  Globe,
  ExternalLink,
  Search
} from "lucide-react";
import { format } from "date-fns";
import TableToolbar from "@/components/shared/tables/TaleToolbar";
import TablePagination from "@/components/shared/tables/TablePagination";

export default function ManageDocumentsPage({ docRes }: { docRes: any }) {
  const documents = docRes?.data || [];
  const meta = docRes?.meta;
  

  const docFilters = [
    {
      key: "docType",
      label: "Document Type",
      options: [
        { label: "Assignment", value: "ASSIGNMENT" },
        { label: "Product Desc", value: "PRODUCT_DESC" },
        { label: "Resume", value: "RESUME" },
        { label: "SEO Blog", value: "BLOG_SEO" },
      ]
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Generated", value: "GENERATED" },
        { label: "Completed", value: "COMPLETED" },
        { label: "Failed", value: "FAILED" },
      ]
    }
  ];

  const getDocTypeIcon = (type: string) => {
    switch (type) {
      case "ASSIGNMENT": return <Layers className="text-orange-500" size={24} />;
      case "PRODUCT_DESC": return <ShoppingBag className="text-purple-500" size={24} />;
      case "RESUME": return <UserCheck className="text-blue-500" size={24} />;
      case "BLOG_SEO": return <Globe className="text-emerald-500" size={24} />;
      default: return <FileText className="text-slate-400" size={24} />;
    }
  };

  return (
    <div className="pb-20">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">AI Archive</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">Monitoring all machine-generated content and token expenditures.</p>
        </div>
      </header>

      <TableToolbar placeholder="Search by topic or author..." filterOptions={docFilters} />

      <div className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Document Topic</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Author & Type</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Token Burn</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Financials</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents?.map((doc: any, index: number) => (
                <motion.tr 
                  key={doc?.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="p-8 max-w-md">
                    <div className="flex items-start gap-5">
                      <div className="mt-1 p-3 bg-white border border-slate-100 rounded-xl shadow-sm group-hover:border-primary transition-colors">
                        {getDocTypeIcon(doc?.docType)}
                      </div>
                      <div>
                        <p className="text-xl font-black text-black mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {doc?.topic}
                        </p>
                        <div className="flex items-center gap-2 text-slate-400 font-bold text-base">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[12px] text-slate-500 uppercase">{doc?.docType}</span>
                          <span>•</span>
                          <span>{format(new Date(doc?.createdAt), "MMM dd, hh:mm a")}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-8">
                    <p className="text-lg font-bold text-slate-700">{doc?.user?.email || "Unknown User"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${doc?.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-orange-400'}`} />
                      <span className="text-base font-black text-slate-400 uppercase tracking-tighter">{doc?.status}</span>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="flex items-center gap-2">
                       <Zap size={18} className="text-primary" />
                       <span className="text-xl font-black text-black">{doc?.totalTokens?.toLocaleString()}</span>
                    </div>
                    <p className="text-base text-slate-400 font-medium mt-1">
                      In: {doc?.inputTokens} | Out: {doc?.outputTokens}
                    </p>
                  </td>

                  <td className="p-8">
                    <div className="flex flex-col">
                       <span className="text-xl font-black text-emerald-600">
                        ${doc?.costInUSD?.toFixed(4)}
                       </span>
                       <span className="text-base font-bold text-slate-300 italic">API Cost</span>
                    </div>
                  </td>

                  <td className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <button 
                        title="Review Content"
                        className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer"
                        onClick={() => window.open(`/generation-details/${doc.id}`, '_blank')}
                      >
                        <Eye size={20} />
                      </button>
                      {doc?.pdfUrl && (
                        <a 
                          href={doc.pdfUrl} 
                          target="_blank" 
                          className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-emerald-500 hover:text-white transition-all cursor-pointer"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {documents?.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Search size={40} />
            </div>
            <p className="text-2xl font-bold text-slate-300 italic">No AI generations found in the archive.</p>
          </div>
        )}
      </div>

      <TablePagination meta={meta} />
    </div>
  );
}