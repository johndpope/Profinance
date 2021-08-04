import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Navbar } from './components'
import { me } from './store'
import Routes from './routes'

const App = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(me())
  }, [dispatch])
  return (
    <div>
      <Navbar user={user} />
      <Routes user={user} />
    </div>
  )
}

export default App