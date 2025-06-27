"use client"

import { useEffect, useState } from 'react'
type FetchData<T>={
    data: T | null
    loading:boolean
    error:string | null
}
function UseFetch <T>({api}:{api:string}):FetchData<T>  {
    const [data,setData] = useState<T|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
   
    useEffect(() => {
        const fetchData = async () => {
          try {
           setLoading(true)
            const res = await fetch(api);
            if (!res.ok) throw new Error("Failed to fetch data");
            const result = await res.json();
            setTimeout(() => {
              setData(result); // Save fetched data to state
            }, 2000);
          } catch (err) {
            setError("Could not load reservation details.");
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, [api]);
     
  return {data,loading,error}
}

export default UseFetch