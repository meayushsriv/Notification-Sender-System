const admin = require("firebase-admin");
const config = require("../config");
const logger = require("../utils/logger");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: config.firebase.projectId,
      privateKey: config.firebase.privateKey,
      clientEmail: config.firebase.clientEmail,
    }),
  });
}

const sendPushNotification = async (deviceToken, title, body) => {
  try {
    await admin.messaging().send({
      token: deviceToken,
      notification: {
        title,
        body,
      },
    });
    logger.info(`Push notification sent to ${deviceToken}`);
    return true;
  } catch (error) {
    logger.error(`Error sending push notification to ${deviceToken}: ${error}`);
    throw error;
  }
};

module.exports = {
  sendPushNotification,
};
