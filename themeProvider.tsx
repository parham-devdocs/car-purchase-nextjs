"use client"
import React, { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux';

const ThemeProvider = ({children}:{children:ReactNode}) => {
    
    const isDarkMode=useSelector((state:any)=>state.isDarkMode)
    useEffect(() => {
        if (isDarkMode) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
        console.log(document.documentElement.classList)
      }, [isDarkMode]);
    
  return (
    <div>{children}</div>
  )
}

export default ThemeProvider