const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { stripe } = require("../controllers/stripe.controller");

router.use(authMiddleware);
router.post("/create-checkout-session", stripe);

module.exports = router;
