

import { DataTypes } from "sequelize";
import sequelize from "../db/connection";

export const CarInventoryModel = sequelize.define("CarInventory", {
   quantityAtLocation: {
    type: DataTypes.INTEGER,
    defaultValue:1
  },
  pricePerEach: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue:true
  }
}, {
  freezeTableName: true,
  timestamps: false
});