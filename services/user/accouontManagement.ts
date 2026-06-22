"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getUserAccountOverview = async () => {
  try {
    const res = await serverFetch.get("/user/account/overview");
    const result = await res.json();
    return result?.data || null;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
