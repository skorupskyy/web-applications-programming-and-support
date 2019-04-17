var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    { userId: '5ca4171b1411aa3c7c8c0c53', userName: "Alex Skorupskyy", productId: '5cad9efac07376094801dbbe', productName: 'Dell XPS 15', productPrice: 1200, count: 1},
    { userId: '5ca4171b1411aa3c7c8c0c53', userName: "Alex Skorupskyy", productId: '5cad9efac07376094801dbc0', productName: 'Asus VivoBook', productPrice: 700, count: 1}
  ];
  dbo.collection("cart_products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});