const path = require('path')
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const passport = require('passport')
const compression = require('compression')
// const session = require('express-session')
const session = require('cookie-session');
const socketio = require('socket.io')
const PORT = process.env.PORT || 3000
const db = require('./db')
module.exports = app

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

db()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())
app.use(session({
  secret: 'the cake is a lie',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth', require('./auth'))
app.use('/api', require('./api'))

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})
app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})

const server = app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`)
})

const io = socketio(server)
require('./socket')(io)