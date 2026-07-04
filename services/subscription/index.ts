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

export const bkashPayment = async ({
  bkashNumber,
  transactionId,
  planName,
}: {
  bkashNumber: string;
  transactionId: string;
  planName: "STARTAR" | "PREMIUM" | undefined;
}) => {
  console.log({
    bkashNumber,
    transactionId,
    planName,
  });
  try {
    const res = await serverFetch.post(`/payment/bkash-payment`, {
      body: JSON.stringify({
        bkashNumber,
        transactionId,
        planName,
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
          : "Something went wrong while bkash payment.",
    };
  }
};

export const updateBkashPayment = async ({
  transactionId,
  status,
}: {
  transactionId: string;
  status: "APPROVE" | "REJECT";
}) => {
  try {
    const res = await serverFetch.patch(`/payment/bkash-approve`, {
      body: JSON.stringify({
        transactionId,
        status,
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
          : "Something went wrong while updating bkash payment.",
    };
  }
};
