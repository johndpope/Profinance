import React from 'react'

export default function Password({ setPassword }) {
  return (
    <input placeholder="Password" name="password" type="password" onChange={(e) => setPassword(e.target.value)} />
  )
}
