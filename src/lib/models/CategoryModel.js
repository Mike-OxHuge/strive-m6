import sequelize from "./index.js";
import s from "sequelize";

const { DataTypes } = s;

const Category = sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Category;
