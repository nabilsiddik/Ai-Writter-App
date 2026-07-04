"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  FileText,
  GraduationCap,
  Send,
  Download,
  Edit3,
  CheckCircle2,
  Loader2,
  ChevronRight,
} from "lucide-react";
import { generateAssignment, generatePdf } from "@/services/ai/projectAnalyser";
import { toast } from "sonner";
import Link from "next/link";
import { generateContent } from "@/services/generation";

// --- Types ---
type Section = {
  topic: string;
  content: string;
};

type AssignmentMetadata = {
  universityName: string;
  topic: string;
  submittedBy: string;
  submittedTo: string;
  section: string;
  intake: string;
  assignmentNo: string;
  date: string;
};

export default function HomePageContent({ user }: { user: any }) {
  const [step, setStep] = useState<"hero" | "form" | "editing" | "result">(
    "hero",
  );
  const [loading, setLoading] = useState(false);
  const [assignmentId, setAssignmentId] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [pdfUrl, setPdfUrl] = useState("");

  const [formData, setFormData] = useState<AssignmentMetadata>({
    universityName: "",
    topic: "",
    submittedBy: "",
    submittedTo: "",
    section: "",
    intake: "",
    assignmentNo: "",
    date: new Date().toLocaleDateString(),
  });

  const handleGenerateAIContent = async () => {
    setLoading(true);
    try {
      const res = await generateContent(formData);
      const data = res?.data;

      if (res?.success) {
        toast.success("Your Assignment Content Generated.");
      } else {
        toast.error("Assignment Content Generation Failed");
      }

      setAssignmentId(data?.id);
      setSections(data?.sections);
      setStep("editing");
    } catch (err) {
      alert("Error generating content");
    } finally {
      setLoading(false);
    }
  };

  const handleFinalizePDF = async () => {
    setLoading(true);
    try {
      // Step 2: Call your /generate-pdf API
      const res = await generatePdf(assignmentId, {
        sections,
      });

      if (res?.success) {
        toast.success("Generated");

        if (res?.data) {
          const data = res?.data;
          setPdfUrl(data?.url);
          setStep("result");
        }
      } else {
        toast.error("Failed");
      }
    } catch (err) {
      alert("Error generating PDF");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white text-white selection:bg-indigo-500/30 font-sans">
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-32">
        
      </main>
    </div>
  );
}
