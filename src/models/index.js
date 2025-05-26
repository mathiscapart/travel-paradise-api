const { Sequelize } = require('sequelize');
//const {relationModels} = require("./relationModel");

require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
});

//(async () => {
//    await relationModels(sequelize)
//})();


module.exports = sequelize;