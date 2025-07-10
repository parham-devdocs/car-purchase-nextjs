export type VehicleOption =
  | "Cruise Control"
  | "AM/FM Radio"
  | "Air Conditioner"
  | "2 Wheel Drive"
  | "Bluetooth"
  | "Sunroof"
  | "Leather Seats"
  | "Gasoline Vehicle";
export  interface VehicleType {
  model: string;
  automaticTransmission:boolean;
  maxPassengers: number;
  numberOfDoors: number;
  luggageCapacity: number;
  image:string
  type:string
  quantity:number
  options: VehicleOption[];
}

