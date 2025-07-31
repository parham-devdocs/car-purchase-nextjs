"use client";
import { Button } from "@/component";
import Header from "@/component/carRental/Header";
import Link from "next/link";
import { useState } from "react";
import { MdLocationPin } from "react-icons/md";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { BsAirplaneFill } from "react-icons/bs";
import { FaBuilding } from "react-icons/fa";
import Reservation from "@/component/Reservation";
import axiosInstance from "@/utils/axios";
import { useParams } from "next/navigation";
type CountryType={
  "id": 1,
  "locationType": "Hotel" | "Airport",
  "country": string,
  "city": string,
  "continent": string,
  "address": string
}
export default function CountryPage() {
  const params = useParams<{ country:string }>()
  const [locations, setLocations] = useState<CountryType[]>([]);
  const []=useState<CountryType[]>()
  const [states, setStates] = useState([
    "Alabama", // Gulf Shores
    "Florida", // Orlando
    "California", // Los Angeles
    "New York", // New York City
    "Illinois", // Chicago
    "Florida", // Miami
    "Texas", // Dallas
    "Colorado", // Denver
    "California", // San Francisco
    "Washington", // Seattle
    "Arizona", // Phoenix
    "Pennsylvania", // Philadelphia
    "Florida", // Orlando
    "Massachusetts", // Boston
    "Minnesota", // Minneapolis
    "Nevada", // Las Vegas
    "Michigan", // Detroit
    "Georgia", // Atlanta
    "North Carolina", // Charlotte
    "Hawaii", // Honolulu
    "Virginia", // Washington D.C.
  ]);
  const [isRentalLocationModalOpen, setIsRentalLocationModalOpen] =
    useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  return (
    <div>
      <Header headerTitle={`${params.country} Car Rental`} />
      <div className="bg-blue-900 dark:bg-black transition-all duration-500 pt-7 pb-6 px-4 space-y-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between gap-4 items-center text-white">
          <h3 className="font-bold text-2xl lg:text-xl">Browse Locations</h3>
          <Button
            label="Start a Reservation"
            link="/"
            className="w-full lg:w-3xs h-14"
          />
        </div>

        <div className="flex justify-center items-center flex-col gap-5 w-full">
          {/* Rental Locations */}
          <div
            className="w-full h-14 bg-gray-200 text-blue-900 dark:text-stone-400 dark:bg-gray-800 flex items-center justify-between px-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setIsRentalLocationModalOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2">
              <MdLocationPin className="text-2xl font-bold text-red-500" />
              <span className="font-bold text-xl ">
                Rental Locations ({locations.length})
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <span>View All</span>
              {isRentalLocationModalOpen ? (
                <MdOutlineArrowDropUp
                  className="text-yellow-600 text-2xl"
                  size={30}
                />
              ) : (
                <MdOutlineArrowDropDown
                  className="text-yellow-600 text-2xl"
                  size={30}
                />
              )}
            </div>
          </div>

          <div
            className="w-full overflow-auto transition-all duration-500 ease-in-out bg-white border border-gray-300"
            style={{
              maxHeight: isRentalLocationModalOpen ? "20rem" : "0",
            }}
          >
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 dark:bg-gray-800  rounded-md p-3 shadow-lg z-10">
              {locations.map((loc, index) => (
                <li
                  key={index}
                  className="py-1 px-2 flex items-center gap-2 text-violet-700 hover:text-violet-900 hover:bg-gray-200 dark:text-violet-300  rounded-sm cursor-pointer"
                >
                  {loc.type === "airport" ? (
                    <BsAirplaneFill className="text-blue-500" />
                  ) : (
                    <FaBuilding className="text-green-500" />
                  )}
                  <Link href={`/locations/${params.country}/${loc.name}`}>
                    {loc.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* States or Cities */}
          <div
            className="w-full h-14  bg-gray-200 text-blue-900 dark:text-stone-400 dark:bg-gray-800 flex items-center justify-between px-4 rounded-md shadow-sm hover:shadow-md transition-shadow duration-500 cursor-pointer"
            onClick={() => setIsCityModalOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-2">
              <MdLocationPin className="text-2xl font-bold text-red-500" />
              <span className="font-bold text-xl">
                States or Cities ({states.length})
              </span>
            </div>
            <div className="flex items-center gap-1 text-yellow-600">
              <span>View All</span>
              {isCityModalOpen ? (
                <MdOutlineArrowDropUp
                  className="text-yellow-600 text-2xl"
                  size={30}
                />
              ) : (
                <MdOutlineArrowDropDown
                  className="text-yellow-600 text-2xl"
                  size={30}
                />
              )}
            </div>
          </div>

          {/* Smoothly animated dropdown */}
          <div
            className=" w-full transition-all duration-500 ease-in-out overflow-auto   border border-gray-300  "
            style={{
              maxHeight: isCityModalOpen ? "20rem" : "0",
              opacity: isCityModalOpen ? 1 : 0,
            }}
          >
            <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-2 dark:bg-gray-800 bg-white dark:bg-gray-800rounded-md p-3 shadow-lg z-10">
              {states.map((state, index) => (
                <li
                  key={index}
                  className="py-1 px-2 flex w-fit gap-1 text-violet-700 hover:text-violet-900 hover:bg-gray-200 dark:text-violet-300  rounded-sm cursor-pointer"
                >
                  <Link href={`/locations/${params.country}/${state}`}>
                    {state}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Reservation
        title={`${params.country} Car Rental`}
        pickUpLocation={params.country}
      />
    </div>
  );
}
