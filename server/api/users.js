const bcrypt = require('bcrypt')
const router = require('express').Router();
const { User, Token } = require('../db/models');
module.exports = router;

//change user password from settings page
router.post('/change-password/:id', async (req, res, next) => {
  try {
    await User.findById(req.params.id, (err, user) => {
      if(!req.body.password) res.json({error: 'Password is required'})
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
    console.log('here')
    const passwordResetToken = await Token.findOne({ userId: req.params.id });
    const isValid = await bcrypt.compare(req.params.token, passwordResetToken.token);
    console.log(isValid);
    console.log(passwordResetToken);
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
      res.redirect('/');
    } else if (!isValid) {
      throw new Error("Invalid or expired password reset token");
      res.redirect('/');
    } else {
      await User.findById(req.params.id, (err, user) => {
        user.password = req.body.password
        user.save()
      })  
    }  
    passwordResetToken.deleteOne();
    res.json()
  } catch (error) {
    next(error);
  }
})