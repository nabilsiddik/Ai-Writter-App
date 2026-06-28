"use client";

import React from "react";
import { motion } from "framer-motion";
import { Edit3, Trash2, Eye, User as UserIcon, ShieldAlert } from "lucide-react";
import { format } from "date-fns";
import TableToolbar from "@/components/shared/tables/TaleToolbar";
import TablePagination from "@/components/shared/tables/TablePagination";

export default function UserManagementPage({ userRes }: { userRes: any }) {
  const users = userRes?.data || [];
  const meta = userRes?.meta;

  console.log(userRes, 'res');

  const userFilters = [
    {
      key: "plan",
      label: "All Plans",
      options: [
        { label: "Free", value: "FREE" },
        { label: "Starter", value: "STARTAR" },
        { label: "Premium", value: "PREMIUM" },
      ]
    },
    {
      key: "status",
      label: "All Status",
      options: [
        { label: "Active", value: "ACTIVE" },
        { label: "Banned", value: "BLOCKED" },
      ]
    }
  ];

  return (
    <div className="pb-20">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-black mb-2 tracking-tight">User Management</h1>
        <p className="text-xl text-slate-500 font-medium leading-relaxed">Manage your community, monitor plans, and moderate accounts.</p>
      </header>

      <TableToolbar placeholder="Search by name or email..." filterOptions={userFilters} />

      <div className="bg-white border border-slate-200 rounded-[40px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">User Identity</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Subscription</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Status</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400">Join Date</th>
                <th className="p-8 text-base font-black uppercase tracking-[0.15em] text-slate-400 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users?.map((user: any, index: number) => (
                <motion.tr 
                  key={user?.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="p-8">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-400">
                         {user?.profilePhoto ? <img src={user.profilePhoto} className="object-cover w-full h-full" /> : <UserIcon size={28} />}
                      </div>
                      <div>
                        <p className="text-xl font-black text-black mb-1 group-hover:text-primary transition-colors">{user?.fullName}</p>
                        <p className="text-lg text-slate-400 font-medium">{user?.email}</p>
                      </div>
                    </div>
                  </td>

                  <td className="p-8">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-base font-black uppercase tracking-widest ${
                      user?.plan === 'PREMIUM' ? 'bg-purple-100 text-purple-600' : 
                      user?.plan === 'STARTAR' ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user?.plan}
                    </div>
                    {user?.subscription?.endDate && (
                      <p className="text-base text-slate-400 mt-2 font-bold italic">Ends: {format(new Date(user.subscription.endDate), "dd MMM, yy")}</p>
                    )}
                  </td>

                  <td className="p-8">
                    <div className={`flex items-center gap-2 font-black text-lg ${user?.status === 'ACTIVE' ? 'text-emerald-500' : 'text-red-500'}`}>
                       <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${user?.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                       {user?.status}
                    </div>
                  </td>

                  <td className="p-8">
                    <p className="text-lg font-bold text-slate-700">{format(new Date(user?.createdAt), "MMM dd, yyyy")}</p>
                    <p className="text-base text-slate-400">{user?.role}</p>
                  </td>

                  <td className="p-8">
                    <div className="flex items-center justify-center gap-3">
                      <button title="View Details" className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-primary hover:text-white transition-all cursor-pointer">
                        <Eye size={20} />
                      </button>
                      <button title="Manage Status" className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-orange-500 hover:text-white transition-all cursor-pointer">
                        <ShieldAlert size={20} />
                      </button>
                      <button title="Delete User" className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {users?.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-2xl font-bold text-slate-300 italic">No users found matching your search.</p>
          </div>
        )}
      </div>

      <TablePagination meta={meta} />
    </div>
  );
}