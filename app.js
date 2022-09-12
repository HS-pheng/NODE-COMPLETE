const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const db = require('./utils/database');

const errorController = require('./controllers/error');

const app = express();

db.execute('SELECT * FROM products')
    .then(result => {
        console.log(result[0]);
    })
    .catch(err => {
        console.log(err);
    })

// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// expose static content for request
app.use(express.static(path.join(__dirname, 'public')));

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

app.use('/admin', adminRoutes);
app.use('/', shopRoutes);

// error route
app.use('/', errorController.getErrorPage);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running in http://localhost:${PORT}`);
});