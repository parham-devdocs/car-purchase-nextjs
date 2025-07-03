"use client"; 

import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { FaCarAlt } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa6";
import Loading from "../loading";
import UseFetch from "@/hooks/useFetch";

type JsonType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const DisplayInfo = ({ api }: { api: string }) => {
  const { loading, data, error } = UseFetch<JsonType>({ api });

  if (loading || !data) {
    return (
      <div className="w-full bg-blue-800 dark:bg-neutral-800 min-h-32 flex items-center justify-center p-6 rounded-lg">
        <Loading size="medium" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }



  return (
    <div className="w-full bg-blue-800 dark:bg-neutral-800 p-6 rounded-lg text-white space-y-6">
      <h2 className="text-xl font-semibold">Reservation Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Car Brand */}
        <div className="flex items-center gap-3">
          <FaCarAlt className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Car Brand</p>
            <p className="font-medium">{data?.completed ? "Toyota" : "Unknown"}</p>
          </div>
        </div>

        {/* Car Model */}
        <div className="flex items-center gap-3">
          <FaCarAlt className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Car Model</p>
            <p className="font-medium">{data?.title}</p>
          </div>
        </div>

        {/* Color */}
        <div className="flex items-center gap-3">
          <FaCodeBranch className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Color</p>
            <p className="font-medium">{data?.title}</p>
          </div>
        </div>

        {/* Pickup Date & Hour */}
        <div className="flex items-center gap-3">
          <BsCalendarDateFill className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Pickup</p>
            <p className="font-medium">2025-04-05 at 10:00 AM</p>
          </div>
        </div>

        {/* Return Date & Hour */}
        <div className="flex items-center gap-3">
          <BsCalendarDateFill className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Return</p>
            <p className="font-medium">2025-04-10 at 04:00 PM</p>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Pickup Location</p>
            <p className="font-medium">New York, NY</p>
          </div>
        </div>

        {/* Return Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot className="text-yellow-400" />
          <div>
            <p className="text-sm text-gray-400">Return Location</p>
            <p className="font-medium">Boston, MA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayInfo;