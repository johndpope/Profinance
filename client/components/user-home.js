import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { me, fetchTransactions, fetchAccountTransactions } from '../store'
import '../../public/styles/user-home.css'

export default function UserHome() {
  const { user } = useSelector(state => state)
  const { plaid } = useSelector(state => state)
  const { transactions, accountTransactions } = useSelector(state => state.plaid)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(me())
    dispatch(fetchTransactions())
  }, [dispatch])
  const checkAmount = (num) => {
    return num < 0 ? 'green' : 'red'
  }
  const handleAccountChange = (e) => {
    dispatch(fetchAccountTransactions(e.target.value))
  }
  return (
    <div className="user-home">
      <h2>Welcome: <span />{user.email}</h2>
      <div className="account-select">
        <label>Choose an account: </label>
        <select onChange={(e) => handleAccountChange(e)}>
          <option value="">Choose an account</option>
          {plaid.accounts ? (
            plaid.accounts.map((account, index) => (
            <option key={index} value={`${account.account_id}`}>{account.name}</option>
          ))) : null}
        </select>
      </div>
      <br />
      {transactions && (
        <div>
        {accountTransactions.transactions ? (
          <div>
            <h3>{accountTransactions.accounts[0].official_name}</h3>
            <div className="transaction-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                {accountTransactions.transactions.map((transaction, index) => (
                  <tbody key={index}>
                    <tr>
                      <td>{transaction.date}</td>
                      <td>{transaction.name}</td>
                      <td>{transaction.category[0]}</td>
                      <td style={{color:checkAmount(transaction.transaction)}}>${transaction.amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        ) : (
          <div>
            <h3>All Accounts:</h3>
            <div className="transaction-table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Merchant</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                {transactions.length ? (
                  transactions.map((transaction, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>{transaction.date}</td>
                        <td>{transaction.name}</td>
                        <td>{transaction.category[0]}</td>
                        <td>${transaction.amount.toFixed(2)}</td>
                      </tr>
                    </tbody>
                ))) : (
                  <thead>
                    <tr>
                      <td>Loading...</td> 
                      <td>Loading...</td> 
                      <td>Loading...</td> 
                      <td>Loading...</td>
                    </tr>
                  </thead>
                )}
              </table>
            </div>
          </div>
        )}
      </div>
      )}
    </div>
  )
}
