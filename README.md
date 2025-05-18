# Notification Service with React Frontend

A notification service with React Vite frontend and Node.js backend.

## Features

- Send notifications via email, SMS, and push
- View user notifications
- Queue-based processing with RabbitMQ
- Automatic retries for failed notifications

## Requirements

- Node.js 16+
- MongoDB
- RabbitMQ

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/notification-app.git
   cd notification-app
   ```

2. Set up backend:
   ```bash
   cd server
   npm install
   cp .env.example .env
   ```
