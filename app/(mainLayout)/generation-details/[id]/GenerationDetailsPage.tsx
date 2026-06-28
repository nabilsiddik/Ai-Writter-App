"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  University,
  ChevronLeft,
  Sparkles,
  Loader2,
  Layers,
  CheckCircle2,
  Hash,
  File,
  X,
  FileText,
  ShoppingBag,
  Globe,
  Key,
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
import { FcGoogle } from "react-icons/fc";
import { googleLogin } from "@/services/auth/userLogin";

const slideUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 10 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.4, 
      ease: "easeOut" // Now TypeScript knows this is a valid Framer Motion ease
    } 
  },
};

export default function GenerationDetails({ genDetails, wooStore }: { genDetails: any, wooStore: any }) {
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isWooModalOpen, setIsWooModalOpen] = useState(false);

  const [document, setDocument] = useState<any>(genDetails);
  const [editableSections, setEditableSections] = useState<any[]>(genDetails?.sections || []);
  
  const [wooData, setWooData] = useState({
    storeUrl: "",
    consumerKey: "",
    consumerSecret: ""
  });

  const [formData, setFormData] = useState({
    regularPrice: "",
    salePrice: "",
    stock: "",
    category: "",
  });

  useEffect(() => {
    if (genDetails) {
      setDocument(genDetails);
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
    if (!document?.id) return toast.error("Document ID missing");
    setIsGenerating(true);
    try {
      const result = await generatePDF(document?.id, { sections: editableSections });
      if (result?.success && result?.data?.url) {
        window.open(result.data.url, "_blank");
      } else {
        toast.error(result?.message || "Generation failed.");
      }
    } catch (err) { toast.error("PDF Generation Error"); }
    finally { setIsGenerating(false); }
  };

  const handleOpenInGoogleDoc = async () => {
    if (!document?.id) return toast.error("Document ID missing");
    setIsGenerating(true);
    try {
      const result = await openInGoogleDoc(document?.id, { sections: editableSections });
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
    if (!document?.id) return toast.error("Document ID missing");
    setIsGenerating(true);
    try {
      const blob = await exportMsDocx(document?.id, { sections: editableSections });
      if (blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${document?.topic || "Document"}.docx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("Word document downloaded!");
      }
    } catch (err) { toast.error("Word Export Error"); }
    finally { setIsGenerating(false); }
  };

  const handleUploadToWoocommerce = async () => {
    if (!document?.id) return toast.error("Document ID missing");
    if (!formData.regularPrice || !formData.stock) return toast.error("Please fill in Price and Stock");
    setIsGenerating(true);
    try {
      const result = await publishToWoocommerce(document?.id, {
        sections: editableSections,
        ...formData
      });
      if (result?.success) {
        toast.success("Synced to Store Drafts!");
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
    } catch (err) { toast.error("Auth Error"); }
  };

  const handleConnectWoocommerce = async () => {
    if (!wooData.storeUrl || !wooData.consumerKey || !wooData.consumerSecret) {
      return toast.error("Required fields missing");
    }
    setIsConnecting(true);
    try {
      const result = await connectWooCommerceStore(wooData);
      if (result?.success) {
        toast.success("WooCommerce Connected!");
        setIsWooModalOpen(false);
      } else {
        toast.error(result?.message || "Connection failed.");
      }
    } catch (err) { toast.error("Network error"); }
    finally { setIsConnecting(false); }
  };

  const inputStyles = "w-full bg-white border-2 border-slate-100 rounded-xl px-6 py-4 text-lg text-black placeholder:text-slate-300 focus:outline-none focus:border-primary transition-all";
  const labelStyles = "text-base font-black text-slate-600 mb-3 block ml-1";

  return (
    <div className="min-h-screen mt-20 bg-white text-black font-sans selection:bg-primary/10">
      
      <AnimatePresence>
        {isGoogleModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsGoogleModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-12 shadow-2xl overflow-hidden text-center">
              <FcGoogle size={64} className="mx-auto mb-8" />
              <h2 className="text-3xl font-black mb-4">Google Access Required</h2>
              <p className="text-slate-500 text-xl leading-relaxed mb-10">Grant permission to save documents directly to your Google Workspace.</p>
              <button onClick={handleGoogleLogin} className="w-full py-5 bg-primary text-white rounded-xl font-bold text-xl hover:bg-indigo-700 transition-all cursor-pointer">Connect Google Account</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isWooModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => !isConnecting && setIsWooModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-[32px] p-10 shadow-2xl overflow-hidden">
              <button onClick={() => setIsWooModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black cursor-pointer"><X size={28} /></button>
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-2xl"><ShoppingBag className="text-primary" size={32} /></div>
                <div>
                  <h2 className="text-2xl font-black">Connect Store</h2>
                  <p className="text-slate-500 text-lg font-medium">Link your WooCommerce marketplace</p>
                </div>
              </div>
              <div className="space-y-6 mb-10">
                <div><label className={labelStyles}>Store URL</label><input className={inputStyles} placeholder="https://yourstore.com" value={wooData.storeUrl} onChange={(e) => setWooData({...wooData, storeUrl: e.target.value})} /></div>
                <div><label className={labelStyles}>Consumer Key</label><input className={inputStyles} placeholder="ck_xxxxxxxx" value={wooData.consumerKey} onChange={(e) => setWooData({...wooData, consumerKey: e.target.value})} /></div>
                <div><label className={labelStyles}>Consumer Secret</label><input type="password" className={inputStyles} placeholder="cs_xxxxxxxx" value={wooData.consumerSecret} onChange={(e) => setWooData({...wooData, consumerSecret: e.target.value})} /></div>
              </div>
              <button onClick={handleConnectWoocommerce} disabled={isConnecting} className="w-full py-5 bg-primary text-white rounded-xl font-bold text-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-primary/20">
                {isConnecting ? <Loader2 className="animate-spin" size={24} /> : <CheckCircle2 size={24} />}
                {isConnecting ? "Verifying..." : "Authorize Integration"}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="bg-slate-50 border-b border-slate-200 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black tracking-tight mb-2">Review & Export</h1>
            <p className="text-slate-500 text-xl font-medium">Refine your document and choose a professional format.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={handleExportInPDF} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <FaFilePdf className="text-red-500" size={20} />} Export PDF
            </button>
            <button onClick={handleOpenInGoogleDoc} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              <File size={20} className="text-blue-500" /> Open Google Docs
            </button>
            <button onClick={handleExportInMsWord} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              <FileText size={20} className="text-indigo-600" />Export MS Word
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-12">
          <button onClick={() => router.push("/my-generations")} className="flex items-center gap-2 text-slate-400 hover:text-black font-bold transition-all cursor-pointer">
            <ChevronLeft size={24} /> My Library
          </button>
          <div className="h-4 w-px bg-slate-200" />
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-primary font-black text-sm uppercase tracking-widest border border-slate-200">
            <Sparkles size={14} /> {document?.docType}
          </div>
        </div>

        <motion.section variants={slideUp} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 bg-slate-100 p-10 rounded-3xl border border-slate-300">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl lg:text-3xl font-black leading-tight text-slate-900">{document?.topic}</h2>
            {document?.docType === 'ASSIGNMENT'
              && <div className="flex flex-wrap gap-8">
              {document?.universityName && <div className="flex items-center gap-3 text-slate-600 font-bold"><University size={22} className="text-slate-400" /> {document.universityName}</div>}
              <div className="flex items-center gap-3 text-slate-600 font-bold"><Layers size={22} className="text-slate-400" /> Sec {document?.section || "N/A"}</div>
              <div className="flex items-center gap-3 text-slate-600 font-bold"><Hash size={22} className="text-slate-400" /> Intake {document?.intake || "N/A"}</div>
            </div>
            }
          </div>
          {document?.docType === 'ASSIGNMENT' 
           && <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
            <div className="space-y-1"><p className="font-bold ">Submitted By</p><p className="text-xl font-black">{document?.submittedBy}</p></div>
            <div className="space-y-1"><p className="font-bold ">Created On</p><p className="text-xl font-black text-slate-700">{document?.createdAt ? new Date(document?.createdAt).toLocaleDateString() : "N/A"}</p></div>
          </div>
          }
        </motion.section>

        <section className="space-y-8 mb-24">
          <div className="flex items-center gap-4 mb-6"><h3 className="text-xl font-black">Document Sections</h3><div className="h-px flex-1 bg-slate-100" /></div>
          <div className="grid gap-8">
            {editableSections?.map((sec: any, idx: number) => (
              <motion.div key={idx} variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden hover:shadow-lg transition-all">
                <div className="bg-slate-50/50 p-8 border-b border-slate-100"><input className="w-full bg-transparent text-xl lg:text-2xl font-black text-black focus:outline-none" value={sec?.topic || ""} onChange={(e) => handleSectionUpdate(idx, "topic", e.target.value)} /></div>
                <div className="p-8"><textarea rows={5} className="w-full bg-transparent text-xl text-slate-600 leading-relaxed focus:outline-none resize-none" value={sec?.content || ""} onChange={(e) => handleSectionUpdate(idx, "content", e.target.value)} /></div>
              </motion.div>
            ))}
          </div>
        </section>

        {document?.docType === 'PRODUCT_DESC' && (
          <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-24 p-12 bg-slate-50 border border-slate-200 rounded-[40px] shadow-sm">
            <div className="flex items-center gap-4 mb-10"><ShoppingBag className="text-emerald-600" size={32} /><h3 className="text-xl lg:text-2xl font-black uppercase tracking-tight">Marketplace Settings</h3></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div><label className={labelStyles}>Regular Price (৳)</label><input type="number" className={inputStyles} placeholder="0.00" value={formData.regularPrice} onChange={(e) => setFormData({...formData, regularPrice: e.target.value})} /></div>
              <div><label className={labelStyles}>Sale Price</label><input type="number" className={inputStyles} placeholder="0.00" value={formData.salePrice} onChange={(e) => setFormData({...formData, salePrice: e.target.value})} /></div>
              <div><label className={labelStyles}>Stock Level</label><input type="number" className={inputStyles} placeholder="0" value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} /></div>
              {/* <div><label className={labelStyles}>Category ID</label><input type="text" className={inputStyles} placeholder="Sync ID" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} /></div> */}
            </div>
            {wooStore?.success ? (
              <button onClick={handleUploadToWoocommerce} disabled={isGenerating} className="w-full py-6 bg-emerald-600 text-white rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-emerald-600/20">
                {isGenerating ? <Loader2 className="animate-spin" /> : <ShoppingBag size={24} />} Upload to WooCommerce
              </button>
            ) : (
              <button onClick={() => setIsWooModalOpen(true)} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-bold text-xl hover:bg-black transition-all flex items-center justify-center gap-3 cursor-pointer">
                <Key size={24} /> Setup Store Integration
              </button>
            )}
          </motion.section>
        )}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-center bg-slate-50 border border-slate-200 p-16 rounded-[48px]">
          <h2 className="text-3xl font-black mb-4">Review & Export</h2>
          <p className="text-slate-500 text-xl mb-10 font-medium">Refine your document and choose a professional format.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={handleExportInPDF} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <FaFilePdf className="text-red-500" size={20} />} Export PDF
            </button>
            <button onClick={handleOpenInGoogleDoc} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              <File size={20} className="text-blue-500" /> Open Google Docs
            </button>
            <button onClick={handleExportInMsWord} disabled={isGenerating} className="flex items-center gap-3 px-6 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:shadow-md transition-all cursor-pointer">
              <FileText size={20} className="text-indigo-600" />Export MS Word
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}