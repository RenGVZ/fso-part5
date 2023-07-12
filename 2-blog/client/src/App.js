import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import { LoginForm } from "./components/LoginForm"
import { LogoutButton } from "./components/LogoutButton"
import { Notifications } from "./components/Notifications"
import { CreateBlogForm } from "./components/CreateBlogForm"
import Toggleable from "./components/Toggleable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => {
        const sortedByLikes = blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(sortedByLikes)
      })
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
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      setMessage({ text: `a new blog ${title} by ${author} added` })
      toggleRef.current.toggleVisibility()
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

  const handleLikeIncrease = async (blog) => {
    const userId = user.id
    const updatedBlog = { ...blog, likes: blog.likes + 1, userId }
    try {
      const result = await blogService.addLike(updatedBlog, updatedBlog.id)
      const newBlogs = blogs.map((blog) =>
        blog.id === result.id ? result : blog
      )
      setBlogs(newBlogs.sort((a, b) => b.likes - a.likes))
    } catch (err) {
      console.log("error:", err)
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

  const handleDelete = async (id, userId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this blog?"
    )
    if (confirmation === false) return

    try {
      await blogService.deleteBlog(id, userId)
      const updatedBlogs = blogs.filter((blog) =>
        blog.id === id ? false : true
      )
      setBlogs(updatedBlogs.sort((a, b) => b.likes - a.likes))
    } catch (err) {
      console.log("error:", err)
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

  return (
    <div>
      <Notifications message={message} />
      <h2>blogs</h2>
      {!user ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <>
          <div style={{ display: "flex", gap: "2px", marginBottom: "10px" }}>
            <p style={{ margin: "0px" }}>Logged in as {user.username}</p>
            <LogoutButton handleLogout={handleLogout} />
          </div>

          <Toggleable ref={toggleRef} showText="new note" hideText="cancel">
            <CreateBlogForm handleCreateBlog={handleCreateBlog} />
          </Toggleable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLikeIncrease={handleLikeIncrease}
              handleDelete={handleDelete}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default App
