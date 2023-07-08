import React from 'react'

export const LogoutButton = ({ handleLogout }) => {
  return (
    <button onClick={handleLogout}>Logout</button>
  )
}