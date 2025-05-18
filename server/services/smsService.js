const twilio = require("twilio");
const config = require("../config");
const logger = require("../utils/logger");

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

const sendSMS = async (to, message) => {
  try {
    await client.messages.create({
      body: message,
      from: config.twilio.phoneNumber,
      to,
    });
    logger.info(`SMS sent to ${to}`);
    return true;
  } catch (error) {
    logger.error(`Error sending SMS to ${to}: ${error}`);
    throw error;
  }
};

module.exports = {
  sendSMS,
};
