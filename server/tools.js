var arraySize = function(array){
    return "Size of array: " + array.length;
}

var mult = function(x, y){
    return `${x}*${y} = ${x*y}`;
}

var someValue = 256;
var pi = 3.1415;

module.exports = {
    pi: pi,
    someValue: someValue,
    mult: mult,
    arraySize: arraySize
}