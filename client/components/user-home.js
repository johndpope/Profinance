import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { me, fetchTransactions } from '../store'
import '../../public/styles/user-home.css'

export default function UserHome() {
  const user = useSelector(state => state.user)
  const accounts = useSelector(state => state.plaid.accounts)
  const transactions = useSelector(state => state.plaid.transactions)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(me())
    dispatch(fetchTransactions())
  }, [dispatch])

  const checkAmount = (num) => {
    if(num < 0) {
      return 'green'
    } else return 'red'
  }
  return (
    <div>
      <h1>Welcome: <span />{user.email}</h1>
      {transactions ? (
      <div>
        <h1>Transactions:</h1>
        <table>
          <thead>
            <tr>
              <th>Merchant</th>
              <th>Amount</th>
            </tr>
          </thead>
          {transactions.map((item, index) => (
            <tbody key={index}>
              <tr>
                <td>{item.name}</td>
                <td style={{color:checkAmount(item.amount)}}>{item.amount.toFixed(2)}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      ) : null}
    </div>
  )
}
