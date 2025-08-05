"use client";
import Image from "next/image";
import BgImage from "@/public/mvt649_mb_bwest (2).png";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";
import { useState } from "react";
import SelectInput from "./selectInput";
import generateTimeOptions from "../utils/generateTimeOptions";
import generateDriversAges from "@/utils/generateDriversAges";
import Button from "./Button";
import DatePicker from "./datePickerInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import ReservationDropDown from "./reservationDropDown";

export default function Reservation({
  title = "Rent a Car with Alamo and Drive Happy",
  bgImage = true,
  pickUpLocation,
}: {
  title?: string;
  bgImage?: boolean;
  pickUpLocation?: string;
}) {
  return (
    <div className="w-full min-h-[200px] flex flex-col">
      {/* Unified Section with Responsive Behavior */}
      <div
        className={`relative  w-full  h-[900px] md:h-[600px] ${
          bgImage ? "bg-blue-800 dark:bg-gray-800" : "bg-transparent"
        }`}
      >
        {/* Background Image */}
        {bgImage && (
          <Image
            src={BgImage}
            alt="bgimage"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 z-0"
          />
        )}
        {/* Content Overlay */}
        <div className="relative w-full  z-10 flex flex-col items-center justify-center h-full text-white px-4">
          <h2 className=" text-3xl sm:text-5xl text-white font-bold mb-6 max-w-3xl">
            {title}
          </h2>

          {/* Reservation Form always shown here */}
          <ReservationForm pickUpLocation={pickUpLocation} />
        </div>
      </div>
    </div>
  );
}

function ReservationForm({
  pickUpLocation,
}: {
  title?: string;
  pickUpLocation?: string;
}) {
  const [pickupDate, setPickupDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [returnDate, setReturnDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const FormSchema = z.object({
    pickUp: z.string({ message: "pick up location is required" }),
    returnLocation: z.string({ message: "return Location is not valid" }),
    pickUpTime: z.string({ message: "time is required" }),
    returnTime: z.string({ message: "time is required" }),
    driverAge: z.string({ message: "driver age is required" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pickUp: pickUpLocation || "" },
  });
  type IFormInput = z.infer<typeof FormSchema>;

  const onSubmit = (data: IFormInput) => {
    console.log("Form Data:", data); // Check if returnLocation appears
    // ...
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-5/6 flex flex-col overflow-visible mx-auto bg-blue-500 dark:bg-gray-800 transition-all duration-500 px-6 gap-5 rounded-sm py-5"
    >
      {/* Pick-up Location */}
      <div className="w-full relative">
        <ReservationDropDown {...register("pickUp")} id="pickupLocation" label="pickup location" />
        {/* <Input label="Pick-up Location" color="white" {...register("pickUp")} /> */}
        {errors.pickUp && (
          <p className="text-red-400 text-sm mt-1">{errors.pickUp.message}</p>
        )}
      
         
      </div>

      {/* Return Location (conditional) */}
      <div className="w-full relative">
        <ReservationDropDown {...register("returnLocation")} id="returnLocation" label="return location" />
        {/* <Input label="Pick-up Location" color="white" {...register("pickUp")} /> */}
        {errors.returnLocation && (
          <p className="text-red-400 text-sm mt-1">{errors.returnLocation.message}</p>
        )}
        </div>
    

      {/* Dates & Times */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 w-full flex flex-wrap gap-y-3">
          {/* Pick-up Date + Time */}
          <div className="w-full flex flex-col sm:flex-row gap-1">
            <div className="sm:w-1/2 w-full relative">
              <DatePicker
                required
                onChangeHandler={(e) => setPickupDate(e)}
                label="Pick-Up Date"
                id="2"
                color="white"
              />
            </div>
            <div className="sm:w-1/2 w-full">
              <SelectInput
                label="Pick-Up Time"
                options={generateTimeOptions()}
                color="white"
                {...register("pickUpTime")}
              />
            </div>
          </div>

          {/* Return Date + Time */}
          <div className="w-full flex flex-col sm:flex-row gap-1 ">
            <div className="sm:w-1/2 w-full">
              <DatePicker
                required
                onChangeHandler={(e) => setReturnDate(e)}
                label="Return Date"
                id="2"
                color="white"
              />
            </div>
            <div className="sm:w-1/2 w-full">
              <SelectInput
                label="Return Time"
                options={generateTimeOptions()}
                color="white"
                {...register("returnTime")}
              />
            </div>
          </div>
        </div>

        {/* Driver Age + Submit Button */}
        <div className="lg:w-1/3 w-full flex flex-col justify-between gap-1.5">
          <div>
            <SelectInput
              options={generateDriversAges()}
              required
              label="Driver's Age"
              color="white"
              {...register("driverAge")}
            />
            {errors.driverAge && (
              <p className="text-red-400 text-sm mt-1">
                {errors.driverAge.message}
              </p>
            )}
          </div>
          <Button type="submit" fn={()=>{console.log() }} label="Go" className="h-full mt-3.5" />
        </div>
      </div>
    </form>
  );
}
