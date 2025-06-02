"use client";

import { useState, useEffect, useRef } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

const CountryDropDown = ({onChangeHandler}:{onChangeHandler:(value:string)=>void}) => {
  const [country, setCountry] = useState("United States");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // 👈 Ref for dropdown container

  const countryList = [
    "United States",
    "Canada",
    "Mexico",
    "Germany",
    "France",
    "United Kingdom",
    "Japan",
    "India",
    "Australia",
    "Brazil",
    "South Africa",
  ];

  useEffect(()=>{
    onChangeHandler(country)
  },[country])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-fit flex flex-col gap-3 m-2 " ref={dropdownRef}>
      <button
        className={`text-white flex items-center gap-1 ${
          isOpen ? "border-2 border-violet-500 transition-colors duration-300 rounded-sm pb-1" : ""
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <CiLocationOn />
        Country:{" "}
        <span className="text-yellow-300 flex gap-1 items-center text-[13px]">
          {country} <IoMdArrowDropdown size={20} />
        </span>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="absolute top-8 left-2 mt-1 bg-white rounded shadow-lg z-10 min-w-48 max-h-56 overflow-y-auto">
          <ul className="py-1 text-gray-800">
            {countryList.map((item, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-violet-500 hover:text-white cursor-pointer"
                onClick={() => {
                  setCountry(item);
                  setIsOpen(false);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountryDropDown;