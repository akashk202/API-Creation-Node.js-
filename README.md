🔥 User Management API with Node.js & MongoDB

Node.js
MongoDB
Express

A robust and secure user management system API built with Node.js, Express, and MongoDB featuring:

✨ Modern authentication with email/phone login

🔐 Password encryption using bcrypt

📱 Phone number validation

📊 User details management

🚀 High performance MongoDB aggregation

🌟 Key Features
📌 Authentication System

Dual login with email or phone number

Secure password hashing with bcrypt

JWT token support (optional)

👤 User Management

Complete CRUD operations

   -> Profile details management

   -> Data validation

   -> Password recovery (ready to implement)

⚡ Technical Highlights

  - MongoDB aggregation pipelines

  - Clean architecture

  -  Error handling middleware

  -  RESTful API design

🛠️ Installation
bash
Copy

# Clone the repository
git clone https://github.com/yourusername/user-management-api.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start the server
npm start

🚀 API Endpoints
Method	Endpoint	Description
POST	/api/auth/register	Register new user
POST	/api/auth/login	Login with email/phone
GET	/api/users	Get all users
GET	/api/users/with-details	Get users with full details
GET	/api/users/:id	Get single user
PATCH	/api/users/:id	Update user
DELETE	/api/users/:id	Delete user
💡 Example Requests
Register a new user
bash
Copy

curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "phoneNumber": "1234567890",
    "password": "secure123"
  }'

Get all users with details
bash
Copy

curl -X GET http://localhost:3000/api/users/with-details

📊 Database Schema
mermaid
Copy

erDiagram
    USER ||--o{ DETAILS : has
    USER {
        string _id
        string email
        string phoneNumber
        string password
        date createdAt
        date updatedAt
    }
    DETAILS {
        string _id
        string userId
        string phoneNumber
        string country
        string gender
        date createdAt
        date updatedAt
    }

🧰 Tech Stack

  Backend: Node.js, Express

  Database: MongoDB

  Security: bcrypt.js

  Validation: Mongoose validators

  API Testing: Postman



