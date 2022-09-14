const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
let Sequelize = require("sequelize");

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');
const sequelize = require('./utils/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const PORT = 3000;
const app = express();

// body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
// expose static content for request
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        }) 
})

let SequelizeStore = require("connect-session-sequelize")(session.Store);

let sessionStore = new SequelizeStore({
    db: sequelize,
  }); 

app.use(
  session({
    secret: "mysecret",
    store: sessionStore,
    resave: false,
    proxy: true, 
  })
);

sessionStore.sync()

// template engine configuration
app.set("view engine", "ejs");
app.set("views", "views");

app.use('/admin', adminRoutes);
app.use('/auth', authRoutes);
app.use('/', shopRoutes);

// error route
app.use('/', errorController.getErrorPage);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

sequelize
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({name: "HS", email: "Hongsreng.pheng303@gmail.com"});
        }
        return Promise.resolve(user);
    })
    .then(user => {
        return user.createCart();
    }) 
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running in http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.log(err);
    });