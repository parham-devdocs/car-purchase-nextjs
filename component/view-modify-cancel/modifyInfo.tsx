import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import Date_Picker from "../datePickerInput";
import SelectInput from "../selectInput";
import generateTimeOptions from "@/utils/generateTimeOptions";
import Button from "../Button";

type ReservationType={ id:number|null,openModal:(e:boolean)=>void}
const ModifyInfo = ({id,openModal}: ReservationType) => {

  return (
    <div className="w-full h-fit bg-blue-800 rounded-md dark:bg-neutral-800 p-6 text-yellow-400 space-y-4 transition-colors duration-500">
      <div className=" flex items-center justify-between border-b border-blue-600 dark:border-yellow-400 pb-2 mb-4">

      <h2 className="text-xl font-semibold ">Reservation Details</h2>
      <div className=" text-white">ID : <span className=" text-black py-1 px-1 bg-yellow-400  rounded-full">{id}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    

        {/* Pickup Date & Hour */}
        <div className="flex items-center gap-3 w-full">
          <BsCalendarDateFill size={25}/>
          <div className=" w-full">
            <Date_Picker label="pickup date" onChangeHandler={()=>console.log("ikfd")}  required/>
          </div>
        </div>

        {/* Return Date & Hour */}
        <div className="flex items-center gap-3">
         <BsCalendarDateFill size={25}/>
         <div className=" w-full">
            <Date_Picker label="pickup date" onChangeHandler={()=>console.log("ikfd")}  required/>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot size={25}/>
          <div className=" w-full">
           <SelectInput label="return hour" options={generateTimeOptions()}/>
          </div>
        </div>

        {/* Return Location */}
        <div className="flex items-center gap-3">
          <FaLocationDot size={25}/>
          <div className=" w-full">
          <SelectInput label="return hour" options={generateTimeOptions()}/>

          </div>
        </div>
       

      </div>
      <div className=" ml-8">        <Button label="modify" fn={()=>openModal(true)}/>
      </div>
    </div>
  );
};

export default ModifyInfo;