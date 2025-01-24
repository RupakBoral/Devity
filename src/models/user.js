const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // validate function only works when we create a document not when we update
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    phoneNo: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isMobilePhone(value) || value.length != 10) {
          throw new Error("Invalid mobile number");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a strong Password");
        }
      },
    },
    about: {
      type: String,
      default: "Hello devs, I am excited to work with you.",
      maxLength: 50,
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.getJWT = async function () {
  const user = this;
  const jwtValue = { _id: user._id };
  const token = jwt.sign(jwtValue, "DEV@277");
  // console.log(typeof token);
  return token;
};

UserSchema.methods.validatePassword = async function (Inputpassword) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(Inputpassword, passwordHash);
  return isPasswordValid;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
