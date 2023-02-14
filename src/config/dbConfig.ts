import { Sequelize } from 'sequelize-typescript';

export const sequelize = new Sequelize({
    database: 'shopDB',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    models: [__dirname + "/../models"],
    modelMatch: (filename, member) => {
        return filename.substring(0, filename.indexOf('.model')).toLowerCase() === member.toLowerCase();
    }
});