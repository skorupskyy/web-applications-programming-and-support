var mongoose = require('mongoose');

//User Shema
var UserShema = mongoose.Schema({
    // _id:{
    //     type: Number,
    //     required: false
    // },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

var User = module.exports = mongoose.model('User', UserShema);
