'use strict';
/**
*
* Application Dependencies
*
*/

var express = require('express');

var path = require('path');

var bodyParser = require('body-parser');

var favicon = require('serve-favicon');

var logger = require('morgan');

var cookieParser = require('cookie-parser');

var session = require('express-session');

var mongoose = require('mongoose');

var mongoStore = require('connect-mongo')(session);

var app = express();

// connect the mongo db to the application
require('./config/database.js')(mongoose);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));

require('./app/controllers/ApplicationController.js');

// the bodyParser is used to parse from data and body contents
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

/**
* passport configuration for user auth 
*
* https://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
*/

var passport = require('passport');

app.use(session({
    secret: 'Workbo@r$',
    name: 'WB',
    // connect-mongo session store
    store: new mongoStore({ mongooseConnection: mongoose.connection}),
    resave: true,
    saveUninitialized: true
}));


app.use(passport.initialize()); // initilizes the passport middleware

app.use(passport.session()); // enable's session handling for  passport

require('./config/passport')(passport);

require('./config/app.routes.js')(app);

module.exports = app;
