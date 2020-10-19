import {DataTypes, Model} from "sequelize";
import database from "../config/database";

export class User extends Model {
    id: string;
    name: string;
    email: string;
    password: string;
    preferredName: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// @ts-ignore
User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        },
        preferredName: {
            type: new DataTypes.STRING(128),
            allowNull: true,
        },
    },
    {
        tableName: "users",
        sequelize: database
    }
);

User.sync({ force: true }).then(() => console.log("User table created"));
