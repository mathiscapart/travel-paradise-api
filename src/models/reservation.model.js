import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const Reservation = sequelize.define("Reservation", {
    start_date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secret_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    max_visitor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false
    },
    guide_id: {
        type: DataTypes.STRING,
        allowNull: false
    }},
        {
        timestamps: false,
    }
)