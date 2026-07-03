import { Sparkles, FileUp, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-slate-50 py-20 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black mb-6 text-black tracking-tight">
          Ai Content Writter will help you to write Ai content in different
          sector.
        </h1>
        <p className="text-xl text-slate-600 mb-10 leading-relaxed">
          It will help you with CV/Resume Writting, Ecommerce Product Writting,
          University Assignment Writting, SEO Friendly Blog Writting, Text
          Summarizer and so on.
        </p>

        <div className="flex justify-center gap-5 flex-wrap">
          <Link href="/tools">
            <button className="bg-primary text-white hover:bg-transparent hover:text-primary px-8 py-5 border-2 border-primary rounded-xl text-xl font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
              <Sparkles size={28} />
              View All Tools
            </button>
          </Link>

          <button className="bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-5 rounded-xl text-2xl font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
            <Download size={28} />
            Download Extension
          </button>
        </div>
      </div>
    </section>
  );
}
