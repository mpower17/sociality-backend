import {DataTypes, Model, Optional} from "sequelize";
import database from "../config/database";
import {User} from "./User";

interface PostAttributes {
    id: string;
    text: string;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> {}

export class Post extends Model<PostAttributes, PostCreationAttributes> {
    id: string;
    text: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

// @ts-ignore
Post.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        text: {
            type: new DataTypes.STRING(1024),
            allowNull: false,
        }
    },
    {
        freezeTableName: true,
        tableName: "posts",
        sequelize: database
    });

Post.belongsTo(User);
