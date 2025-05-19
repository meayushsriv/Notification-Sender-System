const Notification = require("../models/Notification");
const { sendEmail } = require("../services/emailService");
const { sendSMS } = require("../services/smsService");
const { sendPushNotification } = require("../services/pushService");
const logger = require("../utils/logger");

const MAX_RETRIES = 3;

const processNotification = async (notification) => {
  const currentAttempts = parseInt(notification.attempts) || 0;

  try {
    let result;
    switch (notification.type) {
      case "email":
        result = await sendEmail(
          notification.userId,
          notification.title,
          notification.message
        );
        break;
      case "sms":
        result = await sendSMS(
          notification.userId,
          notification.title,
          notification.message
        );
        break;
      case "push":
        result = await sendPushNotification(
          notification.userId,
          notification.title,
          notification.message
        );
        break;
      default:
        throw new Error("Invalid notification type");
    }

    // Update with explicit number conversion
    await Notification.findByIdAndUpdate(
      notification.id,
      {
        status: "sent",
        attempts: currentAttempts + 1,
      },
      { runValidators: true } // Ensure schema validation runs
    );

    return result;
  } catch (error) {
    logger.error(`Notification processing failed: ${error}`);

    // Update with explicit number conversion
    await Notification.findByIdAndUpdate(
      notification.id,
      {
        status: currentAttempts >= MAX_RETRIES ? "failed" : "pending",
        attempts: currentAttempts + 1,
      },
      { runValidators: true }
    );

    if (currentAttempts < MAX_RETRIES) {
      throw error; // Will trigger a retry
    }

    return false;
  }
};

module.exports = {
  processNotification,
};
