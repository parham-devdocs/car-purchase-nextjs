// import { useDispatch, useSelector } from "react-redux"
// import {RootState, setIsDarkMode, setReservation} from "../redux/store";
// import axiosInstance from "@/utils/axios";
// import { useState } from "react";

// type VehicleId={vehicleId:number}
// type ReservationData={
//     returnDate:string | null
//     pickupDate:string |null
//     returnTime:string | null
//     pickupTime:string | null
//     returnLocation:string |null 
//     pickupLocation:string |null
//     driversAge:number |null
//     vehicleId:number
// }
// type ReserveInput = VehicleId | ReservationData;

// // Complete reservation requires all fields
// type CompleteReservation = Required<ReservationData> & { vehicleId: number };

// const useReserve = () => {
  
//     const dispatch=useDispatch()
//     const reservationState = useSelector((state:RootState) => state.reservation)
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [redirect,setRedirect] = useState<string | null>(null);
//     const [response,setResponse]=useState<any | null>(null)
//     async function reserve({data}:{data:ReserveInput }) {
      
//         const nextState = {
//             ...reservationState,
//             ...data,
//           };
//           const {
//             vehicleId,
//             pickupDate,
//             returnDate,
//             pickupTime,
//             returnTime,
//             pickupLocation,
//             returnLocation,
//             driversAge,
//           } = nextState;
//          const missingVehicleId=!nextState.vehicleId
//          const missingReservationData=!pickupDate || !returnDate || !pickupLocation || !pickupTime || !returnTime || !returnLocation || !driversAge 
//          console.log(data)
//          dispatch(setReservation(data))
//         try {
//           if (!missingReservationData ) {
//        console.log("reservation data is missing")
// setRedirect("/")
// return
//           }  
//           if (!missingVehicleId ) {
//             console.log("vehicle id is missing")
//      setRedirect("/vehicles")
//      return
//                }  
//                const completeData = {
//                 vehicleId,
//                 pickupDate,
//                 returnDate,
//                 pickupTime,
//                 returnTime,
//                 pickupLocation,
//                 returnLocation,
//                 driversAge,
//               };
//             const reservation=await axiosInstance.post("/reservation",completeData)
//              setResponse(reservation.data)

//           }
   
    
//         catch (error:any) {
//             setError(error.message)
//         }
//         finally{
//             setLoading(false)
//         }
//     }


//     return {loading,error,redirect,response,reserve}
  

// }


// export default useReserve