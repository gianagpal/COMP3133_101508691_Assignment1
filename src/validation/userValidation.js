    const { checkSchema, validationResult } = require("express-validator");
const validator = require("validator");

async function validateSignupInput(input) {
  const schema = checkSchema({
    username: {
      in: ["body"],
      isString: true,
      trim: true,
      notEmpty: { errorMessage: "username is required" },
    },
    email: {
      in: ["body"],
      custom: {
        options: (value) => validator.isEmail(value),
        errorMessage: "invalid email",
      },
    },
    password: {
      in: ["body"],
      isLength: { options: { min: 6 }, errorMessage: "password must be 6+ chars" },
    },
  });

  const req = { body: input };
  for (const rule of schema) await rule.run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const msg = errors.array().map(e => e.msg).join(", ");
    throw new Error(msg);
  }
}

module.exports = { validateSignupInput };
