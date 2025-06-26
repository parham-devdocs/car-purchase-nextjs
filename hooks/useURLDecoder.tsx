"use client"

import { useEffect, useState } from 'react'

const useURLDecoder = (url:string) => {
    const [decodedURL, setDecodedURL] = useState<string | null>(null);
  
    useEffect(() => {
    
        const decoded = decodeURIComponent(url);
        setDecodedURL(decoded);
      
    }, [location]);
  
  return {decodedURL}
}

export default useURLDecoder