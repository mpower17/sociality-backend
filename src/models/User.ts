import {DataTypes, Model, Optional, Association} from "sequelize";
import database from "../config/database";
import {Image} from "./Image";

interface UserAttributes {
    id: number;
    name: string;
    status: string | null;
    email: string | null;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User extends Model<UserAttributes, UserCreationAttributes> {
    id: number;
    name: string;
    status: string;
    email: string;
    password: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public toDTO() {
        const userObj = this.get({ plain: true});

        delete userObj.password;

        return userObj
    }
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
        status: {
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
        }
    },
    {
        freezeTableName: true,
        tableName: "users",
        sequelize: database
    });

User.belongsTo(Image);
