'use client'

import { Plus, X } from "lucide-react";
import { useState } from "react";

export function MultiFileUploader({ label, onChange }: { label: string, onChange: (files: File[]) => void }) {
  const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const newPreviews = selectedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    const updated = [...previews, ...newPreviews];
    setPreviews(updated);
    onChange(updated.map(p => p.file));
  };

  const removeFile = (index: number) => {
    const updated = previews.filter((_, i) => i !== index);
    setPreviews(updated);
    onChange(updated.map(p => p.file));
  };

  return (
    <div className="space-y-4">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">{label}</label>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {previews.map((item, idx) => (
          <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-100 group shadow-sm">
            <img src={item.url} className="w-full h-full object-cover" alt="preview" />
            <button 
              type="button" 
              onClick={() => removeFile(idx)}
              className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute bottom-0 inset-x-0 bg-black/40 p-2 backdrop-blur-sm">
              <p className="text-[8px] text-white font-bold truncate">{item.file.name}</p>
              <p className="text-[7px] text-white/70">{(item.file.size / 1024).toFixed(1)} KB</p>
            </div>
          </div>
        ))}
        
        <label className="aspect-square rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center cursor-pointer hover:border-brand-orange transition-all">
          <Plus className="w-6 h-6 text-slate-400" />
          <span className="text-[10px] font-bold text-slate-400 mt-2">ছবি যোগ করুন</span>
          <input type="file" multiple className="hidden" accept="image/*" onChange={handleFileChange} />
        </label>
      </div>
    </div>
  );
}