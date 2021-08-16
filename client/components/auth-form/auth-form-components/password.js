import React from 'react'

export default function Password({ setPassword }) {
  return (
    <div>
    <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
  </div>
  )
}
