const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const blogRoutes = require("./controllers/blogs")
const userRoutes = require("./controllers/users")
const loginRoutes = require("./controllers/login")
const middleware = require("./utils/middleware")
const logger = require("./utils/logger")
const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

logger.info("connecting to", config.MONGO_URL)

mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use("/api/login", loginRoutes)
app.use("/api/blogs", middleware.tokenExtractor, blogRoutes)
app.use("/api/users", middleware.tokenExtractor, userRoutes)

if (process.env.NODE_ENV === "test") {
  const testingRoutes = require("./controllers/testing")
  app.use("/api/testing", testingRoutes)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
