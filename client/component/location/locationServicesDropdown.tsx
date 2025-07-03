import { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const LocationServicesDropdown = ({
  available,
  title,
  text,
  Icon,
  dropDownClickHandler,
  dropDown
}: {
  available: boolean;
  title: string;
  text?: string;
  Icon: React.ComponentType;
  dropDownClickHandler: (title: string) => void;
  dropDown: string;
}) => {
  const isOpen = dropDown === title;

  return (
    <div className="space-y-2 relative">
      <div
        className={`w-full min-h-20 rounded-sm ${
          available ? "bg-blue-700" : "bg-blue-900"
        } flex items-center justify-between gap-3 px-5 cursor-pointer`}
        onClick={() => {
          if (!available) return;
          // Toggle dropdown
          if (isOpen) {
            dropDownClickHandler(""); // Close it
          } else {
            dropDownClickHandler(title); // Open it
          }
        }}
      >
        <div className="p-1 bg-yellow-500 rounded-full">
          <Icon />
        </div>
        <h3 className="text-white">{title}</h3>
        {available && (
          <div className="bg-yellow-300 p-0.5 rounded-full">
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        )}
      </div>

      {!available && <h2 className="text-white">Unavailable at this location</h2>}

      {/* Smoothly animated dropdown */}
      <div
        className={`${
          isOpen && available
            ? "max-h-60 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2"
        } w-[200%] z-50 absolute top-24 bg-white rounded-sm p-2 text-blue-500 overflow-hidden transition-all duration-300 ease-in-out`}
      >
        {text}
      </div>
    </div>
  );
};

export default LocationServicesDropdown;