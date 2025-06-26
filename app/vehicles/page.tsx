"use client"
import { Button } from '@/component'
import CountryDropDown from "../../component/countryDropDown";
import { FaFilter } from "react-icons/fa";
import Filters from '@/component/filters';
import { useEffect, useMemo, useState } from 'react';
import CarCard from '@/component/carCard';
type CarProps = {
  type: string;
  name: string;
  automatic: boolean | number;
  passengers: number;
  bags: number;
  electric?: boolean;
  doors?: number;
};

// === Cars ===
const cars: CarProps[] = [
  {
    type: "Car",
    name: "Toyota Corolla",
    automatic: true,
    passengers: 5,
    bags: 3,
    electric: false,
    doors: 4
  },
  {
    type: "Car",
    name: "Honda Civic",
    automatic: false,
    passengers: 5,
    bags: 2,
    electric: false,
    doors: 4
  },
  {
    type: "Car",
    name: "Ford Focus",
    automatic: 6,
    passengers: 5,
    bags: 3,
    electric: false,
    doors: 4
  },
  {
    type: "Car",
    name: "Tesla Model 3",
    automatic: true,
    passengers: 5,
    bags: 2,
    electric: true,
    doors: 4
  },
  {
    type: "Car",
    name: "Mazda 3",
    automatic: true,
    passengers: 5,
    bags: 3,
    electric: false,
    doors: 4
  }
];

// === Trucks ===
const trucks: CarProps[] = [
  {
    type: "Truck",
    name: "Ford F-150",
    automatic: true,
    passengers: 5,
    bags: 2,
    electric: false,
    doors: 4
  },
  {
    type: "Truck",
    name: "Chevrolet Silverado",
    automatic: 8,
    passengers: 5,
    bags: 3,
    electric: false,
    doors: 4
  },
  {
    type: "Truck",
    name: "Ram 1500",
    automatic: true,
    passengers: 5,
    bags: 2,
    electric: false,
    doors: 4
  },
  {
    type: "Truck",
    name: "Toyota Tundra",
    automatic: 10,
    passengers: 5,
    bags: 2,
    electric: false,
    doors: 4
  },
  {
    type: "Truck",
    name: "Rivian R1T",
    automatic: true,
    passengers: 5,
    bags: 4,
    electric: true,
    doors: 4
  }
];

// === SUVs ===
const suvs: CarProps[] = [
  {
    type: "SUV",
    name: "Honda CR-V",
    automatic: true,
    passengers: 5,
    bags: 5,
    electric: false,
    doors: 4
  },
  {
    type: "SUV",
    name: "Jeep Grand Cherokee",
    automatic: true,
    passengers: 5,
    bags: 4,
    electric: false,
    doors: 4
  },
  {
    type: "SUV",
    name: "Subaru Outback",
    automatic: true,
    passengers: 5,
    bags: 4,
    electric: false,
    doors: 4
  },
  {
    type: "SUV",
    name: "Tesla Model Y",
    automatic: true,
    passengers: 5,
    bags: 5,
    electric: true,
    doors: 4
  },
  {
    type: "SUV",
    name: "BMW X5",
    automatic: true,
    passengers: 5,
    bags: 4,
    electric: false,
    doors: 4
  }
];

// === Vans ===
const vans: CarProps[] = [
  {
    type: "Van",
    name: "Chrysler Pacifica",
    automatic: true,
    passengers: 7,
    bags: 6,
    electric: true,
    doors: 4
  },
  {
    type: "Van",
    name: "Toyota Sienna",
    automatic: true,
    passengers: 7,
    bags: 5,
    electric: true,
    doors: 4
  },
  {
    type: "Van",
    name: "Honda Odyssey",
    automatic: true,
    passengers: 8,
    bags: 6,
    electric: false,
    doors: 4
  },
  {
    type: "Van",
    name: "Mercedes-Benz Sprinter",
    automatic: 5,
    passengers: 3,
    bags: 4,
    electric: false,
    doors: 4
  },
  {
    type: "Van",
    name: "Ford Transit Connect",
    automatic: false,
    passengers: 2,
    bags: 3,
    electric: false,
    doors: 4
  }
];



const page = () => {
  const [isFilterSidebarShown, setIsFilterSidebarShown] = useState<boolean>(false)
  const [totalVehicleNumber,setTotalVehicleNumber]=useState<number>(0)
  const [country,setCountry]=useState<string>("")
  useEffect(() => {
    const total = trucks.length + cars.length + vans.length + suvs.length;
    setTotalVehicleNumber(total);
  }, [trucks, cars, vans, suvs]);
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

        <div className='lg:flex w-full gap-5 items-start mt-5'>
          <div className='w-56 min-h-96 xl:flex hidden rounded-sm'>
            <Filters type passengers drive onCloseHandler={()=>setIsFilterSidebarShown(false)} />
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
          passengers={car.passengers}
          name={car.name}
          automatic={car.automatic}
          bags={car.bags}
          type={car.type}
          doors={car.doors}
        />
      ))}
    </div>
  </section>

  {/* Trucks Section */}
  <section className="my-8">
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Trucks ({trucks.length})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
      {trucks.map((truck, index) => (
        <CarCard
          key={index}
          passengers={truck.passengers}
          name={truck.name}
          automatic={truck.automatic}
          bags={truck.bags}
          type={truck.type}
          doors={truck.doors}
        />
      ))}
    </div>
  </section>

  {/* Vans Section */}
  <section className="my-8">
    <h4 className="text-yellow-300 text-left ml-10 mb-4 text-xl">Vans ({vans.length})</h4>
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 px-10 w-full max-w-7xl">
      {vans.map((van, index) => (
        <CarCard
          key={index}
          passengers={van.passengers}
          name={van.name}
          automatic={van.automatic}
          bags={van.bags}
          type={van.type}
          doors={van.doors}
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
          passengers={suv.passengers}
          name={suv.name}
          automatic={suv.automatic}
          bags={suv.bags}
          type={suv.type}
          doors={suv.doors}
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
        <Filters isTogglable type passengers drive onCloseHandler={ ()=>setIsFilterSidebarShown(false)}   />
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