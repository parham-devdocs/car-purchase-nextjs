"use client"
import axiosInstance from '@/utils/axios';
import getAllCookies from '@/utils/gettAllCookies';
import { useEffect, useState } from 'react'

const useAuthorize = () => {
  const [role, setRole] = useState<"admin" | "user" | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    authorize()
  }, [])

  async function authorize() {
    setLoading(true)
    const cookies = getAllCookies();
    
    // Check if accessToken exists
    if (!cookies["accessToken"]) {
      setError("No access token found")
      setLoading(false)
      return
    }

    try {
      const res = await axiosInstance.get("/auth", {
        headers: { 
          "Authorization": `Bearer ${cookies["accessToken"]}` 
        }
      });
      console.log(res.data)

      const userRole = res.data.userRole || null;
      setRole(userRole)
      
    } catch (error: any) {
      console.error("Authorization error:", error)
      setError(error.response?.data?.message || error.message || "Authorization failed")
      setRole(null)
    } finally {
      setLoading(false)
    }
  }

  return { role, error, loading, refetch: authorize }
}

export default useAuthorize