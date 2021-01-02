const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(session({secret: 'razouq'}));

const users = [
  {
    id: '1234567890',
    username: 'anass',
    password: '123',
  },
];

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  const user = users.find(user => user.id === id);
  done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // find the user
    const user = users.find(user => user.username === username);
    // in case of exception retunr done(err)
    if(!user) {
      return done(null, false, {message: 'incorrect username or password'});
    }
    // the password does not match
    if(user.password !== password) {
      return done(null, false);
    }

    return done(null, user);
  }
))

app.use(passport.initialize());
app.use(passport.session());

// auth routing
app.post('/login', (req, res, next) => {
  console.log('hello');
  next();
}, passport.authenticate('local',{ successRedirect: '/',
failureRedirect: '/login',
failureFlash: true }));

app.get('/', (req, res) => {
  return res.json({
    hello: 'world',
  });
});

const PORT = process.env.PORT || 5000;
app.listen(5000, () => console.log('server started listening on port: ', 5000));