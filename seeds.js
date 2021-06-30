const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://localhost:27017/products', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('mongo connection');
}).catch(err => {
    console.log(err);
});

Product.db.dropDatabase();


const seedProducts = [
    {
        name: 'Constelation',
        price: 225,
        url: 'images/prod-pics/Andromeda.jpg',
        manufacturer: 'RSI',
        type: 'all round', 
    },
    {
        name: 'Cutlass',
        price: 100,
        url: 'images/prod-pics/Cutlass.jpg',
        manufacturer: 'drake',
        type: 'all round', 
    },
    {
        name: 'Gladius',
        price: 90,
        url: 'images/prod-pics/Gladius.jpg',
        manufacturer: 'aegis',
        type: 'fighter', 
    },
    {
        name: 'Vanguard',
        price: 290,
        url: 'images/prod-pics/Harbinger.jpg',
        manufacturer: 'aegis',
        type: 'fighter', 
    },
    {
        name: 'Mercury',
        price: 260,
        url: 'images/prod-pics/Mercury.jpg',
        manufacturer: 'crusader',
        type: 'fighter', 
    },
    {
        name: 'Idris',
        price: 1000,
        url: 'images/prod-pics/Idris.jpg',
        manufacturer: 'aegis',
        type: 'capital', 
    },
]

Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
