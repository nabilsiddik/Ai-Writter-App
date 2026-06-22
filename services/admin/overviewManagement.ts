"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getOverviewData = async (type: string = 'monthly') => {
  try {
    const res = await serverFetch.get(`/admin/overview?chartType=${type}`);
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const downloadReportAction = async () => {
  try {
    const res = await serverFetch.get("/admin/export/overview-report");
    const result = await res.json()

    console.log(result);
    
    if (!res.ok) throw new Error("Failed to fetch PDF");

    const arrayBuffer = await res.arrayBuffer();
    
    return {
      success: true,
      data: Buffer.from(arrayBuffer).toString('base64')
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};