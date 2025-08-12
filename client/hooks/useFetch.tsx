"use client"

import axiosInstance from '@/utils/axios'
import { useEffect, useState } from 'react'
type FetchData<T>={
    data: T | null
    loading:boolean
    error:string | null
    refetch: () => void; 
    statusCode:number |null

}
function UseFetch <T>({api, method="get",body,clickHandler}:{api:string,method?:"get" | "put" | "delete" |"post",body?:any,clickHandler?:()=>void}):FetchData<T>  {
    const [data,setData] = useState<T|null>(null);
    const [statusCode,setStatusCode]=useState<number| null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const fetchData = async () => {
      try {
       setLoading(true)
        const res =await axiosInstance[method](api,body)
       setStatusCode(res.status)
        setData(()=>res.data.data)
      } catch (err:any) {
        const statusCode=err.status
        setStatusCode(statusCode)

        if (statusCode===401) {
          setError("login first!")
          return
        }
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    if (clickHandler) {
      fetchData()
      
    }
    
    useEffect(() => {
       if (!clickHandler) {
        fetchData();
       }
      }, [api]);
     
  return {data,loading,error,refetch:fetchData,statusCode}
}

export default UseFetch