

import { DataTypes } from "sequelize";
import sequalize from "../db/connection";
export const VehicleModel=sequalize.define("Car",
  {
car_id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
image:{type:DataTypes.STRING,allowNull:true,unique:true},
type:{type:DataTypes.STRING,allowNull:false},
luggageCapacity:{type:DataTypes.INTEGER,allowNull:false},
maxPassengers:{type:DataTypes.INTEGER,allowNull:false},
automaticTransmission:{type:DataTypes.BOOLEAN,allowNull:false},
numberOfDoors:{type:DataTypes.INTEGER,allowNull:false},
model:{type:DataTypes.STRING,allowNull:false},
Options:{type:DataTypes.ARRAY(DataTypes.STRING),defaultValue:[]},
quantity:{type:DataTypes.INTEGER,defaultValue:0},
  },{
    freezeTableName:true,
    createdAt:true,updatedAt:true
  }
)

