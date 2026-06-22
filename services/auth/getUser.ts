"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getUser = async () => {
  try {
    const res = await serverFetch.get(
      `/user/me`
    );
    const result = await res.json();
    return result?.data || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while getting user",
    };
  }
};