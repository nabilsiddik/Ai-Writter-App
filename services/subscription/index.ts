"use server";
import { serverFetch } from "@/lib/serverFetch";

export const subscribeToPlan = async (priceId: string) => {
  try {
    const res = await serverFetch.post(`/stripe/create-subscription`, {
      body: JSON.stringify({
        priceId,
      }),
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
          : "Something went wrong while subscribing.",
    };
  }
};
