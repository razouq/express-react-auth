const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const session = require("express-session");

const mongoose = require("mongoose");

require('./models/user');
require('./services/passport');

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
