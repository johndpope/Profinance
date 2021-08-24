const router = require('express').Router();
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
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
  try {
    const email = await req.body.email
    async function sendMail() {
      try {
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
        return error;
      }
    }
    sendMail()
      .catch((error) => console.log(error.message));
    res.json()
  } catch (error) {
    next(error);
  }
})