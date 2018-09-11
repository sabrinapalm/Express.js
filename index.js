const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator')
let port = 3000;
let app = express();


// Custom middlware
/*let logger = function(request, response, next){
  console.log('Logging');
  next();
}
app.use(logger);
*/

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set static path
app.use(express.static(path.join(__dirname, 'public')));

// Global variables
app.use(function(req, res, next){
  res.locals.errors = null;
  next();
});

// Express Validator middleware
app.use(expressValidator());﻿

let users = [
  {
    id: 1,
    first_name: 'Sabrina',
    last_name: 'Palm',
    email: 'sabrina.palm@bonsai.se'
  },
  {
    id: 2,
    first_name: 'Johan',
    last_name: 'Augustsson',
    email: 'johan.augustsson@bonsai.se'
  }
]

app.get('/', function(req, res){
  res.render('index', {
    title: 'Users',
    users: users
  });
});

app.post('/users/add', function(req, res){
  req.checkBody('first_name', 'First name is required').notEmpty();
  req.checkBody('last_name', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();

  let errors = req.validationErrors();

  if(errors) {
    console.log('ERRORS');
  } else {
    let newUser = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }
    console.log('SUCCESS');
  }
});

app.listen(port, function() {
  console.log("Server is running on port 3000");
});
