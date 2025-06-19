import { sequelize } from "./index.js";
import {Organisation} from "./organisation.model.js";
import {User} from "./user.model.js";
import {Visite} from "./visite.model.js";
import {listeEquipement} from "./listeEquipement.model.js";

export const createTable = async () => {
    try {

        User.belongsTo(Organisation, {foreignKey: "organisationId", as: "organisation"});
        Organisation.hasMany(User, {foreignKey: "organisationId", as: "users"});

        await sequelize.sync({alter: true})
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}
