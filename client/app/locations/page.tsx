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
import { useEffect, useRef, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { date, number } from "zod";
export const dynamic = 'force-dynamic'

type CountryType={
  "id": 1,
  "locationType": "Hotel" | "Airport",
  "country": string,
  "city": string,
  "continent": string,
  "address": string
}

type NumberOfLocations={
  numberOfLocationsInAsia: number
  numberOfLocationsInCentralAfrica: number
  numberOfLocationsInNorthAmerica: number
  numberOfLocationsInSouthAmerica: number
  numberOfLocationsInMiddleEast: number
}

// Renamed: setContinentPic → getMapForRegion
function getMapForRegion(continent: string) {
  switch (continent) {
    case "Europe":
      return Europe
      break;
    case "North America":
      return NorthAmerica
      break;
    case "Central Africa":
      return CentralAfrica
      break;
    case "Asia":
      return Asia
      break;
    case "Middle East":
      return MiddleEast
      break;
    case "South America":
      return SouthAmerica
      break;
    default:
      return null
      break;
  }
}

const page = () => {
  // Renamed: regionModal → selectedRegion
  const [selectedRegion, setSelectedRegion] = useState<null | string>(null)

  // Renamed: countries → regionCountries (to clarify it's grouped by region)
  const [regionCountries, setRegionCountries] = useState<{ [key: string]: CountryType[] }>({})

  // Renamed: numberOfLocations → locationCounts
  const [locationCounts, setLocationCounts] = useState<NumberOfLocations | null>(null)

  // Renamed: ref → dropdownRef
  const dropdownRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function fetchLocations() {
      const response = await axiosInstance.get("/locations")

      // Fixed: was incorrectly mapping North/South America
      setLocationCounts({
        numberOfLocationsInAsia: response.data.numberOfLocationsInAsia,
        numberOfLocationsInCentralAfrica: response.data.numberOfLocationsInCentralAfrica,
        numberOfLocationsInNorthAmerica: response.data.numberOfLocationsInNorthAmerica,
        numberOfLocationsInSouthAmerica: response.data.numberOfLocationsInSouthAmerica,
        numberOfLocationsInMiddleEast: response.data.numberOfLocationsInMiddleEast, // Fixed typo: was using NorthAmerica twice
      })

      setRegionCountries(response.data.locations)
    }

    fetchLocations()
  }, [])


  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     console.log(dropdownRef.current)
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //       console.log(dropdownRef.current)
  //       setSelectedRegion(null) // Fixed: was setting "" instead of null
  //     }
  //   }
  //   document.addEventListener("mousedown", handleClickOutside)
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside)
  //   }
  // }, [selectedRegion])

  return (
    <div>
      <Header headerTitle="1,100+ Car Rental Locations Worldwide" />
      <div className="bg-blue-900 dark:bg-gray-950 transition-all duration-500 pt-7 pb-6 px-4 space-y-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 items-center text-white">
          <h3 className="font-bold lg:text-xl text-2xl">Car Rental Location</h3>
          <Button label="Start a Reservation" link="/" className="w-full lg:w-3xs h-14" />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center lg:flex-row lg:flex-wrap gap-5">
            {Object.entries(regionCountries).map(([region, countries]) => {
              return (
                <div
                  className="relative rounded-md bg-blue-600 dark:bg-gray-800 hover:bg-violet-500 transition-colors duration-500 cursor-pointer"
                  onClick={() => setSelectedRegion(region)}
                  key={region}
                >
                
                      <div >
                        <Image src={getMapForRegion(region)} alt="region" className="rounded-md border-[3px] border-violet-500" />
                        <div className="w-full h-fit my-3 mx-4 dark:text-white">
                          <h3 className="font-bold text-xl dark:text-white">{region}</h3>
                          <h3 className="font-semibold text-[20px] dark:text-white">{countries.length} countries</h3>
                        </div>
                        {selectedRegion === region && (
                          <CountryDropDown
                            countries={countries}
                            totalLocations={countries.length}
                            region={region}
                            ref={dropdownRef}
                          />
                        )}
                      </div>
                    
                 
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

// Renamed: rigion → region (also fixed typo in prop)
function CountryDropDown({
  countries,
  totalLocations,
  region,
  ref
}: {
  countries: CountryType[]
  totalLocations: number
  region: string
  ref: any
}) {
  return (
    
    <div className="bg-white w-full max-w-3xl absolute gap-5 py-6 px-8 rounded-md shadow-lg z-10 overflow-hidden flex flex-col md:flex-row items-start cursor-auto">
      <div className="w-full md:w-1/3 text-center space-y-4 mb-6 md:mb-0">
        <Image src={Globe} alt="globe" width={200} height={200} className="mx-auto" />
        <p className="text-blue-900 text-4xl font-bold">{totalLocations}</p>
        <p className="text-blue-900 text-lg">Locations around {region}</p>
      </div>
      <div className="w-full md:w-2/3 text-left">
        <h4 className="font-semibold text-gray-700 mb-3">Countries we serve</h4>
        <hr className="mb-4 border-gray-300" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {countries.map((country, index) => (
            <li key={index} ref={ref}>
              <Link href={`/locations/${country.country}`} className="flex items-center text-gray-800 hover:text-blue-700 transition-colors">
                <span >{country.country}</span>
                <IoIosArrowForward className="ml-2 text-blue-700" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}