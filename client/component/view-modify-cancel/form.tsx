import Image from "next/image"
import SearchImage from "@/public/download.svg";
import Input from "../textInput";
import Button from "../Button";
import {  useEffect, useState } from "react";
import Modal from "./modal";
import DisplayInfo from "./displayInfo";
import ModifyInfo from "./modifyInfo";
import axiosInstance from "@/utils/axios";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
const detailsAboutActions=[
  {action:"cancel",detail:" you can cancel a reservationa nd be sure that all your cancellation info is kept secret "},
  {action:"view",detail:"all the info related to your reservation is viewed"},
  {action:"modify",detail:" first search your reservation and then you can modify it"},


]
const Form = ({action}:{action:"cancel"|"modify"|"view"}) => {
  const [reservationNumber,setReservaionNumber]=useState<number | null>(null)
  const [openModal,setOpenModal]=useState(false)
 const [showReservationInfo,setShowReservationInfo]=useState(false)
 const [showModifyReservation,setShowModifyReservation]=useState(false)
  const specificAction=detailsAboutActions.filter(e=>e.action===action)[0]
 async function deleteHandler(api:string) {
    
    try {
      
      const deletedItem=await axiosInstance.delete(api)
      toast.success("deleted successfully")
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status===404) {
          toast.error("reservation not found")
          return
        }
        if (error.response?.status===500) {
          toast.error("server error")
        }
      }
    }
    finally{
      setOpenModal(false)
    }
  }
    useEffect(()=>{
        setShowReservationInfo(false);
        setShowModifyReservation(false);
    },[action])
    function tabSwitchHandler() {
       
      switch (action) {
        case "view":
          setShowReservationInfo(true)

          break;
      case "modify":
          setShowModifyReservation(true)
          break;
        default:
          setOpenModal(true)

          break;
      }}
  return (
    <div className=" flex flex-col gap-8">
            <ToastContainer/>

  <div className=' flex lg:flex-row flex-col bg-transparent lg:gap-24 gap-8  relative'>
        <div className=" flex flex-col flex-1/2 gap-3 w-full max-w-md">
        <Input label=" reservation Number" type="number" color=" text-stone-200 dark:text-violet-500" onChange={(e)=>setReservaionNumber(Number(e.target.value))} />
        <Button label={action} fn={tabSwitchHandler }/>


        </div>
        <span className=" w-0.5 rounded-full h-full  bg-white"/>
        <hr className=" w-full lg:hidden h-0.5 bg-white"/>
        <div className=' flex items-center flex-1/2'>
            <Image src={SearchImage} alt="search" width={300} height={300} style={{width:"200px",height:"200px",objectFit:"cover"}}/>
            <p className=" text-white text-xl ">{specificAction.detail}</p>
        </div>
            {openModal    && <div className=" inset-0 flex items-center justify-center absolute z-50">
              <Modal text={`Are you sure to ${action} this reservation ? `} onActionHandler={()=>deleteHandler(`reservations/${reservationNumber}`)} onCloseHandler={()=>setOpenModal(false)}/>
            </div> }     
            
    </div>
  
   
   <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showReservationInfo ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} >
   {showReservationInfo && <DisplayInfo api={`https://jsonplaceholder.typicode.com/todos/${reservationNumber}`} />}        </div>
  
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showModifyReservation ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`} >
        {showModifyReservation && <ModifyInfo id={reservationNumber } openModal={()=>setOpenModal(true)}/>}
</div>
    </div>
  
  )
}

export default Form