import { sequelize } from "./index.js";
import {Organisation} from "./organisation.model.js";
import {User} from "./user.model.js";

export const createTable = async () => {
    try {

        Organisation.hasMany(User)
        User.belongsTo(Organisation)

        await sequelize.sync({alter: true})
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}
