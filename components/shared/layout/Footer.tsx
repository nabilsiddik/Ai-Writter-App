"use client";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-gray-50/9 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2">
          <span className="text-2xl font-bold text-white">AssignmentWritter.ai</span>
          <p className="text-gray-500 mt-4 max-w-sm">
            Empowering students with AI-driven academic tools for faster,
            smarter, and better assignment submissions.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6">Product</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
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
          <h4 className="text-white font-bold mb-6">Social</h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>
              <Link href="#">Twitter</Link>
            </li>
            <li>
              <Link href="#">Discord</Link>
            </li>
            <li>
              <Link href="#">LinkedIn</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 text-center text-gray-600 text-xs">
        &copy; 2026 SmartAssign Technology Inc. All rights reserved.
      </div>
    </footer>
  );
}
