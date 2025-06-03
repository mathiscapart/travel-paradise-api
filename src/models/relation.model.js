import { sequelize } from "./index.js";

export const createTable = async () => {
    try {
        await sequelize.sync({alter: true})
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
}
