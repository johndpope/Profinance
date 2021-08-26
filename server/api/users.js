const bcrypt = require('bcrypt')
const router = require('express').Router();
const { User, Token } = require('../db/models');
module.exports = router;

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
//change user password from settings page/email reset
router.post('/change-password/:id', async (req, res, next) => {
  try {
    let passwordResetToken = await Token.findOne({ userId: req.params.id });
    await User.findById(req.params.id, (err, user) => {
      user.password = encryptPassword(req.body.password)
      user.save()
    })
    await passwordResetToken.deleteOne();
    res.json();
  } catch (error) {
    next(error)
  }
})