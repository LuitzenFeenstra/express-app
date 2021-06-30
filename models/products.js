const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    local: {
        type: Boolean,
        default: true,
    },
    url: {
        type: String,
        required: true,
    },
    manufacturer: {
        type: String,
        enum: ['RSI', 'crusader', 'drake', 'anvil', 'aegis'],
        required: true,
    },
    type: {
        type: String,
        enum: ['cargo', 'fighter', 'capital', 'all round'],
        required: true,
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;