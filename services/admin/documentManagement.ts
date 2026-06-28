"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getAllDocuments = async (queryString?: string) => {
  try {
    const res = await serverFetch.get(
      `/admin/documents${queryString ? `?${queryString}` : ""}`
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
