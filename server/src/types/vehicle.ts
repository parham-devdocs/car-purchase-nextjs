import { LocationType } from "./location";

export type VehicleType = "Van" | "Car" | "Truck" | "SUV";
export type VehicleOption = "CruiseControl" | "AirConditioner" | "RWD" | "BlueTooth" | "Sunroof" | "LeatherSeats" | "GasolineVehicle";

export interface Vehicle  {
  model: string;
  automaticTransmission: boolean;
  maxPassengers: number;
  numberOfDoors: number;
  luggageCapacity: number;
  image: string;
  vehicleType: VehicleType; 
  numberPlate:number
  pricePerDay: number;
  available: boolean;
  quantity: number;
  city:string
  locationId?:number
  options: string[];
}
