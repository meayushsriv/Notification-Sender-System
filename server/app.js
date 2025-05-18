const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectToQueue } = require("./config/queue"); // Only import connectToQueue
const config = require("./config");
const logger = require("./utils/logger");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
  .connect(config.dbUri)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("MongoDB connection error:", error));

// Queue connection - Simplified
connectToQueue()
  .then(() => logger.info("RabbitMQ connected and consumer started"))
  .catch((error) => logger.error("Queue setup error:", error));

// Routes
const notificationRoutes = require("./routes/notification.routes");
app.use("/notifications", notificationRoutes);
app.use("/users", notificationRoutes);

module.exports = app;
