const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const { connectToQueue } = require("./config/queue");
const config = require("./config");
const logger = require("./utils/logger");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(config.dbUri)
  .then(() => logger.info("Connected to MongoDB"))
  .catch((error) => logger.error("MongoDB connection error:", error));

connectToQueue()
  .then(() => logger.info("RabbitMQ connected and consumer started"))
  .catch((error) => logger.error("Queue setup error:", error));

const notificationRoutes = require("./routes/notification.routes");
app.use("/notifications", notificationRoutes);
app.use("/users", notificationRoutes);

module.exports = app;
