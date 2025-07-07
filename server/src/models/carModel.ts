

import { DataTypes } from "sequelize";

import sequalize from "../db/connection";
export const CarModel=sequalize.define("Car",
  {
car_id:{type:DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
image:{type:DataTypes.STRING,allowNull:true,unique:true},
type:{type:DataTypes.STRING,allowNull:false},
bags:{type:DataTypes.INTEGER,allowNull:false},
passengers:{type:DataTypes.INTEGER,allowNull:false},
automatic_transmission:{type:DataTypes.BOOLEAN,allowNull:false},
doors:{type:DataTypes.INTEGER,allowNull:false},
model:{type:DataTypes.STRING,allowNull:false},
Options:{type:DataTypes.ARRAY(DataTypes.STRING),defaultValue:[]},
quantity:{type:DataTypes.INTEGER,defaultValue:0},
  },{
    freezeTableName:true,
    createdAt:true,updatedAt:true
  }
)

