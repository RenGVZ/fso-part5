import { useState } from "react"
import Toggleable from "./Toggleable"

const Blog = ({ blog, handleLikeIncrease, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"))
  const blogStyle = {
    display: "flex",
    flexDirection: "column",
    border: "1px solid black",
    padding: "4px",
    margin: "4px",
  }
  const removeBtnStyle = {
    backgroundColor: "#ff7f7f",
    color: "white",
    border: "none",
    cursor: "pointer",
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      <Toggleable
        toggleVisibility={() => setDetailsVisible(!detailsVisible)}
        isVisible={detailsVisible}
        showText="view"
        hideText="hide"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{" "}
            <button onClick={() => handleLikeIncrease(blog)}>Like</button>
          </div>
          <div>{blog.author}</div>
        </div>
        {user.id === blog?.user?.id && (
          <button
            style={removeBtnStyle}
            onClick={() => handleDelete(blog.id, user.id)}
          >
            remove
          </button>
        )}
      </Toggleable>
    </div>
  )
}

export default Blog
