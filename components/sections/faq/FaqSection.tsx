"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Plus, Minus } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    question: "Is the AI-generated content original and plagiarism-free?",
    answer: "Yes, our engine uses Claude 3.5 Sonnet to generate unique content for every request. Unlike templates, the AI drafts the assignment or product description in real-time based on your specific prompts and instructions.",
  },
  {
    question: "Can I edit the content before downloading the PDF or Word file?",
    answer: "Absolutely. After the AI completes the generation, you are redirected to a professional editor where you can tweak, add, or remove any text. Once you are happy with the changes, you can export the final document.",
  },
  {
    question: "How do the university templates work?",
    answer: "When you select the Assignment tool, you provide your university name. Our system automatically formats a professional cover page with standard academic alignment, including your department, intake, and submission details.",
  },
  {
    question: "Is my data and document history secure?",
    answer: "We prioritize your privacy. Your documents are stored securely in your private library. We do not use your generated content to train public AI models, and you have full control to delete your documents at any time.",
  },
  {
    question: "Can I connect my WooCommerce store to upload products directly?",
    answer: "Yes, our eCommerce tool allows you to link your store using API keys. Once connected, you can generate product descriptions and sync them to your WordPress site as drafts with a single click.",
  },
  {
    question: "What happens if I reach my daily generation limit?",
    answer: "If you hit the limit of your current plan, you can wait for the 24-hour reset or upgrade to a Starter or Premium plan for higher daily quotas and priority processing.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 py-24 px-6 border-t border-slate-200">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4 text-primary">
            <HelpCircle size={40} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Everything you need to know about our AI document studio.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white border ${
                  isOpen ? "border-primary shadow-md" : "border-slate-200"
                } rounded-2xl overflow-hidden transition-all`}
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className={`text-xl font-bold ${isOpen ? "text-primary" : "text-black"}`}>
                    {faq.question}
                  </span>
                  <div className={`${isOpen ? "text-primary" : "text-slate-400"}`}>
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 border-t border-slate-50">
                        <p className="text-slate-600 text-lg leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Support Footer */}
        <div className="mt-16 text-center">
          <p className="text-lg text-slate-500 mb-6">
            Still have questions? We're here to help.
          </p>
          <Link target="_blank" href={'https://wa.me/8801957282230?text=Hello!%20I%20need%20help%20and%20support.'}>
            <button className="px-8 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-black font-bold rounded-xl transition-all cursor-pointer">
            CONTACT SUPPORT
          </button>
          </Link>
        </div>

      </div>
    </section>
  );
}