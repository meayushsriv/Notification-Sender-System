const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");

// POST /notifications
router.post("/", notificationController.sendNotification);

// GET /users/:id/notifications
router.get("/:id/notifications", notificationController.getUserNotifications);

module.exports = router;
