# Calendar-app
# Calendar Application (MERN Stack)

## Introduction
A **Calendar Application** built with the **MERN stack** (MongoDB, Express, React, Node.js). It allows users to add, update, delete events, and set reminders for those events. The app is deployed on **Vercel** for the frontend and **Heroku** for the backend.

## Features
- **Add, Update, Delete Events**: Manage personal events with details like title, date, and description.
- **Set Reminders**: Set notifications to remind users of upcoming events.
- **User Authentication**: Secure login and registration using JWT tokens.

## Setup Instructions

### Backend Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/mern-calendar-app.git
   cd mern-calendar-app/backend
2.Install dependencies:
  npm install
3. Configure .env:
  .env
    PORT=5000
    MONGO_URI=your_mongo_uri
    JWT_SECRET=your_jwt_secret
4. Start backend server:
    npm start
5. Frontend Setup
    Navigate to frontend folder:
      cd frontend
    Install dependencies:
      npm install
6. Configure backend URL in the frontend code:
   const BASE_URL = 'http://localhost:5000/api';
   Start frontend server:
     npm start
