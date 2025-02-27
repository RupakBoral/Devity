const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfile } = require("../utils/validate");

const profileRouter = express.Router();

profileRouter.use(express.json());

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.json({ data: user });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfile(req)) {
      throw new Error("Invalid Edit Request");
    }
    const LoggedInUser = req.user;
    Object.keys(req.body).forEach((key) => {
      LoggedInUser[key] = req.body[key];
    });
    await LoggedInUser.save();
    res.json({
      message: `your profile has been updated`,
      data: LoggedInUser,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const LoggedInUser = req.user;
    const Oldpassword = LoggedInUser.password;
    if (newPassword === Oldpassword) {
      throw new Error("New Password cannot be same as old password");
    }
    LoggedInUser.password = newPassword;
    await LoggedInUser.save();
    res.json({
      message: "Password Updated Successfully",
      data: req.user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = profileRouter;
