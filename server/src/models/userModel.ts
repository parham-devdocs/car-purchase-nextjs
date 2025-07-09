import  { DataTypes }  from "sequelize";
import sequelize  from "../db/connection"

export const UserModel = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: 'user_id'
  },
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  driversAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'drivers_age' // maps `driversAge` to `drivers_age`
  },
  licenceNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    field: 'licence_number'
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name'
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'phone_number'
  },
  receiveEmails: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'receive_emails'
  },
  refreshToken: {
    type: DataTypes.STRING,
    field: 'refresh_token'
  }
}, {
  freezeTableName: true,
  createdAt: true,
  updatedAt: true
});