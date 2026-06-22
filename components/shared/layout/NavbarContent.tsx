"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  Settings,
  ChevronDown,
  UserCircle,
  Cuboid,
} from "lucide-react";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { IUserInfo } from "@/types/user.interface";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { userLogout } from "@/services/auth/userLogout";
import { toast } from "sonner";
import Image from "next/image";

export default function NavbarContent({
  user,
  cart,
}: {
  user: IUserInfo | null;
  cart: any;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const fullPath = `${pathname}?${searchParams.toString()}`;

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { title: "হোম", path: "/" },
    { title: "শপ", path: "/shop" },
    { title: "আমাদের সম্পর্কে", path: "/about" },
    { title: "ব্লগ", path: "/blog" },
    { title: "যোগাযোগ", path: "/contact" },
  ];

  const handleLogout = async () => {
    startTransition(async () => {
      try {
        const res = await userLogout();

        if (res?.success) {
          toast.success("Logout successful");
          router.refresh();
          router.push("/login");
        } else {
          toast.error(res?.message || "Logout failed");
        }
      } catch (error) {
        toast.error("Something went wrong");
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl font-sans shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <div className="flex items-center gap-3">
              <Image src={'/images/logo/mango.png'} width={50} height={50} alt="logo"/>
              <div>
                <span className="text-3xl font-bold tracking-tight text-secondary flex items-center">
              ফলের
              <span className="text-primary ml-1">রাজা</span>
            </span>
              </div>
            </div>
          </Link>
{/* 
          <Link href="/" className="flex items-center gap-1 shrink-0">
            <div className="font-bold text-2xl">Logo</div>
          </Link> */}

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "relative font-bold transition-all duration-200 hover:text-primary",
                    isActive ? "text-primary" : "text-slate-600",
                  )}
                >
                  {link.title}

                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-brand-orange"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            {/* <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 text-slate-600 hover:text-brand-orange transition-colors">
              <Search className="w-5 h-5" />
            </button> */}

            {/* Wishlist */}
            {user && (
              <Link
                href="/account?activeTab=wishlist"
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors relative ${fullPath === '/account?activeTab=wishlist' ? 'bg-primary text-white' : 'hover:bg-slate-100 text-slate-600 hover:text-brand-orange hover:text-primary '} `}
              >
                <Heart className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-brand-orange rounded-full" />
              </Link>
            )}

            {/* Cart */}
            <Link
              href="/cart"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:text-brand-orange transition-colors relative"
            >
              <div className="w-5 h-5 bg-primary rounded-full text-white flex items-center justify-center absolute -top-2 -right-1">
                {cart?.totalItems || 0}
              </div>
              <ShoppingCart className="w-5 h-5" />
            </Link>

            {/* Auth Section */}
            {!user ? (
              <div className="hidden md:flex items-center gap-3 ml-2">
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="rounded-full px-5 font-semibold cursor-pointer bg-primary text-white"
                  >
                    লগইন
                  </Button>
                </Link>

                <Link href="/login?register=true">
                  <Button className="rounded-full px-5 bg-secondary hover:bg-secondary/90 cursor-pointer text-white font-semibold">
                    রেজিস্টার
                  </Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-1.5 hover:bg-slate-50 transition-all outline-none cursor-pointer">
                    <Avatar className="h-9 w-9 border border-slate-200">
                      <AvatarImage
                        src={user?.profilePhoto}
                        alt={user?.fullName}
                      />

                      <AvatarFallback>
                        {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-left hidden lg:block">
                      <p className="text-sm font-bold text-slate-800 leading-none">
                        {user?.fullName}
                      </p>

                      <p className="text-xs text-slate-500 mt-1 capitalize">
                        {user?.role?.toLowerCase()}
                      </p>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate-500 mr-1" />
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-2xl p-2"
                >
                  <DropdownMenuLabel className="flex items-center gap-3 py-3">
                    <Avatar className="h-11 w-11">
                      <AvatarImage
                        src={user?.profilePhoto}
                        alt={user?.fullName}
                      />

                      <AvatarFallback>
                        {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <p className="font-bold text-slate-800">
                        {user?.fullName}
                      </p>

                      <p className="text-slate-500 mt-1">
                        {user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin/dashboard"
                        className="cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-lg">
                          <LayoutDashboard className="w-24 h-24 mr-2" />
                          ড্যাসবোর্ড
                        </div>
                      </Link>
                    </DropdownMenuItem>
                  )}

                  {user?.role === 'USER' && 
                    <div>
                      <DropdownMenuItem asChild>
                    <Link
                        href="/account?activeTab=overview"
                        className="cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-lg">
                          <UserCircle className="w-24 h-24 mr-2" />
                          একাউন্ট
                        </div>
                      </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                        href="/account?activeTab=orders"
                        className="cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-lg">
                          <Cuboid className="w-10 h-10 mr-2" />
                          অর্ডার সমুহ
                        </div>
                      </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem asChild>
                    <Link
                        href="/account?activeTab=profile"
                        className="cursor-pointer rounded-lg"
                      >
                        <div className="flex items-center gap-2 text-lg">
                          <Settings className="w-24 h-24 mr-2" />
                          প্রোফাইল সেটিং
                        </div>
                      </Link>
                  </DropdownMenuItem>
                    </div>
                  }

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer rounded-lg text-red-500 focus:text-red-500"
                    disabled={isPending}
                  >
                    <LogOut className="w-16 h-16 mr-2" />
                    <span className="text-lg">{isPending ? "লগ আউট হচ্ছে..." : "লগ আউট"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-slate-100 text-slate-700"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-5 space-y-3">
              {user && (
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profilePhoto} />
                    <AvatarFallback>
                      {user?.fullName?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-bold text-slate-800">
                      {user?.fullName}
                    </h4>

                    <p className="text-sm text-slate-500">{user?.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "block rounded-xl px-4 py-2 text-base font-semibold transition-colors",
                    pathname === link.path
                      ? "bg-primary/10 text-primary"
                      : "text-slate-700 hover:bg-slate-100",
                  )}
                >
                  {link.title}
                </Link>
              ))}

              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin/dashboard/overview"
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      Dashboard
                    </Link>
                  )}

                  <Link
                    href="/account"
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <User className="w-5 h-5" />
                    My Account
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base font-semibold text-red-500 hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 pt-3">
                  <Link href="/login">
                    <Button className="w-full rounded-xl cursor-pointer bg-primary">
                      লগইন
                    </Button>
                  </Link>

                  <Link href="/login?register=true">
                    <Button className="w-full rounded-xl bg-secondary text-white cursor-pointer hover:bg-secondary/90">
                      রেজিস্টার
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
