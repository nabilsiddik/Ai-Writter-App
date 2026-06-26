// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Menu, X, User, LogOut, Settings,
//   ChevronDown, Cpu, Sparkles, CreditCard
// } from "lucide-react";
// import { cn } from "@/lib/utils"; // If you don't have this utility, use a simple template string

// export default function Header() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const pathname = usePathname();

//   // Handle scroll effect for glassmorphism
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const navLinks = [
//     { name: "Analyzer", href: "/" },
//     { name: "Pricing", href: "/pricing" },
//     { name: "Showcase", href: "/showcase" },
//     { name: "Documentation", href: "/docs" },
//   ];

//   const isLoggedIn = true; // Mock auth state

//   return (
//     <header
//       className={cn(
//         "fixed top-0 w-full z-[100] transition-all duration-300 border-b",
//         scrolled
//           ? "bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-slate-200 dark:border-slate-800 py-3"
//           : "bg-transparent border-transparent py-5"
//       )}
//     >
//       <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
//             <Cpu size={24} />
//           </div>
//           <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
//             AI Analyzer
//           </span>
//         </Link>

//         {/* DESKTOP NAV */}
//         <nav className="hidden md:flex items-center gap-8">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               href={link.href}
//               className={cn(
//                 "text-sm font-semibold transition-colors hover:text-indigo-600 dark:hover:text-indigo-400",
//                 pathname === link.href ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
//               )}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>

//         {/* AUTH ACTIONS */}
//         <div className="hidden md:flex items-center gap-4">
//           {!isLoggedIn ? (
//             <>
//               <button className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600">
//                 Log in
//               </button>
//               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
//                 Get Started
//               </button>
//             </>
//           ) : (
//             <div className="relative">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center gap-2 p-1 pr-3 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all"
//               >
//                 <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
//                   JS
//                 </div>
//                 <span className="text-sm font-bold">John Doe</span>
//                 <ChevronDown size={14} className={cn("transition-transform", isProfileOpen && "rotate-180")} />
//               </button>

//               <AnimatePresence>
//                 {isProfileOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
//                     className="absolute right-0 mt-3 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-2"
//                   >
//                     <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-1">
//                       <p className="text-xs text-slate-400 font-medium">Signed in as</p>
//                       <p className="text-sm font-bold truncate">john@example.com</p>
//                     </div>
//                     <DropdownItem icon={<User size={16} />} label="My Profile" />
//                     <DropdownItem icon={<CreditCard size={16} />} label="Subscription" />
//                     <DropdownItem icon={<Settings size={16} />} label="Settings" />
//                     <div className="h-px bg-slate-100 dark:bg-slate-800 my-1" />
//                     <DropdownItem icon={<LogOut size={16} />} label="Logout" danger />
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>

//         {/* MOBILE MENU TOGGLE */}
//         <button
//           className="md:hidden p-2 text-slate-600 dark:text-slate-400"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X /> : <Menu />}
//         </button>
//       </div>

//       {/* MOBILE MENU OVERLAY */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 overflow-hidden"
//           >
//             <div className="flex flex-col p-4 gap-4">
//               {navLinks.map((link) => (
//                 <Link key={link.name} href={link.href} className="text-lg font-bold px-4 py-2" onClick={() => setIsOpen(false)}>
//                   {link.name}
//                 </Link>
//               ))}
//               <div className="h-px bg-slate-100 dark:bg-slate-800 mx-4" />
//               <button className="flex items-center gap-3 px-4 py-2 font-bold text-indigo-600">
//                 <Sparkles size={20} /> Upgrade to Pro
//               </button>
//               <button className="flex items-center gap-3 px-4 py-2 font-bold text-red-500">
//                 <LogOut size={20} /> Logout
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// function DropdownItem({ icon, label, danger }: { icon: any, label: string, danger?: boolean }) {
//   return (
//     <button className={cn(
//       "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors",
//       danger ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10" : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
//     )}>
//       {icon} {label}
//     </button>
//   );
// }

// components/layout/Navbar.tsx
"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ChevronDown,
  User,
  LogOut,
  Settings,
  CreditCard,
  Menu,
  X,
  BookOpen,
  Zap,
  Layout,
  Pen,
} from "lucide-react";
import Link from "next/link";
import { userLogout } from "@/services/auth/userLogout";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar({ user }: { user: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const subMenuItems = [
    {
      title: "Templates",
      desc: "View cover page designs",
      icon: <Layout size={18} />,
    },
    {
      title: "My Generations",
      desc: "View all your generations",
      icon: <Sparkles size={18} />,
      link: "/my-generations",
    },
    {
      title: "University List",
      desc: "Supported institutions",
      icon: <BookOpen size={18} />,
    },
    {
      title: "AI Guide",
      desc: "Master assignment writing",
      icon: <Zap size={18} />,
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-[#050505] backdrop-blur-md border-b border-white/10 py-3" : "bg-[#050505] backdrop-blur-md border-b border-white/10 py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          {/* <div className="p-2 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-lg group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
            <Sparkles size={20} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-white flex items-center gap-1">
            <span className="text-indigo-500">Ai</span> ContentWritter
            <span className="text-indigo-500"></span>
          </span> */}
          H
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Features
          </Link>

          {/* Submenu Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-white transition-colors">
              Resources{" "}
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full -left-4 pt-4"
                >
                  <div className="w-64 bg-[#111] border border-white/10 rounded-2xl p-2 shadow-2xl">
                    {subMenuItems?.map((item, i) => (
                      <Link
                        key={i}
                        href={item?.link || "/"}
                        className="cursor-pointer"
                      >
                        <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-left group cursor-pointer">
                          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors text-gray-400">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {item.title}
                            </p>
                            <p className="text-xs text-gray-500">{item.desc}</p>
                          </div>
                        </button>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="#pricing"
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Profile & CTA */}
        <div className="flex items-center gap-4">
          {user?.id ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden hover:border-indigo-500 transition-colors bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
              >
                <User size={20} className="text-gray-400" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-56 bg-[#111] border border-white/10 rounded-2xl p-2 shadow-2xl"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-sm font-bold text-white">
                        {user?.fullName}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <p className="text-xs text-gray-500">
                        {user?.plan === "STARTER" || user?.plan === "PREMIUM"
                          ? "Premium Member"
                          : "Free Member"}
                      </p>
                    </div>
                    {/* <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 transition-colors">
                    <Settings size={16} /> Settings
                  </button> */}
                    <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg text-sm text-gray-300 transition-colors">
                      <CreditCard size={16} /> Subscription
                    </button>
                    <button
                      onClick={async () => {
                        const res = await userLogout();
                        if (res?.success) {
                          toast.success("Loged Out");
                          router.push("/");
                        } else {
                          toast.error("Logout Failed");
                        }
                      }}
                      className="w-full cursor-pointer flex items-center gap-3 px-3 py-2 hover:bg-red-500/10 text-red-400 rounded-lg text-sm transition-colors mt-1"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
                Login / Signup
              </Button>
            </Link>
          )}

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </nav>
  );
}
