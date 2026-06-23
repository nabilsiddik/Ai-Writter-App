"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getMyGenerations = async () => {
  try {
    const res = await serverFetch.get(`/assignment/my-generations`);
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching my generations.",
    };
  }
};
