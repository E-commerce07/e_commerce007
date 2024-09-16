const { models } = require("../database");

// Middleware to check if the user is an admin
exports.checkAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }
  next();
};

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await models.User.findAll({ where: { role: "client" } });
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ error: "Failed to retrieve clients" });
  }
};

// Get all sellers
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await models.User.findAll({ where: { role: "seller" } });
    res.json(sellers);
  } catch (error) {
    console.error("Error fetching sellers:", error);
    res.status(500).json({ error: "Failed to retrieve sellers" });
  }
};

// Change role of a user (Client <=> Seller)
exports.switchRole = async (req, res) => {
  const { id } = req.params; // User ID from request parameters
  const { newRole } = req.body; // New role from request body

  if (!["client", "seller"].includes(newRole)) {
    return res.status(400).json({ error: "Invalid role" });
  }

  try {
    const user = await models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user's role
    await user.update({ role: newRole });
    res.json({ message: `User role updated to ${newRole}` });
  } catch (error) {
    console.error("Error switching role:", error);
    res.status(500).json({ error: "Failed to switch role" });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

