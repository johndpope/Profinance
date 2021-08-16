import React from 'react'

export default function Email({ setEmail }) {
  return (
    <div>
    <input placeholder="Email" name="email" type="text" onChange={(e) => setEmail(e.target.value)} />
  </div>
  )
}
