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
  Crown,
  Gem,
  LayoutGrid,
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
      title: "My Generations",
      desc: "View all your generations",
      icon: <Sparkles size={18} />,
      link: "/my-generations",
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-300 ${scrolled ? "bg-white backdrop-blur-md border-b border-white/10 py-3" : " bg-white backdrop-blur-md border-b border-white/10 py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 xl:px-0 flex items-center justify-between">
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

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/tools" className="font-medium transition-colors">
            Tools
          </Link>

          {/* Submenu Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <button className="flex items-center gap-1 font-medium transition-colors">
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
                  <div className="w-64 bg-white border border-primary/10 rounded-2xl p-2 shadow-2xl">
                    {subMenuItems?.map((item, i) => (
                      <Link
                        key={i}
                        href={item?.link || "/"}
                        className="cursor-pointer"
                      >
                        <button className="w-full flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors text-left group cursor-pointer">
                          <div className="p-2 bg-white/5 rounded-lg group-hover:bg-indigo-500/20 group-hover:text-indigo-500 transition-colors text-gray-400">
                            {item.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold ">
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

          <Link href="/pricing" className="font-medium transition-colors">
            Pricing
          </Link>
        </div>

        {/* Profile & CTA */}
        <div className="flex items-center gap-4 cursor-pointer">
          {user?.id ? (
            <div className="relative cursor-pointer">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-white/10 overflow-hidden hover:border-indigo-500 transition-colors bg-gradient-to-br cursor-pointer from-gray-700 to-gray-900 flex items-center justify-center"
              >
                <User size={20} className="text-gray-400 cursor-pointer" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80  bg-white border border-primary/10 rounded-2xl p-4 shadow-2xl cursor-pointer"
                  >
                    <div className="px-3 py-2 border-b border-white/5 mb-1">
                      <p className="text-2xl font-bold mb-3">
                        Hi,{" "}
                        <span className="text-primary">{user?.fullName}</span>
                      </p>
                      <p className="text-md font-bold">{user?.email}</p>
                      <p className=" text-gray-700">
                        {user?.plan === "STARTER" ? (
                          <div className="flex items-center gap-2">
                            <Crown size={20} />
                            Startar Plan
                          </div>
                        ) : user?.plan === "PREMIUM" ? (
                          <div className="flex items-center gap-2">
                            <Gem size={20} />
                            Premium Plan
                          </div>
                        ) : (
                          "Free Member"
                        )}
                      </p>
                    </div>

                    {user?.role === "ADMIN" && (
                      <div className="mx-5 border-t border-b py-3 font-medium text-lg">
                        <ul>
                          <Link
                            href={
                              user?.role === "ADMIN"
                                ? "/admin/dashboard/overview"
                                : "/"
                            }
                          >
                            <li className="flex items-center gap-3">
                              <LayoutGrid /> Admin Dashboard
                            </li>
                          </Link>
                        </ul>
                      </div>
                    )}

                    <button
                      onClick={async () => {
                        const res = await userLogout();
                        if (res?.success) {
                          if (
                            typeof window !== "undefined" &&
                            window.chrome?.runtime?.sendMessage
                          ) {
                            window.chrome.runtime.sendMessage(
                              process.env.NEXT_PUBLIC_EXTENSION_ID!,
                              {
                                type: "LOGOUT_EVENT",
                              },
                            );
                          }
                          toast.success("Successfully Logged Out");
                          router.push("/");
                        } else {
                          toast.error("Logout Failed");
                        }
                      }}
                      className="w-full cursor-pointer flex items-center gap-3 bg-primary py-3 px-5 text-white rounded-lg font-bold transition-colors mt-3"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href={"/login"}>
              <Button className="w-full relative group overflow-hidden bg-primary disabled:from-gray-700 disabled:to-gray-800 text-white font-bold py-4 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer">
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
