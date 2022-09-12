const express = require('express');
const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);

router.get('/products', shopController.getProductPage);

router.get('/products/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/order', shopController.getOrder);

router.get('/checkout', shopController.getCheckout);

module.exports = router;