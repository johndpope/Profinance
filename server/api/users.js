const bcrypt = require('bcrypt')

const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
//change user password
router.post('/:id', async (req, res, next) => {
  try {
    await User.findById(req.params.id, (err, user) => {
      user.password = encryptPassword(req.body.password)
      user.save()
    })
    res.json();
  } catch (error) {
    next(error)
  }
})