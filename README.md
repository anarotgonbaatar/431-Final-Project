# Final Project: User Profile with Login

## Overview

This is a full-stack web app that allows users to:

- Register
- Login
- Upload and edit their profile information
- Maintain logged in state using cookies
- Log out
- Delete their account

## Technologies User

- **Frontend**: React 19 + Vite
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens and HTTP cookies
- **Password Security**: bcrypt password hashing
- **Image Upload**: multer middleware

## Setup Instructions

### Prerequisites

You must have Node.js and npm installed.
Download and install Node.js (LTS version) from: https://nodejs.org/
To check if it's installed:

```bash
node -v
npm -v
```

### 1. Install Dependencies

Open two terminals and navigate into both `client` and `server` folders separately and install their dependencies:

```bash
# Terminal 1: install client dependencies
cd client
npm install

# Terminal 2: Install server dependencies
cd server
npm install
```

### 2. Configure Environment Variables

1. Inside the `client` folder, create an `.env` file and add the following env variables:

```bash
VITE_API_URL=http://localhost:5000/api
```

2. Inside the `server` folder, create an `.env` file and add the following env variables:

```bash
PORT = 5000
MONGO_URI = mongodb://localhost:27017/userProfilesDB
JWT_SECRET = mySecretJWTKey
CLIENT_URL = http://localhost:5173
```

- `MONGO_URI`: MongoDB connection string (local)
- `JWT_SECRET`: Any random secure string
- `PORT`: 5000 (recommended)
- `CLIENT_URL`: `http://localhost:5173` (recommended)

### 3. Start MongoDB Locally

If MongoDB is installed, create another terminal and run:

```bash
mongod
```

Leave this terminal open. MongoDB will run on port 27017 by default locally.

### 4. Start the Backend Server

In the `server` terminal/directory:

```bash
npm start
```

Server will run at: `http://localhost:5000`

### 5. Start the Frontend Client

In the `client` terminal/directory:

```bash
npm run dev
```

Frontend will run at: `http://localhost:5173`

## Important Notes

- Database: MongoDB must be running locally or use a MongoDB Atlas cloud URI in `server/.env`
- Uploads: Uploaded profile pictures are saved inside `/server/uploads/`

## Author

- Created by Anar Otgonbaatar
- Final Project for CPSC 431
