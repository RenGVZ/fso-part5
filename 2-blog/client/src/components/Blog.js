import { useState } from "react"
import Toggleable from "./Toggleable"

const Blog = ({ blog, user, handleLikeIncrease, handleDelete }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)
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
    <div data-cy={`blog-${blog.url}`} style={blogStyle}>
      <div data-testid="title">{blog.title}</div>
      <div data-testid="author">{blog.author}</div>
      <Toggleable
        toggleVisibility={() => setDetailsVisible(!detailsVisible)}
        isVisible={detailsVisible}
        showText="view"
        hideText="hide"
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div data-testid="url">{blog.url}</div>
          <div style={{ display: "flex" }}>
            <div data-testid="likes">likes: {blog.likes} </div>{" "}
            <div>
              <button
                data-cy="like-btn"
                className="likeBtn"
                onClick={() => handleLikeIncrease(blog)}
              >
                Like
              </button>
            </div>
          </div>
        </div>
        {user.id === blog?.user?.id && (
          <button
            data-cy="delete-btn"
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
