const Notification = require("../models/Notification");
const { publishNotification } = require("../queues/notificationQueue");

const sendNotification = async (req, res) => {
  try {
    const { userId, type, title, message } = req.body;

    if (!userId || !type || !title || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const notification = await publishNotification({
      userId,
      type,
      title,
      message,
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ error: "Error sending notification" });
  }
};

// Get user notifications
const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.id,
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

module.exports = {
  sendNotification,
  getUserNotifications,
};
