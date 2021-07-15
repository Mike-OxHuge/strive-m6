import Author from "./AuthorModel.js";
import sequelize from "./index.js";
import s from "sequelize";

const { DataTypes } = s;

const Post = sequelize.define(
  "post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cover: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    read_time_value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    read_time_unit: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: true }
);
export default Post;

// {
//     "id": 1,
//     "category": "ARTICLE CATEGORY",
//     "title": "ARTICLE TITLE",
//     "cover":"ARTICLE COVER (IMAGE LINK)",
//     "read_time_value": 2,
//     "read_time_unit": "minute"
//     "author":"AUTHOR FOREIGN KEY",
//     "content": "HTML",
//     "created_at": "DATE"
// }
