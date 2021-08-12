const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

const isEmailValid = (email) => {
  return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
}

const encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

const comparePassword = (password, hash) => {
  return bcrypt.compareSync(password, hash)
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.json({error: 'Wrong email and/or password'})
    } else if (comparePassword(user.password, req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.json({error: 'Wrong email and/or password'})
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!isEmailValid(req.body.email)) {
      res.json({error: 'Please enter a valid email address'})
    } else if(!req.body.password) {
      res.json({error: 'Please enter a password'})
    } else if(!user){
      const newUser = await new User({
        email: req.body.email,
        password: encryptPassword(req.body.password)
      }).save();
      req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    } else if(user.email === req.body.email) {
      console.log('User already exists:', req.body.email)
      res.json({error: 'User already exists'})
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  //express session
  // req.session.destroy()
  //cookie session
  req.session = null
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))