// import s from "sequelize";
// import pg from "pg";
// import AuthorModel from "../models/AuthorModel.js";
// import PostModel from "../models/PostModel.js";
// import AuthorPost from "../models/AuthorPost.js";

// const Sequelize = s.Sequelize;
// const DataTypes = s.DataTypes;
// const { PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

// const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
//   host: PGHOST,
//   dialect: "postgres",
// });

// const pool = new pg.Pool();
// const connect = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };

// const models = {
//   Author: AuthorModel(sequelize, DataTypes),
//   Post: PostModel(sequelize, DataTypes),
//   AuthorPost: AuthorPost(sequelize, DataTypes),
//   sequelize: sequelize,
//   pool: pool,
// };

// models.Author.hasMany(models.Post, { foreignKey: "author_id " });
// models.Post.belongsTo(models.Author, { foreignKey: "author_id " });
// models.Author.belongsToMany(models.Post, {
//   through: { model: models.AuthorPost, unique: false, timestamps: false },
// });

// connect();

// export default models;
// ---
import Author from "../models/AuthorModel.js";
import Post from "../models/PostModel.js";
// import Category from "./models/category.js";
import AuthorPost from "../models/AuthorPost.js";
import sequelize from "../models/index.js";

Author.hasMany(Post, { foreignKey: "author_id" });
Post.belongsTo(Author, { foreignKey: "author_id" });

Post.belongsToMany(Author, { through: { model: AuthorPost, unique: false } });
Author.belongsToMany(Post, { through: { model: AuthorPost, unique: false } });

Author.hasMany(AuthorPost);
AuthorPost.belongsTo(Author);

Author.hasMany(AuthorPost);
AuthorPost.belongsTo(Author);

export { Author, sequelize, Post, AuthorPost };
