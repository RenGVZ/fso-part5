import React, { useState } from "react"

export const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <form data-cy="login-form" onSubmit={(e) => handleLogin(e)}>
      <div>
        username{" "}
        <input
          type="text"
          name="username"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button data-cy="login-btn" type="submit">login</button>
    </form>
  )
}
