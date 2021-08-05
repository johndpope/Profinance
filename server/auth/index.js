const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong email and/or password')
    } else if (user.password !== req.body.password) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong email and/or password')
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
    if(!user){
      const newUser = await new User(req.body).save();
      req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    } else if(user.email === req.body.email) {
      console.log('User already exists:', req.body.email)
      res.status(401).send({message: 'User already exists'})
    }
  } catch (error) {
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})