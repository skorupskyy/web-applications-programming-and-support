var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myquery = { name: "Valley 345" };
  var newvalues = { $set: { name: "Michael", address: "Canyon 123" } };
  //When using the $set operator, only the specified fields are updated:
  //var newvalues = {$set: {address: "Canyon 123"} };
  dbo.collection("products").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});
