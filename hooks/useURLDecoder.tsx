"use client"

import { useEffect, useState } from 'react'

const useURLDecoder = (location:string) => {
    const [decodedLocation, setDecoded] = useState<string | null>(null);
  
    useEffect(() => {
    
        const decoded = decodeURIComponent(location);
        setDecoded(decoded);
      
    }, [location]);
  
  return {decodedLocation}
}

export default useURLDecoder