var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  /*Delete all products where the name starts with an "O":*/
//   var myquery = { name: /^O/ };
//   dbo.collection("products").deleteMany(myquery, function(err, obj) {
  

/*Delete the first customers with the name "Mount":*/
  var myquery = { name: 'Mount' };
  dbo.collection("products").deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log(obj.result.n + " document(s) deleted");
    db.close();
  });
});


// The deleteMany() method returns an object which contains information 
//about how the execution affected the database.

// Most of the information is not important to understand, 
//but one object inside the object is called "result" which tells us 
//if the execution went OK, and how many documents were affected.

//The result object looks like this:
// { n: 2, ok: 1 }