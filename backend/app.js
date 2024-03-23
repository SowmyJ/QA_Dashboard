var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var systechRouter = require('./routes/routes');
const multer = require('multer');
var app = express();
const fs = require('fs').promises
// Middleware
var corsOptions = {
  origin: ['http://20.127.210.6:30300','http://localhost:30300','http://127.0.0.1:30300','http://13.89.72.142:30300' ]// some legacy browsers (IE11, various SmartTVs) choke on 204
}
 
// Middleware
// app.use(cors(corsOptions));
app.use(cors(corsOptions));
// Serve static files from the "public" directory
app.use(express.static('public'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/',systechRouter);
app.use('/index', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,DELETE')
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next()
});

// app.listen(7777,'0.0.0.0',()=>{
//   console.log('hi')
// })
module.exports = app;
