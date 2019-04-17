var mongoose = require('mongoose');

//Shopping Cart Shema
var shoppingCartShema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    }
});

var ShoppingCart = module.exports = mongoose.model('ShoppingCart', shoppingCartShema);
