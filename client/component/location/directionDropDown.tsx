"use client"
import React, {  useState } from 'react'
import { MdKeyboardArrowDown,MdKeyboardArrowUp } from "react-icons/md";
import { FaBusSimple } from "react-icons/fa6";
const DirectionDropDown = () => {
    const [dropdownIsOpen,setDropDownIsOpen]=useState(false)
const [direction,setDirection]=useState("123 Main St, Cityville")
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t-[2px] border-white relative">
    <div className="flex items-center space-x-2">
      <span className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded-md">
        <FaBusSimple className="w-5 h-5" />
      </span>
      <span className="text-sm text-gray-800">
        Direction From Terminal
      </span>
    </div>
   {dropdownIsOpen ? <MdKeyboardArrowUp className="text-yellow-500 text-xl hover:text-yellow-600 cursor-pointer" onClick={()=>setDropDownIsOpen(false)}/> : <MdKeyboardArrowDown className="text-yellow-500 text-xl hover:text-yellow-600 cursor-pointer" onClick={()=>setDropDownIsOpen(true)} /> } 
   {dropdownIsOpen && (
  <div
  className={`
    absolute z-10 w-full bg-white rounded-md shadow-lg top-14 p-4 border border-gray-200 overflow-hidden`}> 
 <h3 className={`text-sm font-semibold text-gray-700 mb-2`}>
     {direction}
    </h3>
  
  </div>
  
  )
}
</div>
  )}

export default DirectionDropDown