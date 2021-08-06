import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_ACCOUNT_TRANSACTIONS = 'GET_ACCOUNT_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const defaultPlaid = {
  transactions: {},
  accountTransactions: {},
}

/**
 * ACTION CREATORS
 */
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const getAccountTransactions = accountTransactions => ({type: GET_ACCOUNT_TRANSACTIONS, accountTransactions})

/**
 * THUNK CREATORS
 */
export const fetchTransactions = () => async dispatch => {
  try {
    const res = await axios.get('/api/plaid/transactions')
    dispatch(getTransactions(res.data.transactions))
  } catch (err) {
    console.error(err)
  }
}

export const fetchAccountTransactions = (accountId) => async dispatch => {
  try {
    const res = await axios.post('/api/plaid/getAccountTransactions', {accountId})
    dispatch(getAccountTransactions(res.data.accountTransactions))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function reducer(state = defaultPlaid, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {...state, ...action.transactions}
    case GET_ACCOUNT_TRANSACTIONS:
      return {...state, accountTransactions: action.accountTransactions}
    default:
      return state
  }
}