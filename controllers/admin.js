const Product = require("../models/product");

exports.getAddProductPage = (req, res, next) => {
    res.render('admin/edit-product', {
        title: "Add-product",
        path : "/admin/add-product",
        editing: "false",
        isAuthenticated: req.session.isAuthenticated
    });
};

exports.postProduct = (req, res, next) => {
    // controller handle input from the client and update those input to the product model
    const inputTitle = req.body.title;
    const inputPrice = req.body.price;
    req.user.createProduct({
        title: inputTitle,
        price: inputPrice
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.productId)
        .then((product) => {
            product.title = req.body.title;
            product.price = req.body.price;
            product.save();
            res.setHeader('Set-Cookie', 'loggedIn=true');
            res.redirect('/admin/products');
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const targetId = req.body.productId;
    Product.findByPk(targetId)
        .then(product => {
            product.destroy();
            res.redirect('/admin/products');            
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getEditProductPage = (req, res, next) => {
    const editMode = req.query.edit;
    const editId = req.params.productId;
    Product.findByPk(editId).then(product => {
        if (!product) {
            res.redirect('/');
        }
        res.render('admin/edit-product', {
            title: "Edit-product",
            path : "/admin/edit-product",
            editing: editMode,
            product: product,
            isAuthenticated: req.session.isAuthenticated
        });
    })
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
        .then(products => {
            res.render('admin/products', {
                title : "Admin Shop",
                prods : products,
                path : "/admin/products",
                isAuthenticated: req.session.isAuthenticated
            }); 
        })
};