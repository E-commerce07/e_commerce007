// models/order.model.js
module.exports = (connection, DataTypes) => {
  const Order = connection.define(
    "Order",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Completed", "Cancelled"),
        defaultValue: "Pending",
      },
    },
    {
      tableName: "orders",
      timestamps: true,
    }
  );

  return Order;
};
