import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ReservationType{
    returnDate:string | null
    pickupDate:string |null
    returnTime:string | null
    pickupTime:string | null
    returnLocation:string |null 
    pickupLocation:string |null
    userId:number | null
    vehicleId:number | null 
    driversAge:number |null
}

export interface initialStateTypes{
    isSidebarCollapsed:boolean;
    isDarkMode:boolean
    reservation:ReservationType
}

const initialState:initialStateTypes={
    isSidebarCollapsed:false,
    isDarkMode:false,
  reservation:{
    returnDate:null,
    pickupDate:null,
    returnTime: null,
    pickupTime: null,
    returnLocation:null,
    pickupLocation:null,
    userId:null,
    vehicleId:null,
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
        setReservation:(state,action:PayloadAction<ReservationType>)=>{
state.reservation.driversAge=action.payload.driversAge
state.reservation.pickupDate=action.payload.pickupDate
state.reservation.returnDate=action.payload.returnDate
state.reservation.returnTime=action.payload.returnTime
state.reservation.pickupTime=action.payload.pickupTime
state.reservation.returnLocation=action.payload.returnLocation
state.reservation.pickupLocation=action.payload.pickupLocation
state.reservation.userId=action.payload.userId
state.reservation.vehicleId=action.payload.vehicleId
        }
    }
})

export const {setIsDarkMode,setIsSidebarCollapsed}=globalSlice.actions

export  default globalSlice.reducer