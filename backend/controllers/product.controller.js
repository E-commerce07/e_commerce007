// Import necessary modules
const { models } = require("../database"); // Import models from your database setup
const { Op } = require("sequelize");

// Controller function to get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    console.log("Category Query:", category);

    const categories = await models.Category.findAll();
    const products = await models.Product.findAll();

    const productsWithCategoryName = products.map((product) => {
      const category = categories.find((cat) => cat.id === product.category_id);
      return {
        ...product.toJSON(),
        category_name: category ? category.name : null,
      };
    });

    if (category === "all") {
      return res.json(productsWithCategoryName);
    }

    const filteredProducts = category
      ? productsWithCategoryName.filter(
          (product) => product.category_name === category
        )
      : productsWithCategoryName;

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await models.Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to get categories" });
  }
};

// Controller function to get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id); // Fetch product by primary key
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the product" });
  }
};

// Controller function to create a new product
exports.createProduct = async (req, res) => {
  const { name, price, stock, description, userId } = req.body; // Extract data from request body
  try {
    const newProduct = await models.Product.create({
      name,
      price,
      stock,
      description,
      userId,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create the product" });
  }
};

// Controller function to update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, stock, description, userId } = req.body; // Extract data from request body
  try {
    const product = await models.Product.findByPk(id); // Find product by primary key
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.update({ name, price, stock, description, userId }); // Update product details
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to update the product" });
  }
};

// Controller function to delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await models.Product.findByPk(id); // Find product by primary key
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy(); // Delete the product
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

(exports.searchProductsByName = async (req, res) => {
  const name = req.params.name; // Use req.params to get the name from the URL parameter
  if (!name) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const products = await models.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`, // Use LIKE for MySQL
        },
      },
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}),
  (exports.getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params; // Extract categoryId from request parameters
    try {
      const products = await models.Product.findAll({
        where: {
          category_id: categoryId,
        },
      });
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });
