"use server";

import { cookies } from "next/headers";

export const setAuthSession = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });

  return { success: true };
};
