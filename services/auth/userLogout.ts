'use server'
import { serverFetch } from "@/lib/serverFetch"
import { deleteCookie, getCookie } from "@/services/auth/tokenHandler"

  export const userLogout = async () => {
    const logoutRes = await serverFetch.post('/auth/logout')
    const data = await logoutRes.json();
    await deleteCookie('accessToken')
    await deleteCookie('refreshToken')
    
    const accessToken = await getCookie('accessToken')
    const refreshToken = await getCookie('refreshToken')

    if(accessToken || refreshToken){
      return {
        success: false,
      }
    }

    return {
      success: true
    }
  }