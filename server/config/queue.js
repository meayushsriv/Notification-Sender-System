const amqp = require("amqplib");
const config = require("./index");
const logger = require("../utils/logger");
const { processNotification } = require("../queues/worker");

let channel;

const connectToQueue = async () => {
  try {
    const connection = await amqp.connect(config.rabbitMQ.url);
    channel = await connection.createChannel();

    await channel.assertExchange(config.rabbitMQ.exchange, "direct", {
      durable: true,
    });
    await channel.assertQueue(config.rabbitMQ.queue, { durable: true });
    await channel.bindQueue(
      config.rabbitMQ.queue,
      config.rabbitMQ.exchange,
      config.rabbitMQ.routingKey
    );

    logger.info("Connected to RabbitMQ");

    await channel.consume(config.rabbitMQ.queue, async (msg) => {
      if (msg) {
        const notification = JSON.parse(msg.content.toString());
        try {
          await processNotification(notification);
          channel.ack(msg);
        } catch (error) {
          logger.error("Error processing notification:", error);
          channel.nack(msg, false, false);
        }
      }
    });

    return channel;
  } catch (error) {
    logger.error("Error connecting to RabbitMQ:", error);
    throw error;
  }
};

const getChannel = () => {
  if (!channel) {
    throw new Error("RabbitMQ channel not initialized");
  }
  return channel;
};

module.exports = {
  connectToQueue,
  getChannel,
};
