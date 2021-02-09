const {model} = require('mongoose');
const User = model('User');

module.exports = async (req, res, next) => {
  const {username} = req.body;
  let aUser;
  try {
    aUser = await User.findOne({username});
  } catch(e) {
    return next(e);
  }
  if(aUser) {
    return res.status(400).json({
      message: `username ${username} is already taken`
    })
  }
  return next();
}