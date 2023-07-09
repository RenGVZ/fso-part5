import axios from "axios"
const baseUrl = "/api/blogs"
let token = null

const setToken = (newToken) => (token = `Bearer ${newToken}`)

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post("/api/blogs", blogObj, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createBlog, setToken, token }
