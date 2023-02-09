import {sequelize} from "../config/dbConnection";
import {DataTypes} from "sequelize";

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    cpu: DataTypes.STRING,
    memory: DataTypes.STRING,
    graphics: DataTypes.STRING,
    price: DataTypes.DECIMAL(2),
    amountAvailable: DataTypes.INTEGER,
    photoPath: DataTypes.STRING,
    details: DataTypes.STRING
})

export {Product}