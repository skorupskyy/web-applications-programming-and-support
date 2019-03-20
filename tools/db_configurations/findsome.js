var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  //Exclude the _id field from the result:
  dbo.collection("products").find({}, { projection: { _id: 0, name: 1, processor: 1 } }).toArray(function(err, result) {
    //Exclude the name field from the result:
    // db.collection("customers").find({}, { projection: { name: 0 }
    if (err) throw err;
    console.log(result);
    console.log(result[7].name);
    db.close();
  });
});
