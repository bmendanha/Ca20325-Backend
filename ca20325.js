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
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

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

app.use(bodyParser.urlencoded({ extended: false }));

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

//prettier-ignore
//route to edit/uptade record (Method: GET - POST)
app.route('/edit/:id')

.get((req, res) => {
    var id = req.params.id;
    db.collection('timetable').find(ObjectId(id)).toArray(
      (err, result) => {
        if (err) return console.log(err)
        res.render('edit', {data: result})
      })
  })
  
  .post((req, res) => {
    var id = req.params.id
    var classe = req.body.Class
    var personal = req.body.Personal
    var weekday = req.body.Weekday
    var duration = req.body.Duration
    var room = req.body.Room
    var price = req.body.Price
    db.collection('timetable').updateOne(
      {
        _id: ObjectId(id)
      },
      {
        $set: {
          class: classe,
          personal: personal,
          weekday: weekday,
          duration: duration,
          room: room,
          price: price,
        }
      }, (err, result) => {
          if (err) return console.log(err)           
          console.log('Database updated')
          res.redirect('/show')
      }
    )
  });

//route to delete record
app.route('/delete/:id').get((req, res) => {
  var id = req.params.id;
  db.collection('timetable').deleteOne(
    {
      _id: ObjectId(id),
    },
    (err, result) => {
      if (err) return console.log(err);
      console.log('Deleted');
      res.redirect('/show');
    }
  );
});
