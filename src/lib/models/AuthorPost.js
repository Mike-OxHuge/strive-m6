import sequelize from "./index.js";
import s from "sequelize";

const { DataTypes } = s;

const AuthorPost = sequelize.define(
  "authorPost",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { timestamps: false }
);
export default AuthorPost;
