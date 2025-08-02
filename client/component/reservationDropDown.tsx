"use client"
import axiosInstance from '@/utils/axios'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { BsAirplaneFill } from "react-icons/bs";
import { FaBuilding, FaLock } from "react-icons/fa";
type CountryType = {
    id: number;
    locationType: "Hotel" | "Airport";
    name: string;
    country: string;
    city: string;
    continent: string;
    address: string;
  };
  
  type Location = Record<string, CountryType[]>;
  
  type ResponseType = {
    locations: Location;
  };
  
  const ReservationDropDown = ({ country,label,color,id, defaultValue, ...props }: { 
    country?: string; 
    defaultValue?: string; 
    label:string
    color?:string
    id:string
    [key: string]: any  // 👈 Accept any additional props
  }) => {
    const [availableLocations,setAvailableLocations]=useState<ResponseType | CountryType[] | null>(null)
    useEffect(()=>{
    async  function fetchLocations() {
      try {
        if (country) {
          const response= await  axiosInstance.get<CountryType[]>(`/locations/country/${country}`)
          setAvailableLocations(response.data)
             return
        }
        const response= await  axiosInstance.get<ResponseType>(`/locations`)
        const {locations}=response.data
        const flatLocations: CountryType[] = Object.values(locations).flat();
        setAvailableLocations(flatLocations)    

      } catch (error) {
        console.log("an error occured")
      }
      
      }
   fetchLocations()
    },[country])
    useEffect(()=>{console.log(availableLocations)},[availableLocations])
    if (!availableLocations) {
    return  <div className="my-2">
      <div className="inline-flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 border border-violet-200 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-800 dark:text-gray-200 transition-all hover:shadow">
        <FaLock className="text-violet-600 dark:text-violet-400 flex-shrink-0" />
        <span>
          <Link
            href="/login"
            className="text-violet-600 dark:text-violet-400 font-semibold underline hover:text-violet-800 dark:hover:text-violet-300 transition-colors"
          >
            Please log in
          </Link>
          {` to see available locations.`}
        </span>
      </div>
    </div>    }
    else if (country) {
      // Extract the locations object from response data
   
      return (
        <div className="relative w-full border-2 border-blue-300 rounded-md pl-2 py-2 cursor-pointer">
        {/* Label with floating effect */}
        <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none -top-0.5 text-white dark:text-violet-600  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        {label}  
      </label>
        <select className=' bg-violet-600 dark:bg-gray-700 outline-0 py-1 px-1.5 rounded-sm w-full' {...props} >
          <FaBuilding/>
          {Object.entries(availableLocations).map(([continent, countries], index) => (
            <optgroup key={index} label={continent}>
              {countries.map((country:CountryType) => (
             <option key={country.id} value={country.name} className=' flex items-center gap-1 py-1.5 px-1 text-white bg-violet-600 mt-1 dark:bg-gray-800'>
             {country.locationType === "Airport" ? "✈️" : "🏨 "} {country.name}
             </option>
              ))}
            </optgroup>
          ))}
        </select>

        </div>
      );
    }
    else if (Array.isArray(availableLocations)){      // Handle the case when no country is specified
   
      return (
        <div className="relative w-full border-2  border-blue-300 rounded-md pl-2 py-2 cursor-pointer">
      {/* Label with floating effect */}
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none -top-0.5 text-white dark:text-violet-600  text-[14px] ${color ? `text-${color}` : 'text-violet-500'} `}
      >
        {label}  
      </label>

        <select  className={`
           outline-none
           w-full
          ${`focus:border-${color || 'blue-600'}`}  transition-colors relative z-10 outline-none mt-3 cursor-pointer   `} {...props} >
          {availableLocations.map((country) => (
            <option key={country.id} value={country.name} className=' flex items-center gap-1 py-1.5 px-1 text-white bg-violet-600 mt-1 dark:bg-gray-800'>
  {country.locationType === "Airport" ? "✈️" : "🏨 "} {country.name}
  </option>
          ))}
        </select>
        </div>
      );
    }
  };

export default ReservationDropDown