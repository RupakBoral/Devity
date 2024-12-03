const express = require("express");
const connectDb = require("./database");
const UserModel = require("./models/user");
const app = express();

app.use(express.json());

// sign-up the user
app.post("/signUp", async (req, res) => {
  // creating new instance of the user model
  const User = new UserModel(req.body);
  try {
    // document is added in the schema
    await User.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(404).send("Unexpected error occured");
  }
});

// get all the users from the database by emailId
app.get("/feed", async (req, res) => {
  const userEmail = req.body.emailId;
  const userFirstName = req.body.firstName;
  try {
    const user = await UserModel.find({ firstName: userFirstName }).exec();
    if (user.length === 0) res.status(404).send("User not found!");
    res.send(user);
  } catch (err) {
    res.status(400).send("Something unexpected occured");
  }
});

// delete the user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    if (userId.length === 0) res.send("Id is missing!");
    await UserModel.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(404).send("Something unexpected occur");
  }
});

// update the user by emailID
app.patch("/user", async (req, res) => {
  // the name of the variable needs to be same as the name of the constant in the module
  const emailId = req.body.emailId;
  // req.body is the entire document, and change accordingly
  const data = req.body;
  try {
    await UserModel.findOneAndUpdate({ emailId }, data);
    res.send("User details updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    await UserModel.findByIdAndUpdate(userId, data);
    res.send("User details updated successfully");
  } catch (err) {
    res.status(404).send("Something went wrong");
  }
});

connectDb()
  .then(() => {
    console.log("Connection is Established");
    app.listen(8888, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    err.log("Connection not established");
  });
