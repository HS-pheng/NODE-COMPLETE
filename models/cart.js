const fs = require('fs');
const path = require('path');

module.exports = class Cart {
    static addProduct(id, price) {
        const cartDataPath = path.join(__dirname, '../', 'data', 'cart.json');
        fs.readFile(cartDataPath, (err, data) => {
            let existingCartData = {products: [{id: id, qty: 0}], totalPrice : 0};
            if (!err) {
                existingCartData = JSON.parse(data);
            }

            const existingCart = existingCartData.products.findIndex(product => product.id === id);
            let updatedCartData = existingCartData;
            if (existingCart === -1) {
                updatedCartData.products.push({id : id, qty: 1});
            } else {
                updatedCartData.products[existingCart].qty++;
            }
            updatedCartData.totalPrice += parseInt(price);

            fs.writeFile(cartDataPath, JSON.stringify(updatedCartData), err => {
                if (err) {
                    console.log(err);
                }
            });
        })
    }
}