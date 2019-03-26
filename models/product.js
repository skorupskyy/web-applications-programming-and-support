var mongoose = require('mongoose');

//Product Shema
var productShema = mongoose.Schema({
    _id:{
        type: Number,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    processor:{
        type: String,
        required: true
    },
    graficscard: {
        type: String,
        required: true
    },
    ram: {
        type: String,
        required: true
    },
    ssd: {
        type: String,
        required: true
    },
    matrix: {
        type: String,
        required: true
    },
});

var Product = module.exports = mongoose.model('Product', productShema);
