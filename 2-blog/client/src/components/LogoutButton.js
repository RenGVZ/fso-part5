import React from "react"

export const LogoutButton = ({ handleLogout }) => {
  return <button data-cy="logout-btn" onClick={handleLogout}>Logout</button>
}
