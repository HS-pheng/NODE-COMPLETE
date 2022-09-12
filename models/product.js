// module now is using file rather than database
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../', 'data', 'products.json');

module.exports = class Product {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    save() {
        fs.readFile(dataFilePath, (err, fileContent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(fileContent);
            }

            if (this.id) {
                let editProduct = {};
                editProduct.id = this.id;
                editProduct.title = this.title;
                editProduct.price = this.price; 
                products[products.findIndex(product => product.id === this.id)] = editProduct;
            } else {
                this.id = Math.round((Math.random() * 100000000)).toString();
                products.push(this);
            }
            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                if (err) {
                    console.log(err);;
                }
            });
        });
    }

    static delete(id) {
        fs.readFile(dataFilePath, (err, fileContent) => {
            const products = JSON.parse(fileContent);
            const deletedProducts = products.filter((product) => product.id !== id);
            fs.writeFile(dataFilePath, JSON.stringify(deletedProducts), (err) => {
                if (err) {
                    console.log(err);
                }
            })
        })
    }

    static fetchAll() { 
        return new Promise((resolve, reject) => {
            fs.readFile(dataFilePath, (err, data) => {
                if (err) {
                    resolve([]);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        });
    }

    static getProductById(id) {
        return new Promise((resolve, reject) => {
            fs.readFile(dataFilePath, (err, data) => {
                const product = JSON.parse(data).find((product) => product.id === id);
                resolve(product);
            })
        });
    }
}