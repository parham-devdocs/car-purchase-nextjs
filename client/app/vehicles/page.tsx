"use client"
import { Button } from '@/component'
import CountryDropDown from "../../component/countryDropDown";
import { FaFilter } from "react-icons/fa";
import Filters from '@/component/filters';
import { useEffect, useMemo, useState } from 'react';
import CarCard from '@/component/carCard';
import getAllCookies from '@/utils/gettAllCookies';
import axiosInstance from '@/utils/axios';
import { ToastContainer, toast } from "react-toastify";



type VehicleTypes= "Car"| "SUV" | "Truck"|"Van"

type VehicleType=  {
        "model": string,
        "vehicleType":VehicleTypes
        "automaticTransmission": boolean,
        "pricePerDay": number,
        "quantity": number,
        "available": boolean,
        "maxPassengers": number,
        "numberPlate": number,
        "numberOfDoors": number,
        "luggageCapacity": number,
        "image": string,
        "options":string[]
} 
const page = () => {
  const [isFilterSidebarShown, setIsFilterSidebarShown] = useState<boolean>(false)
  const [totalVehicleNumber,setTotalVehicleNumber]=useState<number>(0)
  const [country,setCountry]=useState<string>("")
  const [cars, setCars] = useState<VehicleType[]>([])        // Fixed type
  const [vans, setVans] = useState<VehicleType[]>([])        // Fixed type
  const [trucks, setTrucks] = useState<VehicleType[]>([])    // Fixed type
  const [suvs, setSUVs] = useState<VehicleType[]>([])   

  useEffect(() => {
    async function fetchVehicles() {
      try {
        const response = await axiosInstance.get("/vehicles");
        
        if (response.data && typeof response.data === 'object') {
          Object.entries(response.data.data).forEach(([key, vehicleList]) => {
            // Make sure vehicleList is an array before processing
            if (Array.isArray(vehicleList)) {
              switch (key) {
                case "Car":
                  setCars(vehicleList);
                  break;
                case "SUV":
                  setSUVs(vehicleList);
                  break;
                case "Truck":
                  setTrucks(vehicleList);
                  break;
                case "Van":
                  setVans(vehicleList);
                  break;
                default:
                  break;
              }
            }
          });
        }
      } catch (error: any) {
        console.log(error.message);
        toast.error(error.message);
      }
    }
    fetchVehicles();
  }, []);
  useEffect(() => {
    const total = trucks.length + cars.length + vans.length + suvs.length;
    setTotalVehicleNumber(total);
  }, [trucks, cars, vans, suvs]);
  return (
    <div className=" mt-32 min-h-screen h-auto ">
<ToastContainer/>
      {/* Backdrop overlay */}
      
      {isFilterSidebarShown && (
        <div 
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 backdrop-brightness-75"
          onClick={() => setIsFilterSidebarShown(false)}
        ></div>
      )}

      {/* Main Content Container */}
      <div className="py-8 px-7 relative z-10">
        <div className='flex flex-col lg:flex-row gap-5 lg:justify-between'>
          <h3 className='lg:text-5xl text-2xl text-white text-center font-extrabold'>
            Rental Car Options in {country}
          </h3>
          <Button label='Start a Reservation' link='/' />
        </div>

        <div className='lg:flex w-full gap-5 items-start mt-5'>
          <div className='w-56 min-h-96 xl:flex hidden rounded-sm'>
            <Filters onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{console.log(luggageCapacity)}} filters={["capacity of luggage","type of vehicle"]} />
          </div>

          <div className='flex-1 min-h-96 h-auto bg-blue-800 dark:bg-gray-800 py-3 rounded-sm'>
            <div className='xl:hidden flex'>
              <CountryDropDown onChangeHandler={(e) => setCountry(e)} />
            </div>

            <div className='flex items-center justify-between border-t border-b border-white py-4 mx-3'>
              <h3 className=' text-white'> <span className=' text-yellow-300'>{totalVehicleNumber}</span> vehicle class option(s)</h3>
              <div className='md:hidden flex'>
                <FilterButton onClickHandler={() => setIsFilterSidebarShown(true)} />
              </div>
              <div className='md:flex hidden'>
                <CountryDropDown onChangeHandler={(e) =>setCountry(e)} />
              </div>
            </div>

            <div className='w-full  flex'>
              <div className='hidden md:flex justify-center xl:hidden h-fit w-20 py-5 z-50'>
                <FilterButton horizontal={false} onClickHandler={() => setIsFilterSidebarShown(true)} />
              </div>
              <div className='w-px bg-white mx-0 md:block hidden xl:hidden'> </div>
              <div className="w-full flex flex-col">
  {/* Cars Section */}
  <section className="my-8">
  <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Cars ({cars.length})</h4>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
   
  {cars.map((car, index) => (
        <CarCard
          key={index}
          passengers={car.maxPassengers}
          name={car.model}
          automatic={car.automaticTransmission}
          bags={car.luggageCapacity}
          type={car.vehicleType}
          doors={car.numberOfDoors}
        />
      ))}

  </div>
</section>

  {/* Trucks Section */}
  <section className="my-8">
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Trucks ({trucks.length})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
  {/* Trucks Section */}
<section className="my-8">
  <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Trucks ({trucks.length})</h4>
  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
    {trucks.map((truck, index) => (
      <CarCard
        key={index}
        passengers={truck.maxPassengers}
        name={truck.model}
        automatic={truck.automaticTransmission}
        bags={truck.luggageCapacity}
        type={truck.vehicleType}
        doors={truck.numberOfDoors}
      />
    ))}
  </div>
</section>
    </div>
  </section>

  {/* Vans Section */}
  <section className="my-8">
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Vans ({vans.length})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
      {vans.map((van, index) => (
        <CarCard
          key={index}
          passengers={van.maxPassengers}
          name={van.model}
          automatic={van.automaticTransmission}
          bags={van.luggageCapacity}
          type={van.vehicleType}
          doors={van.numberOfDoors}
        />
      ))}
    </div>
  </section>

  {/* SUVs Section */}
  <section className="my-8">
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">SUVs ({suvs.length})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
      {suvs.map((suv, index) => (
        <CarCard
          key={index}
          passengers={suv.maxPassengers}
          name={suv.model}
          automatic={suv.automaticTransmission}
          bags={suv.luggageCapacity}
          type={suv.vehicleType}
          doors={suv.numberOfDoors}
        />
      ))}
    </div>
  </section>
</div>


            </div>
          </div>
        </div>
      </div>

      {/* Sidebar with animation */}
      <div
        className={`absolute top-16 left-0 h-[calc(100vh-4rem)] transition-all duration-500 ease-in-out z-50 ${
          isFilterSidebarShown ? 'w-56 opacity-100' : 'w-0 opacity-0'
        }`}
      >
        <Filters isTogglable filters={["capacity of luggage","number of passengers"]} onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{console.log(luggageCapacity)}}   />
      </div>

    </div>
  )
}

export default page

// FilterButton Component
const FilterButton = ({ horizontal = true, onClickHandler }: { horizontal?: boolean, onClickHandler: () => void }) => {
  const direction = horizontal ? 'flex-row' : 'flex-col';
  return (
    <button
      className={`cursor-pointer text-yellow-300 font-semibold text-lg flex ${direction} items-center gap-2`}
      onClick={onClickHandler}
    >
      <FaFilter />
      <span>Filters</span>
    </button>
  );
};