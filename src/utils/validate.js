const validator = require("validator");

const validateSignUp = (req) => {
  const { firstName, lastName, emailId, phoneNo, password } = req.body;
  if (!firstName) throw new Error("First Name is required!");
  else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid Email Id");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { validateSignUp };
