"use client";

import axiosInstance from '@/utils/axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {  FaLock } from "react-icons/fa";

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

const ReservationDropDown = ({
  country,
  label,
  color = "white",
  id,
  defaultValue,
  ...props
}: {
  country?: string;
  label: string;
  color?: string;
  id: string;
  defaultValue?: string;
  [key: string]: any;
}) => {
  const [availableLocations, setAvailableLocations] = useState<CountryType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLocations() {
      setLoading(true);
      try {
        let data: CountryType[] = [];

        if (country) {
          // Fetch by country
          const response = await axiosInstance.get<CountryType[]>(`/locations/country/${country}`);
          data = response.data;
        } else {
          // Fetch all and flatten
          const response = await axiosInstance.get<ResponseType>(`/locations`);
          const locationsByContinent = response.data.locations;
          data = Object.values(locationsByContinent).flat();
        }

        setAvailableLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error);
        setAvailableLocations([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    }

    fetchLocations();
  }, [country]);

  useEffect(() => {
    console.log("Available Locations:", availableLocations);
  }, [availableLocations]);

  if (!availableLocations) {
    return (
      <div className="my-2">
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
      </div>
    );
  }

  if (loading) {
    return (
      <div className="relative w-full border-2 border-blue-300 rounded-md pl-2 py-2">
        <label
          htmlFor={id}
          className={`absolute left-2 -top-0.5 text-[14px] text-white px-1 ${color ? `text-${color}` : 'text-violet-500'}`}
        >
          {label}
        </label>
        <select disabled className="w-full bg-gray-200 dark:bg-gray-700 py-2 rounded" {...props}>
          <option>Loading...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="relative w-full border-2 border-blue-300 rounded-md pl-2 py-2 cursor-pointer">
      {/* Floating Label */}
      <label
        htmlFor={id}
        className={`absolute left-2 transition-colors duration-200 px-1 pointer-events-none -top-0.5 text-white dark:text-violet-600 text-[14px] ${color ? `text-${color}` : 'text-violet-500'}`}
      >
        {label}
      </label>

      {/* Select Input */}
      <select
        id={id}
        className={` dark:bg-gray-700 outline-none w-full py-1.5 px-1.5 rounded-sm text-white ${props.disabled ? 'opacity-60' : ''}`}
        {...props}
        defaultValue={defaultValue}
      >
        <option value="" disabled selected>
          Select a location
        </option>
        {availableLocations.length === 0 ? (
          <option disabled>No locations available</option>
        ) : (
          availableLocations.map((loc) => (
            <option
              key={loc.id}
              value={loc.name}
              className="flex bg-violet-600 items-center gap-1 py-1.5 px-1 text-white dark:bg-gray-800 hover:bg-violet-700"
            >
              {loc.locationType === "Airport" ? "✈️" : "🏨"} {loc.name} ({loc.city}, {loc.country})
            </option>
          ))
        )}
      </select>
    </div>
  );
};

export default ReservationDropDown;