const { gql } = require("graphql-tag");

module.exports = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    created_at: String
    updated_at: String
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo: String!
    created_at: String
    updated_at: String
  }

  type AuthPayload {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type GenericResponse {
    success: Boolean!
    message: String!
  }

  type EmployeeResponse {
    success: Boolean!
    message: String!
    employee: Employee
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    usernameOrEmail: String!
    password: String!
  }

  input AddEmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    designation: String!
    salary: Float!
    date_of_joining: String!
    department: String!
    employee_photo_base64: String!
  }

  input UpdateEmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    designation: String
    salary: Float
    date_of_joining: String
    department: String
    employee_photo_base64: String
  }

  type Query {
    login(input: LoginInput!): AuthPayload!
    getAllEmployees: [Employee!]!
    searchEmployeeById(id: ID!): Employee
    searchEmployeeByDesignationOrDepartment(term: String!): [Employee!]!
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    addEmployee(input: AddEmployeeInput!): EmployeeResponse!
    updateEmployeeById(id: ID!, input: UpdateEmployeeInput!): EmployeeResponse!
    deleteEmployeeById(id: ID!): GenericResponse!
  }
`;
