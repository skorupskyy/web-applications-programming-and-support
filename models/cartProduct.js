var mongoose = require('mongoose');

//Cart Product Shema
var cartProductShema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});

var CartProduct = module.exports = mongoose.model('CartProduct', cartProductShema);
