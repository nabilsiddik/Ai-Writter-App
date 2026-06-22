"use client";

import React from "react";
import Link from "next/link";
import { Cpu, Github, Twitter, Linkedin, Mail, Send } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Analyzer", href: "/" },
        { name: "API Reference", href: "#" },
        { name: "Pricing", href: "/pricing" },
        { name: "Change Log", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Blog", href: "#" },
        { name: "Contact", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "#" },
        { name: "Terms of Service", href: "#" },
        { name: "Cookie Policy", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* BRAND COL */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <Cpu size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">AI Analyzer</span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Automate your software requirements analysis, architecture design, and project planning with our state-of-the-art AI engine.
            </p>
            <div className="flex gap-4">
              <SocialIcon icon={<Twitter size={20} />} />
              <SocialIcon icon={<Github size={20} />} />
              <SocialIcon icon={<Linkedin size={20} />} />
            </div>
          </div>

          {/* LINK COLS */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* NEWSLETTER */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Stay Updated</h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-4 px-6 focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
              />
              <button className="absolute right-2 top-2 bottom-2 bg-indigo-600 text-white px-4 rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors">
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 mt-4 px-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {currentYear} AI Software Analyzer. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Online
            </span>
            <span>Based in Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon }: { icon: any }) {
  return (
    <button className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
      {icon}
    </button>
  );
}