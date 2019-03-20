var tools = require('./tools');
var events = require('events');
var util = require('util');
var fs = require('fs');

var script = fs.readFile("../static/script.js", 'utf8', function(err, data){
    // fs.writeFile('../errors_log.txt', data+"/n", function(err, data){});
    //script = "dewd";
    //console.log(data);
});
console.log(script);
var print = function() {
    console.log("hi bro");
    console.log(tools.arraySize([5, 6, 7, 3, 3]));
    console.log(tools.someValue);
    console.log(tools.pi);
    console.log(tools.mult(4, 5));
    var my_emit = new events.EventEmitter();
    my_emit.on('some_event', function(text){
        console.log(text);

    });
    my_emit.emit('some_event', 'event emitter works good');
}

function call(func) {
    func();
}
//call(print);

var Cars = function(model){
    this.model = model;
}

util.inherits(Cars, events.EventEmitter);

var bmw = Cars('BMW');
var audi = Cars('Audi');
var volvo = Cars('Volvo');

// var cars = [bmw, audi, volvo];

// cars.forEach(function(car){
//     car.on('speed', function(text){
//         console.log(car.model + " speed is " + text);
//     });
// });

// bmw.emit('speed', '250');
// audi.emit('speed', '240');
// volvo.emit('speed', '220');


// ejs html ul
// <!-- <ul> -->
//         <!-- <% obj.pars.forEach(function(item){ %> -->
//             <!-- <li><%= item %></li> -->
//         <!-- <% }); %> -->
// <!-- </ul>  -->