// Import necessary modules
const express = require("express");
const router = express.Router();

const {
  login,
  register,
  logout,
  updateUserDetails,
  changeUserPassword,
} = require("../controllers/auth.controller.js");

//* Routes

// Route for user login
router.post("/login", login);

// Route for user registration
router.post("/register", register);

// Route for user logout
router.post("/logout", logout);

// Route for updating user details
//! Expects user ID in the URL parameter and updated details in the body
router.put("/update/:id", updateUserDetails);

// Route for changing user password
//! Expects user ID in the URL parameter and old/new passwords in the body
router.put("/change-password/:id", changeUserPassword);

module.exports = router;
