import AssignmentForm from '@/components/forms/AssignmentForm';
import PageHeader from '@/components/shared/PageHeader'
import { FileText, Globe, UserCheck } from 'lucide-react';

const TOOL_CONFIG: any = {
  assignment: {
    title: "Assignment Writer",
    description: "Submit world-class academic papers with automated cover pages and verified citations.",
    badge: "Academic Excellence",
    icon: <FileText size={48} className="text-orange-500" />,
    banner: "/images/tools/graduation.jpg",
  },
  resume: {
    title: "Resume Builder",
    description: "Engineer a professional CV that bypasses ATS filters and captures recruiter attention.",
    badge: "Career Growth",
    icon: <UserCheck size={48} className="text-blue-500" />,
    banner: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop", // Professional in suit
  },
  "blog-seo": {
    title: "SEO Article Agent",
    description: "Generate high-ranking long-form content optimized for modern search algorithms.",
    badge: "Marketing Power",
    icon: <Globe size={48} className="text-emerald-500" />,
    banner: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop", // Minimal desk with laptop
  }
};

const AssignmentPageContent = () => {
  return (
    <div>
      <PageHeader title={'Assignment Writer'}
        description={"Submit world-class academic assignments with automated cover pages and verified citations."}
        bannerImage={"/images/tools/graduation.jpg"}
      />
      <AssignmentForm/>
    </div>
  )
}

export default AssignmentPageContent