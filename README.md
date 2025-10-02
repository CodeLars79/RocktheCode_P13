# GOOD URBANITE

GOOD URBANITE is a full-stack web application where users can explore, download, buy, and favorite urban posters.
It includes user authentication, role-based access, and a clean API backend built with Node.js, Express, and MongoDB, with a React + Chakra UI frontend.

# 🚀 Features

## 👤 Authentication
- User registration and login with JWT.
- Passwords securely hashed with bcrypt.
- Role-based access (USER, ADMIN).

## 🖼️ Posters
- Public access to view all posters.
- Authenticated users can download free posters or buy paid ones.
- Admins can manage posters (CRUD).

## ❤️ Favorites
- Users can save/unsave posters to their favorites.
- Favorites are unique per user and persist in the database.

## 🛠️ Tech Stack

### Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt for password hashing
- dotenv for environment config
- CORS enabled

### Frontend:
- React
- Vite
- Chakra UI
- CSS 

## ⚙️ Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB Atlas Account or local MongoDB setup
- Environment Variables
- The environment variables are set up in a .env file

### Usage
- Start the server in development mode with nodemon: npm run dev
- Or start the server in production mode: npm start
- Server will be deployed at http://localhost:3000 🚀
  

# 🔗 API Endpoints
## 👤 Users (/api/v1/users)
- POST /register → Register new user
- POST /login → Login & receive JWT
- GET / → Get all users (Admin only)
- GET /:id → Get user by ID (self or admin)
- PUT /:id → Update user (self or admin)
- DELETE /:id → Delete user (self or admin)

## 🖼️ Posters (/api/v1/posters)
- GET / → Get all posters
- POST / → Create poster (Admin only)
- PUT /:id → Update poster (Admin only)
- DELETE /:id → Delete poster (Admin only)
- GET /:id/download → Download poster (Auth required, only free posters)
- POST /:id/buy → Buy poster (Auth required)

## ❤️ Favorites (/api/v1/favorites)
- POST / → Add poster to favorites
- GET / → Get all favorites for logged-in user
- DELETE /:posterId → Remove poster from favorites

## 🛡️ Authentication & Roles
Users authenticate via JWT (Authorization: Bearer <token>).
Middleware:
- isAuth → Ensures the user is logged in.
- isAdmin → Ensures the user has role ADMIN.

## 👨‍💻 Author
GOOD URBANITE – Built with ❤️ by Lars Sorensen
