"use client"
import React, { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'
import { MdKeyboardArrowDown,MdKeyboardArrowUp } from "react-icons/md";
interface WeekRange {
    startDate: string; 
    endDate: string;       
    startDay: string;     
    endDay: string;      
    hours: string;        
  }
const availableDates:WeekRange[]=[
    {
      "startDate": "2025-06-10",
      "endDate": "2025-06-16",
      "startDay": "Tuesday",
      "endDay": "Monday",
      "hours": "24 hours"
    },
    {
      "startDate": "2025-06-17",
      "endDate": "2025-06-23",
      "startDay": "Tuesday",
      "endDay": "Monday",
      "hours": "24 hours"
    },
    {
      "startDate": "2025-06-24",
      "endDate": "2025-06-30",
      "startDay": "Tuesday",
      "endDay": "Monday",
      "hours": "24 hours"
    },
    {
      "startDate": "2025-07-01",
      "endDate": "2025-07-07",
      "startDay": "Tuesday",
      "endDay": "Monday",
      "hours": "24 hours"
    },
    {
      "startDate": "2025-07-08",
      "endDate": "2025-07-14",
      "startDay": "Tuesday",
      "endDay": "Monday",
      "hours": "24 hours"
    }
  ]
const ScheduleDropDown = () => {
    const [dropdownIsOpen,setDropDownIsOpen]=useState(false)
    const [dateIndex,setDateIndex]=useState(availableDates.length)
    const [date,setDate]=useState<WeekRange | null>()
    useEffect(()=>{
setDate(availableDates[dateIndex-1])
console.log(dateIndex)
    },[dateIndex])
  return (
    <div className="flex items-center justify-between px-2 py-4 border-t-[2px] border-white relative">
    <div className="flex items-center space-x-2">
      <span className="flex items-center justify-center p-2 bg-yellow-500 text-white rounded-md">
        <FaClock className="w-5 h-5" />
      </span>
      <span className="text-sm text-gray-800">
        Todays Hours <span className=' text-yellow-300'>24 Hours</span> 
      </span>
    </div>
   {dropdownIsOpen ? <MdKeyboardArrowUp className="text-yellow-500 text-xl hover:text-yellow-600 cursor-pointer" onClick={()=>setDropDownIsOpen(false)}/> : <MdKeyboardArrowDown className="text-yellow-500 text-xl hover:text-yellow-600 cursor-pointer" onClick={()=>setDropDownIsOpen(true)} /> } 
   {dropdownIsOpen && (
  <div
  className={`
    absolute z-10 w-full bg-white rounded-md shadow-lg top-14 p-4 border border-gray-200
    overflow-hidden `}
>  <h3 className="text-sm font-semibold text-gray-700 mb-2">
      Hours For {date?.startDate} - {date?.endDate}
    </h3>
    
    <div className="flex items-center justify-between py-2 border-b border-gray-100">
      <p className="text-blue-500">{date?.startDay} - {date?.endDay}</p>
      <p className="text-gray-800 font-medium"> <span className=' p-1 rounded-full bg-blue-500'>24</span> hours</p>
    </div>

    <div className="flex items-center mt-3 space-x-2">
  {/* Previous Button - Only shows when applicable */}
  {dateIndex > 1 && (
    <button
      onClick={() => setDateIndex(prev => (prev > 0 ? prev - 1 : prev))}
      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
    >
      Previous
    </button>
  )}

  {/* Next Button - Always aligned to the right */}
  <div className="ml-auto">
    {dateIndex < availableDates.length && (
      <button
        onClick={() => setDateIndex(prev => (prev < availableDates.length ? prev + 1 : prev))}
        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Next
      </button>
    )}
  </div>
</div>
  </div>
)}
  </div>
  
  )
}

export default ScheduleDropDown