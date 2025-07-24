import React, { useEffect, useState } from 'react';
import { AiFillCloseSquare } from 'react-icons/ai';
import Checkbox from './checkBox';

type VehicleType = {
  category: string;
  options: string[];
};

const vehicleFilters: VehicleType[] = [
  {
    category: "Vehicle Type",
    options: ["Cars", "SUVs", "Trucks", "Vans"],
  },
  {
    category: "Passengers",
    options: ["2 +", "3 +", "4 +", "5 +", "6 +", "7 +", "8 +", "10 +", "12 +", "15 +"],
  },{
    category: "Luggage",
    options: ["1 ", "2", "3", "5 +", "6 +", "7 +", "8 +", "10 +", "12 +", "15 +"],
  }
];

const Filters = ({
  isTogglable = false, // <-- fixed typo
  onCloseHandler,
  type = false,
  passengers = false,
  drive = false,
}: {
  isTogglable?: boolean;
  type?: boolean;
  passengers?: boolean;
  onCloseHandler?:()=>void
  luggage?: boolean;
}) => {
  const [filters, setFilters] = useState<VehicleType[] | null>(null);
  const [cars, setCars] = useState<string[]>([]);
  const [passengersNumber, setPassengersNumber] = useState<string | null>(null); // <-- now single value
  const [driveCondition, setDriveCondition] = useState<string[]>([]);

  useEffect(() => {
    const selectedFilters = vehicleFilters.filter((item) => {
      if (item.category === "Vehicle Type" && type) return true;
      if (item.category === "Passengers" && passengers) return true;
      if (item.category === "Luggage" && drive) return true;
      return false;
    });

    setFilters(selectedFilters);
  }, [type, passengers, drive]);

  const handleCheckboxChange = (
    category: string,
    value: string,
    currentState: string[] | string | null,
    setState: React.Dispatch<React.SetStateAction<any>>
  ) => {
    if (category === "Passengers") {
      // Only allow one selection for passengers
      setState(value === passengersNumber ? null : value);
    } else {
      // Multi-select for other categories
      if (Array.isArray(currentState)) {
        if (currentState.includes(value)) {
          setState(currentState.filter((item) => item !== value));
        } else {
          setState([...currentState, value]);
        }
      }
    }
  };

  return (
    <div className='w-full py-4 px-4 space-y-7 bg-blue-800 dark:bg-gray-800 rounded-sm pointer-events-auto opacity-100'>
      <div className='flex justify-between text-white text-2xl items-center'>
        Filters
           {isTogglable &&  <AiFillCloseSquare className="cursor-pointer text-white w-6 h-6" size={20} onClick={onCloseHandler } />        } 
      </div>

      <h4 className='text-white text-xl'>Filter</h4>

      {filters?.map((item, index) => (
        <div key={index} className='flex flex-col'>
          <h4 className='text-white font-semibold text-xl'>{item.category}</h4>
          {item.options.map((option, idx) => (
            <div key={idx} className='mt-2'>
              <Checkbox
                id={option}
                label={option}
                checked={
                  item.category === "Vehicle Type"
                    ? cars.includes(option)
                    : item.category === "Passengers"
                    ? passengersNumber === option
                    : driveCondition.includes(option)
                }
                onChangeHandler={() =>
                  handleCheckboxChange(
                    item.category,
                    option,
                    item.category === "Vehicle Type"
                      ? cars
                      : item.category === "Passengers"
                      ? passengersNumber
                      : driveCondition,
                    item.category === "Vehicle Type"
                      ? setCars
                      : item.category === "Passengers"
                      ? setPassengersNumber
                      : setDriveCondition
                  )
                }
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Filters;