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
      unique: true,
      trim: true,
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
    photoUrl: {
      type: String,
      default: "https://avatars.githubusercontent.com/u/6470175?v=4",
    },
    BgUrl: {
      type: String,
      default:
        "https://t3.ftcdn.net/jpg/09/12/76/70/360_F_912767030_3E4ePOMr42kY42YcFIQhrzUEH9iAFwuW.jpg",
    },
    about: {
      type: String,
      default: "Hello devs, I am excited to work with you.",
      maxLength: 200,
    },
    headline: {
      type: String,
      default: "Developer",
      maxLength: 20,
    },
    skills: {
      type: [String],
      maxLength: 50,
    },
    gitHub: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    age: {
      type: Number,
      maxAge: 80,
    },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  {
    timestamps: true,
  }
);

// method 1
UserSchema.methods.getJWT = async function () {
  const user = this;
  const jwtValue = { _id: user._id };
  const token = jwt.sign(jwtValue, process.env.SECRET_KEY); // secret key
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
