require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI || "mongodb://localhost:27017/notification-service",
  rabbitMQ: {
    url: process.env.RABBITMQ_URL || "amqp://localhost",
    exchange: "notifications",
    queue: "notification_queue",
    routingKey: "notification",
  },
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  email: {
    service: process.env.EMAIL_SERVICE || "gmail",
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
  },
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  },
};
