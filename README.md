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
 <img width="1433" height="850" alt="Screenshot 2026-02-21 152631" src="https://github.com/user-attachments/assets/3fe649dc-7a27-4e45-bf9f-d991044de7f6" />

* Login
<img width="973" height="589" alt="image" src="https://github.com/user-attachments/assets/23c53588-0069-404a-a032-6fc17a9b8435" />

* Add Employee
<img width="975" height="577" alt="image" src="https://github.com/user-attachments/assets/f338edce-6beb-4d1c-ab9f-fb7e278214f1" />
<img width="973" height="580" alt="image" src="https://github.com/user-attachments/assets/0e7ca2c8-59b9-4ea9-9326-bfb73abc128e" />

* Get Employees
<img width="973" height="581" alt="image" src="https://github.com/user-attachments/assets/7893154f-c21b-4c45-8ce4-5f2793a57d82" />

* SearchBy Id
<img width="973" height="571" alt="image" src="https://github.com/user-attachments/assets/1eec34e2-ae3d-4c99-bbb5-3db0a3286599" />

* Search By Department
<img width="973" height="567" alt="image" src="https://github.com/user-attachments/assets/092117e7-2116-4a33-9146-205b744e25b9" />

* Search by Designation
<img width="974" height="574" alt="image" src="https://github.com/user-attachments/assets/3e5b8e18-5acc-4526-8c33-9e9faaf11457" />

* Update
<img width="973" height="575" alt="image" src="https://github.com/user-attachments/assets/07a95057-e179-4fb5-b80d-ba5794f0e964" />

* Delete
<img width="975" height="574" alt="image" src="https://github.com/user-attachments/assets/dc4d1fb5-1026-4f03-908f-49f664590100" />

* Validation for Salary
<img width="974" height="590" alt="image" src="https://github.com/user-attachments/assets/1cf6dc5d-14d4-46be-a476-090c4096f5da" />
* Validation for email
<img width="975" height="586" alt="image" src="https://github.com/user-attachments/assets/7b09798d-006c-4599-8c01-ad5136b99f91" />


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
