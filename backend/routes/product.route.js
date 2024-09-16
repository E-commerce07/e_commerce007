const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  getAllCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProductsByName,
  getProductsByCategory,
} = require("../controllers/product.controller.js");

//* Routes

router.get("/", getAllProducts);

router.get("/categories", getAllCategories);

router.get("/:id", getProductById);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/search/:name", searchProductsByName);

router.get("/products/category/:categoryId", getProductsByCategory);

module.exports = router;
