const express = require("express");
const UserModel = require("../models/user");
const AuthRouter = express.Router();
const { validateSignUp } = require("../utils/validate");
const bcrypt = require("bcrypt");
// For now, let's handle Google auth without Firebase Admin verification
// const { auth } = require("../config/firebase-admin");

AuthRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password, googleToken, isGoogleAuth, userInfo } = req.body;

    if (isGoogleAuth) {
      // For now, trust the frontend Google auth (in production, verify the token)
      // TODO: Add proper Firebase Admin SDK token verification
      
      // Handle user logic, e.g., create or login user
      let user = await UserModel.findOne({ emailId: emailId });
      if (!user) {
        // New user, create account
        const displayName = userInfo.displayName || "Google User";
        user = new UserModel({
          emailId: emailId,
          firstName: displayName.split(" ")[0] || "Google",
          lastName: displayName.split(" ").slice(1).join(" ") || "User",
          googleId: userInfo.uid,
          authProvider: 'google',
          phoneNo: "0000000000", // Default phone number for Google users
          photoUrl: userInfo.photoURL || undefined
        });
        await user.save();
      }

      const token = await user.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).send(user);
    } else {
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
          // domain: "devity-backend.onrender.com", // May be needed depending on setup
        });
        res.status(200).send(user);
      }
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

AuthRouter.post("/signup", async (req, res) => {
  try {
    const { emailId, password, firstName, lastName, phoneNo, googleToken, isGoogleAuth, userInfo } = req.body;
    
    // Check if user already exists
    const isEmailExist = await UserModel.findOne({ emailId });
    if (isEmailExist) {
      throw new Error("User already exists");
    }

    if (isGoogleAuth) {
      // Handle Google signup
      const displayName = userInfo.displayName || "Google User";
      const user = new UserModel({
        emailId: emailId,
        firstName: displayName.split(" ")[0] || "Google",
        lastName: displayName.split(" ").slice(1).join(" ") || "User",
        googleId: userInfo.uid,
        authProvider: 'google',
        phoneNo: "0000000000", // Default phone number for Google users
        photoUrl: userInfo.photoURL || undefined
      });
      
      const savedUser = await user.save();
      const token = await savedUser.getJWT();
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      res.status(200).json({ message: "User created successfully", data: savedUser });
    } else {
      // Handle regular email/password signup
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
        // domain: "devity-backend.onrender.com", // Comment out for local development
      });
      res.status(200).json({ message: "User created successfully", data: savedUser });
    }
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
