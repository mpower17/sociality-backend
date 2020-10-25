import {DataTypes, Model} from "sequelize";
import database from "../config/database";
import {User} from "./User";

export class Image extends Model {
    id: number;
    url: string | null;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// @ts-ignore
Image.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: new DataTypes.STRING(1024),
            allowNull: true,
        }
    },
    {
        freezeTableName: true,
        tableName: "images",
        sequelize: database
    }
);
