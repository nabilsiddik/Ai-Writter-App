import { Sparkles, FileUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-slate-50 py-20 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
          Ai Content Writter will help you to write Ai content in different sector.
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          It will help you with CV/Resume Writting, Ecommerce Product Writting, University Assignment Writting, SEO Friendly Blog Writting, Text Summarizer and so on.
        </p>
        
        <div className="flex justify-center">
            <button className="bg-primary hover:bg-indigo-700 text-white px-10 py-5 rounded-xl text-2xl font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
            <Sparkles size={28} />
            View All Tools
          </button>
        </div>
      </div>
    </section>
  );
}