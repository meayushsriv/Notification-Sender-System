# Notification Service 🚀

![Application Demo](demo.gif)

A simple and efficient notification service for sending emails, SMS, and push notifications to users. Built with a modern tech stack and designed for ease of use and scalability.

## Table of Contents 📚

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [API Documentation](#api-documentation)
4. [Environment Setup](#environment-setup)
5. [Local Development](#local-development)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Tech Stack 💻

### Frontend

- **React 18**
- **Vite 4**
- **Material UI 5**
- **Axios 1.3**
- **React Router 6**

### Backend

- **Node.js 18+**
- **Express 4.18**
- **MongoDB 6**
- **Mongoose 7**
- **RabbitMQ 3.12**
- **Nodemailer 6.9**
- **Twilio 4.7**
- **Firebase Admin 11.5**
- **PM2 5.3** (for production)

---

## Project Structure 🗂️

```

notification-service/
├── client/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── package.json
│ └── vite.config.js
│
├── server/
│ ├── config/
│ │ ├── index.js
│ │ └── queue.js
│ ├── controllers/
│ │ └── notification.controller.js
│ ├── models/
│ │ └── Notification.js
│ ├── queues/
│ │ ├── notificationQueue.js
│ │ └── worker.js
│ ├── services/
│ │ ├── emailService.js
│ │ ├── smsService.js
│ │ └── pushService.js
│ ├── utils/
│ │ └── logger.js
│ ├── app.js
│ ├── server.js
│ └── package.json
│
├── .env.example
├── .gitignore
└── README.md

```

---

## API Documentation 📝

### Notification API

#### Send Notification

```http
POST /notifications
Content-Type: application/json

{
  "userId": "string",
  "type": "email|sms|push",
  "title": "string",
  "message": "string"
}
```

#### Get User Notifications

```http
GET /users/:id/notifications
```

---

## Environment Setup 🌍

### Server `.env`

Create a `.env` file inside the `server/` directory:

```ini
# MongoDB
DB_URI=mongodb://localhost:27017/notification-service

# RabbitMQ
RABBITMQ_URL=amqp://localhost
RABBITMQ_EXCHANGE=notifications
RABBITMQ_QUEUE=notification_queue
RABBITMQ_ROUTING_KEY=notification

# Email (Nodemailer)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio (SMS)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# Firebase (Push)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nxxx\n-----END PRIVATE KEY-----"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

### Client `.env`

Create a `.env` file inside the `client/` directory:

```ini
VITE_API_URL=http://localhost:3000
```

---

## Local Development 🌱

### Clone the Repository

```bash
git clone https://github.com/your-username/notification-service.git
cd notification-service
```

### Start Backend

```bash
cd server
npm install
npm run dev
```

### Start Frontend

```bash
cd ../client
npm install
npm run dev
```

### Access the Application

Open your browser and go to:

```
http://localhost:5173
```

---

## Deployment 🚢

For deployment, you can use services like **Heroku**, **AWS**, **DigitalOcean**, or **Vercel** for frontend and backend. Don't forget to adjust environment variables and make sure the MongoDB, RabbitMQ, and other services are properly configured in your production environment.

---

## Troubleshooting 🛠️

- **Backend is not starting**: Ensure that the MongoDB and RabbitMQ services are running and the environment variables are correctly set.
- **Frontend is not loading**: Make sure the API URL in the client `.env` file is pointing to the correct backend server.
- **Email/SMS notifications not working**: Double-check the configuration for **Nodemailer** and **Twilio** in your `.env` files.
- **Push notifications not sending**: Ensure Firebase Admin SDK credentials are correct and the necessary Firebase configurations are set up.

---

Enjoy using the **Notification Service**! 🎉 Feel free to open an issue or pull request if you find any bugs or have suggestions. 😊

```

This README provides a complete guide for setting up, running, and troubleshooting the notification service, with clear sections, instructions, and examples.
```
