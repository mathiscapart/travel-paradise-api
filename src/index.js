import { sequelize } from './models/index.js';
import { app } from './routes/index.js';
import {createTable} from "./models/relation.model.js";
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.APP_PORT;

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await sequelize.authenticate();
        console.log('Database connection OK!');
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();
    await createTable();

    app.listen(port, () => {
        console.log(`Express server started on port ${port}.`);
    });
}

await init();