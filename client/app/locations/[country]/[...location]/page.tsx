"use client";
import Reservation from "@/component/Reservation";
import Image from "next/image";
import {  useState } from "react";
import map from "@/public/staticmap.png";
import useURLDecoder from "@/hooks/useURLDecoder";
import ScheduleDropDown from "@/component/location/scheduleDropDown";
import DirectionDropDown from "@/component/location/directionDropDown";
import ActionCard from "@/component/location/actionCard";
import LocationServicesDropdown from "@/component/location/locationServicesDropdown";
import { FaCheck } from "react-icons/fa6";
import { IoCloudyNightSharp } from "react-icons/io5";
import { TbHandClick } from "react-icons/tb";
import { RxRotateCounterClockwise } from "react-icons/rx";
interface Props  {
  params: {
    location: string;
  };
}
const services = [
  {
    available: true,
    text: "You can save time at the counter when you activate Accelerated Check-in online. Just provide your driver's license and contact information that are normally collected at pick-up and we will be ready when you arrive. You'll be on the road and on vacation before you know it!Unavailable at this location Self Service Kiosk Skip the rental counter lines and check-in directly by using Alamo's touch-screen kiosk. Check-in using the kiosk and a receipt-sized rental agreement is printed. You'll be directed to your rental car on the lot. At the exit booth, show the booth agent your rental agreement and driver's license - and simply drive away.",
    title: "Accelerated Ckeck-In",
    Icon: FaCheck,
  },
  {
    available: true,
    text: "Picking up your vehicle after the location closes is easy with Alamo. After Hours Pick-Up might require you follow a few additional steps, which you'll see in your confirmation email.",
    title: "After Hours Servicves",
    Icon: IoCloudyNightSharp,
  },
  { available: false, title: "Self Service Kiosk", Icon: TbHandClick },
  {
    available: false,
    title: "Skip The Counter",
    Icon: RxRotateCounterClockwise,
  },
];
const Page =async () => {
  const params={location:"Iran"}
  const { decodedURL } = useURLDecoder(params.location) 
  const [dropDown, setDropDown] = useState("");
  return (
    <div>
      <Reservation
        title={`${decodedURL} Car Rental`}
        pickUpLocationProp={decodedURL as string}
        bgImage
      />
      <div className="bg-blue-500 w-full py-7 px-32 ">
        <div className=" items-center justify-between flex flex-col lg:flex-row">
          <div className="space-y-5">
            <p className="text-white font-bold text-2xl">{decodedURL}</p>
            <Image src={map} height={550} width={550} alt="map" />
          </div>
          {/* Your other divs */}
          <div className="flex min-w-sm flex-col gap-4 justify-between px-2 mt-10">
            <ActionCard link="/" address="123 Main St, Cityville" />
            <ActionCard contactNumber="+989124687022" />

            <DirectionDropDown />
            <ScheduleDropDown />
          </div>
        </div>

        <div className=" flex items-start flex-wrap justify-between mt-6">
          {services.map((service) => {
            return (
              <LocationServicesDropdown
                dropDownClickHandler={(e) => setDropDown(e)}
                dropDown={dropDown}
                key={service.text}
                available={service.available}
                Icon={service.Icon}
                text={service.text}
                title={service.title}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
