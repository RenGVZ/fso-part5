import React from "react"

export const ErrorMessage = ({ error }) => {
  if (error === null) {
    return null
  }

  return (
    <div style={{ background: "#f86a6a", padding: "6px", color: "white" }}>
      {error}
    </div>
  )
}
