const express = require("express");
const app = express();
const connectDb = require("./database");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");

// authentication
app.use("/", authRouter);

// profile fetch api
// OR update the user by emailID
app.use("/", profileRouter);

// sending connection request
app.use("/", requestRouter);

connectDb()
  .then(() => {
    console.log("Connection is Established");
    app.listen(8888, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.error("Connection not established");
  });
