import React from 'react'

export default function Email({ setEmail }) {
  return (
    <input placeholder="Email" name="email" type="email" onChange={(e) => setEmail(e.target.value)} />
  )
}
