import { ToolCard } from "@/components/shared/cards/ToolCard";
import { FileText, UserCircle, ShoppingBag, Globe, Mail, BookOpen, PenTool, Layout } from "lucide-react";

const tools = [
  { title: "AI Assignment", icon: <FileText size={40} />, href: "/tools/assignment-writter" },
  { title: "AI Resume", icon: <UserCircle size={40} />, href: "/tools/resume-writter" },
  { title: "Ecommerce Content", icon: <ShoppingBag size={40} />, href: "/tools/woocommerce-product-writter" },
  { title: "SEO Blog", icon: <Globe size={40} />, href: "/tools/blog-writter", isNew: true },
  { title: "Email Writer", icon: <Mail size={40} />, href: "/tools/email-writter" },
  { title: "Lab Report", icon: <BookOpen size={40} />, href: "/tools/lab-report-writter" },
  { title: "Cover Letter", icon: <PenTool size={40} />, href: "/tools/cover-letter-writter" },
  { title: "Summarizer", icon: <Layout size={40} />, href: "/tools/summarizer" },
];

export default function ToolGrid({heading = true}: {
  heading: boolean
}) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {heading && <div className="mb-10 border-b border-slate-200 pb-4">
        <h2 className="text-xl font-black">
          Popular AI tools
        </h2>
      </div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <ToolCard key={i} {...tool} />
        ))}
      </div>
    </section>
  );
}