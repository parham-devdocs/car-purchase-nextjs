import React, { useEffect, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import Checkbox from './checkBox';

type VehicleType = {
  category: Filters;
  options: (string | number)[];
};

type Filters = "number of passengers" | "type of vehicle" | "capacity of luggage";

const vehicleFilters: VehicleType[] = [
  {
    category: "type of vehicle",
    options: ["Cars", "SUVs", "Trucks", "Vans"],
  },
  {
    category: "number of passengers",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    category: "capacity of luggage",
    options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
];

const Filters = ({
  isTogglable = false,
  filters,
  onChangeHandler
}: {
  isTogglable?: boolean;
  filters: Filters[];
  onChangeHandler: (vehicleType: string | null, numberOfPassengers: number | null, luggageCapacity: number | null) => void;
}) => {

  const [vehicleType, setVehicleType] = useState<string | null>(null);
  const [numberOfPassengers, setNumberOfPassengers] = useState<number | null>(null);
  const [luggageCapacity, setLuggageCapacity] = useState<number | null>(null);

  function changeHandler(item: string | number, filter: Filters) {
    if (filter === "capacity of luggage") {
      setVehicleType(null)
      setLuggageCapacity(item as number);
    } else if (filter === "number of passengers") {
      setNumberOfPassengers(item as number);
    } else if (filter === "type of vehicle") {  // Fixed this condition
      setVehicleType(item as string);
    }
    // Don't call onChangeHandler here - let useEffect handle it
  }

  // Reset all filters
  function resetFilters() {
    setVehicleType(null);
    setNumberOfPassengers(null);
    setLuggageCapacity(null);
  }
   
 
  // Notify parent when any filter changes
  useEffect(() => {
    onChangeHandler(vehicleType, numberOfPassengers, luggageCapacity);
    console.log(luggageCapacity)
  }, [vehicleType, numberOfPassengers, luggageCapacity, onChangeHandler]); // Added onChangeHandler to dependencies

  return (
    <div className='w-full py-4 px-4 space-y-7 bg-blue-800 dark:bg-gray-800 rounded-sm pointer-events-auto opacity-100'>
      {/* Optional: Add a reset button */}
      <button onClick={resetFilters}>Reset All Filters</button>
      
      {vehicleFilters.map((filter, index) => {
        if (filters.includes(filter.category)) {
          return (
            <div key={index}>
              <p>{filter.category}</p>
              {filter.options.map((item, index) => {
                return (
                  <Checkbox 
                    key={index} 
                    label={item.toString()} 
                    onChangeHandler={() => changeHandler(item, filter.category)}
                  />
                );
              })}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Filters;