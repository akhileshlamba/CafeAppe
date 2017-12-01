var express = require('../node-postgres-todo/node_modules/express');

var constants = require('./resources/constants');
 var productDAO = require('./DAO/productDAO');
 var cafeDAO = require('./DAO/cafeDAO');

var app = express();
var bodyParser = require("../node-postgres-todo/node_modules/body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/getAllProducts', function (req, res) {
  console.log("Hello World!")
  console.log(productDAO.viewProduct());
});

app.post('/getCafes', function (req, res){
  var a = function(){
      productDAO.getStates.then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
  }
  return a();
});

app.post('/addNewCafe', function (req, res){
  var a = function(){
    console.log(req.body.unitNumber);
    cafeDAO.addNewLocation(10, 10, 10).then(
      cafeDAO.addNewAddress(5,req.body.unitNumber, req.body.streetName, 5599)).then(
        cafeDAO.addNewCafe(1, 5,req.body.cafeName, 10, true, 1, 1));
  }
  return a();
});

    console.log(req.body.pName);
    console.log(req.body.pName + req.body.pDesc + req.body.pPrice + req.body.pSize);
    productDAO.createProduct(1,req.body.pName,true,1,new Date(),new Date(),1);
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
