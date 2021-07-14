export default (sequelize, DataTypes) => {
  const Author = sequelize.define(
    "author",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      surname: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_at: {
        type: "TIMESTAMP",
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  return Author;
};

// "name": "AUTHOR NAME",
// "surname": "AUTHOR SURNAME",
// "avatar":"AVATAR(IMAGE LINK)",
// "created_at": "DATE"
