/* eslint-disable quotes */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"
import CreateBlogForm from "./CreateBlogForm"

describe("blog testing", () => {
  const blogExample = {
    id: 0,
    title: "Example Title",
    author: "Tony Bourdain",
    url: "www.co.jp",
    likes: 50,
    user: { name: "Gav", username: "thegreatGavbino", id: 1 },
  }
  beforeEach(() => {
    const handleIncrease = jest.fn()
    const handleDelete = jest.fn()
    const u = { id: 1 }
    render(
      <Blog
        blog={blogExample}
        user={u}
        handleLikeIncrease={handleIncrease}
        handleDelete={handleDelete}
      />
    )
  })
  test("blogs title and author are rendered by default but not URL or likes", () => {
    const title = screen.getByTestId("title")
    const author = screen.getByTestId("author")
    const url = screen.queryByTestId("url")
    const likes = screen.queryByTestId("likes")

    expect(title.textContent).toBe("Example Title")
    expect(author.textContent).toBe("Tony Bourdain")
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test("blog's url and number of likes are shown when the 'view' button is clicked", async () => {
    const user = userEvent.setup()
    const viewBtn = screen.getByText("view")
    await user.click(viewBtn)
    const url = screen.queryByTestId("url")
    const likes = screen.queryByTestId("likes")
    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})

describe("like btn testing behavior", () => {
  test("when pressing the like btn twice, expect 2 calls to have been made", async () => {
    const blogExample = {
      id: 0,
      title: "Example Title",
      author: "Tony Bourdain",
      url: "www.co.jp",
      likes: 50,
      user: { name: "Gav", username: "thegreatGavbino", id: 1 },
    }
    const handleIncrease = jest.fn()
    const handleDelete = jest.fn()
    const u = { id: 1 }
    render(
      <Blog
        blog={blogExample}
        user={u}
        handleLikeIncrease={handleIncrease}
        handleDelete={handleDelete}
      />
    )
    const user = userEvent.setup()
    const viewBtn = screen.getByText("view")
    await user.click(viewBtn)
    const likeBtn = screen.getByText("Like")
    await user.click(likeBtn)
    await user.click(likeBtn)
    expect(handleIncrease.mock.calls).toHaveLength(2)
  })
})

describe("new blog form test", () => {
  test("check that the event handler is called and the right details are received", async () => {
    const user = userEvent.setup()
    const handleFunc = jest.fn()
    const container = render(
      <CreateBlogForm handleCreateBlog={handleFunc} />
    ).container

    const titleInput = container.querySelector('[name="title"]')
    const authorInput = container.querySelector('[name="author"]')
    const urlInput = container.querySelector('[name="url"]')
    const submitBtn = screen.getByText("Create")

    await user.type(titleInput, "Test Title")
    await user.type(authorInput, "Dan Brown")
    await user.type(urlInput, "www.tets.co.plo")
    await user.click(submitBtn)
    screen.debug(container)

    expect(handleFunc.mock.calls).toHaveLength(1)
    expect(titleInput.value).toBe("Test Title")
    expect(authorInput.value).toBe("Dan Brown")
    expect(urlInput.value).toBe("www.tets.co.plo")
  })
})
