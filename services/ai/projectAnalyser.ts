"use server";
import { serverFetch } from "@/lib/serverFetch";

export const analyzeProject = async (prompt: string) => {
    if(!prompt) {
        console.log('No prompt provided');
        return
    }

    const payload = {
        prompt
    }

  try {
    const res = await serverFetch.post(`/analysis`, {
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    });
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while getting analysis result",
    };
  }
};