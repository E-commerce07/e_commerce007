// models/category.model.js
module.exports = (connection, DataTypes) => {
  const Category = connection.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      tableName: "categories",
      timestamps: false,
    }
  );

  return Category;
};
