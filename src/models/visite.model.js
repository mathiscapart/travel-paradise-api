import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const Visite = sequelize.define("Visite", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
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
    town: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    duration : {
        type: DataTypes.INTEGER,
        allowNull: true
    }},
        {
        timestamps: false,
    }
)