"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  Receipt,
  Search,
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  User as UserIcon,
  ExternalLink,
  Wallet
} from "lucide-react";
import { format } from "date-fns";
import TableToolbar from "@/components/shared/tables/TaleToolbar";
import TablePagination from "@/components/shared/tables/TablePagination";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function TransactionsPage({ tranRes }: { tranRes: any }) {
  const transactions = tranRes?.data || [];
  const meta = tranRes?.meta;

  const transactionFilters = [
    {
      key: "status",
      label: "All Status",
      options: [
        { label: "Success", value: "SUCCESS" },
        { label: "Pending", value: "PENDING" },
        { label: "Failed", value: "FAILED" },
      ],
    },
    {
      key: "provider",
      label: "All Providers",
      options: [
        { label: "Stripe", value: "STRIPE" },
        { label: "bKash", value: "BKASH" },
      ],
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "FAILED":
        return "bg-red-50 text-red-600 border-red-100";
      case "PENDING":
        return "bg-orange-50 text-orange-600 border-orange-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 size={18} />;
      case "FAILED":
        return <XCircle size={18} />;
      case "PENDING":
        return <Clock size={18} />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-20">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">Financial Ledger</h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Complete history of all incoming revenue and payment processing logs.
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-base">Total Volume</p>
            <p className="text-2xl font-black text-black">৳{transactions?.reduce((acc: number, curr: any) => acc + (curr?.amount || 0), 0)}</p>
          </div>
        </div>
      </header>

      <TableToolbar placeholder="Search Transaction ID or Email..." filterOptions={transactionFilters} />

      <div className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Subscriber</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Transaction ID</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Amount</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Date & Gateway</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400 text-center">Status</th>
              </tr>
            </thead>
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-slate-100"
            >
              {transactions?.map((trx: any) => (
                <motion.tr
                  key={trx?.id}
                  variants={itemVariants}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-300 shadow-sm group-hover:border-primary transition-colors">
                        <UserIcon size={28} />
                      </div>
                      <div>
                        <p className="text-xl font-black text-black mb-1 group-hover:text-primary transition-colors truncate max-w-[200px]">
                          {trx?.user?.email || "Unknown User"}
                        </p>
                        <p className="text-lg text-slate-400 font-medium">Member ID: {trx?.userId?.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="flex items-center gap-2 text-slate-500 font-bold text-base">
                      <CreditCard size={18} className="text-slate-300" />
                      <span className="font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                        {trx?.providerId?.substring(0, 20)}...
                      </span>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="flex flex-col">
                      <span className="text-2xl font-black text-black">
                        {trx?.amount} {trx?.currency}
                      </span>
                      <span className="text-base font-bold text-slate-400 uppercase tracking-tighter mt-1">
                        Gross Payment
                      </span>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-slate-700">
                        {format(new Date(trx?.createdAt), "MMM dd, yyyy")}
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <p className="text-base text-slate-400 font-black uppercase tracking-widest">{trx?.provider}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="flex flex-col items-center gap-4">
                      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-base font-black uppercase tracking-widest border ${getStatusStyle(trx?.status)}`}>
                        {getStatusIcon(trx?.status)}
                        {trx?.status}
                      </div>
                      <button className="text-primary font-bold text-base flex items-center gap-1 hover:underline cursor-pointer transition-all">
                        View Receipt <ExternalLink size={14} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>

        {transactions?.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Receipt size={48} />
            </div>
            <p className="text-2xl font-bold text-slate-300 italic">No transaction records found.</p>
          </div>
        )}
      </div>

      <TablePagination meta={meta} />
    </div>
  );
}