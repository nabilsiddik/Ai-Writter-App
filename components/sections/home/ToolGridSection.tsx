import { ToolCard } from "@/components/shared/cards/ToolCard";
import {
  FileText,
  UserCircle,
  ShoppingBag,
  Globe,
  Mail,
  BookOpen,
  PenTool,
  Layout,
} from "lucide-react";
import Image from "next/image";

const tools = [
  {
    title: "AI Assignment",
    icon: (
      <Image
        src={"/images/icon/tools/graduate.png"}
        alt="AI Assignment"
        width={60}
        height={60}
      />
    ),
    href: "/tools/assignment-writter",
    isNew: true,
  },
  {
    title: "Ecommerce Content",
    icon: (
      <Image
        src={"/images/icon/tools/ecommerce.png"}
        alt="Ecommerce Content"
        width={60}
        height={60}
      />
    ),
    href: "/tools/woocommerce-product-writter",
    isNew: true,
  },
  {
    title: "AI Resume",
    icon: (
      <Image
        src={"/images/icon/tools/resume.png"}
        alt="AI Resume"
        width={60}
        height={60}
      />
    ),
    href: "/tools/resume-writter",
  },
  {
    title: "SEO Blog",
    icon: (
      <Image
        src={"/images/icon/tools/blog.png"}
        alt="SEO Blog"
        width={60}
        height={60}
      />
    ),
    href: "/tools/blog-writter",
  },
  {
    title: "Email Writer",
    icon: (
      <Image
        src={"/images/icon/tools/mail.png"}
        alt="Email Writer"
        width={60}
        height={60}
      />
    ),
    href: "/tools/email-writter",
  },
  {
    title: "Lab Report",
    icon: (
      <Image
        src={"/images/icon/tools/research.png"}
        alt="Lab Report"
        width={60}
        height={60}
      />
    ),
    href: "/tools/lab-report-writter",
  },
  {
    title: "Cover Letter",
    icon: (
      <Image
        src={"/images/icon/tools/cover-letter.png"}
        alt="AI Assignment"
        width={60}
        height={60}
      />
    ),
    href: "/tools/cover-letter-writter",
  },
  {
    title: "Summarizer",
    icon: (
      <Image
        src={"/images/icon/tools/summary.png"}
        alt="AI Assignment"
        width={60}
        height={60}
      />
    ),
    href: "/tools/summarizer",
  },
];

export default function ToolGrid({ heading = true }: { heading?: boolean }) {
  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      {heading && (
        <div className="mb-10 border-b border-slate-200 pb-4">
          <h2 className="text-3xl lg:text-5xl font-black text-center mb-5">
            Popular AI tools
          </h2>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tools.map((tool, i) => (
          <ToolCard key={i} {...tool} />
        ))}
      </div>
    </section>
  );
}
