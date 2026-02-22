# Employee Management System (GraphQL Backend)

## COMP3133 – Assignment 1

**Student Name:** Gia Nagpal
**Student ID:** 101508691

---

## Project Overview

This project is a backend Employee Management System developed using **NodeJS, Express, GraphQL and MongoDB**.
It provides secure APIs to manage employees and users including authentication, validation and image upload support.

The system allows:

* User registration and login
* Employee CRUD operations
* Search employees by ID, designation, or department
* Upload employee profile images (Cloudinary)
* Input validation and error handling
* JWT authentication

All communication is done in **JSON format using GraphQL API**.

---

## Technologies Used

| Technology              | Purpose           |
| ----------------------- | ----------------- |
| Node.js                 | Server runtime    |
| Express.js              | Backend framework |
| GraphQL (Apollo Server) | API layer         |
| MongoDB + Mongoose      | Database          |
| Cloudinary              | Image storage     |
| JWT                     | Authentication    |
| bcryptjs                | Password hashing  |
| express-validator       | Input validation  |
| Postman                 | API testing       |

---

## Project Structure

```
src/
 ├── config/          # DB & Cloudinary configuration
 ├── models/          # MongoDB schemas
 ├── graphql/         # typeDefs and resolvers
 ├── middleware/      # JWT authentication
 ├── validation/      # Input validation rules
server.js             # Application entry point
```

---

## Setup Instructions

### 1) Clone Repository

```
git clone https://github.com/gianagpal/COMP3133_101508691_Assignment1
cd COMP3133_101508691_Assignment1
```

### 2) Install Dependencies

```
npm install
```

### 3) Create Environment File

Create `.env` in root folder:

```
PORT=4000
MONGO_URI=mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

### 4) Run Server

```
npm run dev
```

Server will run at:

```
http://localhost:4000/graphql
```

---

## GraphQL API Endpoints

### Authentication

#### Signup

```
mutation Signup($input: SignupInput!)
```

#### Login

```
query Login($input: LoginInput!)
```

---

### Employee Operations

| Operation                        | Type     |
| -------------------------------- | -------- |
| Add Employee                     | Mutation |
| Get All Employees                | Query    |
| Search Employee by ID            | Query    |
| Search by Designation/Department | Query    |
| Update Employee                  | Mutation |
| Delete Employee                  | Mutation |

---

## Sample Test User

```
Username: testuser1
Password: test1234
```

---

## Testing

All APIs were tested using **Postman GraphQL requests**.

Screenshots include:

* Signup
* Login
* Add Employee
* Get Employees
* Search
* Update
* Delete
* Validation errors

---

## Validation & Error Handling

* Required fields enforced
* Salary must be >= 1000
* Email format validated
* Duplicate users prevented
* JSON error responses returned

---

## Security (JWT)

Protected routes require:

```
Authorization: Bearer <token>
```

---

## Cloudinary Image Upload

Employee profile images are uploaded to Cloudinary and stored as URL in MongoDB.

---
