"use server";

import { revalidatePath } from "next/cache";
import { serverFetch } from "@/lib/serverFetch";

export const createProduct = async (
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      sku: formData.get("sku") || null,
      shortDesc: formData.get("shortDesc"),
      longDesc: formData.get("longDesc"),
      regularPrice: formData.get("regularPrice") ? Number(formData.get("regularPrice")) : null,
      salePrice: Number(formData.get("salePrice")),
      unit: formData.get("unit"),
      stockStatus: formData.get("stockStatus"),
      expectedDelivery: formData.get("expectedDelivery"),
      stockQuantity: Number(formData.get("stockQuantity")),
      categoryId: formData.get("categoryId"),
      isSpecialOffer: formData.get("isSpecialOffer") === "true",
      isFeatured: formData.get("isFeatured") === "true",
    };

    const apiFormData = new FormData();
    apiFormData.append("data", JSON.stringify(payload));

    // Thumbnail upload
    const thumbnail = formData.get("thumbnail");
    if (thumbnail instanceof File && thumbnail.size > 0) {
      apiFormData.append("thumbnail", thumbnail);
    }

    // Gallery upload (Multiple)
    const galleryFiles = formData.getAll("gallery");
    galleryFiles.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("gallery", file);
      }
    });

    const res = await serverFetch.post("/product", {
      body: apiFormData,
    });

    const result = await res.json();

    if (result.success) {
      revalidatePath("/dashboard/products");
    }

    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to create product",
    };
  }
};

export const getAllProducts = async (queryString: string = "")=> {
  try {
    const res = await serverFetch.get(`/product?${queryString}`);
    const result = await res.json();

    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something Went Wrong while fetching products.",
    };
  }
};


export const getSingleProduct = async (productId: string)=> {
  try {
    const res = await serverFetch.get(`/product/${productId}`);
    const result = await res.json();

    return result?.data || null;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Something Went Wrong while fetching single products.",
    };
  }
};


export const updateProduct = async (
  id: string,
  _currentState: any,
  formData: FormData
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      sku: formData.get("sku") || null,
      shortDesc: formData.get("shortDesc"),
      longDesc: formData.get("longDesc"),
      regularPrice: formData.get("regularPrice") ? Number(formData.get("regularPrice")) : null,
      salePrice: Number(formData.get("salePrice")),
      unit: formData.get("unit"),
      stockQuantity: Number(formData.get("stockQuantity")),
      categoryId: formData.get("categoryId"),
      isSpecialOffer: formData.get("isSpecialOffer") === "true",
      isFeatured: formData.get("isFeatured") === "true",
    };

    const apiFormData = new FormData();
    apiFormData.append("data", JSON.stringify(payload));

    const thumbnail = formData.get("thumbnail");
    if (thumbnail instanceof File && thumbnail.size > 0) {
      apiFormData.append("thumbnail", thumbnail);
    }

    const galleryFiles = formData.getAll("gallery");
    galleryFiles.forEach((file) => {
      if (file instanceof File && file.size > 0) {
        apiFormData.append("gallery", file);
      }
    });

    const res = await serverFetch.patch(`/product/${id}`, {
      body: apiFormData,
    });

    const result = await res.json();
    if (result.success) revalidatePath("/dashboard/products");
    
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to update product",
    };
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const res = await serverFetch.delete(`/product/${id}`);

    const result = await res.json();
    if (result.success) revalidatePath("/dashboard/products");
    
    return result;
  } catch (error: any) {
    return {
      success: false,
      message: process.env.NODE_ENV === "development" ? error.message : "Failed to Delete product",
    };
  }
};