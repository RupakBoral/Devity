const express = require("express");
const UserModel = require("../models/user");
const AuthRouter = express.Router();

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
      res.cookie("token", token);
      res.send("Login Successful");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

AuthRouter.post("/signup", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const isEmailExist = await UserModel.findOne({ emailId });
    if (isEmailExist) {
      throw new Error("Email already exists");
    }
    const user = new UserModel({ emailId, password });
    await user.save();
    res.send("User Created Successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

AuthRouter.post("/logout", async (req, res) => {
  res
    .cookie("token", null, {
      expires: new Date(Date.now()),
    })
    .send("Logout Successful");
});

module.exports = AuthRouter;
