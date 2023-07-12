import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("blog testing", () => {
  const blogExample = {
    id: 0,
    title: "Example Title",
    author: "Tony Bourdain",
    url: "www.co.jp",
    likes: 50,
    user: { name: "Gav", username: "thegreatGavbino", id: 1 },
  }
  test("blogs title and author are rendered by default but not URL or likes", () => {
    const handleIncrease = jest.fn()
    const handleDelete = jest.fn()
    const user = { id: 1 }
    render(
      <Blog
        blog={blogExample}
        user={user}
        handleLikeIncrease={handleIncrease}
        handleDelete={handleDelete}
      />
    )
    const title = screen.getByTestId("title")
    const author = screen.getByTestId("author")
    const url = screen.queryByTestId("url")
    const likes = screen.queryByTestId("likes")
    screen.debug()

    expect(title.textContent).toBe("Example Title")
    expect(author.textContent).toBe("Tony Bourdain")
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })
})
