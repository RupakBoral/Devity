require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./database");
const cookieParser = require("cookie-parser");
var cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8888"],
    credentials: true,
    allowedHeaders: "Content-Type",
    methods: "GET,POST,PATCH,PUT,DELETE",
  })
);

const port = process.env.PORT || 10000;
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
    app.listen(port, "0.0.0.0", () => {
      console.log("Port" + port);
      console.log("Server is running");
    });
  })
  .catch(() => {
    console.log("Port" + port);
    console.error("Connection not established");
  });
