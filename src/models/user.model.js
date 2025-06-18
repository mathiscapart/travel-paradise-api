import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const User = sequelize.define("User", {
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    organisationId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }},
    {
        timestamps: false,
    }
)

User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};