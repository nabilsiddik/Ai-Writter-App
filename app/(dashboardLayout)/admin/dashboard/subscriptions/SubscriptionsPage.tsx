"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Crown, 
  Zap, 
  Calendar, 
  CreditCard, 
  ExternalLink, 
  RefreshCcw, 
  ShieldCheck,
  User as UserIcon,
  Search,
  XCircle
} from "lucide-react";
import { format } from "date-fns";
import TablePagination from "@/components/shared/tables/TablePagination";
import TableToolbar from "@/components/shared/tables/TaleToolbar";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function SubscriptionsPage({ subRes }: { subRes: any }) {
  const subscriptions = subRes?.data || [];
  const meta = subRes?.meta;

  const subFilters = [
    {
      key: "plan",
      label: "Filter by Plan",
      options: [
        { label: "Starter", value: "STARTAR" },
        { label: "Premium", value: "PREMIUM" },
      ]
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Past Due", value: "PAST_DUE" },
        { label: "Canceled", value: "CANCELLED" },
      ]
    }
  ];

  return (
    <div className="pb-20">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">Active Memberships</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">Manage recurring billing cycles and monitor subscription health.</p>
        </div>
      </header>

      <TableToolbar placeholder="Search by Subscription ID or Email..." filterOptions={subFilters} />

      <div className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Subscriber</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Plan Details</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Billing IDs</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Period</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400 text-center">Renewal</th>
              </tr>
            </thead>
            <motion.tbody 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-100"
            >
              {subscriptions?.map((sub: any) => (
                <motion.tr 
                  key={sub?.id}
                  variants={itemVariants}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  {/* USER INFO */}
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 shadow-sm group-hover:border-primary transition-colors">
                        <UserIcon size={28} />
                      </div>
                      <div>
                        <p className="text-xl font-black text-black mb-1 group-hover:text-primary transition-colors">
                          {sub?.user?.fullName || "Member"}
                        </p>
                        <p className="text-lg text-slate-400 font-medium">{sub?.user?.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* PLAN TYPE */}
                  <td className="p-8">
                    <div className="flex flex-col gap-2">
                       <div className={`flex items-center gap-2 font-black text-base uppercase tracking-widest ${sub?.plan === 'PREMIUM' ? 'text-secondary' : 'text-primary'}`}>
                         {sub?.plan === 'PREMIUM' ? <Crown size={18} /> : <Zap size={18} />}
                         {sub?.plan}
                       </div>
                       <div className="flex items-center gap-2 text-slate-700 font-bold text-lg">
                          <div className={`w-2.5 h-2.5 rounded-full ${sub?.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`} />
                          {sub?.status}
                       </div>
                    </div>
                  </td>

                  {/* STRIPE IDs */}
                  <td className="p-8">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 text-slate-500 font-bold text-base">
                          <CreditCard size={18} className="text-slate-300" />
                          <span className="font-mono text-slate-400">{sub?.stripeSubscriptionId?.substring(0, 12)}...</span>
                       </div>
                       <p className="text-base font-black text-slate-300 uppercase tracking-tighter">Cus: {sub?.stripeCustomerId?.substring(0, 12)}...</p>
                    </div>
                  </td>

                  {/* BILLING PERIOD */}
                  <td className="p-8">
                    <div className="space-y-1">
                       <div className="flex items-center gap-2 text-slate-600 font-bold text-lg">
                          <RefreshCcw size={16} className="text-slate-400" />
                          <span>Starts: {sub?.startDate ? format(new Date(sub.startDate), "MMM dd, yyyy") : "N/A"}</span>
                       </div>
                       <div className="flex items-center gap-2 text-primary font-bold text-lg">
                          <Calendar size={16} />
                          <span>Renews: {sub?.endDate ? format(new Date(sub.endDate), "MMM dd, yyyy") : "N/A"}</span>
                       </div>
                    </div>
                  </td>

                  {/* RENEWAL STATUS */}
                  <td className="p-8 text-center">
                    <div className="flex flex-col items-center gap-3">
                      {sub?.cancelAtPeriodEnd ? (
                        <div className="flex items-center gap-2 text-red-500 font-black text-base uppercase tracking-tight">
                           <XCircle size={18} /> Non-Renewing
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-emerald-500 font-black text-base uppercase tracking-tight">
                           <ShieldCheck size={18} /> Auto-Renewing
                        </div>
                      )}
                      
                      <button className="px-5 py-2 bg-slate-100 text-slate-600 rounded-xl font-bold text-base hover:bg-primary hover:text-white transition-all cursor-pointer flex items-center gap-2">
                         Stripe <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {subscriptions?.length === 0 && (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
               <Search size={40} />
            </div>
            <p className="text-2xl font-bold text-slate-300 italic">No active subscriptions found.</p>
          </div>
        )}
      </div>

      <TablePagination meta={meta} />
    </div>
  );
}