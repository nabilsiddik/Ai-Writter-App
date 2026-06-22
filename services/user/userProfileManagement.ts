"use server";
import { serverFetch } from "@/lib/serverFetch";
import { revalidatePath } from "next/cache";

export const updateProfileAction = async (
  _currentState: any,
  formData: FormData,
) => {
  try {
    const rawData = {
      fullName: formData.get("fullName"),
      phoneNumber: formData.get("phoneNumber"),
      address: formData.get("address"),
    };

    const filteredData = Object.fromEntries(
      Object.entries(rawData).filter(([_, value]) => value !== null),
    );

    const apiFormData = new FormData();
    if (Object.keys(filteredData).length > 0) {
      apiFormData.append("data", JSON.stringify(filteredData));
    }

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      apiFormData.append("file", file);
    }

    const res = await serverFetch.patch("/user/update-profile", {
      body: apiFormData,
    });
    const result = await res.json();

    if (result.success) revalidatePath("/account");
    return result || null;
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export const getUserProfile = async () => {
  try {
    const res = await serverFetch.get("/user/profile");
    const user = await res.json();
    return user?.data || null;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error?.message
          : "Something went wrong while getting user profile",
    };
  }
};

export const deleteAccountAction = async () => {
  try {
    const res = await serverFetch.delete("/user/delete-account");
    return await res.json();
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};
