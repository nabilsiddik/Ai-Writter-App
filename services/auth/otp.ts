"use server";
import { serverFetch } from "@/lib/serverFetch";
import { setCookie } from "./tokenHandler";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { parse } from "cookie";

export const verifyOtp = async (payload: {
  email: string, otp: string, type: string
}) => {

    let accessTokenObj: null | any = null;
  let refreshTokenObj: null | any = null;

  try {
    const res = await serverFetch.post(
      `/auth/verify-email`, {
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

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