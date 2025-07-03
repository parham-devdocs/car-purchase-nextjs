export type VehicleOption =
  | "Cruise Control"
  | "AM/FM Radio"
  | "Air Conditioner"
  | "2 Wheel Drive"
  | "Bluetooth"
  | "Sunroof"
  | "Leather Seats"
  | "Gasoline Vehicle";
export interface VehicleType {
  VehicleModel: string;
  TransmissionType: string;
  MaxPassengers: number;
  NumberOfDoors: number;
  LuggageCapacity: number;
  options: VehicleOption[];
}