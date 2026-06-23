"use server";
import { serverFetch } from "@/lib/serverFetch";

export const generateAssignment = async (payload: any) => {
  console.log(payload, "payyyyy");
  try {
    const res = await serverFetch.post(`/assignment/generate-assignment`, {
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while generating assignment.",
    };
  }
};

export const generatePdf = async (assignId: string, payload: any) => {
  console.log(payload, assignId, "payyyyy");
  try {
    const res = await serverFetch.post(`/assignment/${assignId}/generate-pdf`, {
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while generating pdf.",
    };
  }
};
