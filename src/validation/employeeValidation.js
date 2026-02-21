const { checkSchema, validationResult } = require("express-validator");
const validator = require("validator");

async function validateEmployeeInput(input) {
  const schema = checkSchema({
    first_name: { in: ["body"], notEmpty: { errorMessage: "first_name required" } },
    last_name: { in: ["body"], notEmpty: { errorMessage: "last_name required" } },
    email: {
      in: ["body"],
      custom: { options: (v) => validator.isEmail(v), errorMessage: "invalid email" }
    },
    gender: {
      in: ["body"],
      isIn: { options: [["Male", "Female", "Other"]], errorMessage: "gender invalid" }
    },
    designation: { in: ["body"], notEmpty: { errorMessage: "designation required" } },
    salary: {
      in: ["body"],
      isFloat: { options: { min: 1000 }, errorMessage: "salary must be >= 1000" }
    },
    date_of_joining: { in: ["body"], notEmpty: { errorMessage: "date_of_joining required" } },
    department: { in: ["body"], notEmpty: { errorMessage: "department required" } },
    employee_photo_base64: { in: ["body"], notEmpty: { errorMessage: "photo required" } }
  });

  const req = { body: input };
  for (const rule of schema) await rule.run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new Error(errors.array().map(e => e.msg).join(", "));
}

module.exports = { validateEmployeeInput };
