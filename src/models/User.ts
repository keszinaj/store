import {sequelize} from "../config/dbConnection";
import {DataTypes} from "sequelize";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true // checks for email format (foo@bar.com)
        }
    },
    passwordHash: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    birthday: DataTypes.DATE,
    gender: DataTypes.ENUM('male', 'female', 'other'),
    country: DataTypes.STRING,
    city: DataTypes.STRING,
    street: DataTypes.STRING,
    postalCode: DataTypes.STRING,
})



export {User}