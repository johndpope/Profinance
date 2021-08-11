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
    const user = await User.findById(req.user);
    const clientUserId = user._id;
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
    return res.send({ error: e.message });
  }
}

const swapPublicToken = async (req, res) => {
  try {
    const { public_token } = req.body;
    const { _id } = req.body.user;
    const tokenResponse = await client.exchangePublicToken(public_token)
    ACCESS_TOKEN = tokenResponse.access_token
    await User.where({_id}).updateOne({accessToken: ACCESS_TOKEN})
  } catch (e) {
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

const getAccountTransactions = (req, res) => {
  ACCESS_TOKEN = req.user.accessToken
  const account_ids  = req.body.accountId

  console.log(account_ids)
  let startDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  let endDate = moment().format('YYYY-MM-DD')
  client.getTransactions(ACCESS_TOKEN, startDate, endDate, 
    {count: 250, offset: 0, account_ids: [account_ids]})
    .then((resToken) => {
      res.json({accountTransactions: resToken})  
    })
    .catch(err => console.log(err))
}

module.exports = {
  getTransactions,
  createLinkToken,
  swapPublicToken,
  getAccountTransactions
}