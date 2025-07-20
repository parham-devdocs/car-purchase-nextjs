import { LocationType } from "./location";

export type VehicleType = "Van" | "Car" | "Truck" | "SUV";
export type VehicleOption = "CruiseControl" | "AirConditioner" | "RWD" | "BlueTooth" | "Sunroof" | "LeatherSeats" | "GasolineVehicle";

export interface Vehicle extends LocationType {
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
  options: string[];
}
