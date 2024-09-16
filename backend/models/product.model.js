// models/product.model.js
module.exports = (connection, DataTypes) => {
  const Product = connection.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Assure que la table des utilisateurs est liée par ID
          key: "id",
        },
        
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
  };

  return Product;
};
