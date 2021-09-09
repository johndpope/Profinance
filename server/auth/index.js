const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

const isEmailValid = (email) => {
  return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email))
}

router.post('/login', async (req, res, next) => {
  try {    
    await User.findOne({email: req.body.email}, (err, user) => {
      if(err) console.log(err)
      if (!user || !req.body.password || !user.password) {
        console.log('User not found')
        res.json({error: 'Wrong email and/or password'})
      } else if (req.body.password && user.password ) {
        user.comparePassword(req.body.password, (err, match) => {
          if(match) req.login(user, (err) => (err ? next(err) : res.json(user)))
        })
      } else {
        console.log('else')
        res.json({error: 'Wrong email and/or password'})
      }
    })
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email})
    if (!req.body.email) {
      console.log('No email provided')
      res.json({error: 'Please enter a email'})
    } else if(!req.body.password) {
      console.log('No password provided')
      res.json({error: 'Please enter a password'})
    } else if(!isEmailValid(req.body.email)) {
      console.log('Email is not valid')
      res.json({error: 'Please enter a valid email'})
    } else if(!user){
      const newUser = await new User({
        email: req.body.email,
        password: req.body.password
      }).save();
      req.login(newUser, err => (err ? next(err) : res.json(newUser)))
    } else if(user.email === req.body.email) {
      console.log('User already exists')
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
  res.json({_id: req.user._id, email: req.user.email})
})

router.use('/google', require('./google'))