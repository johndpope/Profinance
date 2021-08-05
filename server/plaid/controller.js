const plaid = require('plaid');
const moment = require('moment');
const { User } = require('../db/models')

let ACCESS_TOKEN = null;

const client = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SECRET,
  env: plaid.environments.sandbox,
});

const createLinkToken =  async (req, res) => {
  try {
    // Get the client_user_id by searching for the current user
    const user = await User.findById(req.user);
    const clientUserId = user._id;
    // Create the link_token with all of your configurations
    const tokenResponse = await client.createLinkToken({
      user: {
        client_user_id: clientUserId,
      },
      client_name: 'Plaid Test App',
      products: ["auth"],
      country_codes: ['US'],
      language: 'en',
      webhook: 'https://webhook.sample.com',
    });
    res.json(tokenResponse);
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
}

const swapPublicToken = async (req, res) => {
  //accessToken
  try {
    const { public_token } = req.body;
    const { _id } = req.body.user;
    const tokenResponse = await client.exchangePublicToken(public_token)
    ACCESS_TOKEN = tokenResponse.access_token
    // eslint-disable-next-line no-unused-vars
    const user = await User.where({_id}).update({accessToken: ACCESS_TOKEN})
  } catch (e) {
    // Display error on client
    return res.send({ error: e.message });
  }
}

const getTransactions = (req, res) => {
  ACCESS_TOKEN = req.user.accessToken
  let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, { count: 250, offset: 0 },
    function(_error, transactionsResponse) {
      res.json({transactions: transactionsResponse})
    }
  )
}

module.exports = {
  getTransactions,
  createLinkToken,
  swapPublicToken
}