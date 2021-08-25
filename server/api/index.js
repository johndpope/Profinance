const router = require('express').Router()
module.exports = router

router.use('/users', require('./users')) //change password here with token
router.use('/plaid', require('./plaid'))
router.use('/request-reset', require('./request-reset')) //sends email

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
