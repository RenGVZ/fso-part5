import React, { useState } from "react"

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  return (
    <form onSubmit={handleCreateBlog} style={{ paddingTop: "20px" }}>
      <h2>Create new</h2>

      <div>
        <label htmlFor="title">title: </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        <label htmlFor="author">author: </label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        <label htmlFor="url">url: </label>
        <input
          type="text"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button data-cy="create-btn" type="submit">Create</button>
    </form>
  )
}

export default CreateBlogForm