const { getChannel } = require("../config/queue");
const config = require("../config");
const Notification = require("../models/Notification");
const { processNotification } = require("./worker");

async function publishNotification(notificationData) {
  try {
    const channel = getChannel();

    const notification = new Notification({
      ...notificationData,
      attempts: notificationData.attempts || 0,
    });

    await notification.save();

    channel.publish(
      config.rabbitMQ.exchange,
      config.rabbitMQ.routingKey,
      Buffer.from(
        JSON.stringify({
          id: notification._id,
          ...notification.toObject(),
        })
      ),
      { persistent: true }
    );

    return notification;
  } catch (error) {
    console.error("Error publishing notification:", error);
    throw error;
  }
}

async function consumeNotifications() {
  try {
    const channel = getChannel();

    channel.consume(config.rabbitMQ.queue, async (msg) => {
      if (msg) {
        const notification = JSON.parse(msg.content.toString());
        try {
          await processNotification(notification);
          channel.ack(msg);
        } catch (error) {
          console.error("Processing failed:", error);
          channel.nack(msg, false, false);
        }
      }
    });
  } catch (error) {
    console.error("Error in consumeNotifications:", error);
    throw error;
  }
}

module.exports = {
  publishNotification,
  consumeNotifications,
};
