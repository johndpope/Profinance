const router = require('express').Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { User } = require('../db/models')
module.exports = router;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

router.post('/', async (req, res, next) => {
  const accessToken = await oAuth2Client.getAccessToken();
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'gelfandian@gmail.com',
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: accessToken,
    },
  });
  transport.verify(function(error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  try {
    const { email } = req.body
    await User.findOne({email: email}, async (err, user) => {
      if(err) console.log(err)
      if(!user) {
        console.log('no user') 
        res.json()
      }
      if(!user.password) {
        console.log('no password')
        res.json()
      }
      else {
        try {
          const mailOptions = {
            from: `Profinance <gelfandian@gmail.com>`,
            to: `${email}`,
            subject: 'Password Reset',
            text: 'Password Reset',
            html: '<h1>Password Reset</h1>',
          };
      
          const result = await transport.sendMail(mailOptions);
          return result;
        } catch (error) {
          next(error);
        }
      }
    })
  } catch (error) {
    next(error);
  }
})