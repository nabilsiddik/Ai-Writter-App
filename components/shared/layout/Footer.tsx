"use client";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-50/9 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-primary rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
              <Sparkles size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tighter flex items-center gap-1">
              <span className="text-primary">Ai</span> ContentWritter
              <span className="text-primary"></span>
            </span>
          </Link>
          <p className="font-medium mt-4 max-w-sm">
            Empowering students with AI-driven academic tools for faster,
            smarter, and better assignment submissions.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-gray-">
            <li>
              <Link href="#">Features</Link>
            </li>
            <li>
              <Link href="#">Templates</Link>
            </li>
            <li>
              <Link href="#">Pricing</Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-6">Social</h4>
          <ul className="space-y-4 text-gray-500">
            <li>
              <Link href="https://github.com/nabilsiddik" target="_blank">Github</Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/nabilsiddik/" target="_blank">LinkedIn</Link>
            </li>
            <li>
              <Link href="https://www.facebook.com/profile.php?id=61582525925921" target="_blank">Facebook</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-gray/50 text-center text-gray-600">
        &copy; 2026 Developed by <Link href={'https://nabilsiddik.vercel.app/'} target="_blank"><span className="font-bold underline text-blue-500">Nabil Siddik</span></Link>. All rights reserved.
      </div>
    </footer>
  );
}
