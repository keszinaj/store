import {sequelize} from "../config/dbConfig";

export async function testConnectionToDb(){
    try {
        await sequelize.authenticate();
        console.log('Connection to DB has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the DB:', error);
    }
}

/*
 This synchronizes the db to reflect the structure of javascript models.
 It has to run every time we change anything in one of the models.
 */
export async function syncDb(){
    // {force: true} drops the given table if it doesn't match with the sequelize model.
    // {alter: true} modifies the given table if it doesn't match with the sequelize model.
    // It's good for development, but later should be changed to migrations
    const options = {force: true};

    // Run sequelize.sync() to synchronize relations between tables and create new tables or columns if needed.
    await sequelize.sync(options);
}