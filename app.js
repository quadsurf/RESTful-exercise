var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var low = require('lowdb');
var db = low('db.json');

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser())

app.get('/puppies', function(req, res){
  var puppies = db('puppies').value();
  res.render('index', { title: "Puppies", puppies: puppies})
});

app.get('/puppies/new', function(req, res) {
  res.render('new')
});

app.post('/puppies/new', function (req, res) {
  var name = req.body.name;
  var breed = req.body.breed;
  db('puppies').push({name: name, breed: breed});
  res.redirect('/puppies')
});

app.get('/puppies/:name', function (req, res) {
  var puppy = db('puppies').find({name: req.params.name})
  res.render('show', {puppy: puppy})
});

app.get('/puppies/:name/edit', function (req, res) {
  var puppy = db('puppies').find({name: req.params.name})
  res.render('edit', {puppy: puppy})
});

app.put('/puppies/:name', function (req, res) {
  var name = req.body.name;
  var breed = req.body.breed;
  var puppy = db('puppies').chain().find({name: req.params.name}).assign({name: name, breed: breed}).value()
  res.send('ok?')
});

app.delete('/puppies/:name', function (req, res) {
  // delete puppy from db
  // send a 204 ok response back
});

app.listen(3000);
