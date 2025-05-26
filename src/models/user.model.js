import { sequelize } from "../services/sequelize.service.js";
import { DataTypes } from "sequelize";

export const UserModel = sequelize.define("User", {
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstanme: {
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
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: null
    },
    language: {
        type: DataTypes.STRING,
        allowNull: null
    }},
        {
        timestamps: false
    }
)