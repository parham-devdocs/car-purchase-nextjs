

export type VehicleType = {
    id: number;
    model: string;
    vehicleType: "Van" | "Sedan" | "SUV"  | "Truck"; // Using union for possible types
    automaticTransmission: boolean;
    pricePerDay: number;
    quantity: number;
    available: boolean;
    maxPassengers: number;
    numberPlate: number;
    numberOfDoors: number;
    luggageCapacity: number;
    image: string;
    options: string[]
  };

  export type LocationType = {
    id: number;
    locationType: "Hotel" | "Airport";
    locationName: string;
    country: string;
    city: string;
    continent: string;
    address: string;
  };


  export type ReservationType={
    returnTime: string
    returnDate: string
    pickupTime: string,
    pickupDate: string
    
  }