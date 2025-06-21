import { sequelize } from "./index.js";
import { DataTypes } from "sequelize";

export const listeEquipement = sequelize.define("ListeEquipement", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    }},
        {
        timestamps: false,
    }

)