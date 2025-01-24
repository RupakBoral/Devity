const express = require("express");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/user", async (req, res) => {
  // the name of the variable needs to be same as the name of the constant in the module
  const emailId = req.body.emailId;
  // req.body is the entire document, and change accordingly
  const data = req.body;
  try {
    const NOT_ALLOWED = ["emailId"];
    const isUpdateNotAllowed = Object.keys(data).every((k) =>
      NOT_ALLOWED.includes(k)
    );
    if (isUpdateNotAllowed) throw new Error();
    await UserModel.findOneAndUpdate({ emailId }, data, {
      runValidators: true,
    });
    res.send("User details updated successfully");
  } catch (err) {
    res.status(404).send(`Something went wrong!, ${err}`);
  }
});

module.exports = profileRouter;
