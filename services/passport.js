const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require('mongoose');
const {model} = mongoose;
const User = model('User');

passport.serializeUser( (user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    // find the user
    const user = await User.findOne({username});
    // in case of exception retunr done(err)
    if (!user) {
      return done(null, false);
    }
    // the password does not match
    if (user.password !== password) {
      return done(null, false);
    }

    return done(null, user);
  })
);
