"use client";

import React, { Suspense, useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import {
  Receipt,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
  User as UserIcon,
  ExternalLink,
  Wallet,
  ShieldCheck,
  X,
  RefreshCcw,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import TableToolbar from "@/components/shared/tables/TaleToolbar";
import TablePagination from "@/components/shared/tables/TablePagination";
import { toast } from "sonner";
import { updateBkashPayment } from "@/services/subscription";
import { useRouter } from "next/navigation";

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
  const [isPending, startTransition] = React.useTransition();
  const [selectedTrx, setSelectedTrx] = useState<any>(null);
  const [newStatus, setNewStatus] = useState<"APPROVE" | "REJECT">("APPROVE");
  const transactions = tranRes?.data || [];
  const meta = tranRes?.meta;
  const router = useRouter();

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

  const handleUpdateStatus = async () => {
    if (!selectedTrx?.id) return;

    startTransition(async () => {
      const toastId = toast.loading("Updating transaction status...");

      const res = await updateBkashPayment({
        transactionId: selectedTrx.id,
        status: newStatus,
      });

      if (res?.success) {
        toast.success(`Payment status updated to ${newStatus}`, {
          id: toastId,
        });
        setSelectedTrx(null);
        router.refresh();
      } else {
        toast.error(res?.message || "Failed to update", { id: toastId });
      }
    });
  };

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
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">
            Financial Ledger
          </h1>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            Complete history of all incoming revenue and payment processing
            logs.
          </p>
        </div>
        <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary">
            <Wallet size={24} />
          </div>
          <div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-base">
              Total Volume
            </p>
            <p className="text-2xl font-black text-black">
              ৳
              {transactions?.reduce(
                (acc: number, curr: any) => acc + (curr?.amount || 0),
                0,
              )}
            </p>
          </div>
        </div>
      </header>

      <Suspense>
        <TableToolbar
          placeholder="Search Transaction ID or Email..."
          filterOptions={transactionFilters}
        />
      </Suspense>

      <div className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1100px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">
                  Subscriber
                </th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">
                  Transaction ID
                </th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">
                  Amount
                </th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">
                  Date & Gateway
                </th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400 text-center">
                  Status
                </th>
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
                        <p className="text-lg text-slate-400 font-medium">
                          Member ID: {trx?.userId?.substring(0, 8)}
                        </p>
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
                        <p className="text-base text-slate-400 font-black uppercase tracking-widest">
                          {trx?.provider}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-base font-black uppercase tracking-widest border ${getStatusStyle(trx?.status)}`}
                      >
                        {getStatusIcon(trx?.status)}
                        {trx?.status}
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="text-primary font-bold text-base flex items-center gap-1 hover:underline cursor-pointer transition-all">
                          View Receipt <ExternalLink size={14} />
                        </button>

                        {trx?.status === "PENDING" && (
                          <button
                            onClick={() => setSelectedTrx(trx)}
                            className="text-secondary font-bold text-base flex items-center gap-1 hover:underline cursor-pointer transition-all"
                          >
                            Manage <ShieldCheck size={16} />
                          </button>
                        )}
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

        <AnimatePresence>
          {selectedTrx && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => !isPending && setSelectedTrx(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-white border border-slate-200 rounded-[40px] p-10 md:p-14 shadow-3xl overflow-hidden"
              >
                <button
                  onClick={() => setSelectedTrx(null)}
                  className="absolute top-8 right-8 p-2 text-slate-400 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={28} />
                </button>

                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary border border-primary/20">
                    <RefreshCcw
                      size={36}
                      className={isPending ? "animate-spin" : ""}
                    />
                  </div>
                  <h2 className="text-3xl font-black mb-4">Update Payment</h2>
                  <p className="text-slate-500 text-xl font-medium px-4 leading-relaxed">
                    Verify the TRX ID:{" "}
                    <span className="text-black font-bold font-mono">
                      {selectedTrx?.transactionId || "N/A"}
                    </span>{" "}
                    from your bKash statement.
                  </p>
                </div>

                <div className="space-y-6 mb-12">
                  <div className="space-y-3">
                    <label className="text-base font-black uppercase tracking-widest text-slate-400 ml-2">
                      Final Decision
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e: any) => setNewStatus(e.target.value)}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-xl font-bold text-black focus:border-primary outline-none transition-all cursor-pointer shadow-sm"
                    >
                      <option value="APPROVE">Approve Payment</option>
                      <option value="REJECT">Reject Payment</option>
                    </select>
                  </div>

                  <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                    <p className="text-lg text-slate-600 font-medium">
                      Customer:{" "}
                      <span className="text-black font-bold">
                        {selectedTrx?.user?.email}
                      </span>
                    </p>
                    <p className="text-lg text-slate-600 font-medium">
                      Amount:{" "}
                      <span className="text-black font-bold">
                        ৳{selectedTrx?.amount}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleUpdateStatus}
                  disabled={isPending}
                  className="w-full py-6 bg-primary hover:bg-indigo-700 text-white rounded-3xl font-black text-2xl transition-all flex items-center justify-center gap-4 cursor-pointer shadow-xl shadow-primary/20 disabled:opacity-50"
                >
                  {isPending ? (
                    <Loader2 className="animate-spin" size={28} />
                  ) : (
                    <CheckCircle2 size={28} />
                  )}
                  {isPending ? "Syncing..." : "Apply Decision"}
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {transactions?.length === 0 && (
          <div className="py-40 text-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
              <Receipt size={48} />
            </div>
            <p className="text-2xl font-bold text-slate-300 italic">
              No transaction records found.
            </p>
          </div>
        )}
      </div>
      <Suspense>
        <TablePagination meta={meta} />
      </Suspense>
    </div>
  );
}
