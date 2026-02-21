const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const streamifier = require("streamifier");

const User = require("../models/User");
const Employee = require("../models/Employee");
const cloudinary = require("../config/cloudinary");

const { validateSignupInput } = require("../validation/userValidation");
const { validateEmployeeInput } = require("../validation/employeeValidation");
const { requireAuth } = require("../middleware/auth");

// uploads base64 image to cloudinary
async function uploadBase64ToCloudinary(base64) {
  return new Promise((resolve, reject) => {
    const matches = base64.match(/^data:(.+);base64,(.+)$/);
    if (!matches) return reject(new Error("Invalid base64 image format"));

    const buffer = Buffer.from(matches[2], "base64");

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "comp3133_employees" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
}

module.exports = {
  Query: {
    login: async (_, { input }) => {
      const { usernameOrEmail, password } = input;

      const user = await User.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });

      if (!user) {
        return { success: false, message: "Invalid credentials", token: null, user: null };
      }

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) {
        return { success: false, message: "Invalid credentials", token: null, user: null };
      }

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return { success: true, message: "Login successful", token, user };
    },

    getAllEmployees: async (_, __, ctx) => {
      requireAuth(ctx.token);
      return Employee.find().sort({ created_at: -1 });
    },

    searchEmployeeById: async (_, { id }, ctx) => {
      requireAuth(ctx.token);
      return Employee.findById(id);
    },

    searchEmployeeByDesignationOrDepartment: async (_, { term }, ctx) => {
      requireAuth(ctx.token);
      return Employee.find({
        $or: [
          { designation: { $regex: term, $options: "i" } },
          { department: { $regex: term, $options: "i" } }
        ],
      });
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      await validateSignupInput(input);

      const { username, email, password } = input;

      const existing = await User.findOne({ $or: [{ username }, { email }] });
      if (existing) {
        return { success: false, message: "User already exists", token: null, user: null };
      }

      const hashed = await bcrypt.hash(password, 10);

      const user = await User.create({
        username,
        email,
        password: hashed,
      });

      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "2h" }
      );

      return { success: true, message: "Signup successful", token, user };
    },

    addEmployee: async (_, { input }, ctx) => {
      requireAuth(ctx.token);

      await validateEmployeeInput(input);

      const photoUrl = await uploadBase64ToCloudinary(input.employee_photo_base64);

      const employee = await Employee.create({
        first_name: input.first_name,
        last_name: input.last_name,
        email: input.email,
        gender: input.gender,
        designation: input.designation,
        salary: input.salary,
        date_of_joining: new Date(input.date_of_joining),
        department: input.department,
        employee_photo: photoUrl,
      });

      return { success: true, message: "Employee added", employee };
    },

    updateEmployeeById: async (_, { id, input }, ctx) => {
      requireAuth(ctx.token);

      const patch = { ...input };

      if (patch.date_of_joining) patch.date_of_joining = new Date(patch.date_of_joining);

      if (patch.employee_photo_base64) {
        patch.employee_photo = await uploadBase64ToCloudinary(patch.employee_photo_base64);
        delete patch.employee_photo_base64;
      }

      const employee = await Employee.findByIdAndUpdate(id, patch, { new: true });

      if (!employee) {
        return { success: false, message: "Employee not found", employee: null };
      }

      return { success: true, message: "Employee updated", employee };
    },

    deleteEmployeeById: async (_, { id }, ctx) => {
      requireAuth(ctx.token);

      const deleted = await Employee.findByIdAndDelete(id);
      if (!deleted) return { success: false, message: "Employee not found" };

      return { success: true, message: "Employee deleted" };
    },
  },
};
