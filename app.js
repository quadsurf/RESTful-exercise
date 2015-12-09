var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var low = require('lowdb');
var db = low('db.json');

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser())

app.get('/', function (req, res) {
  res.redirect('/puppies')
});

// ******************
// *****CREATE*******
// ******************

app.get('/puppies/new', function(req, res) {
  res.render('new')
});

app.post('/puppies/new', function (req, res) {
  var name = req.body.name;
  var breed = req.body.breed;
  var id = (db('puppies').value().length + 1).toString();
  db('puppies').push({id: id, name: name, breed: breed});
  res.redirect('/puppies')
});

// ******************
// *******READ*******
// ******************

app.get('/puppies', function(req, res){
  var puppies = db('puppies').value();
  res.render('index', { title: "Puppies", puppies: puppies})
});

app.get('/puppies/:id', function (req, res) {
  var puppy = db('puppies').find({id: req.params.id})
  res.render('show', {puppy: puppy})
});

// ******************
// *****UPDATE*******
// ******************

app.get('/puppies/:id/edit', function (req, res) {
  var puppy = db('puppies').find({id: req.params.id})
  res.render('edit', {puppy: puppy})
});

app.put('/puppies/:id', function (req, res) {
  var name = req.body.name;
  var breed = req.body.breed;
  var puppy = db('puppies').chain().find({id: req.params.id}).assign({name: name, breed: breed}).value()
  res.send('200')
});

// ******************
// *****DELETE*******
// ******************

app.delete('/puppies/:id', function (req, res) {
  db('puppies').remove({ id: req.params.id })
  res.send('204')
});

app.listen(3000);
