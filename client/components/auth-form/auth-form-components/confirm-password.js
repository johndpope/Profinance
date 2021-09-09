import React from 'react'

export default function ConfirmPassword({ setConfirmPassword }) {
  return (
    <input placeholder="Confirm Password" name="password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
  )
}
