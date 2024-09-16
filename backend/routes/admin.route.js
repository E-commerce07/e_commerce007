const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const authMiddleware = require("../middlewares/authMiddleware");

// Apply auth middleware to all routes
router.use(authMiddleware);

// Routes for admin actions
router.get("/clients", adminController.checkAdmin, adminController.getAllClients); // Get all clients
router.get("/sellers", adminController.checkAdmin, adminController.getAllSellers); // Get all sellers
router.put("/switch-role/:id", adminController.checkAdmin, adminController.switchRole); // Switch role of a user (client <=> seller)
router.delete('/users/:id',adminController.checkAdmin, adminController.deleteUser);
module.exports = router;
