"use server";
import { serverFetch } from "@/lib/serverFetch";

const getLogedInUser = async () => {
  try {
    const res = await serverFetch.get("/user/me");
    const user = await res.json();
    return user?.data || null;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Something went wrong while getting logedin user",
    };
  }
};

export default getLogedInUser;

export const getUserById = async (id?: string) => {
  try {
    const res = await serverFetch.get(`/user/${id}`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
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

export const getMyProfile = async () => {
  try {
    const res = await serverFetch.get(`/user/profile`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
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

// Get top rated travelers
export const getTopRatedUser = async () => {
  try {
    const res = await serverFetch.get(`/user/top-rated`);
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
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

// Get all travelers
export const getAllTravelers = async () => {
  try {
    const res = await serverFetch.get(`/user/travelers`);
    const result = await res.json();
    return result?.data || [];
  } catch (error: any) {
    console.log(error);
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

// soft delete user
export const softDeleteUser = async (userId: string) => {
  try {
    const res = await serverFetch.delete(`/user`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });
    const result = await res.json();
    return result;
  } catch (error: any) {
    console.log(error);
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