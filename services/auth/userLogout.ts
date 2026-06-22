'use server'
import { serverFetch } from "@/lib/serverFetch"
import { deleteCookie } from "@/services/auth/tokenHandler"

  export const userLogout = async () => {
    const logoutRes = await serverFetch.post('/auth/logout')
    const data = await logoutRes.json();
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
    return data
  }