"use client";
import Image from "next/image";
import BgImage from "@/public/mvt649_mb_bwest (2).png";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, setReservation } from "@/redux/store";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import getAllCookies from "@/utils/gettAllCookies";

export default function Reservation({
  title = "Rent a Car with Alamo and Drive Happy",
  bgImage = true,
  pickUpLocationProp,
}: {
  title?: string;
  bgImage?: boolean;
  pickUpLocationProp?: string;
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
          <ReservationForm pickUpLocationProp={pickUpLocationProp}/>
        </div>
      </div>
    </div>
  );
}

function ReservationForm({
  pickUpLocationProp,
}: {
  title?: string;
  pickUpLocationProp?: string;
}) {
  const dispatch=useDispatch()
  const state = useSelector((state:RootState) => state)
   const router=useRouter()
  const [pickupDate, setPickupDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [returnDate, setReturnDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const FormSchema = z.object({
    pickupLocation: z.string({ message: "pick up location is required" }),
    returnLocation: z.string({ message: "return Location is not valid" }),
    pickUpTime: z.string({ message: "time is required" }),
    returnTime: z.string({ message: "time is required" }),
    driverAge: z.coerce.number({
      required_error: "Driver age is required",
      invalid_type_error: "Please select a valid age",
    }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pickupLocation: pickUpLocationProp || "" },
  });
  type IFormInput = z.infer<typeof FormSchema>;

  async function onSubmit(data:IFormInput) {
  console.log({...data,pickupDate,returnDate})
      dispatch(setReservation({driverAge:data.driverAge,pickupDate:pickupDate,pickupLocation:data.pickupLocation,pickupTime:data.pickUpTime,returnDate:returnDate,returnLocation:data.returnLocation ,returnTime:data.returnTime}))
      if (!state.vehicleId) {
     toast.warning("other reservation info are missing ! ")
      setTimeout(() => {
        router.push("/vehicles")
       }, 3000);
      return
    }
   async function postData() {
      try {
        const token=getAllCookies()["accessToken"]
        console.log({token})
        // const response= await  axiosInstance.post("/reservations",{...state.reservationData,userId:state.userId,vehicleId:state.vehicleId},{headers:{"Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiMSIsImlhdCI6MTc1NDQxMzIwNSwiZXhwIjoxNzU0NDI0MDA1fQ.iriLj4RqUCQ-rJ15epIhQJEuwxbHqZesc1f6fhN5Sxk"}})
        const response=await axiosInstance.post(`/reservations`,{...state.reservationData})
         console.log({status:response.status})
if (response.status===200) {
  toast.success("reservation made successfully")
return
}
toast.warning("one reservation already exists")

      } catch (error) {
        toast.error("server error")
      }
    }
    postData()

  
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:w-5/6 flex flex-col overflow-visible mx-auto bg-blue-500 dark:bg-gray-800 transition-all duration-500 px-6 gap-5 rounded-sm py-5"
    >
      <ToastContainer className=" mt-14"/>
      {/* Pick-up Location */}
      <div className="w-full relative">
        <ReservationDropDown {...register("pickupLocation")} id="pickupLocation" label="pickup location" />
        {/* <Input label="Pick-up Location" color="white" {...register("pickUp")} /> */}
        {errors.pickupLocation && (
          <p className="text-red-400 text-sm mt-1">{errors.pickupLocation.message}</p>
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
          <Button type="submit"  label="Go" className="h-full mt-3.5" />
        </div>
      </div>
    </form>
  );
}
