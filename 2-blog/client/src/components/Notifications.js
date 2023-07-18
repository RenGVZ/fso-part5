import React from "react"

export const Notifications = ({ message }) => {
  if (message === null) {
    return null
  }

  if (message.isError) {
    return (
      <div data-cy="error-notification" style={{ background: "#f86a6a", padding: "6px", color: "white" }}>
        {message.text}
      </div>
    )
  }

  return (
    <div style={{ background: "green", padding: "6px", color: "white" }}>
      {message.text}
    </div>
  )
}
