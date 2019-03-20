var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  //Delete the "products" collection:
  dbo.collection("products").drop(function(err, delOK) {

    // Also can use the dropCollection() method to delete a table (collection).
    //dbo.dropCollection("products", function(err, delOK) {

    //delOK - result parameter which returns true if the collection was dropped successfully, otherwise it returns false
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
    db.close();
  });
});
