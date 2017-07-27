require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

const session = require('express-session');
const sqlstore = require('express-mysql-session')(session);
const passport = require('passport');

let app = express();

app.use(favicon(__dirname + '/public/images/favicon.png'));

// view engine setup
app.set('views', path.join(__dirname, 'views/pug'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

const sessionStore = new sqlstore(options);

app.use(session({
  secret: 'jammies',
  resave: false,
  store: sessionStore,
  saveUninitialized: false
  // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session());

// controllers
app.use(require('./controllers'));

// models
// const models = require("./models");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
