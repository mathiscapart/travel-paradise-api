import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const Organisation = sequelize.define("Organisation", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAuthorized: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: false
    }},
        {
        timestamps: false,
    }
)

Organisation.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.isAuthorized;
  return values;
};