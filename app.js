/*
    ---------------------------------------------------------------------------
    @Basic Skeleton for any JS/Express application
    @v0.1
    @Toby Versteeg
    @CodeGorilla
    @december 2020

    This is a 'basic' skeleton (boilerplate) for any JS project.
    It uses Express, MongoDB, Mongoose and EJS templating and more libs.
    This boilerplate includes Bootstrap and jQuery as well to have a quick
    start on building responive websites.
    The folder structure is a basic setup to write clean code and seperates
    files into common folders like public/css, views, controllers, models etc.s
    ---------------------------------------------------------------------------
*/

const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('express-error');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo")(session);
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const assert = require('assert');
const methodOverride = require('method-override');

const app = express();

const events = require('./models/products');
const { captureRejectionSymbol } = require('events');
const Product = require('./models/products');

mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongo connection');
}).catch(err => {
    console.log('mongo connection error');
    console.log(err);
});

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// set public folder to include CSS and JS in your main template
// like href="css/main.css"
// see index.ejs template
app.use(express.static(__dirname + '/public/'));

// paths for including Bootstrap, jQuery and Popper
// from the node_modules folder
// and include them like href="/css/bootstrap.min.css"
// or JS like src="/js/bootstrap.min.js"
// see index.ejs template
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));

// retrieve data from posts in JSON format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//main page
app.get('/', async (req, res) => {
    const products = await Product.find({}) 
    res.render('layouts/index', { products })
});

// store page
app.get('/products', async (req, res) => {
    const products = await Product.find({}) 
    res.render('layouts/products', { products })
});

// make new product
app.get('/new', (req, res) => {
    res.render('layouts/new')
});
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`products/${newProduct._id}`)
})

// show single product
app.get('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render(`layouts/show`, { product });
});

// edit
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('layouts/edit', { product })
})
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

//delete button
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})

// localhost port
app.listen(8080, () => {
    console.log('Hi! :-) I\'m listening to port 8080')
});