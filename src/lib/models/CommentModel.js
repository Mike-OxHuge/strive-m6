import sequelize from "./index.js";
import s from "sequelize";

const { DataTypes } = s;

const Comment = sequelize.define(
  "comment",
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      min: 1,
      max: 5,
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Comment;
