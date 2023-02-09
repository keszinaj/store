const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    database: 'shopDB',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres'
});


// Import models after creating sequelize object, because they rely on it.
import {User} from "../models/User";
import {Product} from "../models/Product";
import {Order} from "../models/Order";

// Set up relations only after all models are imported,
// and thus all of them executed their sequelize.define()
import {setUpRelations} from "../models/Relations";
setUpRelations();

async function testConnectionToDb(){
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
async function syncDb(){
    // {force: true} drops the given table if it doesn't match with the sequelize model.
    // {alter: true} modifies the given table if it doesn't match with the sequelize model.
    // It's good for development, but later should be changed to migrations
    const options = {force: true};

    // We have to sync each model separately, because node runs each module code after it's imported,
    // so otherwise sequelize.define() wouldn't run for these models.
    // Then we run sequelize.sync() to synchronize relations between tables
    await User.sync(options);
    await Product.sync(options);
    await Order.sync(options);
    await sequelize.sync(options);
}


export {sequelize, testConnectionToDb, syncDb}