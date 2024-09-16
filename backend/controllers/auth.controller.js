// Import necessary modules
const { models } = require("../database");
const bcrypt = require("bcrypt"); // For hashing passwords
const jwt = require("jsonwebtoken"); // For generating JWT tokens
const { Op } = require("sequelize");

// Secret key for JWT
const SECRET_KEY = "baboucha12";

// Function for user registration
exports.register = async (req, res) => {
  const { username, email, password, role, wishlist } = req.body;
  try {
    // Check if email already exists
    const existingUser = await models.User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await models.User.create({
      username,
      email,
      password: hashedPassword,
      role,
      wishlist,
    });

    // Generate a token
    const token = jwt.sign({ id: newUser.id, role: newUser.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
    // res.status(500).json({ error: "Failed to register the user" });
    throw error
  }
};

// Function for user login with email or username
exports.login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    // Find the user by email or username using Sequelize's Op.or
    const user = await models.User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }],
      },
    });

    // Check if the user does not exist
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // If the password is invalid, return an error
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a token using JWT
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Respond with a success message and the token
    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Failed to log in the user" });
  }
};

// Function for user logout
exports.logout = (req, res) => {
  // Typically, you would handle logout on the client-side by removing the token
  res.json({ message: "Logout successful" });
};

// Function to update user details
exports.updateUserDetails = async (req, res) => {
  const { id } = req.params; // User ID from request parameters
  const { username, email, role, wishlist } = req.body;

  try {
    // Find the user by ID
    const user = await models.User.findByPk(id);

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user details
    await user.update({
      username,
      email,
      role,
      wishlist,
    });

    res.json({ message: "User details updated successfully" });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({ error: "Failed to update user details" });
  }
};

// Function to change user password
exports.changeUserPassword = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;

  try {
    // Find the user by ID
    const user = await models.User.findByPk(id);

    // If the user does not exist, return an error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect old password" });
    }

    // Hash the new password and update it
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await user.update({ password: hashedNewPassword });

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
};
