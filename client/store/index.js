import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import plaid from './plaid'

const reducer = combineReducers({ user, plaid })
//shows redux store in development
const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
) : applyMiddleware(thunkMiddleware)


const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './plaid'