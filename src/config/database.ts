import {Sequelize} from "sequelize";

const devConnection = process.env.DB_STRING_DEV;
const prodConnection = process.env.DB_STRING_PROD;

let database;

database = new Sequelize("postgres://postgres:postgres@localhost:5432/sociality");

if (process.env.NODE_ENV === 'development') {
    console.log(devConnection);
} else if (process.env.NODE_ENV === 'production') {
    console.log(prodConnection);
}

export default database;