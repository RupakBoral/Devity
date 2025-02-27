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

const validateEditProfile = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "phoneNo",
    "about",
    "skills",
    "BgUrl",
    "headline",
    "projects",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validateSignUp, validateEditProfile };
