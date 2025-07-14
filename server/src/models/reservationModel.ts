import { DataTypes } from "sequelize";
import sequalize from "../db/connection";

export const ReservationModel=sequalize.define("Reservation",
  {
reservation_id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
car_id:{type:DataTypes.INTEGER,allowNull:false},
user_id:{type:DataTypes.INTEGER,allowNull:false},
pickupLocation_id:{type:DataTypes.INTEGER},
returnLocation_id:{type:DataTypes.STRING},
pickupDate:{type:DataTypes.DATE,allowNull:false,unique:true},
returnDate:{type:DataTypes.DATE,allowNull:false,unique:true},
pickupTime:{type:DataTypes.TIME,allowNull:false},
returnTime:{type:DataTypes.TIME,allowNull:false}



  },{
    freezeTableName:true,
    createdAt:true,updatedAt:true
  }
)

