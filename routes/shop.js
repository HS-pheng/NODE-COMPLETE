const express = require('express');
const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getIndexPage);

router.get('/products', shopController.getProductPage);

router.get('/products/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart/delete-cart', shopController.postDeleteCart);

router.get('/order', shopController.getOrder);

router.post('/create/order', shopController.postCreateOrder)

router.get('/checkout', shopController.getCheckout);

module.exports = router;