import { VehicleModel } from "../models/carModel";
import { ReservationModel } from "../models/reservationModel";
import { UserModel } from "../models/userModel";

export default function relations() {
    console.log("relations")
    // Step 1: Create User
    UserModel.hasOne(ReservationModel, {
        foreignKey: 'user_id',
        // as: 'reservation'
      });
      
      // Reservation belongs to User
      ReservationModel.belongsTo(UserModel, {
        foreignKey: 'user_id',
        // as: 'user'
      });
      
      // Car hasOne Reservation
      VehicleModel.hasOne(ReservationModel, {
        foreignKey: 'car_id',
        // as: 'reservation'
      });
      
      // Reservation belongs to Car
      ReservationModel.belongsTo(VehicleModel, {
        foreignKey: 'car_id',
        // as: 'car'
      });
}