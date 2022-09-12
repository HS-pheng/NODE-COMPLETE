const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        title: "Add-product",
        path : "/admin/add-product",
        editing: "false"
    });
};

exports.postProduct = (req, res, next) => {
    // controller handle input from the client and update those input to the product model
    const product = new Product(null, req.body.title, req.body.price);
    product.save();
    res.redirect('/admin/products');
};

exports.postEditProduct = (req, res, next) => {
    const editProduct = new Product(req.body.productId, req.body.title, req.body.price);
    editProduct.save();
    res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
    const targetId = req.body.productId;
    Product.delete(targetId);
    res.redirect('/admin/products');
}

exports.getEditProductPage = (req, res, next) => {
    const editMode = req.query.edit;
    const editId = req.params.productId;
    Product.getProductById(editId).then(product => {
        if (!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product', {
            title: "Edit-product",
            path : "/admin/edit-product",
            editing: editMode,
            product: product
        });
    })
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((products) => {
        res.render('admin/products', {
            title : "Admin Shop",
            prods : products,
            path : "/admin/products"
        }); 
    })
};