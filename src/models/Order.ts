import {sequelize} from "../config/dbConnection";
import {DataTypes} from "sequelize";

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: DataTypes.ENUM('pending', 'finished')
})

export {Order}