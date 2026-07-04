"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getAllUsers = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/admin/users${queryString ? `?${queryString}` : ""}`,
    );
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
};

export const getPublicStats = async () => {
  try {
    const res = await serverFetch.get(`/admin/public-stats`);
    const result = await res.json();
    return result?.data || null;
  } catch (error: any) {
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while getting public stats"
      }`,
    };
  }
};
