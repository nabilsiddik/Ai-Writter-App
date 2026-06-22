"use client";

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Database, 
  Code2, 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Users, 
  Layers, 
  Workflow,
  Copy,
  ChevronRight,
  Globe,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AnalysisResultView({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  const { analysis, architecture, code, readme } = data;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
    { id: 'features', name: 'Features & Risks', icon: CheckCircle2 },
    { id: 'architecture', name: 'Architecture', icon: Layers },
    { id: 'database', name: 'Database', icon: Database },
    { id: 'docs', name: 'Documentation', icon: FileText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <header className="relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
                {analysis.projectType}
              </span>
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                analysis.estimatedComplexity === 'high' ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"
              )}>
                {analysis.estimatedComplexity} Complexity
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              {analysis.projectName}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {analysis.valueProposition}
            </p>
          </div>
        </header>

        {/* --- TAB NAVIGATION --- */}
        <nav className="flex flex-wrap gap-2 p-1.5 bg-slate-200/50 dark:bg-slate-800/50 rounded-2xl w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl    font-semibold transition-all",
                activeTab === tab.id 
                  ? "bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              )}
            >
              <tab.icon size={18} />
              {tab.name}
            </button>
          ))}
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="min-h-[600px]">
          <AnimatePresence mode="wait">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="md:col-span-2 space-y-6">
                  <Section card title="Problem Statement">
                    <p className="leading-relaxed italic text-slate-700 dark:text-slate-300">"{analysis.problemStatement}"</p>
                  </Section>
                  <Section card title="Business Goals">
                    <ul className="space-y-3">
                      {analysis.businessGoals.map((goal: string, i: number) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-1.5 h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                </div>
                <div className="space-y-6">
                  <Section card title="Target Audience" icon={<Users size={20}/>}>
                    <div className="flex flex-wrap gap-2">
                      {analysis.targetAudience.map((item: string) => (
                        <span key={item} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg   ">{item}</span>
                      ))}
                    </div>
                  </Section>
                  <Section card title="User Roles">
                    {analysis.userRoles.map((role: any) => (
                      <div key={role.role} className="mb-4 last:mb-0">
                        <h4 className="font-bold text-indigo-600 dark:text-indigo-400">{role.role}</h4>
                        <p className="   opacity-80">{role.description}</p>
                      </div>
                    ))}
                  </Section>
                </div>
              </motion.div>
            )}

            {/* FEATURES & RISKS TAB */}
            {activeTab === 'features' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <CheckCircle2 className="text-emerald-500" /> Essential Features
                  </h3>
                  {analysis.essentialFeatures.map((feat: any) => (
                    <div key={feat.name} className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg">{feat.name}</h4>
                        <span className={cn(
                          "  px-2 py-0.5 rounded font-black uppercase",
                          feat.priority === 'high' ? "bg-red-50 text-red-600" : "bg-blue-50 text-blue-600"
                        )}>{feat.priority}</span>
                      </div>
                      <p className="   text-slate-600 dark:text-slate-400">{feat.description}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                    <AlertTriangle className="text-amber-500" /> Technical Risks & Mitigation
                  </h3>
                  {analysis.technicalRisks.map((risk: any) => (
                    <div key={risk.risk} className="p-5 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
                      <h4 className="font-bold text-amber-800 dark:text-amber-400 mb-1">{risk.risk}</h4>
                      <p className="   mb-3 opacity-80">{risk.description}</p>
                      <div className="flex items-start gap-2 text-xs bg-white/50 dark:bg-slate-900/50 p-2 rounded-lg">
                        <ShieldCheck size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span className="italic font-medium text-emerald-800 dark:text-emerald-400">Mitigation: {risk.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ARCHITECTURE TAB */}
            {activeTab === 'architecture' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <TechCard title="Frontend" val={architecture.frontend.framework} reason={architecture.frontend.reason} />
                  <TechCard title="Backend" val={architecture.backend.framework} reason={architecture.backend.reason} />
                  <TechCard title="Database" val={architecture.database.name} reason={architecture.database.reason} />
                  <TechCard title="Auth" val={architecture.authentication.strategy} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <Section card title="System Flow" icon={<Workflow size={20}/>}>
                      <div className="space-y-4">
                        {architecture.systemFlow.map((step: string, i: number) => (
                          <div key={i} className="flex gap-4">
                            <div className="flex flex-col items-center">
                              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                                {i + 1}
                              </div>
                              {i !== architecture.systemFlow.length - 1 && <div className="w-px h-full bg-slate-300 dark:bg-slate-700 my-1" />}
                            </div>
                            <p className="   pt-1 pb-4 leading-relaxed">{step}</p>
                          </div>
                        ))}
                      </div>
                    </Section>
                  </div>
                  <Section card title="External Integrations">
                    <div className="space-y-2">
                      {architecture.externalServices.map((service: string) => (
                        <div key={service} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl    font-medium flex items-center gap-2">
                          <ChevronRight size={14} className="text-indigo-500" />
                          {service}
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
              </motion.div>
            )}

            {/* DATABASE TAB */}
            {activeTab === 'database' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Code2 className="text-indigo-500" /> Prisma Schema
                  </h3>
                  <button 
                    onClick={() => copyToClipboard(JSON.parse(code.prismaSchema).prismaSchema)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl    font-bold hover:bg-indigo-700 transition-colors"
                  >
                    {copied ? <CheckCircle2 size={16}/> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy Schema"}
                  </button>
                </div>
                <div className="bg-slate-900 rounded-2xl p-6 overflow-x-auto border border-slate-800 shadow-2xl">
                  <pre className="   text-indigo-300 font-mono leading-relaxed">
                    <code>{JSON.parse(code.prismaSchema).prismaSchema}</code>
                  </pre>
                </div>
              </motion.div>
            )}

            {/* DOCUMENTATION TAB */}
            {activeTab === 'docs' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="md:col-span-2 space-y-6">
                  <Section card title="Project Setup">
                    <div className="space-y-3">
                      {readme.setupSteps.map((step: string, i: number) => (
                        <div key={i} className="flex gap-3    bg-slate-100 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                          <code className="text-indigo-600 dark:text-indigo-400 font-bold">{i+1}.</code>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </Section>
                  <Section card title="Development Roadmap">
                    <div className="grid grid-cols-1 gap-4">
                      {readme.roadmap.map((item: any, i: number) => (
                        <div key={i} className="p-4 border-l-4 border-indigo-500 bg-white dark:bg-slate-900 shadow-sm">
                          <span className="  font-black uppercase text-indigo-500">{item.phase}</span>
                          <p className="   font-medium mt-1">{item.goal}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
                <div className="space-y-6">
                  <Section card title="Environment Vars">
                    <div className="space-y-3">
                      {readme.environmentVariables.map((v: any) => (
                        <div key={v.name} className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
                          <code className="text-xs font-bold text-pink-600 dark:text-pink-400 block mb-1">{v.name}</code>
                          <p className="  opacity-70">{v.description}</p>
                        </div>
                      ))}
                    </div>
                  </Section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* --- SUB COMPONENTS --- */

function Section({ children, title, icon, card }: { children: React.ReactNode, title: string, icon?: React.ReactNode, card?: boolean }) {
  return (
    <section className={cn(
      card && "bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
    )}>
      <h3 className="   font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
        {icon} {title}
      </h3>
      {children}
    </section>
  );
}

function TechCard({ title, val, reason }: { title: string, val: string, reason?: string }) {
  return (
    <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <p className="  font-black uppercase text-slate-400 mb-1">{title}</p>
      <h4 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-2">{val}</h4>
      {reason && <p className="text-xs opacity-70 leading-relaxed line-clamp-2">{reason}</p>}
    </div>
  );
}