var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  //Find the first document in the customers collection:
  dbo.collection("products").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
