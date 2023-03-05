var express = require('express');
require(
    "dotenv"
    ).config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors= require("cors");
const mongoose = require("mongoose");

var indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, () => {
    console.log('Connected to Database!');
  })
  .then(() => console.log(`DB connected ${mongoURI}`))
  .catch((err) => console.log(err));

app.use('/', indexRouter);

app.use((req,res,next)=>{
    const exception = new Error(`Path not found`);
    exception.statusCode = 404;
    next(exception)
})

app.use((err,req,res,next)=>{
    res.status(err.statusCode).send(err.message)
})

module.exports = app;
