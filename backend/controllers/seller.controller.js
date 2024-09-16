const { models } = require('../database');

// Add a new product (only for sellers)
exports.checkSeller = (req, res, next) => {
    if (req.user.role !== "seller") {
      return res.status(403).json({ error: "Access denied. Sellers only." });
    }
    next();
  };
  exports.addProduct = async (req, res) => {
    const { name, imageUrl, description, price, stock, category } = req.body; // Changed `category_id` to `category`
  
    try {
      // Find the category by its name
      const categoryRecord = await models.Category.findOne({
        where: { name: category }
      });
  
      if (!categoryRecord) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      // Use the category ID to create the product
      const newProduct = await models.Product.create({
        name,
        imageUrl,
        description,
        price,
        stock,
        category_id: categoryRecord.id, // Use the ID from the found category
        seller_id: req.user.id, // Seller ID is from the authenticated user
      });
  
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Failed to add product' });
    }
  };
  

// Update an existing product (only for the seller who owns it)
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, imageUrl, description, price, stock, category_id } = req.body;

  try {
    const product = await models.Product.findOne({ where: { id, seller_id: req.user.id } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by seller' });
    }

    await product.update({ name, imageUrl, description, price, stock, category_id });
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete a product (only for the seller who owns it)
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await models.Product.findOne({ where: { id, seller_id: req.user.id } });

    if (!product) {
      return res.status(404).json({ error: 'Product not found or not owned by seller' });
    }

    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
};

// Get all products for the authenticated seller
exports.getSellerProducts = async (req, res) => {
  try {
    const products = await models.Product.findAll({ where: { seller_id: req.user.id } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
};
exports.getAllCategories = async (req, res) => {
  try {
    // Fetch categories from the database
    const categories = await models.Category.findAll();

    // Send categories as response
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};