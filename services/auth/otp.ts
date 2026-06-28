"use server";
import { serverFetch } from "@/lib/serverFetch";

export const verifyOtp = async (payload: {
  email: string, otp: string, type: string
}) => {
  try {
    const res = await serverFetch.post(
      `/auth/verify-email`, {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while verifying otp",
    };
  }
};


export const resendOtp = async (payload: {
  email: string, type: string
}) => {
  try {
    const res = await serverFetch.post(
      `/auth/resend-otp`, {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while resend otp",
    };
  }
};