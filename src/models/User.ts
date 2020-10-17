import {DataTypes, Model} from "sequelize";
import {database} from "../config/database";

export class User extends Model {
    id: number;
    name: string;
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
