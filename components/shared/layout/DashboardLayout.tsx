"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, LayoutDashboard, FileText, 
  Settings, CreditCard, Users, Database, 
  LogOut, User, Bell, Sparkles, ShoppingBag, 
  DollarSign,
  DollarSignIcon,
  ArrowRightLeft,
  UserCheck
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  href?: string;
  submenu?: { label: string; href: string }[];
}

const USER_MENU: MenuItem[] = [
  { label: "Overview", icon: <LayoutDashboard size={22} />, href: "/dashboard" },
  { label: "My Library", icon: <FileText size={22} />, href: "/dashboard/library" },
  { 
    label: "Create New", 
    icon: <Sparkles size={22} />, 
    submenu: [
      { label: "Assignment", href: "/tools/assignment" },
      { label: "Resume", href: "/tools/resume" },
      { label: "Product Listing", href: "/tools/product-writing" }
    ] 
  },
  { label: "Billing", icon: <CreditCard size={22} />, href: "/dashboard/billing" },
];

const ADMIN_MENU: MenuItem[] = [
  { label: "Overview", icon: <Database size={22} />, href: "/admin/dashboard/overview" },
  { label: "Financial Overview", icon: <DollarSignIcon size={22} />, href: "/admin/dashboard/financial-overview" },
  { label: "Manage Users", icon: <Users size={22} />, href: "/admin/dashboard/user-management" },
  { label: "Manage Documents", icon: <FileText size={22} />, href: "/admin/dashboard/manage-document" },
  { label: "Subscriptions", icon: <UserCheck size={22} />, href: "/admin/dashboard/subscriptions" },
  { label: "Transactions", icon: <ArrowRightLeft size={22} />, href: "/admin/dashboard/transactions" },

];

export default function DashboardLayout({ children, isAdmin = false }: { children: React.ReactNode, isAdmin?: boolean }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const pathname = usePathname();
  const menuItems = ADMIN_MENU;

  // Close mobile sidebar on route change
  useEffect(() => setIsMobileOpen(false), [pathname]);

  const toggleSubmenu = (label: string) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  return (
    <div className="min-h-screen bg-dark text-white flex overflow-hidden font-sans">
      
      {/* --- MOBILE OVERLAY --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed lg:relative z-[70] bg-black h-screen transition-all duration-500 border-r border-white/5 bg-dark-accent
        ${isSidebarOpen ? "w-80" : "w-24"}
        ${isMobileOpen ? "left-0" : "-left-full lg:left-0"}
      `}>
        <div className="flex flex-col h-full p-6">
          
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-4 mb-12 px-2">
            <div className="p-3 bg-primary rounded-2xl shadow-lg shadow-primary/20">
              <Sparkles className="text-white" size={24} />
            </div>
            {isSidebarOpen && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-black tracking-tighter">
                WRITTER<span className="text-primary">.ai</span>
              </motion.span>
            )}
          </div>
          </Link>

          {/* Menu Items */}
          <nav className="flex-1 space-y-3 overflow-y-auto no-scrollbar">
            {menuItems?.map((item) => {
              const isActive = pathname === item?.href;
              const hasSubmenu = !!item?.submenu;

              return (
                <div key={item?.label}>
                  {hasSubmenu ? (
                    <button 
                      onClick={() => toggleSubmenu(item?.label)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer group ${expandedMenu === item?.label ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="flex items-center gap-4 text-gray-400 group-hover:text-white transition-colors">
                        <span className={expandedMenu === item?.label ? "text-primary" : ""}>{item?.icon}</span>
                        {isSidebarOpen && <span className="text-lg font-bold">{item?.label}</span>}
                      </div>
                      {isSidebarOpen && <ChevronDown size={18} className={`transition-transform duration-300 ${expandedMenu === item?.label ? "rotate-180" : ""}`} />}
                    </button>
                  ) : (
                    <Link href={item?.href || "#"} className={`flex items-center gap-4 p-4 rounded-2xl transition-all group ${isActive ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                      <span className="transition-transform group-hover:scale-110">{item?.icon}</span>
                      {isSidebarOpen && <span className="text-lg font-bold">{item?.label}</span>}
                    </Link>
                  )}

                  {/* Submenu Content */}
                  <AnimatePresence>
                    {hasSubmenu && expandedMenu === item?.label && isSidebarOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden ml-12 space-y-2 mt-2">
                        {item?.submenu?.map((sub) => (
                          <Link key={sub?.label} href={sub?.href} className={`block p-3 text-base rounded-xl transition-all ${pathname === sub?.href ? "text-primary font-bold" : "text-gray-500 hover:text-white"}`}>
                            {sub?.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <button className="flex items-center gap-4 p-4 mt-auto rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold text-lg cursor-pointer">
            <LogOut size={22} />
            {isSidebarOpen && <span>Logout Account</span>}
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header */}
        <header className="bg-black h-24 border-b border-white/5 flex items-center justify-between px-8 bg-dark/50 backdrop-blur-xl z-50">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMobileOpen(true)} className="lg:hidden p-2 text-gray-400 cursor-pointer">
              <Menu size={28} />
            </button>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden lg:block p-2 text-gray-400 hover:text-white transition-colors cursor-pointer">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h2 className="text-xl font-bold tracking-tight hidden md:block">
              {isAdmin ? "Admin Control Center" : "Member Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white transition-all cursor-pointer">
               <Bell size={22} />
               <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-ping" />
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-white/10 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-base font-bold">Nabil Siddik</p>
                <p className="text-xs font-black uppercase tracking-widest text-primary">Premium</p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-secondary p-[2px]">
                 <div className="w-full h-full bg-dark rounded-[14px] flex items-center justify-center">
                    <User size={24} className="text-white" />
                 </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Child Content */}
        <main className="flex-1 bg-white overflow-y-auto p-6 md:p-10 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}