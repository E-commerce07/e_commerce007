const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/seller.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// Apply authentication middleware to ensure the user is a seller
router.use(authMiddleware);

// Route for adding a product
router.post('/products',sellerController.checkSeller, sellerController.addProduct);
router.get('/categories',sellerController.checkSeller,sellerController.getAllCategories)
// Route for updating a product
router.put('/products/:id', sellerController.checkSeller, sellerController.updateProduct);

// Route for deleting a product
router.delete('/products/:id',sellerController.checkSeller,  sellerController.deleteProduct);

// Route to get all seller's products
router.get('/products',sellerController.checkSeller,  sellerController.getSellerProducts);

module.exports = router;