"use client";
import Image from "next/image";
import BgImage from "../../public/mvt649_mb_bwest (2).png";
import Link from "next/link";
import Input from "../textInput";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useState } from "react";
import SelectInput from "../selectInput";
import generateTimeOptions from "../../utils/generateTimeOptions";
import generateDriversAges from "@/utils/generateDriversAges";
import Button from "../Button";
import DatePicker from "../datePickerInput";
export default function Reservation() {
  return (
    <div className="w-full min-h-[200px] flex flex-col">
      {/* Unified Section with Responsive Behavior */}
      <div className="relative w-full h-[900px] md:h-[600px] bg-blue-800">
        {/* Background Image */}
        <Image
          src={BgImage}
          alt="bgimage"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0"
        />

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h2 className="text-center text-2xl sm:text-3xl text-white font-bold mb-6 max-w-3xl">
            Rent a Car with Alamo and Drive Happy
          </h2>

          {/* Reservation Form always shown here */}
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}

function ReservationForm() {
  const [hasDifferentLocation, setHasDifferentLocation] = useState(false);

  return (
    <div className="w-full lg:w-5/6 flex flex-col mx-auto bg-blue-500 px-6 gap-5 rounded-sm py-2">
      <div className="flex items-center justify-between ">
        <h3 className="md:text-3xl text-xl font-bold text-white">Start a Reservation</h3>
        <Link
          href={"/reserve/view-modify-cancel"}
          className="text-yellow-300 text-md md:text-xl font-bold"
        >
          view/modify/cancel
        </Link>
      </div>

      <div className="w-full relative">
        <Input label="Pick-up Location" color="white" required />
        <button
          onClick={() => setHasDifferentLocation((prev) => !prev)}
          type="button"
          className="flex items-center gap-1 text-white absolute top-3 right-4"
        >
          {hasDifferentLocation ? <BiMinusCircle /> : <BiPlusCircle />}
          {hasDifferentLocation ? "remove return" : "different return"}
        </button>
      </div>

      {hasDifferentLocation && (
        <div className="w-full relative">
          <Input label="Return Location" color="white" required />
        </div>
      )}
<div className="flex flex-col lg:flex-row gap-4">
  <div className="lg:w-2/3 w-full flex flex-wrap gap-y-3">
    <div className="w-full flex flex-col sm:flex-row gap-1">
    <div className="sm:w-1/2 w-full ">
<DatePicker required label="Pick-Up Date" id="2" color="white"/>
      </div>
      <div className="sm:w-1/2 w-full">
        <SelectInput label="Time" options={generateTimeOptions()} color="white" />
      </div>
     
    </div>

    <div className="w-full flex flex-col sm:flex-row gap-1">
    <div className="sm:w-1/2 w-full ">
    <DatePicker required label="Pick-Up Date" id="2" color="white"/>
    </div>
      <div className="sm:w-1/2 w-full">
        <SelectInput label="Time" options={generateTimeOptions()} color="white" />
      </div>
    </div>
  </div>
  <div className="lg:w-1/3 w-full flex flex-col justify-between gap-1.5">
    <div>
      <SelectInput options={generateDriversAges()} required label="Driver's Age" color="white" />
    </div>
    <Button label="Go" fn={()=>console.log("clicked")} className=" h-full mt-3.5"  />
      
  </div>
</div>
    </div>
  );
}
