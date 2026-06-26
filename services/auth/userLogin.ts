"use server";
import { redirect } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.zodSchema";
import { parse } from "cookie";
import { setCookie } from "@/services/auth/tokenHandler";
import { UserRole } from "@/types/user.interface";
import { serverFetch } from "@/lib/serverFetch";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
} from "@/lib/authUtils";

export const userLogin = async (data: {
  email: string;
  password: string;
  redirectTo?: string;
}): Promise<any> => {
  const redirectTo = data?.redirectTo || null;
  let accessTokenObj: null | any = null;
  let refreshTokenObj: null | any = null;
  try {
    const payload = {
      email: data?.email,
      password: data?.password,
    };

    if (zodValidator(payload, loginValidationZodSchema).success === false) {
      return zodValidator(payload, loginValidationZodSchema);
    }

    const validatedPayload: any = zodValidator(
      payload,
      loginValidationZodSchema,
    )?.data;

    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(validatedPayload),
      headers: {
        "content-type": "application/json",
      },
    });

    const result = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObj = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObj = parsedCookie;
        }
      });
    } else {
      throw new Error("No set-cookie header found");
    }

    if (!accessTokenObj) {
      throw new Error("Access Token object not found in cookies");
    }

    if (!refreshTokenObj) {
      throw new Error("Refresh Token object not found in cookies");
    }

    // Set acceess token to browser cookie
    await setCookie("accessToken", accessTokenObj.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObj["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObj.Path || "/",
      sameSite: accessTokenObj["SameSite"] || "none",
    });

    // Set refresh token to browser cookie
    await setCookie("refreshToken", refreshTokenObj.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObj["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObj.Path || "/",
      sameSite: refreshTokenObj["SameSite"] || "none",
    });

    // Verify token
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObj.accessToken,
      process.env.JWT_ACCESS_SECRET as string,
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if (!result.success) {
      throw new Error(result?.message || "Login failed");
    }

    if (redirectTo) {
      const redirectPath = redirectTo.toString();
      const safeRedirect = redirectPath.startsWith("/")
        ? redirectPath
        : `/${redirectPath}`;

      if (isValidRedirectForRole(redirectPath, userRole)) {
        redirect(`${safeRedirect}?login=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?login=true`);
      }
    } else {
      redirect(`/?login=true`);
    }
  } catch (err: any) {
    if (err?.digest?.startsWith("NEXT_REDIRECT")) {
      throw err;
    }
    return {
      success: false,
      error: err,
      message:
        process.env.NEXT_PUBLIC_NODE_ENV === "development"
          ? err?.message
          : err?.message || "Login Failed",
    };
  }
};

export const googleLogin = async () => {
  try {
    const res = await serverFetch.get(`/auth/google`);
    const result = await res.json();
    return result || null;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while google login.",
    };
  }
};
