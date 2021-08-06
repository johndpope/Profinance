const router = require('express').Router();
const { getTransactions, createLinkToken, swapPublicToken, getAccountTransactions } = require('../plaid/controller');
module.exports = router;

router.get('/transactions', getTransactions)
router.post('/getAccountTransactions', getAccountTransactions);
router.post('/create_link_token', createLinkToken) 
router.post('/exchange_public_token', swapPublicToken)