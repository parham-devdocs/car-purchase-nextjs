"use client"; 

import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";
import Loading from "../loading";
import UseFetch from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import { ReservationType, VehicleType,LocationType } from "@/types";

interface JsonProps extends ReservationType   {
 pickupLocation:LocationType
 returnLocation:LocationType
 vehicle:VehicleType
}

const DisplayInfo = ({ id }: { id: number }) => {
  const { data, error } = UseFetch<JsonProps>({ api:`/reservations/${id}` });

  if (error) {
    toast.error(error);
    return null; // or render an error message
  }

  // Show loading indicator whenever loading is true
  if (!data && !error ) {
    return (
      <div className="w-full bg-blue-800 dark:bg-neutral-800 min-h-32 flex items-center justify-center p-6 rounded-lg">
        <Loading size="medium" />
      </div>
    );
  }
    

  // Success: render the data
  return (
    <div className="w-full bg-blue-800 dark:bg-neutral-800 p-6 rounded-lg text-white space-y-6">
      <ToastContainer />
      <h2 className="text-xl font-semibold">Reservation Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Brand */}
        <div className="flex items-center gap-3">
          <FaCarAlt className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Car Brand</p>
            <p className="font-medium">{data?.vehicle.model || "Unknown"}</p>
          </div>
        </div>

        {/* Price Per Day */}
        <div className="flex items-center gap-3">
          <FaCarAlt className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Price Per Day</p>
            <p className="font-medium">{data?.vehicle.pricePerDay}</p>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="flex items-center gap-3">
          <BsCalendarDateFill className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Pickup Location</p>
            <p className="font-medium">{data?.pickupLocation.locationName}</p>
          </div>
        </div>

        {/* Return Location */}
        <div className="flex items-center gap-3">
          <BsCalendarDateFill className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Return Location</p>
            <p className="font-medium">{data?.returnLocation.locationName}</p>
          </div>
        </div>

        {/* Pickup Date & Time */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Pickup Date</p>
            <p className="font-medium">
              {data?.pickupDate} <span className="text-yellow-400"> {data?.pickupTime}</span>
            </p>
          </div>
        </div>

        {/* Return Date & Time */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Return Date</p>
            <p className="font-medium">
              {data?.returnDate} <span className="text-yellow-400">{data?.returnTime}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayInfo;