//Performance test of mongodb insert functions
var mongodb = require('mongodb');

var servoption = {auto_reconnect: true, poolidnum: 5};
var mongodbServer = new mongodb.Server('localhost', 50012, servoption);

var db = new mongodb.Db('test', mongodbServer);
var count = 10000;

db.open(function() {
  db.collection('users', function(err, collection) {
    /* Test Insert */
    var datas = [];
    for (var i = 0; i < count; i++) {
      datas.push({
        "name": "TestUser",
        "age": "20",
        "idnum": i
      });
    }
    console.time("Insert time");
		collection.insert(datas, function(err, res) {
      if (res) {
        console.timeEnd("Insert time");
      } else {
        console.log('%s:%s',"insert error", err.message);
      }
    });

    /* Test InsertMany */
    var datas = [];
    for (var i = 0; i < count; i++) {
      datas.push({
        "name": "TestUser",
        "age": "20",
        "idnum": i
      });
    }
    console.time("InsertMany time");
		collection.insertMany(datas, function(err, res) {
      if (res) {
        console.timeEnd("InsertMany time");
      } else {
        console.log('%s:%s',"insertMany error", err.message);
      }
    });

    /* Unordered Bulk Insert*/
    var datas = [];
    for (var i = 0; i < count; i++) {
      datas.push({
        "name": "TestUser",
        "age": "20",
        "idnum": i
      });
    }
    console.time("UnorderedBulk Insert");
    var bulk = collection.initializeUnorderedBulkOp();
    for (var i = 0; i < count; i++) {
      bulk.insert(datas[i]);
    }
    bulk.execute(function(err, res) {
      if(res){
         console.timeEnd("UnorderedBulk Insert");
      } else {
         console.log('%s:%s',"unorderBulk error", err.message);
      }
    });

    /* Ordered Bulk Insert Test */
    var datas = [];
    for (var i = 0; i < count; i++) {
      datas.push({
        "name": "TestUser",
        "age": "20",
        "idnum": i
      });
    }
    console.time("OrderedBulk Insert");
    var bulk = collection.initializeOrderedBulkOp();
    for (var i = 0; i < count; i++) {
      bulk.insert(datas[i]);
    }
    bulk.execute(function(err, res) {
      if(res){
         console.timeEnd("OrderedBulk Insert");
      }else{
         console.log('%s:%s',"orderBulk error", err.message);
      }
    });

    collection.drop(function(err, delOK) {
      if(delOK)
        console.log("deleted");
    });
  });
  
  db.close();
});
