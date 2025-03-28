const express = require("express");
const UserModel = require("../models/user");
const AuthRouter = express.Router();
const { validateSignUp } = require("../utils/validate");
const bcrypt = require("bcrypt");

AuthRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid Credentials!");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true, // Required for HTTPS
        sameSite: "none", // Allows cross-site cookie sharing
        // domain: "devity-backend.onrender.com", // May be needed depending on your setup
      });
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

AuthRouter.post("/signup", async (req, res) => {
  try {
    const { emailId, password, firstName, lastName, phoneNo } = req.body;
    const isEmailExist = await UserModel.findOne({ emailId });
    if (isEmailExist) {
      throw new Error("User already exists");
    }
    validateSignUp(req);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      phoneNo,
      emailId,
      password: passwordHash,
    });
    const savedUser = await user.save();
    const token = await savedUser.getJWT();
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // Required for HTTPS
      sameSite: "none", // Allows cross-site cookie sharing
      domain: "devity-backend.onrender.com", // May be needed depending on your setup
    });
    res
      .status(200)
      .json({ message: "User created successfully", data: savedUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

AuthRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .json({ message: "Logout Successfull" });
});

module.exports = AuthRouter;
