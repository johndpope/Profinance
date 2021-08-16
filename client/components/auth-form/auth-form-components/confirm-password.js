import React from 'react'

export default function ConfirmPassword({ setConfirmPassword }) {
  return (
    <div>
    <input placeholder="Password" name="password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
  </div>
  )
}
