"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  DollarSign, 
  Zap, 
  TrendingUp, 
  PieChart as PieIcon, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from "recharts";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function FinancialOverviewPage({ overviewData }: { overviewData: any }) {
  const summary = overviewData?.summary;
  const costByType = overviewData?.costByType;
  const usageHistory = overviewData?.usageHistory;

  const stats = [
    {
      label: "Total Revenue",
      value: `৳${summary?.totalRevenueBDT || 0}`,
      trend: "+12.5%",
      isPositive: true,
      icon: <DollarSign size={28} />,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "AI Burn Cost",
      value: `$${summary?.estimatedAiCostUSD?.toFixed(4) || 0}`,
      trend: "+2.1%",
      isPositive: false,
      icon: <Zap size={28} />,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      label: "Net Profit",
      value: `৳${summary?.netProfitBDT?.toFixed(2) || 0}`,
      trend: "+18.2%",
      isPositive: true,
      icon: <Wallet size={28} />,
      color: "text-primary",
      bg: "bg-indigo-50"
    },
    {
      label: "Tokens Used",
      value: summary?.totalTokensUsed?.toLocaleString() || 0,
      trend: "Daily Avg",
      isPositive: true,
      icon: <Activity size={28} />,
      color: "text-secondary",
      bg: "bg-purple-50"
    }
  ];

  const COLORS = ['#6366f1', '#a855f7', '#10b981', '#f59e0b'];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10 pb-20"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-black mb-2 tracking-tight">Financial Intelligence</h1>
          <p className="text-xl text-slate-500 font-medium">Revenue streams vs AI operational expenditures.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="bg-white border border-slate-200 p-8 rounded-[35px] shadow-sm hover:shadow-xl transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 font-bold text-lg ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} {stat.isPositive ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              </div>
            </div>
            <p className="text-lg font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-black">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white border border-slate-200 rounded-[45px] p-10 shadow-sm">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-black flex items-center gap-3">
              <TrendingUp className="text-primary" /> Token Consumption Trend
            </h3>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usageHistory}>
                <defs>
                  <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 14, fontWeight: 600 }}
                  dy={15}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)', padding: '20px' }}
                  itemStyle={{ fontSize: '16px', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="tokens" 
                  stroke="#6366f1" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorTokens)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white border border-slate-200 rounded-[45px] p-10 shadow-sm">
          <h3 className="text-2xl font-black text-black mb-10 flex items-center gap-3">
            <PieIcon className="text-secondary" /> Cost by Tool
          </h3>
          <div className="h-[300px] w-full mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costByType} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="docType" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: '#1e293b', fontSize: 14, fontWeight: 700 }}
                  width={120}
                />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="_sum.totalTokens" radius={[0, 10, 10, 0]} barSize={25}>
                  {costByType?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4">
            {costByType?.map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-3">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                   <span className="font-bold text-slate-700">{item?.docType}</span>
                </div>
                <span className="font-black text-black">${item?._sum?.costInUSD?.toFixed(4)}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-slate-900 rounded-[50px] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-black italic">Business Sustainability</h2>
            <p className="text-xl text-slate-400 max-w-xl">Your current average generation cost is <span className="text-primary font-bold">${(summary?.estimatedAiCostUSD / summary?.totalGenerations)?.toFixed(5)}</span>. Your subscription margins are currently optimized at <span className="text-emerald-400 font-bold">96.2%</span>.</p>
         </div>
         <button className="bg-white text-black px-10 py-5 rounded-2xl font-black text-xl hover:bg-primary hover:text-white transition-all cursor-pointer shadow-2xl">
            Export Audit Log
         </button>
      </motion.div>
    </motion.div>
  );
}