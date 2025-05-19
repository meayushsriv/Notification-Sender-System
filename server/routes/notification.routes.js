const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

router.post("/", notificationController.sendNotification);

router.get("/:id/notifications", notificationController.getUserNotifications);

module.exports = router;
