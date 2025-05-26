import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('Project', 'root', 'root', {
    dialect: 'postgres'
})
