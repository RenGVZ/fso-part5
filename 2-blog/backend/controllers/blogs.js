const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

const getTokenFrom = (request) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.startsWith("Bearer")) {
    return authorization.replace("Bearer ", "")
  }
  return null
}

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post("/", async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(getTokenFrom(req), process.env.SECRET)
  if (!decodedToken.id) {
    return res.send(401).json({ error: "token missing or invalid" })
  }
  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  if (newBlog.likes === undefined) {
    newBlog.likes = 0
  }

  if (
    !newBlog.title ||
    newBlog.title.trim().length === 0 ||
    !newBlog.url ||
    newBlog.url.trim().length === 0
  ) {
    return res.status(400).send({ error: "title and url required" })
  }

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", async (req, res) => {
  const id = req.params.id
  const user = await User.findById(req.body.userId)
  const blog = await Blog.findById(id)

  if (!blog || !user || user._id.toString() !== blog.user.toString()) {
    return res
      .status(400)
      .send({ error: "only the creator of this blog can delete it" })
  }
  await Blog.findByIdAndRemove(id)
  res.status(204).end()
})

blogsRouter.put("/:id", async (req, res) => {
  const id = req.params.id
  const { title, author, url, likes, userId } = req.body

  const user = await User.findById(userId)
  console.log("user", user)

  const blogToUpdate = await Blog.findByIdAndUpdate(
    id,
    {
      // if there is a title, add this to the update object. If not, don't include it
      ...(title && { title }),
      ...(author && { author }),
      ...(url && { url }),
      ...(likes && { likes })
    },
    { new: true, runValidators: true, context: "query" }
  ).populate("user", { username: 1, name: 1 })
  if (blogToUpdate) {
    console.log("blogToUpdate", blogToUpdate)
    res.json(blogToUpdate)
  } else {
    res.status(404).send({ error: "no id matches that" })
  }
})

module.exports = blogsRouter
