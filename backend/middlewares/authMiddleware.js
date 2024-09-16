const jwt = require("jsonwebtoken");

// Secret key for JWT
const SECRET_KEY = "baboucha12";


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = authMiddleware;
