import Reservation from "@/component/Reservation";
import CarImage from "@/public/1567006637480.avif";
import Image from "next/image";
import { TbManualGearboxFilled } from "react-icons/tb";
import { IoMdPerson } from "react-icons/io";
import { PiBagSimpleFill } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import VehicleTypes from "@/component/VehicleTypes";
import useURLDecoder from "@/hooks/useURLDecoder";
const carInfo = {
  automaticTranstion: true,
  passengers: 2,
  bags: 2,
  options: [
    "Cruise Control",
    "AM/FM Stereo Radio",
    "Air Conditioning",
    "2 Wheel Drive",
    "Gasoline Vehicle",
  ],
};
const page = ({
  params,
}: {
  params: { vehicle: string };
  children?: React.ReactNode;
}) => {
  const { decodedURL } = useURLDecoder(params.vehicle);
   
  return (
    <div className="md:px-12 lg:px-24 space-y-16  ">
      <Reservation bgImage={false} title={`${decodedURL} Car Rental`} />

      <div className="flex justify-center items-center py-8 bg-blue-500 dark:bg-gray-800 transition-all duration-500 rounded-md">
        <div className="flex lg:flex-row flex-col gap-10 w-full max-w-6xl mx-auto items-center">
          {/* Left Column - Details */}
          <div className="space-y-6 px-6 lg:w-2/3 w-full text-center lg:text-left ">
            <p className="text-white text-3xl">{decodedURL} Details</p>
            <p className="text-white text-[17px] -mt-2">
              {decodedURL} or similar
            </p>

            {/* Specifications + Also Includes Row */}
            <div className="flex flex-col md:flex-row gap-10 mt-4 justify-center lg:justify-start">
              {/* Specifications */}
              <div className="space-y-2 w-full max-w-md">
                <p className="text-white text-xl">Specifications</p>
                <hr className="text-white mb-2" />
                <div className="space-y-3 ml-2 text-yellow-300 text-[17px]">
                  <p className="flex gap-2 items-center">
                    <TbManualGearboxFilled />
                    {carInfo.automaticTranstion ? "Automatic" : "Manual"}
                  </p>
                  <p className="flex gap-2 items-center">
                    <IoMdPerson />
                    {carInfo.passengers}
                  </p>
                  <p className="flex gap-2 items-center">
                    <PiBagSimpleFill />
                    {carInfo.bags}
                  </p>
                </div>
              </div>

              {/* Also Includes */}
              <div className="space-y-2 w-full max-w-md">
                <p className="text-white text-xl">Also Includes</p>
                <hr className="text-white mb-2" />
                <div className="space-y-3 ml-2 text-yellow-300 text-[17px]">
                  {carInfo.options.map((option, index) => (
                    <p key={index} className="flex gap-2 items-center">
                      <FaCheck />
                      {option}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="lg:w-1/3 w-full flex justify-center lg:justify-end">
            <Image
              src={CarImage}
              alt="car"
              width={350}
              height={350}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      <VehicleTypes />
    </div>
  );
};

export default page;
