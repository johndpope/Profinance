const bcrypt = require('bcrypt')
const router = require('express').Router();
const { User, Token } = require('../db/models');
module.exports = router;

// const encryptPassword = (password) => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
// }
//change user password from settings page
router.post('/change-password/:id', async (req, res, next) => {
  try {
    await User.findById(req.params.id, (err, user) => {
      user.password = req.body.password
      user.save()
    })
    res.json();
  } catch (error) {
    next(error)
  }
})

router.post('/reset-password/:id/:token', async (req, res, next) => {
  try {
    let passwordResetToken = await Token.findOne({ userId: req.params.id });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(req.params.token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const user = await User.findById(req.params.id, (err, user) => {
      user.password = req.body.password
    })    
    user.save()
    passwordResetToken.deleteOne();
    res.json()
  } catch (error) {
    next(error);
  }
})