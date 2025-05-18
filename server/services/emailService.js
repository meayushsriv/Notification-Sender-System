const nodemailer = require("nodemailer");
const config = require("../config");
const logger = require("../utils/logger");

const transporter = nodemailer.createTransport({
  service: config.email.service,
  auth: {
    user: config.email.user,
    pass: config.email.pass,
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: config.email.user,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
    return true;
  } catch (error) {
    logger.error(`Error sending email to ${to}: ${error}`);
    throw error;
  }
};

module.exports = {
  sendEmail,
};
