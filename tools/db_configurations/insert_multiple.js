var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    { _id: 1, name: 'Lenovo Notebook', processor: 'intel core i3'},
    { _id: 2, name: 'HP Elitebook', processor: 'intel core i5'},
    { _id: 3, name: 'Mac Pro', processor: 'intel core i7'},
    { _id: 4, name: 'Dell Inspiron', processor: 'intel core i3'},
    { _id: 5, name: 'Dell Vostro', processor: 'intel core i5'},
    { _id: 6, name: 'HP Notebook', processor: 'intel core i3'},
    { _id: 7, name: 'Lenovo Ultrabook', processor: 'intel core i5'}
  ];
  dbo.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});