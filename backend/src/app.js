const express = require("express");
const app = express();
const connectDb = require("./database");
const cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

// authentication
app.use("/", authRouter);

// profile fetch api
// OR update the user by emailID
app.use("/", profileRouter);

// sending connection request
app.use("/", requestRouter);

// users connection request
app.use("/", userRouter);

connectDb()
  .then(() => {
    console.log("Connection is Established");
    app.listen(8888, () => {
      console.log("Server is running");
    });
  })
  .catch(() => {
    console.error("Connection not established");
  });
