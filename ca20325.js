/*Continuous Assessment 1
 * Module Title: Back-end Web Development
 * Module Code: BSC30920
 * Assessment Type: Individual Project
 * Id Student: 20325
 * Student Name: Bruno Henrique Mello Mendanha */

//Defining routing using Express application object methods that correspond to HTTP methods.
const express = require('express');
const app = express();
const port = 3000;
const bodyParse = require('body-parse');

// import the mongodb module and associate it with the objectID variable
const objectID = require('mongodb').ObjectID;
// MongoClient: variable that will connect to the database
const MongoCLient = require('mongodb').MongoClient;

//Database name: ca-back-end / Collection name: timetable

const uri =
  'mongodb+srv://admin:admin@cluster0.g01f7.mongodb.net/ca-back-end?retryWrites=true&w=majority';

//Open connection
MongoCLient.connect(uri, (err, client) => {
  if (err) return console.log(err);
  db = client.db('ca-back-end');

  //Using port 3000 at localhost
  app.listen(3000, () => {
    console.log('API started!');
    console.log(`App listening on port ${port}!`);
  });
});

//Analyse the text as URL-encoded data and exposes the resulting object in the req.
app.use(bodyParse.urlencode({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('home');
});

//Fill the table that was created
app.get('/show', (req, res) => {
  db.collection('timetable')
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
          res.render('show', { data: results });
    });
});

app.post('/show', function (req, res) {
  db.collection('timetable').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('Class saved in the database ');
    res.redirect('/show');
  });
});
