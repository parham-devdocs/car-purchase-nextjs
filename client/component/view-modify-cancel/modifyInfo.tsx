"use client";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import Date_Picker from "../datePickerInput";
import SelectInput from "../selectInput";
import generateTimeOptions from "@/utils/generateTimeOptions";
import Button from "../Button";
import UseFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { ReservationType } from "../../types";

type UpdateInfoFormType = {
  returnDate: string;
  pickupDate: string;
  retrunTime: string; // Note: typo? should be "returnTime"?
  pickupTime: string;
};

const ModifyInfo = ({ id }: { id: number | null }) => {
  const [formData, setFormData] = useState<UpdateInfoFormType>({
    pickupDate: "",
    retrunTime: "", 
    returnDate: "",
    pickupTime: "",
  });
  const {
    data: putData,
    error:putError,
    refetch
  } = UseFetch<ReservationType>({ api: `/reservations/${id}`, method: "put",body:formData });
 


  const updateHandler = (e: React.FormEvent) => {
    console.log(e)
    e.preventDefault(); 
    refetch()

  };

  if (!id) {
    return <div className="p-4 text-red-500">Invalid reservation ID.</div>;
  }

  return (
    <div className="w-full h-fit bg-blue-800 rounded-md dark:bg-neutral-800 p-6 text-yellow-400 space-y-4 transition-colors duration-500">
      <div className="flex items-center justify-between border-b border-blue-600 dark:border-yellow-400 pb-2 mb-4">
        <h2 className="text-xl font-semibold">Reservation Details</h2>
        <div className="text-white">
          ID:{" "}
          <span className="text-black py-1 px-1 bg-yellow-400 rounded-full">
            {id}
          </span>
        </div>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={updateHandler} >
        {/* Pickup Date */}
        <div className="flex items-center gap-3 w-full">
          <BsCalendarDateFill size={25} />
          <div className="w-full">
            <Date_Picker
              label="Pickup Date"
              onChangeHandler={(e) => setFormData({ ...formData, pickupDate: e })}
              required
            />
          </div>
        </div>

        {/* Return Date */}
        <div className="flex items-center gap-3">
          <BsCalendarDateFill size={25} />
          <div className="w-full">
            <Date_Picker
              label="Return Date"
              onChangeHandler={(e) => setFormData({ ...formData, returnDate: e })}
              required
            />
          </div>
        </div>

        {/* Return Time */}
        <div className="flex items-center gap-3">
          <FaLocationDot size={25} />
          <div className="w-full">
            <SelectInput
              label="Return Time"
              options={generateTimeOptions()}
              onChange={(e) => setFormData({ ...formData, retrunTime: e.target.value })}
            />
          </div>
        </div>

        {/* Pickup Time */}
        <div className="flex items-center gap-3">
          <FaLocationDot size={25} />
          <div className="w-full">
            <SelectInput
              label="Pickup Time"
              options={generateTimeOptions()}
              onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
            />
          </div>
        </div>
        <Button  onSubmit={updateHandler} label="update" type="submit"/>

      </form>

      <div className="ml-8">
              </div>
    </div>
  );
};

export default ModifyInfo;