"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getOverviewData = async () => {
  try {
    const res = await serverFetch.get(`/admin/dashboard-stats`);
    const result = await res.json();
    return result?.data || null
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};


export const getFinancialOverview = async () => {
  try {
    const res = await serverFetch.get(`/admin/financial-overview`);
    const result = await res.json();
    return result?.data || null
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
