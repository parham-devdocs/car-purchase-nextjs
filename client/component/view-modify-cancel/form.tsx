import Image from "next/image";
import SearchImage from "@/public/download.svg";
import Input from "../textInput";
import Button from "../Button";
import { useEffect, useState } from "react";
import Modal from "./modal";
import DisplayInfo from "./displayInfo";
import ModifyInfo from "./modifyInfo";
import axiosInstance from "@/utils/axios";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { ReservationType } from "@/types";
import UseFetch from "@/hooks/useFetch";

const detailsAboutActions = [
  {
    action: "cancel",
    detail: "You can cancel a reservation and be sure that all your cancellation info is kept secret",
  },
  {
    action: "view",
    detail: "All the info related to your reservation is viewed",
  },
  {
    action: "modify",
    detail: "First search your reservation and then you can modify it",
  },
];

const Form = ({ action }: { action: "cancel" | "modify" | "view" }) => {
const [resevationNumber ,setReservationNumber]=useState< number>(1)
const [deleteModalIsOpen,setDeleteModalIsOpen]=useState(false)
const [modifyReservationIsOpen,setModifyReservationIsOpen]=useState(false)
const [displayReservationIsOpen,setDisplayReservationIsOpen]=useState(false)
const {data:fetchData,refetch,statusCode}=UseFetch({api:`/reservations/${resevationNumber}`})
const specificAction=detailsAboutActions.find(i=>{return i.action===action})

  function deleteReservationHandler() {
    console.log(deleteModalIsOpen)
  }

function tabSwtichHandler() {
  refetch()
  setDeleteModalIsOpen(false) 
  setDisplayReservationIsOpen(false)
   setModifyReservationIsOpen(false)
  if ( !fetchData) {
if (statusCode===401) {
  return  toast.error("please login first!")

}
 else{ return  toast.error("please enter a valid reservation id")}
  }
  switch (action) {
    case "cancel":

     fetchData && setDeleteModalIsOpen(true)
      setModifyReservationIsOpen(false)
      setDisplayReservationIsOpen(false)
      break;
     case "modify":
     fetchData && setModifyReservationIsOpen(true)
      setDisplayReservationIsOpen(false)
      setDeleteModalIsOpen(false)
      break
    case "view":
     fetchData && setDisplayReservationIsOpen(true)
      setModifyReservationIsOpen(false)
      setDeleteModalIsOpen(false)
      
  }

}
  return (
    <div className="flex flex-col gap-8">
      <ToastContainer />

      <div className="flex lg:flex-row flex-col bg-transparent lg:gap-24 gap-8 relative">
        {/* Input Section */}
        <div className="flex flex-col gap-3 w-full max-w-md">
          <Input label="reservation id" color="violet-600" type="number" value={resevationNumber} onChange={(e) => { const value = e.target.value;setReservationNumber(value ? +value : 1)}} />
          <Button fn={tabSwtichHandler} label={action}/>
        </div>

        {/* Divider */}
        <span className="w-0.5 rounded-full h-full bg-white hidden lg:block" />
        <hr className="w-full lg:hidden h-0.5 bg-white" />

        {/* Info Section */}
        <div className="flex items-center flex-1/2">
          <Image
            src={SearchImage}
            alt="search"
            width={200}
            height={200}
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
          <p className="text-white text-xl ml-4">{specificAction?.detail}</p>
        </div>

  
      </div>
{modifyReservationIsOpen  && <ModifyInfo id={resevationNumber }/>}
{displayReservationIsOpen  && <DisplayInfo id={resevationNumber} />}
{deleteModalIsOpen && <Modal text={`you want to cancel this reservation?`} onActionHandler={deleteReservationHandler} onCloseHandler={()=>setDeleteModalIsOpen(false)}/>}

 
    </div>
  
  )}


export default Form;