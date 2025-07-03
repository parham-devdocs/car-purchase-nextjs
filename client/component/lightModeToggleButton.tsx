"use client"
import { setIsDarkMode }  from "@/redux/store";
import { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const ToggleButton = () => {
    const [toggleIsOn,setToggleIsOn]=useState(true)
    const isDarkMode = useSelector((state:any) => state.isDarkMode)
const dispatch=useDispatch()
  useEffect(()=>{
     setIsDarkMode(false)
    console.log(isDarkMode)
    dispatch(setIsDarkMode(!toggleIsOn))
  },[toggleIsOn])
  return (
    <button className={` cursor-pointer w-16 h-8 rounded-full transition-all duration-500 relative border-2 ${toggleIsOn ? "  bg-violet-500 border-white" : " border-violet-500 bg-white"}`} onClick={()=>setToggleIsOn(()=>!toggleIsOn)}>
     <div className={` absolute w-6 h-6 flex justify-center items-center rounded-full  top-[2.5px] ${toggleIsOn ? " bg-white right-1.5" : " bg-violet-500 left-1.5"} `}>
      { toggleIsOn ? <BsSun/> : <BsMoon className=" text-white"/> }
      
      </div>
        
    </button>
  )
}

export default ToggleButton