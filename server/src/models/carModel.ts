import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const VehicleModel = sequelize.define("Vehicle", {
  vehicle_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  automaticTransmission: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  maxPassengers: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numberOfDoors: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  luggageCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true
  },
  options: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  freezeTableName: true,
  timestamps: true
});