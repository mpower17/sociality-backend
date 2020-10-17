import { Sequelize } from "sequelize";

export const database = new Sequelize('postgres://postgres:postgres@localhost:5432/sociality');