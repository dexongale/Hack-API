var cors = require('cors')
var logger = require("morgan");
var express = require("express");
var cookieParser = require("cookie-parser");

var indexRouter = require("./routes/index");

var app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
