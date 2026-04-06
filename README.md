# BookHub - MERN Stack Web Application

BookHub is a modern, responsive full-stack web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS. It allows users to browse books, filter by categories, view detailed information, and manage their accounts.

## Features
- **Modern UI**: Rich, dynamic design using Tailwind CSS, Framer Motion, and Lucide Icons.
- **Authentication**: JWT-based login and signup system with secure password hashing.
- **Library Platform**: Browse through mock book collections across different categories.
- **Responsive**: Fully responsive design for mobile, tablet, and desktop screens.
- **Contact Form**: Beautiful functional UI.
- **Concurrent Startup**: Run both frontend and backend concurrently with a single command.

## Tech Stack
- **Frontend**: React (Vite), React Router v6, Tailwind CSS, Axios, Framer Motion
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JSON Web Tokens (JWT), bcryptjs

## Folder Structure
```
bookhub/
│
├── client/          # React.js frontend powered by Vite
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Auth Context for global state
│   │   ├── pages/       # Page components (Home, Login, BookDetails, etc)
│   │   ├── App.jsx      # Routes definition
│   │   └── main.jsx     # App mounting
│   ├── index.html
│   └── tailwind.config.js
│
├── server/          # Node.js + Express backend
│   ├── middleware/  # Auth middleware
│   ├── models/      # Mongoose DB schema
│   ├── routes/      # Express API routes
│   ├── .env         # Environment variables
│   └── server.js    # Entry point
│
└── package.json     # Root configs for concurrently
```

## Setup & Execution

### Prerequisites
- Node.js installed
- MongoDB installed locally (or update the `.env` file with your Mongo URI)

### Instructions

1. **Install Dependencies** (from the root folder `bookhub`):
   ```bash
   npm run install-all
   ```
   *(This will natively navigate and install both server and client packages)*

2. **Run Application**:
   ```bash
   npm start
   ```
   *The backend will run on `http://localhost:5001` and the frontend will automatically start on `http://localhost:5173`.*

### Database Seeding
To populate realistic dummy data so you can browse the website:
- Open your terminal and make a POST request, or just click/visit with Postman:
  `POST http://localhost:5001/api/books/seed`
*(This will securely wipe the books collection and place fresh demo data)*
