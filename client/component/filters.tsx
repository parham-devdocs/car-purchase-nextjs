import React, { useEffect, useState } from 'react';
import Checkbox from './checkBox';

type VehicleType = {
  category: Filters;
  options: (string | number)[];
};
type VehicleTypes= "Car"| "SUV" | "Truck"|"Van"
type Filters = "number of passengers" | "type of vehicle" | "capacity of luggage";

const vehicleFilters: VehicleType[] = [
  {
    category: "type of vehicle",
    options: ["Car", "SUV", "Truck", "Van"], // Fixed to match VehicleTypes
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
  onChangeHandler: (vehicleType: VehicleTypes | null, numberOfPassengers: number | null, luggageCapacity: number | null) => void;
}) => {

  const [selectedFilters, setSelectedFilters] = useState<Record<Filters, string | number | null>>({
    "type of vehicle": null,
    "number of passengers": null,
    "capacity of luggage": null,
  });

  function changeHandler(item: string | number, filter: Filters) {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: prev[filter] === item ? null : item,
    }));
  }

  function resetFilters() {
    setSelectedFilters({
      "type of vehicle": null,
      "number of passengers": null,
      "capacity of luggage": null,
    });
  }

  useEffect(() => {
    onChangeHandler(
      selectedFilters["type of vehicle"] as VehicleTypes | null,
      selectedFilters["number of passengers"] as number | null,
      selectedFilters["capacity of luggage"] as number | null
    );
  }, [selectedFilters, onChangeHandler]);
 
  return (
    <div className='w-full py-6 px-6 space-y-8 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl pointer-events-auto opacity-100 border border-blue-500/20'>
      <div className='flex justify-between items-center pb-2 border-b border-blue-400/30'>
        <h3 className='text-xl font-bold text-white'>Filters</h3>
        <button 
          onClick={resetFilters}
          className='px-4 py-2 text-sm font-medium text-blue-100 hover:text-white bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-all duration-200 backdrop-blur-sm border border-blue-400/30'
        >
          Reset All
        </button>
      </div>
      
      <div className='space-y-8'>
        {vehicleFilters.map((filter, index) => {
          if (filters.includes(filter.category)) {
            return (
              <div key={index} className='space-y-3'>
                <h4 className='text-lg font-semibold text-blue-100 capitalize border-l-4 border-blue-300 pl-3 py-1'>
                  {filter.category}
                </h4>
                <div className='grid grid-cols-2 gap-3'>
                  {filter.options.map((item, idx) => {
                   return <Checkbox 
                      isChecked={selectedFilters[filter.category] === item}
                      key={idx} 
                      label={item.toString()} 
                      onChangeHandler={() => changeHandler(item, filter.category)}
                    />
          })}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Filters;