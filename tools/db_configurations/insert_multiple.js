var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("webstore");
  var myobj = [
    { _id: 0, model: 'Dell XPS 15', processor: 'intel core i7', graficscard: 'nvidia geforce 960m', ram: '16', ssd: '512', matrix: 'full hd ips'},
    { _id: 1, model: 'MacBook Pro', processor: 'intel core i7', graficscard: 'nvidia 930m', ram: '16', ssd: '256', matrix: 'full hd ips'},
    { _id: 2, model: 'Asus VivoBook', processor: 'intel core i5', graficscard: 'nvidia 1030m', ram: '8', ssd: '1024 hd', matrix: 'full hd'},
    { _id: 3, model: 'HP Elitebook', processor: 'intel core i5', graficscard: 'nvidia 920m', ram: '8', ssd: '256', matrix: 'full hd'},

    { _id: 4, model: 'Lenovo Notebook', processor: 'intel core i3', graficscard: 'intel integrated', ram: '4', ssd: '1024 hd', matrix: 'full hd'},
    { _id: 5, model: 'Dell Inspiron 15', processor: 'intel core i3', graficscard: 'intel integrated', ram: '8', ssd: '1024 hd', matrix: 'hd'},
    { _id: 6, model: 'Dell Vostro', processor: 'intel core i5', graficscard: 'intel integrated', ram: '8', ssd: '1024 hd', matrix: 'full hd'},
    { _id: 7, model: 'HP Notebook', processor: 'intel core i5', graficscard: 'intel integrated', ram: '4', ssd: '1024 hd', matrix: 'hd'},

    { _id: 8, model: 'Dell XPS 13', processor: 'intel core i7', graficscard: 'nvidia geforce 930m', ram: '16', ssd: '256', matrix: 'full hd ips'},
    { _id: 9, model: 'MacBook Air', processor: 'intel core i5', graficscard: 'intel integrated', ram: '16', ssd: '256', matrix: 'full hd ips'},
    { _id: 10, model: 'Lenovo Ultrabook', processor: 'intel core i7', graficscard: 'nvidia 1030m', ram: '8', ssd: '1024 hd', matrix: 'full hd'},
    { _id: 11, model: 'Asus Zenbook', processor: 'intel core i5', graficscard: 'nvidia 950m', ram: '16', ssd: '256', matrix: 'full hd'},

  ];
  dbo.collection("products").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    console.log(res);
    db.close();
  });
});