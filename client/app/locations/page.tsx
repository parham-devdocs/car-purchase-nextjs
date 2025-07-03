"use client"
import Image from "next/image";
import SouthAmerica from "../../public/map-south-america.svg";
import MiddleEast from "../../public/map-africa-middle-east.svg";
import Asia from "../../public/map-asia-pacific.svg";
import Europe from "../../public/map-europe.svg";
import CentralAfrica from "../../public/map-central-america-caribbean.svg";
import NorthAmerica from "../../public/map-north-america.svg";
import Globe from "../../public/globe-central-america-caribbean.svg";
import Header from "@/component/carRental/Header";
import { Button } from "@/component";
import { Ref, useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
const countries={
    NorthAmerica: {countries:["USA", "Canada", "Mexico", "Cuba", "Jamaica"],image:NorthAmerica,totalLocations:100},
    Europe: {countries:["Germany", "France", "Italy", "Spain", "Poland"],image:Europe,totalLocations:51},
    Asia: {countries:["Japan", "India", "China", "Thailand", "South Korea"],image:Asia,totalLocations:57},
    Africa: {countries:["Egypt", "Kenya", "Morocco", "Nigeria", "South Africa"],image:CentralAfrica,totalLocations:175},
    MiddleEast:{countries:["iran","iraq"],image:MiddleEast,totalLocations:12},
    SouthAmerica: {countries:["Brazil", "Argentina", "Chile", "Peru"],image:SouthAmerica,totalLocations:18}
  }

const page = () => {
  const [regionModal,setRegionModal]=useState<null | string>(null)
  const ref=useRef<HTMLElement>(null)

  
    useEffect(() => {
      
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
        console.log(ref.current)
          setRegionModal("")
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [regionModal]);

  return (
    <div >
    <Header headerTitle="1,100+ Car Rental Locations Worldwide" />
      <div className="bg-blue-900 dark:bg-gray-950  transition-all duration-500 pt-7 pb-6 px-4 space-y-10"> 
      <div className="max-w-7xl mx-auto   flex flex-col lg:flex-row lg:justify-between gap-4 items-center text-white">
        <h3 className="font-bold lg:text-xl text-2xl">Car Rental Location</h3>
        <Button label="Start a Reservation" link="/" className=" w-full lg:w-3xs h-14" />
      </div>
      <div className=" flex justify-center">
      <div className="flex flex-col justify-center  lg:flex-row lg:flex-wrap gap-5">
        {Object.entries(countries).map(([continent,obj])=>{
  return (
  <div className=" relative rounded-md bg-blue-600 dark:bg-gray-800 hover:bg-violet-500 transition-colors duration-500 cursor-pointer " onClick={()=>setRegionModal(continent)} >
    <Image src={obj.image} alt="continent" className=" rounded-md border-[3px] border-violet-500" />
    <div className=" w-full h-fit my-3 mx-4 dark:text-white">
    <h3 className=" font-bold text-xl dark:text-white">{continent}</h3>
    <h3 className=" font-semibold text-[20px] dark:text-white">{obj.countries.length} countries</h3>
    </div>
 {regionModal=== continent && <CountryDropDown countries={obj.countries} totalLocations={obj.totalLocations} rigion={continent} ref={ref}/>}
 </div>)
})}
      </div>
      </div>
      
    </div>
    </div>
  )
}

export default page


function CountryDropDown({countries,totalLocations,rigion,ref}:{countries:string[],totalLocations:number,rigion:string,ref:any}) {

  return(
    <div className="bg-white w-full max-w-3xl absolute gap-5 py-6 px-8 rounded-md shadow-lg z-10 overflow-hidden flex flex-col md:flex-row items-start cursor-auto">
    {/* Left Side - Globe & Location Count */}
    <div className="w-full md:w-1/3 text-center space-y-4 mb-6 md:mb-0">
      <Image src={Globe} alt="globe" width={200} height={200} className="mx-auto" />
      <p className="text-blue-900 text-4xl font-bold">{totalLocations}</p>
      <p className="text-blue-900 text-lg">Locations around {rigion}</p>
    </div>
  
    {/* Right Side - Countries List */}
    <div className="w-full md:w-2/3 text-left">
      <h4 className="font-semibold text-gray-700 mb-3">Countries we serve</h4>
      <hr className="mb-4 border-gray-300" />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {countries.map((country, index) => {
          
 return <li key={index}  >
 <Link href={`/locations/${country}`} className="flex items-center text-gray-800 hover:text-blue-700 transition-colors">
   <span ref={ref}>{country}</span>
   <IoIosArrowForward className="ml-2 text-blue-700" />
 </Link>
</li>
        }
         
        )}
      </ul>
    </div>
  </div>
  )
}