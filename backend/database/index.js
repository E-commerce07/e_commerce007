// database/index.js

// Import necessary modules
const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config");

// Initialize Sequelize instance / Establish Connection
const Connection = new Sequelize(config.name, config.user, config.password, {
  host: "localhost",
  port: config.port,
  dialect: "mysql",
  logging: (...msg) => console.log("--- DATABASE LOGS:", msg),
});

// Import all models
const models = {
  User: require("../models/user.model")(Connection, DataTypes),
  Category: require("../models/category.model")(Connection, DataTypes),
  Product: require("../models/product.model")(Connection, DataTypes),
  Order: require("../models/order.model")(Connection, DataTypes),
  OrderItem: require("../models/orderItem.model")(Connection, DataTypes),
};

// Define associations / Relationships between tables
const defineAssociations = () => {
  // User and Product associations (for sellers)
  models.User.hasMany(models.Product, {
    foreignKey: "seller_id", // Foreign key in Product model
    as: "products", // Alias for User's products
  });

  models.Product.belongsTo(models.User, {
    foreignKey: "seller_id", // Foreign key in Product model
    as: "seller", // Alias for the User who owns the product
  });

  // Category and Product associations
  models.Category.hasMany(models.Product, {
    foreignKey: "category_id", // Foreign key in Product model
    as: "products", // Alias for Category's products
  });

  models.Product.belongsTo(models.Category, {
    foreignKey: "category_id", // Foreign key in Product model
    as: "category", // Alias for the Category of the product
  });

  // User and Order associations (for clients)
  models.User.hasMany(models.Order, {
    foreignKey: "client_id", // Foreign key in Order model
    as: "orders", // Alias for User's orders
  });

  models.Order.belongsTo(models.User, {
    foreignKey: "client_id", // Foreign key in Order model
    as: "client", // Alias for the User who made the order
  });

  // Order and OrderItem associations
  models.Order.hasMany(models.OrderItem, {
    foreignKey: "order_id", // Foreign key in OrderItem model
    as: "orderItems", // Alias for Order's items
  });

  models.OrderItem.belongsTo(models.Order, {
    foreignKey: "order_id", // Foreign key in OrderItem model
    as: "order", // Alias for the Order of the item
  });

  // Product and OrderItem associations
  models.Product.hasMany(models.OrderItem, {
    foreignKey: "product_id", // Foreign key in OrderItem model
    as: "orderItems", // Alias for Product's order items
  });

  models.OrderItem.belongsTo(models.Product, {
    foreignKey: "product_id", // Foreign key in OrderItem model
    as: "product", // Alias for the Product of the item
  });
};

// Function to connect to the database
const connectDB = async () => {
  try {
    await Connection.authenticate();
    console.log("-".repeat(30));
    console.log(
      "🟢 Connection to the database has been established successfully. 🟢"
    );
    console.log("-".repeat(30));
  } catch (error) {
    console.log("-".repeat(30));
    console.error("🔴🔴🔴 Unable to connect to the database:", error);
    console.log("-".repeat(30));
  }
};

// Function to drop all tables in the database
const dropDB = async () => {
  try {
    await Connection.drop({ force: true });
    console.log("-".repeat(30));
    console.log("🟢 All tables have been dropped successfully! 🟢");
    console.log("-".repeat(30));
  } catch (error) {
    console.log("-".repeat(30));
    console.error("🔴 Error while dropping the tables:", error);
    console.log("-".repeat(30));
  }
};

// Function to sync the models with the database
const syncDB = async () => {
  try {
    defineAssociations(); // Call this before syncing to ensure associations are set
    await Connection.sync({ alter: true, force: true });
    console.log("🟢 All models were synchronized successfully. 🟢");
  } catch (error) {
    console.error("🔴🔴🔴 Error during model synchronization:", error);
  }
};

// Export the Sequelize connection, methods, and models
module.exports = { Connection, dropDB, syncDB, connectDB, models };
