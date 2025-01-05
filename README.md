# Social Media Web Application

A social media web application built with React.js for the frontend and Node.js/Express for the backend. This app allows users to register, log in, view posts, and update their profiles.

This is my first React application, and I've built it as a learning project to get hands-on experience with modern web development using React, Node.js, and other related technologies.

Initially, my plan was to create both features (Social Media application and Chat application) as part of the same project. However, for practice and learning purposes, I decided to split them into two separate applications. Both applications share the same basic architecture (React for the frontend, Node.js/Express for the backend), but each focuses on a specific set of functionalities.

## Features

- User Registration
- User Login
- Profile Management (Edit Nickname, Bio, Tags, Profile Picture)
- View and Load Posts
- Pagination for Posts
- User Authentication with JWT Tokens

## Prerequisites

Ensure that you have the following installed on your local machine:

- Node.js
- npm
- SQL workbench

## Installation

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/shivas1432/SMfrontend.git
cd social-media

2. Backend Setup
Install Backend Dependencies
Navigate to the backend directory and install the dependencies:

bash
Copy code
cd backend
npm install
Start Backend Server
Run the backend server:

bash
Copy code
npm run dev
The backend will be available at http://localhost:8081.

3. Frontend Setup
Install Frontend Dependencies
Navigate to the frontend directory and install the dependencies:

bash
Copy code
cd frontend cd client
npm install
Start Frontend Server
Run the frontend development server:

bash
Copy code
npm start
The frontend will be available at http://localhost:3000.

File Structure

social-media-web-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── css/
│   │   └── App.js
    ├── README.md

API Endpoints

POST /api/register: Register a new user.
POST /api/login: Log in and authenticate the user.
GET /api/user: Fetch user details.
POST /api/profile/update: Update user profile.
GET /api/posts: Fetch posts (supports pagination).

Troubleshooting
CORS Issues: Ensure that the backend is configured to allow cross-origin requests, especially if running the frontend and backend on different ports.
JWT Token Expiration: Make sure your frontend handles token expiration properly and refreshes the token if needed.