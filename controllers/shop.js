const Product = require("../models/product");
const Cart = require("../models/cart");


exports.getProductPage = (req, res, next) => {
    // the controller takes the result from the product model and display it to the user
    Product.fetchAll().then((products) => {
        res.render('shop/product-list', {
            title : "Shop",
            prods : products,
            path : "/products"
        }); 
    })
};

exports.getProductDetail = (req, res, next) => {
    Product.getProductById(req.params.productId).then((product) => {
        res.render('shop/product-detail', {
            title: "Product detail",
            prods: product,
            path: "/products"
        });
    });
}

exports.getIndexPage = (req, res, next) => {
    res.render('shop/index', {
        title: "Shop",
        path : "/"
    })
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        title: "Your Cart",
        path : "/cart"
    })
};

exports.postCart = (req, res, next) => {
    const cartId = req.body.productId;
    Product.getProductById(cartId).then((product) => {
        Cart.addProduct(cartId, product.price);
    })
    res.redirect('/cart');
}

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        title: "Checkout",
        path : "/checkout"
    })
};

exports.getOrder = (req, res, next) => {
    res.render('shop/order', {
        title: "Your order",
        path: '/order'
    }) 
}