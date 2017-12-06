var express = require('../node-postgres-todo/node_modules/express');

var constants = require('./resources/constants');
 var productDAO = require('./DAO/ProductDAO');
 var cafeDAO = require('./DAO/CafeDAO');
 var generalDAO = require('./DAO/GeneralDAO');

var app = express();
var bodyParser = require("../node-postgres-todo/node_modules/body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

/*app.get('/getAllProducts', function (req, res) {
  console.log(productDAO.viewProduct());
});*/

app.post('/getCafes', function (req, res){
  console.log("8. reached persistence service to get cafes");
  var a = function(){
      cafeDAO.getCafeList().then(function(fulfilled){
        console.log("10. returning back after getting cafe list");
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
  }
  return a();
});

app.post('/getStates', function (req, res){
  var a = function(){
      generalDAO.getStates.then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
  }
  return a();
});

app.post('/getSuburbs', function (req, res){
  var a = function(){
      generalDAO.getSuburbs(req.body.stateId).then(function(fulfilled){
      return res.send(fulfilled);
    }).catch(function (error) {
      console.log(error);
    });
  }
  return a();
});

app.post('/addNewCafe', function (req, res){
  console.log("2. Add Cafe Persistence Service Entry");
  var a = function(){
    cafeDAO.addNewLocation(10, 10).then(
      cafeDAO.addNewAddress(req.body.unitNumber, req.body.streetName, req.body.suburb)).then(
        cafeDAO.addNewCafe( req.body.cafeName, 1, 1)).then(function(fulfilled){
          console.log("6. Returning after adding cafe");
        });
  }
  return a();
});


app.post('/addProductSubmits', function (req, res){
    console.log(req.body.pName);
    console.log(req.body.pName + req.body.pDesc + req.body.pPrice + req.body.pSize);
    var a = function() {
        productDAO.createProductPromise(1, req.body.pName, true, 1, new Date(), new Date(), 1)
            .then(function (fulfilled) {
                //return res.send(fulfilled);
            }).then(productDAO.createProductSizePromise(1,1, 2.12 , 1.12, true, 1, new Date(), new Date(), 1).then(
            function (fulfilled) {
                return res.send(fulfilled);
            }).catch(function (error) {
            console.log(error);
        }))
            .catch(function (error) {
                console.log(error);
            });
    }
    return a();
});


app.post('/getProductsList', function (req, res){
    console.log('inb');
    var a = function(){
        productDAO.viewProduct().then(function(fulfilled){
           // console.log(fulfilled);
            return res.send(fulfilled);
        }).catch(function (error) {
            console.log(error);
        });
    }
    return a();
});

var server = app.listen(5001, function () {
    console.log('Node server is running..');
});
