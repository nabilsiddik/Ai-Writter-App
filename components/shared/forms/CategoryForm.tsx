'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { createCategory, updateCategory } from '@/services/category/categoryManagement';

interface CategoryFormProps {
  initialData?: any;
  onCancel: () => void;
  onSuccess: () => void;
}

export function CategoryForm({ initialData, onCancel, onSuccess }: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(initialData?.icon || null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    if (iconFile) {
      formData.append("icon", iconFile);
    }

    try {
      const result = initialData?.id 
        ? await updateCategory(initialData.id, null, formData)
        : await createCategory(null, formData);

      if (result.success) {
        toast.success(initialData ? 'ক্যাটেগরি আপডেট হয়েছে' : 'নতুন ক্যাটেগরি যোগ হয়েছে');
        onSuccess();
      } else {
        toast.error(result?.message || 'ত্রুটি দেখা দিয়েছে');
      }
    } catch (error) {
      toast.error('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIconFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="max-w-2xl mx-auto bg-white p-10 md:p-14 rounded-[50px] border border-slate-100 shadow-2xl space-y-10 relative overflow-hidden"
    >
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl opacity-50" />
      
      <div className="relative z-10 text-center space-y-2">
        <h3 className="text-3xl font-black text-slate-900 leading-tight">
          {initialData ? 'ক্যাটেগরি সংশোধন করুন' : 'নতুন ক্যাটেগরি যোগ করুন'}
        </h3>
        <p className="text-slate-400 text-sm font-medium">আপনার পণ্যের শপকে আরও গোছানো করতে ক্যাটেগরি ম্যানেজ করুন</p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
        
        {/* Modern Icon Uploader */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">ক্যাটেগরি আইকন বা ইমেজ</label>
          <div className={cn(
            "relative rounded-[32px] border-2 border-dashed border-slate-200 h-48 flex items-center justify-center transition-all overflow-hidden group",
            preview ? "bg-white border-solid" : "bg-slate-50 hover:border-brand-orange hover:bg-brand-orange/[0.02]"
          )}>
            {preview ? (
              <div className="relative w-full h-full p-3">
                <img src={preview} alt="Icon Preview" className="w-full h-full object-contain rounded-[24px]" />
                <button 
                  type="button"
                  onClick={() => { setPreview(null); setIconFile(null); }}
                  className="absolute top-4 right-4 p-2.5 bg-rose-500 text-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-brand-orange mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-slate-600">ক্লিক করে ছবি আপলোড করুন</p>
                <p className="text-[10px] text-slate-400 mt-1">JPG, PNG (Max 2MB)</p>
                <input type="file" name="icon" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">ক্যাটেগরির নাম</label>
            <input 
              name="name"
              type="text" 
              defaultValue={initialData?.name}
              placeholder="যেমন: সুস্বাদু হিমসাগর" 
              className="admin-input-luxury-field" 
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">সংক্ষিপ্ত বর্ণনা</label>
            <textarea 
              name="description"
              defaultValue={initialData?.description}
              placeholder="ক্যাটেগরি সম্পর্কে ছোট করে লিখুন..." 
              className="admin-input-luxury-field min-h-[120px] resize-none py-5" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4 border-t border-slate-50">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-primary text-white py-5 rounded-[24px] font-black shadow-xl shadow-brand-orange/20 hover:bg-brand-orange-deep hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : (initialData ? 'ক্যাটেগরি আপডেট করুন' : 'ক্যাটেগরি সম্পন্ন করুন')}
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="px-10 py-5 rounded-[24px] font-black text-white bg-black hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            বাতিল
          </button>
        </div>
      </form>

      <style jsx>{`
        .admin-input-luxury-field {
          width: 100%;
          padding: 1.1rem 1.5rem;
          background-color: #F8FAFC;
          border: 2px solid #F1F5F9;
          border-radius: 1.5rem;
          font-size: 0.875rem;
          color: #1e293b;
          font-weight: 700;
          transition: all 0.3s ease;
        }
        .admin-input-luxury-field:focus {
          outline: none;
          border-color: #F27D26;
          background-color: white;
          box-shadow: 0 10px 30px rgba(242, 125, 38, 0.08);
        }
      `}</style>
    </motion.div>
  );
}