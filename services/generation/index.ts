"use server";
import { serverFetch } from "@/lib/serverFetch";

export const getMyGenerations = async () => {
  try {
    const res = await serverFetch.get(`/document/my-generations`);
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

export const getGenerationDetails = async (generationId: string) => {
  try {
    const res = await serverFetch.get(
      `/document/generation-details/${generationId}`,
    );
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching generation details.",
    };
  }
};

export const generateContent = async (payload: any) => {
  try {
    const res = await serverFetch.post(`/document/generate-content`, {
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
          : "Something went wrong while generating content.",
    };
  }
};

export const generationDetails = async (id: string) => {
  try {
    const res = await serverFetch.get(`/assignment/${id}`);
    const result = await res.json();
    console.log(result, "my result");
    return result?.data || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching my generation details.",
    };
  }
};

export const generatePDF = async (id: string, payload: any) => {
  try {
    const res = await serverFetch.post(`/document/${id}/generate-pdf`, {
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

export const openInGoogleDoc = async (id: string, payload: any) => {
  try {
    const res = await serverFetch.post(`/document/${id}/export-google-docs`, {
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
          : "Something went wrong while opening in google doc.",
    };
  }
};

export const exportMsDocx = async (id: string, payload: any) => {
  try {
    const res = await serverFetch.post(`/document/${id}/download-docx`, {
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
      },
    });
    const blob = await res.blob();
    return blob || null;
  } catch (error: any) {
    console.error("Docx Export Error:", error);
    return null;
  }
};
