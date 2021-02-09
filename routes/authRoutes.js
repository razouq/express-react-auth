const { model } = require("mongoose");
const passport = require("passport");
const User = model("User");
const uniqueUsername = require("../middlewares/uniqueUsername");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return res.status(400).json({
          message: "error",
        });
      }

      if (!user) {
        return res.status(400).json({
          message: "wrong username or password",
        });
      }
      user = user.toObject();
      delete user.password;
      return res.json(user);
    })(req, res);
  });

  app.post("/api/signup", uniqueUsername, async (req, res) => {
    const { body } = req;
    const user = await new User(body).save({ new: true });
    return res.json(user);
  });
};
