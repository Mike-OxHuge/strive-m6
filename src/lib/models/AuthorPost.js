const AuthorPost = (sequelize, DataTypes) => {
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
  return AuthorPost;
};

export default AuthorPost;
