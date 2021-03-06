var cors = require('cors')
var logger = require("morgan");
var express = require("express");
var indexRouter = require("./index");

var app = express();

app.use(cors())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

module.exports = app;
