'use client'

import { Sparkles, FileUp, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/downloads/latest/chrome-mv3-dev.zip";
    link.download = "DroppEcommerce.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  return (
    <section className="bg-slate-50 py-10 px-6 border-b border-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-10 flex items-center justify-center">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/0QH8vEmWoRE?si=QmukB7V8GGd8Zdbh" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-6 text-black tracking-tight">
          Ai Content Writter will help you to write Ai content in different
          sector.
        </h1>
        <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed">
          It will help you with CV/Resume Writting, Ecommerce Product Writting,
          University Assignment Writting, SEO Friendly Blog Writting, Text
          Summarizer and so on.
        </p>

        <div className="flex justify-center gap-5 flex-wrap">
          <Link href="/tools">
            <button className="bg-primary text-white hover:bg-transparent hover:text-primary px-7 py-4 border-2 border-primary rounded-xl text-lg md:text-xl font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
              <Sparkles size={28} />
              View All Tools
            </button>
          </Link>

          <button onClick={handleDownload} className="bg-transparent hover:bg-primary hover:text-white text-primary border-2 border-primary px-7 py-4 rounded-xl text-lg md:text-xl font-bold flex items-center gap-3 transition-all cursor-pointer shadow-lg shadow-primary/20">
            <Download size={28} />
            Download Extension
          </button>
        </div>
      </div>
    </section>
  );
}
