import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import { LoginForm } from "./components/LoginForm"
import { LogoutButton } from "./components/LogoutButton"
import { Notifications } from "./components/Notifications"
import { CreateBlogForm } from "./components/CreateBlogForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs))
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

  const handleCreateBlog = async (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const author = e.target.author.value
    const url = e.target.url.value

    const userObj = {
      title,
      author,
      url,
    }

    try {
      await blogService.createBlog(userObj)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setMessage({ text: `a new blog ${title} by ${author} added` })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (err) {
      console.log("err:", err)
      setMessage({
        text:
          (err.response.data.message || err.response.data.error) ??
          "An error has occurred",
        isError: true,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

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
      setMessage({
        text:
          (error.response.data.message || error.response.data.error) ??
          "An error has occurred",
        isError: true,
      })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    window.location.reload()
  }

  return (
    <div>
      <Notifications message={message} />
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <div style={{ display: "flex", gap: "2px" }}>
            <p style={{ margin: "0px" }}>Logged in as {user.username}</p>
            <LogoutButton handleLogout={handleLogout} />
          </div>
          <CreateBlogForm handleCreateBlog={handleCreateBlog} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  )
}

export default App
