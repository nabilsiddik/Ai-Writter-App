// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { 
//   TrendingUp, 
//   Users, 
//   FileCode, 
//   DollarSign, 
//   Zap, 
//   AlertCircle,
//   ArrowUpRight,
//   Activity,
//   ShieldCheck
// } from "lucide-react";

// import { Loader2 } from "lucide-react";

// const slideUp = {
//   hidden: { opacity: 0, y: 15 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
// };

// export default function OverviewPage({overviewData}: {
//     overviewData: any
// }) {
//     console.log(overviewData, 'data');
//   const [stats, setStats] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         // const res = await getAdminStats();
//         const res: any = {}
//         if (res?.success) setStats(res?.data);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStats();
//   }, []);

//   if (loading) return (
//     <div className="flex h-[60vh] items-center justify-center">
//       <Loader2 className="animate-spin text-primary" size={48} />
//     </div>
//   );

//   const statCards = [
//     { 
//       label: "Total Revenue", 
//       value: `৳${stats?.summary?.totalRevenueBDT || 0}`, 
//       icon: <DollarSign />, 
//       color: "text-emerald-600", 
//       bg: "bg-emerald-50" 
//     },
//     { 
//       label: "AI Token Cost", 
//       value: `$${stats?.summary?.estimatedAiCostUSD?.toFixed(2) || 0}`, 
//       icon: <Zap />, 
//       color: "text-orange-600", 
//       bg: "bg-orange-50" 
//     },
//     { 
//       label: "Net Profit (Est)", 
//       value: `৳${stats?.summary?.netProfitBDT?.toFixed(0) || 0}`, 
//       icon: <TrendingUp />, 
//       color: "text-primary", 
//       bg: "bg-indigo-50" 
//     },
//     { 
//       label: "Total Generations", 
//       value: stats?.summary?.totalGenerations || 0, 
//       icon: <FileCode />, 
//       color: "text-purple-600", 
//       bg: "bg-purple-50" 
//     },
//   ];

//   return (
//     <div className="space-y-12">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-black text-black mb-2">System Overview</h1>
//         <p className="text-xl text-slate-500 font-medium">Tracking AI consumption and financial performance.</p>
//       </div>

//       {/* Metric Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards?.map((card, idx) => (
//           <motion.div
//             key={idx}
//             variants={slideUp}
//             initial="hidden"
//             animate="visible"
//             transition={{ delay: idx * 0.1 }}
//             className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all"
//           >
//             <div className="flex justify-between items-start mb-6">
//               {/* <div className={`p-3 ${card?.bg} ${card?.color} rounded-xl`}>
//                 {React.cloneElement(card?.icon as React.ReactElement, { size: 28 })}
//               </div> */}
//               <Activity className="text-slate-200" size={20} />
//             </div>
//             <p className="text-lg font-bold text-slate-500 uppercase tracking-tight mb-1">{card?.label}</p>
//             <h3 className="text-3xl font-black text-black">{card?.value}</h3>
//           </motion.div>
//         ))}
//       </div>

//       {/* Detailed Breakdown Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
//         {/* Cost by Document Type */}
//         <motion.div 
//           variants={slideUp} initial="hidden" animate="visible"
//           className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm"
//         >
//           <h3 className="text-xl font-black text-black mb-8 flex items-center gap-2">
//             <Zap className="text-primary" size={20} /> Cost Distribution
//           </h3>
//           <div className="space-y-6">
//             {stats?.costByType?.map((item: any, i: number) => (
//               <div key={i} className="group">
//                 <div className="flex justify-between mb-3">
//                   <span className="text-lg font-bold text-slate-700">{item?.docType}</span>
//                   <span className="text-lg font-black text-black">${item?._sum?.costInUSD?.toFixed(3)}</span>
//                 </div>
//                 <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
//                   <motion.div 
//                     initial={{ width: 0 }}
//                     animate={{ width: `${(item?._sum?.costInUSD / stats?.summary?.estimatedAiCostUSD) * 100}%` }}
//                     className="bg-primary h-full rounded-full"
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </motion.div>

//         {/* Quick Actions / System Health */}
//         <motion.div 
//           variants={slideUp} initial="hidden" animate="visible"
//           className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl flex flex-col justify-between"
//         >
//           <div>
//             <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
//               <ShieldCheck size={20} className="text-primary" /> Admin Quick Actions
//             </h3>
//             <div className="space-y-4">
//               <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-left flex items-center justify-between group cursor-pointer transition-all">
//                  <span className="font-bold">Global Maintenance</span>
//                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white" />
//               </button>
//               <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl text-left flex items-center justify-between group cursor-pointer transition-all">
//                  <span className="font-bold">Flush Redis Cache</span>
//                  <ArrowUpRight size={18} className="text-slate-500 group-hover:text-white" />
//               </button>
//             </div>
//           </div>

//           <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-2xl">
//              <div className="flex items-center gap-3 mb-2">
//                 <AlertCircle className="text-primary" size={20} />
//                 <span className="font-black uppercase tracking-tighter">System Health</span>
//              </div>
//              <p className="text-slate-400 leading-snug">All AI nodes are operational. Latency is within normal bounds (450ms).</p>
//           </div>
//         </motion.div>

//       </div>
//     </div>
//   );
// }


"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  Users, 
  FileText, 
  Trophy, 
  TrendingUp, 
  ShieldCheck,
  User as UserIcon,
  ChevronRight,
  Activity
} from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function OverviewPage({ overviewData }: { overviewData: any }) {
  const metrics = overviewData?.metrics;
  const plans = overviewData?.plans;
  const topUsers = overviewData?.topUsers;

  const statCards = [
    { 
      label: "Total Users", 
      value: metrics?.totalUsers || 0, 
      sub: `${metrics?.newUsersToday || 0} joined today`,
      icon: <Users size={28} />, 
      accent: "text-blue-600", 
      bg: "bg-blue-50" 
    },
    { 
      label: "Generations", 
      value: metrics?.totalGenerations || 0, 
      sub: `${metrics?.generationsToday || 0} in last 24h`,
      icon: <FileText size={28} />, 
      accent: "text-primary", 
      bg: "bg-indigo-50" 
    },
    { 
      label: "System Health", 
      value: metrics?.failedGenerations === 0 ? "Perfect" : "Issues", 
      sub: `${metrics?.failedGenerations || 0} failed attempts`,
      icon: <ShieldCheck size={28} />, 
      accent: metrics?.failedGenerations === 0 ? "text-emerald-600" : "text-red-600", 
      bg: metrics?.failedGenerations === 0 ? "bg-emerald-50" : "bg-red-50" 
    },
    { 
      label: "Growth Rate", 
      value: "14.2%", 
      sub: "Average weekly increase",
      icon: <TrendingUp size={28} />, 
      accent: "text-secondary", 
      bg: "bg-purple-50" 
    },
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-12 pb-20"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">Executive Dashboard</h1>
          <p className="text-xl text-slate-500 font-medium text-wrap max-w-2xl leading-relaxed">Real-time system performance and user distribution analytics.</p>
        </div>
        <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-black transition-all cursor-pointer shadow-lg shadow-slate-200">
           Refresh Data <Activity size={20} />
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards?.map((card, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm hover:shadow-xl hover:border-primary/10 transition-all group"
          >
            <div className={`w-16 h-16 ${card.bg} ${card.accent} rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110`}>
              {card.icon}
            </div>
            <p className="text-lg font-bold text-slate-400 uppercase tracking-[0.15em] mb-2">{card.label}</p>
            <h3 className="text-4xl font-black text-black mb-2">{card.value}</h3>
            <p className="text-lg text-slate-500 font-medium">{card.sub}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-slate-200 rounded-[45px] p-10 md:p-14 shadow-sm">
          <h3 className="text-2xl font-black text-black mb-12 flex items-center gap-4">
             <Trophy className="text-primary" size={32} /> Subscription Distribution
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {plans?.map((p: any, i: number) => {
               const percentage = metrics?.totalUsers > 0 ? ((p?._count?.id / metrics?.totalUsers) * 100).toFixed(0) : 0;
               return (
                <div key={i} className="flex flex-col items-center text-center group">
                   <div className="relative w-36 h-36 flex items-center justify-center mb-8 transition-transform group-hover:scale-105">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="72" cy="72" r="65" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-50" />
                        <motion.circle 
                          cx="72" cy="72" r="65" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray={408}
                          initial={{ strokeDashoffset: 408 }}
                          animate={{ strokeDashoffset: 408 - (408 * Number(percentage)) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={p.plan === 'PREMIUM' ? 'text-secondary' : p.plan === 'STARTAR' ? 'text-primary' : 'text-slate-300'}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-3xl font-black">{percentage}%</span>
                   </div>
                   <h4 className="text-2xl font-black text-black mb-1">{p.plan}</h4>
                   <p className="text-xl text-slate-500 font-medium">{p._count?.id} Active Users</p>
                </div>
               )
            })}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-slate-50 border border-slate-200 rounded-[45px] p-10 md:p-12 shadow-sm">
           <h3 className="text-2xl font-black text-black mb-10 flex items-center gap-4">
             <Activity className="text-secondary" size={32} /> Top Performers
           </h3>
           <div className="space-y-6">
              {topUsers?.map((user: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl group hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center gap-4">
                    {user?.user?.profilePhoto ? (
                       <img src={user.user.profilePhoto} className="w-14 h-14 rounded-2xl object-cover" alt="" />
                    ) : (
                       <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 border border-slate-100">
                          <UserIcon size={28} />
                       </div>
                    )}
                    <div>
                      <p className="text-xl font-black text-black leading-tight mb-1">{user?.user?.fullName || "Member"}</p>
                      <span className={`text-base font-bold uppercase tracking-widest ${user?.user?.plan === 'PREMIUM' ? 'text-secondary' : 'text-primary'}`}>
                        {user?.user?.plan}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                     <p className="text-2xl font-black text-black">{user?._count?.id}</p>
                     <p className="text-base font-bold text-slate-400 uppercase tracking-tighter">Docs</p>
                  </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-5 border-2 border-dashed border-slate-200 text-slate-400 font-bold text-lg rounded-3xl hover:border-primary hover:text-primary hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-3">
              Manage Users <ChevronRight size={22} />
           </button>
        </motion.div>
      </div>
    </motion.div>
  );
}