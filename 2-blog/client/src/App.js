import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import { LoginForm } from "./components/LoginForm"
import { LogoutButton } from "./components/LogoutButton"
import { ErrorMessage } from "./components/ErrorMessage"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (user) {
      blogService
        .getAll(`Bearer ${user.token}`)
        .then((blogs) => setBlogs(blogs))
    }
  }, [user])

  useEffect(() => {
    const JSONLoginUser = window.localStorage.getItem("user")
    if (JSONLoginUser) {
      const user = JSON.parse(JSONLoginUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const user = await loginService.login(username, password)
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (error) {
      console.log("error:", error)
      setError(error.response.data.message ?? "An error has occurred")
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div>
      <ErrorMessage error={error} />
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <LogoutButton handleLogout={handleLogout} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
