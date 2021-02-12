const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const mongoose = require("mongoose");
const {model} = mongoose;

require('./models/user');

const User = model('User');
const authRoute = require("./routes/authRoutes");

mongoose.connect(
  "mongodb://localhost:27017/express-react-auth",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to DB')
);

const app = express();
app.use(bodyParser.json());

app.use(
  session({
    secret: "razouq",
    name: "coookiza",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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

const authenticatedUser = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/login");
  }
  return next();
};

authRoute(app);

if(process.env.NODE_ENV === 'production') {
  // main.js main.css ...
  app.use(express.static('client/build'));

  // serve index.html
  app.get('*', (req, res) => {
    // path.resolve returns a string with the absolute path
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server started listening on port: ", PORT));
