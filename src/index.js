const sequelize = require('./models/index.js');
const app = require('./routes')
const port = 8080;

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

    app.listen(port, () => {
        console.log(`Express server started on port ${port}.`);
    });
}

init();