// models/user.model.js
module.exports = (connection, DataTypes) => {
  const User = connection.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "client", "seller"),
        allowNull: false,
      },
      wishlist: {
        type: DataTypes.JSON,
        allowNull: true, // Utilisé principalement pour les clients
      },
    },
    {
      tableName: "users",
      timestamps: true,
    }
  );

  return User;
};
