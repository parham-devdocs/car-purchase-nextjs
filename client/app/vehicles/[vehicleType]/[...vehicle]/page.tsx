"use client"
import CarImage from "@/public/1567006637480.avif";
import Image from "next/image";
import { useRouter } from 'next/navigation'
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import VehicleTypes from "@/component/VehicleTypes";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { toast, ToastContainer } from "react-toastify";
import { useParams } from "next/navigation";
import { Button } from "@/component";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setReservation, setVehicleId } from "@/redux/store";
type CarInfoType={
  "id": number | null,
  "model": string,
  "vehicleType": "Van"|"SUV"|"Car"|"Truck",
  "automaticTransmission": boolean,
  "pricePerDay": number,
  "available": true,
  "maxPassengers": number,
  "numberPlate": number,
  "numberOfDoors": number,
  "luggageCapacity": number,
  "image": string,
  "options":string[],
}


const page = () => {
  const {vehicle}= useParams()
  const [vehicleData,setVehicleData]=useState<CarInfoType>()
const dispatch=useDispatch()
const state = useSelector((state:RootState) => state)
const router=useRouter()
  useEffect(()=>{
   async   function getVehicle() {
    try {
      const response=await axiosInstance.get(`/vehicles/${vehicle}`)
      setVehicleData(response.data.data)
console.log("url",response.config.url)
    } catch (error) {
    toast.error("server error ! please try later")
    }


    }
    getVehicle()

  },[])
  
  async function rentHandler(e:any) {
  
    e.preventDefault()
    const id =vehicleData?.id as number
      dispatch(setVehicleId({vehicleId:id}))
      console.log(state.vehicleId)
    if (!state.reservationData.driverAge || !state.reservationData.pickupDate || !state.reservationData.pickupLocation || !state.reservationData.pickupTime || !state.reservationData.returnDate || !state.reservationData.returnLocation || !state.reservationData.returnTime) {
     toast.warning("other reservation info are missing ! ")
      setTimeout(() => {
        router.push("/reservation")
       }, 3000);
      return
    }
   async function postData() {
      try {
      const response= await  axiosInstance.post("/reservations",{...state.reservationData,userId:state.userId,vehicleId:state.vehicleId})
      toast.success("reservation made successfully")

      } catch (error) {
        toast.error("server error")
      }
    }
    postData()

  
  }
  return (
    <div className="md:px-12 lg:px-24 space-y-16">
    <ToastContainer />
  
    <form className="flex justify-center items-center py-8 bg-blue-500 dark:bg-gray-800 transition-all duration-500 rounded-md" onSubmit={rentHandler}>
      <div className="flex lg:flex-row flex-col gap-10 w-full max-w-6xl mx-auto">
        {/* Left Column - Details */}
        <div className="lg:w-2/3 w-full space-y-6 px-6 text-center lg:text-left">
          {/* Title */}
          <div>
            <h1 className="text-white text-3xl font-bold">{vehicleData?.model} Details</h1>
            <p className="text-white text-[17px] mt-1">{vehicleData?.model}</p>
          </div>
  
          {/* Vehicle Info Badges (Type, Price, Availability) */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center lg:justify-start">
            {/* Vehicle Type */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 min-w-max">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {vehicleData?.vehicleType?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-white text-sm">Type</p>
                <p className="text-yellow-300 font-medium">{vehicleData?.vehicleType}</p>
              </div>
            </div>
  
            {/* Price Per Day */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 min-w-max">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">$</span>
              </div>
              <div>
                <p className="text-white text-sm">Price</p>
                <p className="text-yellow-300 font-bold">
                  ${vehicleData?.pricePerDay?.toFixed(2)}
                </p>
              </div>
            </div>
  
            {/* Availability */}
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-md px-4 py-2 min-w-max">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  vehicleData?.available ? "bg-green-500" : "bg-red-500"
                }`}
              >
                <FaCheck className={vehicleData?.available ? "text-white" : "text-transparent"} />
              </div>
              <div>
                <p className="text-white text-sm">Status</p>
                <p className={`font-medium ${vehicleData?.available ? "text-green-300" : "text-red-300"}`}>
                  {vehicleData?.available ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          </div>
  
          {/* Specifications & Also Includes */}
          <div className="flex flex-col md:flex-row gap-8 mt-6">
            {/* Specifications */}
            <div className="space-y-2 w-full max-w-xs">
              <h4 className="text-white text-xl font-semibold">Specifications</h4>
              <hr className="border-white/50 mb-3" />
              <div className="space-y-3 ml-1 text-yellow-300 text-[17px]">
                <p className="flex gap-2 items-center">
                  <TbManualGearboxFilled />
                  {vehicleData?.automaticTransmission ? "Automatic" : "Manual"}
                </p>
                <p className="flex gap-2 items-center">
                  <IoMdPerson /> {vehicleData?.maxPassengers} Passengers
                </p>
                <p className="flex gap-2 items-center">
                  <PiBagSimpleFill /> {vehicleData?.luggageCapacity} Bags
                </p>
              </div>
            </div>
  
            {/* Also Includes */}
            <div className="space-y-2 w-full max-w-xs">
              <h4 className="text-white text-xl font-semibold">Also Includes</h4>
              <hr className="border-white/50 mb-3" />
              <div className="space-y-2 ml-1 text-yellow-300 text-[17px]">
                {vehicleData?.options?.length ? (
                  vehicleData.options.map((option, index) => (
                    <p key={index} className="flex gap-2 items-center">
                      <FaCheck />
                      <span>{option}</span>
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No extras listed</p>
                )}
              </div>
            </div>
          </div>
        </div>
  
        {/* Right Column - Image */}
        <div className="lg:w-1/3 w-full flex flex-col items-center lg:items-end justify-center space-y-6">
          <div className="w-full max-w-[350px]">
            <Image
              src={CarImage}
              alt={vehicleData?.model || "car"}
              width={350}
              height={350}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
  
          {/* ✅ Button: Positioned below image, full-width on mobile */}
          <div className="w-full max-w-[350px] mt-4">
           {vehicleData?.available && <Button label="Rent This Car" className=" w-full"   type="submit" />}
            {!vehicleData?.available && (
              <p className="text-red-300 text-sm mt-2 text-center">
                Cannot rent — vehicle is not available.
              </p>
            )}
          </div>
        </div>
      </div>
    </form>
  
    <VehicleTypes />
  </div>
  );
};

export default page;


