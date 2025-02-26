const mongoose = require("mongoose");
const validator = require("validator");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ProjectSchema = require("./project");

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
      unique: true, // unique automatically creates index which is helpful in efficient searching
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
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: `{value} is incorrect gender`,
      },
      // validate(value) {
      //   if (!['male, "female', "other"].includes(value)) {
      //     throw new Error("Gender is invalid");
      //   }
      // },
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
    photoUrl: {
      type: String,
      default: "https://img.icons8.com/?size=100&id=7819&format=png",
    },
    about: {
      type: String,
      default: "Hello devs, I am excited to work with you.",
      maxLength: 200,
    },
    skills: {
      type: [String],
      maxLength: 50,
    },
    age: {
      type: Number,
      maxAge: 100,
    },
    projects: [ProjectSchema],
  },
  {
    timestamps: true,
  }
);

// method 1
UserSchema.methods.getJWT = async function () {
  const user = this;
  const jwtValue = { _id: user._id };
  const token = jwt.sign(jwtValue, "DEV@277"); // dev@277 secret key
  // console.log(typeof token);
  return token;
};

// method 2
UserSchema.methods.validatePassword = async function (Inputpassword) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(Inputpassword, passwordHash);
  return isPasswordValid;
};

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
