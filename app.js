const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const expressLayouts = require('express-ejs-layouts');

dotenv.config({path: './config/config.env'});
const Schema = mongoose.Schema;

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.get('/', (req, res) => {
    res.send('Work in progress!');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});