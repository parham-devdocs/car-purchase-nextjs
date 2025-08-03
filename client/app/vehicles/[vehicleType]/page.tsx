"use client"
import { Button } from '@/component'
import CountryDropDown from "../../../component/countryDropDown";
import { FaFilter } from "react-icons/fa";
import Filters from '@/component/filters';
import { useEffect, useState } from 'react';
import CarCard from '@/component/carCard';
import Link from 'next/link';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { toast } from 'react-toastify';
import axiosInstance from '@/utils/axios';
import getAllCookies from '@/utils/gettAllCookies';
import { useParams } from 'next/navigation';

type VehicleTypes= "Car"| "SUV" | "Truck"|"Van"


type LocationType = {
  locationType: "Airport" | "Hotel";
  country: string;
  city: string;
  continent: string;
  address: string;
};

type VehicleType = {
  id: number;
  model: string;
  vehicleType: VehicleTypes;
  automaticTransmission: boolean;
  pricePerDay: number;
  quantity: number;
  available: boolean;
  maxPassengers: number;
  numberPlate: number;
  numberOfDoors: number;
  luggageCapacity: number;
  image: string;
  reservationId: number | null;
  options: string[];
  location?: LocationType | null; // populated after enrichment
};

const page = () => {
  const params = useParams<{ vehicleType: string}>()
  const [isFilterSidebarShown, setIsFilterSidebarShown] = useState<boolean>(false)
  const [totalVehicleNumber,setTotalVehicleNumber]=useState<number>(0)
  const [country,setCountry]=useState<string>("")
  const [numberOfPassengers,setNumberOfPassengers]=useState<number | null>()
  const [luggageCapacity,setLuggageCapacity]=useState<number | null>()
 const [vehicles,setVehicles]=useState<VehicleType[] | []>([])
  useEffect(() => {
    async function fetchVehicles() {
setVehicles([])
      try {
      const cookies=getAllCookies()

      const queries:any=[]
      if (country && country!=="All countries") queries.push(`country=${encodeURIComponent(country)}`)
      if (numberOfPassengers) queries.push(`maxPassengers=${encodeURIComponent(numberOfPassengers)}`)
      if (luggageCapacity) queries.push(`luggageCapacity=${encodeURIComponent(luggageCapacity)}`)
const stringQueries=queries.join("&")
        const response = await axiosInstance.get(`/vehicles${stringQueries}?vehicleType=${params.vehicleType}`,{headers:{"Authorization":cookies["accessToken"]}});
     setVehicles(response.data.data[params.vehicleType])
     console.log(response.config.url)
      } catch (error: any) {
        toast.error(error.message);
      }
    }
    fetchVehicles();
  }, [params.vehicleType,luggageCapacity,numberOfPassengers,country]);
  function onFilterChange(vehicleType:string | null,numberOfPassengers:number | null,luggageCapacity:number | null) {
    setNumberOfPassengers(numberOfPassengers)
    setLuggageCapacity(luggageCapacity)
  }
  const Filter=()=>{
    switch (params.vehicleType) {
      case "Car":
               return     <Filters   filters={["number of passengers","capacity of luggage"]}  onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{onFilterChange(vehicleType,numberOfPassengers,luggageCapacity)}}/>

        case "Truck":
         return   <Filters   filters={["capacity of luggage"]}  onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{onFilterChange(vehicleType,numberOfPassengers,luggageCapacity)}}/>

        case "SUV":
       return   <Filters   filters={["number of passengers","capacity of luggage"]}  onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{onFilterChange(vehicleType,numberOfPassengers,luggageCapacity)}}/>
       
       case "Van":
       return <Filters   filters={["number of passengers","capacity of luggage"]}  onChangeHandler={(vehicleType, numberOfPassengers, luggageCapacity)=>{onFilterChange(vehicleType,numberOfPassengers,luggageCapacity)}}/>
         default :
         return null
        
    }
   
  }
  useEffect(() => {
    const total =  vehicles.length
    setTotalVehicleNumber(total);
  }, [ vehicles]);
  return (
    <div className=" mt-32 min-h-screen h-auto ">

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

        <div className='lg:flex w-full gap-10 items-start mt-5'>
        <div className='w-56 min-h-96 flex-col gap-3  xl:flex hidden rounded-sm'>
          <Link href={`/vehicles`} className=' text-yellow-400 text-[15px] font-bold flex items gap-1'>View All <MdKeyboardDoubleArrowRight/> </Link>
          <Filter/>
            </div>
          <div className='flex-1 min-h-96 h-auto bg-blue-800 py-3 rounded-sm'>
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
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">{params.vehicleType} ({totalVehicleNumber})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
      {vehicles.map((vehicle, index) => (
        <CarCard
        id={vehicle.id}
          key={index}
          passengers={vehicle.maxPassengers}
          name={vehicle.model}
          automatic={vehicle.automaticTransmission}
          bags={vehicle.luggageCapacity }
          type={vehicle.vehicleType}
          doors={vehicle.numberOfDoors}
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
        <Filter/>
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