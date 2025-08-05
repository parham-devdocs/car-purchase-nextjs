import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { number } from "zod";

interface ReservationType{
    returnDate:string | null
    pickupDate:string |null
    returnTime:string | null
    pickupTime:string | null
    returnLocation:string |null 
    pickupLocation:string |null
    driversAge:number |null
}
interface VehicleId {vehicleId:number | null}
interface UserId {userId:number | null}

export interface initialStateTypes{
    isSidebarCollapsed:boolean;
    isDarkMode:boolean
    reservationData:ReservationType
    vehicleId:null|number
    userId:null |number
}

const initialState:initialStateTypes={
    vehicleId:null,
    userId:null,
    isSidebarCollapsed:false,
    isDarkMode:false,
  reservationData:{
    returnDate:null,
    pickupDate:null,
    returnTime: null,
    pickupTime: null,
    returnLocation:null,
    pickupLocation:null,
    driversAge:null
}
}


export const globalSlice=createSlice({
    name:"global",
    initialState,
    reducers:{
        setIsSidebarCollapsed:(state,action:PayloadAction<boolean>)=>{
            state.isSidebarCollapsed=action.payload
        },
        setIsDarkMode:(state,action:PayloadAction<boolean>)=>{
            state.isDarkMode=action.payload
        },
        setReservation:(state,action:PayloadAction <Partial<ReservationType>>)=>{
        //   if (action.payload.vehicleId) {
        //     state.reservation.vehicleId=action.payload.vehicleId
        //   } 
             return { ...state, ...action.payload }
             
      },
      setVehicleId:(state,action:PayloadAction <Partial<VehicleId>>)=>{
     
       if (action.payload.vehicleId) {
        state.vehicleId=action.payload.vehicleId
       }
             
      },
      setUserId:(state,action:PayloadAction <Partial<UserId>>)=>{
     
        if (action.payload.userId) {
         state.userId=action.payload.userId
        }
              
       }
    }
})

export const {setIsDarkMode,setIsSidebarCollapsed,setReservation,setUserId,setVehicleId}=globalSlice.actions

export  default globalSlice.reducer

export type RootState = ReturnType<typeof globalSlice.reducer>

