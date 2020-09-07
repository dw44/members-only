const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});
const app = express();
connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({usename: username}, (err, user) => {
      if (err) {
        return done(err);
      };
      if (!user) {
        return done(null, false, { msg: 'Incorrect Username' });
      };
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) return done(null, user);
        else return done(null, false, { msg: 'Incorrect Password' });
      });
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use(expressLayouts);
app.use(session({secret: process.env.secret, resave: false, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
});

app.get('/', (req, res) => {
    res.send('Work in progress!');
});

app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});