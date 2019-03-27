var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  // To find all
//   dbo.collection("products").find({}).toArray(function(err, result) {
  var query = { processor: "intel core i5" };
  // To find only starts with "D"
  // var query = { name: /^D/ };
  dbo.collection("products").find(query, { projection: { processor: 0 } }).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});