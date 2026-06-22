"use server";
import { serverFetch } from "@/lib/serverFetch";


export const facebookLogin = async () => {
  try {
    const res = await serverFetch.get(
      `/auth/facebook`
    );
    const result = await res.json();
    return result?.data || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while redirecting to facebook login",
    };
  }
};