const express = require('express');
const path = require('path');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/add-product', adminController.getAddProductPage);

router.get('/products', adminController.getProducts);

router.post('/add-product', adminController.postProduct);

router.post('/edit-product', adminController.postEditProduct);

router.get('/edit-product/:productId', adminController.getEditProductPage);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;