const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    type: { type: String, enum: ["email", "sms", "push"], required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    attempts: {
      type: Number,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Attempts must be an integer",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add pre-save validation
NotificationSchema.pre("save", function (next) {
  if (isNaN(this.attempts)) {
    this.attempts = 0;
  }
  next();
});

module.exports = mongoose.model("Notification", NotificationSchema);
